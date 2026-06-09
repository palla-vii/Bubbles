import { addMessage } from "./models/Message.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware: Enable CORS for frontend requests
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Middleware: Parse incoming JSON requests
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Create HTTP server (required for Socket.io)
const server = http.createServer(app);

// Attach Socket.io to the HTTP server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
//mongodb connection
// Temporary in-memory store until MongoDB connection is resolved
export const messages = [];
export const users = [];
console.log("Using in-memory store for development");
/**
 * ========== ROUTES ==========
 * These are placeholder routes for now.
 * We'll add authentication, rooms, and messages routes in Phase 3-4.
 */

/**
 * Health check endpoint - use this to verify the server is running
 */
app.get("/api/health", (req, res) => {
  res.json({ message: " Server is running!", timestamp: new Date() });
});

/**
 * ========== SOCKET.IO CONNECTION ==========
 * This is where real-time events will be handled in Phase 5.
 * For now, we just log when a client connects.
 */
io.on("connection", (socket) => {
  console.log(` User connected: ${socket.id}`);

  socket.on("joinRoom", ({ room, username }) => {
    socket.join(room);
    socket.to(room).emit("userJoined", { username, message: `${username} joined the room` });
    console.log(`${username} joined room: ${room}`);
  });

  socket.on("sendMessage", ({ room, message, username }) => {
    const newMessage = {
      id: Date.now().toString(),
      room,
      content: message,
      sender: username,
      timestamp: new Date()
    };
    addMessage(newMessage);
    io.to(room).emit("receiveMessage", newMessage);
  });

  socket.on("disconnect", () => {
    console.log(` User disconnected: ${socket.id}`);
  });
});

/**
 * ========== START SERVER ==========
 * Listen on the specified PORT and display a startup message
 */
server.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║        MERN Chat Server Started Successfully!             ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║   📍 Server URL:  http://localhost:${PORT}                ║
║   🔗 Socket.io:   Connected                              ║
║   🗄️  Database:    Waiting to connect (Phase 2)          ║
║   🔐 Auth:        Waiting to implement (Phase 3)         ║
║   💬 Real-time:   Waiting to implement (Phase 5)         ║
║                                                           ║
║   📝 Check server status:                                ║
║      curl http://localhost:${PORT}/api/health            ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

// Handle server errors
server.on("error", (err) => {
  console.error(" Server error:", err);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n Shutting down server...");
  server.close(() => {
    console.log(" Server closed");
    process.exit(0);
  });
});
