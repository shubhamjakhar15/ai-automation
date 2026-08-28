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



    const [globalResults, chatResults, memoryResults] =
      await Promise.all([
        hybridSearch(message, 6),
        searchCurrentChat(chatId, message, 5),
        searchMasterMemory(message, userId, 3)
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

    const prompt = `
You are the AI Front Desk Receptionist for Sunrise Public School.

Your role is to assist parents, students, teachers, and visitors with inquiries regarding school timings, admissions, fee structures, examinations, holidays, teachers, transport, sports, and general school policies.

Greeting & Demeanor Guidelines:
- If the user greets you (e.g., "hello", "hi", "good morning", "hey"), warmly welcome them to the school reception: "Hello! Welcome to Sunrise Public School. How can I assist you with our school admissions, timings, fees, or facilities today?"
- Maintain a warm, polite, respectful, and helpful school receptionist demeanor at all times.
- Deliver responses in natural, fluent, and articulate spoken sentences that are pleasant to listen to.
- For fees, timings, or dates, state the numbers clearly (e.g., ₹45,000, 8:00 AM to 2:30 PM).
- If the information is genuinely not available in the context, politely let the user know and offer to connect them with the school office (Office Phone: 0141-400-1234, Monday to Friday 9:00 AM to 4:00 PM).
- Use standard natural sentence casing (never respond in all uppercase words).
- Never mention technical terms like "context", "database", "retrieval", or "vectors".

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