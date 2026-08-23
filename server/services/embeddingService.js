const { GoogleGenAI } = require("@google/genai");

// Initialize GoogleGenAI SDK with API key from environment
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const EMBEDDING_MODEL = "gemini-embedding-2";

const generateEmbedding = async (text) => {
  try {
    const response = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: text,
      config: {
        outputDimensionality: 768
      }
    });

    return response.embeddings[0].values;
  } catch (error) {
    console.error("Gemini embedding error:", error.message);
    throw error;
  }
};

module.exports = {
  generateEmbedding,
};