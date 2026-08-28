/**
 * Cleans text and markdown into smooth, natural human speech
 */
export function cleanTextForSpeech(text) {
  if (!text) return "";

  let clean = text;

  // Remove code blocks
  clean = clean.replace(/```[\s\S]*?```/g, " code snippet omitted. ");
  clean = clean.replace(/`([^`]+)`/g, "$1");

  // Remove markdown headers
  clean = clean.replace(/^#+\s+/gm, "");

  // Remove markdown bold / italic / strikethrough
  clean = clean.replace(/\*\*([^*]+)\*\*/g, "$1");
  clean = clean.replace(/\*([^*]+)\*/g, "$1");
  clean = clean.replace(/__([^_]+)__/g, "$1");
  clean = clean.replace(/_([^_]+)_/g, "$1");
  clean = clean.replace(/~~([^~]+)~~/g, "$1");

  // Clean bullet points, numbering, list markers
  clean = clean.replace(/^\s*[-*•+]\s+/gm, "");
  clean = clean.replace(/^\s*\d+\.\s+/gm, "");

  // Expand common abbreviations & formatting for natural pronunciation
  clean = clean.replace(/₹\s*([0-9,]+)/g, "$1 rupees");
  clean = clean.replace(/\$\s*([0-9,]+)/g, "$1 dollars");
  clean = clean.replace(/\be\.g\.\b/gi, "for example");
  clean = clean.replace(/\bi\.e\.\b/gi, "that is");
  clean = clean.replace(/\betc\.\b/gi, "and so on");
  clean = clean.replace(/\bvs\.\b/gi, "versus");
  clean = clean.replace(/(\d{1,2}):00\s*(AM|PM)/gi, "$1 $2"); // e.g. "8:00 AM" -> "8 AM"
  clean = clean.replace(/(\d{1,2}):(\d{2})\s*(AM|PM)/gi, "$1 $2 $3"); // e.g. "2:30 PM" -> "2 30 PM"

  // Remove markdown links: [text](url) -> text
  clean = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // Remove raw URLs
  clean = clean.replace(/https?:\/\/\S+/g, "");

  // Remove emojis and decorative symbol clutter
  clean = clean.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "");
  clean = clean.replace(/[✦★☆•▪●◆▶🚨🤖✨]/g, "");

  // Clean up excess whitespace and double lines
  clean = clean.replace(/\s+/g, " ").trim();

  return clean;
}

/**
 * Finds the highest quality, most natural neural voice available in the browser
 */
export function getBestVoice() {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Natural / Online / Neural English (India)
  const naturalIndian = voices.find(v => 
    (v.lang === "en-IN" || v.lang.startsWith("en-IN")) &&
    (v.name.includes("Natural") || v.name.includes("Online") || v.name.includes("Neural") || v.name.includes("Google"))
  );
  if (naturalIndian) return naturalIndian;

  // 2. Natural / Online / Neural Global English (Edge / Chrome / Apple Enhanced)
  const naturalGlobal = voices.find(v => 
    v.lang.startsWith("en") &&
    (v.name.includes("Natural") || v.name.includes("Online") || v.name.includes("Neural") || v.name.includes("Enhanced") || v.name.includes("Google") || v.name.includes("Premium") || v.name.includes("Jenny") || v.name.includes("Aria"))
  );
  if (naturalGlobal) return naturalGlobal;

  // 3. Standard en-IN voice
  const standardIndian = voices.find(v => v.lang === "en-IN" || v.lang === "en_IN");
  if (standardIndian) return standardIndian;

  // 4. Any friendly English voice (e.g. Google US English, Samantha, Microsoft Zira)
  const friendlyEnglish = voices.find(v => v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Zira")));
  if (friendlyEnglish) return friendlyEnglish;

  // 5. Any English voice
  const fallbackEnglish = voices.find(v => v.lang.startsWith("en"));
  return fallbackEnglish || voices[0] || null;
}

/**
 * Splits text into fluent sentence chunks to avoid browser timeout bugs and maintain natural cadence
 */
export function splitIntoSentences(text) {
  const clean = cleanTextForSpeech(text);
  if (!clean) return [];

  // Match sentences ending in ., !, ?, or \n
  const sentences = clean.match(/[^.!?;\n]+[.!?;\n]*/g) || [clean];
  return sentences.map(s => s.trim()).filter(s => s.length > 0);
}
