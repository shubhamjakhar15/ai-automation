const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { requireAdmin } = require("../middleware/adminAuth");
const { addDocuments } = require("../services/vectorService");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Apply admin middleware to all routes in this router
router.use(requireAdmin);

// Process and add text chunks
const processAndAddText = async (text, source) => {
  const chunks = text.split(/\n\n+/).filter(chunk => chunk.trim().length > 0);
  const documents = chunks.map(chunk => ({
    text: chunk.trim(),
    source: source || "Admin Panel Upload",
  }));
  await addDocuments(documents);
  return documents.length;
};

// Raw Text Upload
router.post("/knowledge", async (req, res) => {
  try {
    const { text, source } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: "Text content is required" });
    }
    const chunkCount = await processAndAddText(text, source);
    res.json({ success: true, message: `Successfully added ${chunkCount} knowledge chunks to the AI brain.` });
  } catch (error) {
    console.error("Knowledge upload error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to upload knowledge" });
  }
});

// File Upload (PDF, TXT, DOCX)
router.post("/knowledge/file", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const { originalname, buffer, mimetype } = req.file;
    let extractedText = "";

    // Parse based on file type
    if (mimetype === "application/pdf") {
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text;
    } else if (
      mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
      originalname.endsWith(".docx")
    ) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } else if (mimetype.startsWith("text/") || originalname.endsWith(".txt") || originalname.endsWith(".md") || originalname.endsWith(".csv")) {
      extractedText = buffer.toString("utf-8");
    } else {
      return res.status(400).json({ 
        success: false, 
        message: "Unsupported file type. Please upload PDF, DOCX, or TXT." 
      });
    }

    if (!extractedText.trim()) {
      return res.status(400).json({ success: false, message: "Could not extract any text from the file." });
    }

    const chunkCount = await processAndAddText(extractedText, originalname);

    res.json({ 
      success: true, 
      message: `Successfully processed ${originalname} and added ${chunkCount} knowledge chunks to the AI brain.` 
    });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to process file upload" });
  }
});

module.exports = router;
