const { Pinecone } = require("@pinecone-database/pinecone");
const { generateEmbedding } = require("./embeddingService");

// Initialize Pinecone Client
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const indexName = process.env.PINECONE_INDEX_NAME || "voice-chatbot";
const indexHost = process.env.PINECONE_HOST || "https://voice-chatbot-89i442y.svc.aped-4627-b74a.pinecone.io";
const NAMESPACE = "global_knowledge";

// Get the index with direct host for high performance & reliability
const getIndex = () => pc.index(indexName, indexHost);

// =====================================================
// ADD DOCUMENTS
// =====================================================
const addDocuments = async (documents) => {
  const index = getIndex().namespace(NAMESPACE);
  const vectors = [];

  for (let i = 0; i < documents.length; i++) {
    const document = documents[i];
    console.log(`Creating embedding ${i + 1}/${documents.length}`);
    
    const embedding = await generateEmbedding(document.text);

    vectors.push({
      id: `doc-${Date.now()}-${i}`,
      values: embedding,
      metadata: {
        text: document.text,
        source: document.source || "unknown",
      },
    });
  }

  // Upsert in batches of 10 to avoid connection timeouts
  const BATCH_SIZE = 10;
  for (let i = 0; i < vectors.length; i += BATCH_SIZE) {
    const batch = vectors.slice(i, i + BATCH_SIZE);
    await index.upsert({ records: batch });
  }

  console.log(`${documents.length} documents added to Pinecone.`);
};

// =====================================================
// VECTOR SEARCH
// =====================================================
const vectorSearch = async (query, topK = 6) => {
  try {
    const index = getIndex().namespace(NAMESPACE);
    const queryEmbedding = await generateEmbedding(query);

    const results = await index.query({
      vector: queryEmbedding,
      topK: topK,
      includeMetadata: true,
    });

    // Accept relevant matches with a reasonable threshold
    const MIN_SCORE = 0.35;

    const filteredResults = (results.matches || [])
      .filter(match => match.score >= MIN_SCORE && match.metadata?.text)
      .map((match) => ({
        id: match.id,
        text: match.metadata.text,
        score: match.score,
      }));

    return filteredResults;
  } catch (error) {
    console.error("Vector search error:", error);
    return [];
  }
};

// We alias hybridSearch to vectorSearch since Gemini embeddings are powerful enough on their own
const hybridSearch = vectorSearch;

module.exports = {
  addDocuments,
  searchDocuments: vectorSearch,
  vectorSearch,
  hybridSearch,
};