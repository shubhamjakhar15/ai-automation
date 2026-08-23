const { hybridSearch } = require("../services/vectorService");
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const ChatMeta = require("../models/ChatMeta");
const { getAuth } = require("@clerk/express");

const {
  addMessageToChat,
  searchCurrentChat,
  searchMasterMemory,
  summarizeAndStore
} = require("../services/memoryService");

const MAX_MESSAGES = 80;

const chatWithAI = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    let { message, chatId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    let chatMeta;

    if (chatId) {
      chatMeta = await ChatMeta.findOne({ chatId, userId });

      if (!chatMeta) {
        return res.status(404).json({
          success: false,
          message: "Chat not found"
        });
      }

      if (chatMeta.messageCount >= MAX_MESSAGES) {
        return res.status(400).json({
          success: false,
          message: "Chat limit reached. Please start a new chat.",
          limitReached: true
        });
      }
    } else {
      chatId = `chat_${userId}_${Date.now()}`;

      chatMeta = new ChatMeta({
        chatId,
        userId,
        title:
          message.substring(0, 30) +
          (message.length > 30 ? "..." : "")
      });

      await chatMeta.save();
    }

    console.log(`User question [${chatId}]:`, message);

    const [globalResults, chatResults, memoryResults] =
      await Promise.all([
        hybridSearch(message, 3),
        searchCurrentChat(chatId, message, 5),
        searchMasterMemory(message, userId, 2)
      ]);

    const globalContext = globalResults
      .map((r) => r.text)
      .join("\n\n");

    const chatContext = chatResults.join("\n\n");
    const memoryContext = memoryResults.join("\n\n");

    const fullContext = `
[Global Knowledge]
${globalContext || "None"}

[Past Chat Memories]
${memoryContext || "None"}

[Recent Context in This Chat]
${chatContext || "None"}
`;

    console.log("Full Context sent to Gemini:", fullContext);

    const prompt = `
You are a helpful AI assistant for our web development course platform.

Answer the user's question using the information provided in the context below.

The context includes Global Knowledge, summaries of Past Chat Memories, and Recent Context from this specific chat.

If the answer cannot be found in the context, politely say that you don't have that information and suggest contacting support.

Keep your answer short, clear, and conversational.

Do not repeat the entire context.

Do not mention the retrieval process, vector search, BM25, or RAG to the user.

Context:
${fullContext}

User question:
${message}

Answer:
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,
    });

    const answer = response.text;

    console.log("AI answer:", answer);

    await addMessageToChat(
      chatId,
      message,
      "user",
      chatMeta.messageCount
    );

    await addMessageToChat(
      chatId,
      answer,
      "ai",
      chatMeta.messageCount + 1
    );

    chatMeta.messageCount += 2;

    if (
      chatMeta.messageCount >= MAX_MESSAGES &&
      !chatMeta.isSummarized
    ) {
      chatMeta.isSummarized = true;
      summarizeAndStore(chatId, userId).catch(console.error);
    }

    // If this is the very first message exchange, generate a smart title
    if (chatMeta.messageCount === 2) {
      try {
        const titlePrompt = `Write a very short, 2 to 4 word summary title for this chat. 
User said: "${message}"
AI answered: "${answer.substring(0, 200)}..."
Only return the title, no quotes, no extra text.`;
        const titleRes = await ai.models.generateContent({
          model: 'gemini-3.5-flash-lite',
          contents: titlePrompt,
        });
        chatMeta.title = titleRes.text.replace(/["']/g, '').trim();
      } catch (e) {
        console.error("Failed to generate smart title:", e);
      }
    }

    await chatMeta.save();

    res.json({
      success: true,
      chatId,
      question: message,
      answer,
      context: fullContext,
      limitReached: chatMeta.messageCount >= MAX_MESSAGES
    });
  } catch (error) {
    console.error("AI Chat Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
      error: error.message
    });
  }
};

module.exports = { chatWithAI };