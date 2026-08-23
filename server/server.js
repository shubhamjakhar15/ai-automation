const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");

const chatRoutes = require("./routes/chatRoutes");
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());


app.use((req, res, next) => {
  console.log(
    "AUTHORIZATION HEADER:",
    req.headers.authorization
      ? "Bearer token received"
      : "NO AUTHORIZATION HEADER"
  );
  
  next();
});

app.use(clerkMiddleware());

app.use((req, res, next) => {
  console.log("========== CLERK DEBUG ==========");
  console.log("Authorization Header:", req.headers.authorization ? "PRESENT" : "MISSING");
  console.log("User ID:", req.auth?.userId || "NOT AUTHENTICATED");
  next();
});


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Voice Chatbot Server is running",
  });
});

const adminRoutes = require("./routes/adminRoutes");

app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  if (err.message === 'Unauthenticated' || err.status === 401) {
    return res.status(401).json({ success: false, message: 'Unauthenticated' });
  }
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});