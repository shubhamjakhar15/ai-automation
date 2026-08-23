const { Pinecone } = require("@pinecone-database/pinecone");
const { generateEmbedding } = require("./embeddingService");

// Initialize Pinecone Client
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const indexName = process.env.PINECONE_INDEX_NAME || "voice-chatbot";
const NAMESPACE = "global_knowledge";

// Get the index
const getIndex = () => pc.index(indexName);

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

  await index.upsert({ records: vectors });
  console.log(`${documents.length} documents added to Pinecone.`);
};

// =====================================================
// VECTOR SEARCH
// =====================================================
const vectorSearch = async (query, topK = 5) => {
  const index = getIndex().namespace(NAMESPACE);
  const queryEmbedding = await generateEmbedding(query);

  const results = await index.query({
    vector: queryEmbedding,
    topK: topK,
    includeMetadata: true,
  });

  console.log("\n========== VECTOR SEARCH ==========");
  console.log("Query:", query);
  
  // Pinecone returns a similarity score (higher is better, usually cosine similarity 0-1)
  const MIN_SCORE = 0.5;

  const filteredResults = results.matches
    .filter(match => match.score >= MIN_SCORE)
    .map((match) => ({
      id: match.id,
      text: match.metadata.text,
      score: match.score,
    }));

  console.log("Vector results:", filteredResults.length);
  return filteredResults;
};

// We alias hybridSearch to vectorSearch since Gemini embeddings are powerful enough on their own
// and Pinecone doesn't easily allow pulling all metadata for manual JS BM25 scoring.
const hybridSearch = vectorSearch;

module.exports = {
  addDocuments,
  searchDocuments: vectorSearch,
  vectorSearch,
  hybridSearch,
};