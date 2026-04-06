import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware: Parse incoming JSON requests
app.use(express.json());

// Middleware: Enable CORS for frontend requests
// In production, specify your actual frontend domain instead of "*"
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies if using cookie-based auth
  })
);

// Create HTTP server (required for Socket.io)
const server = http.createServer(app);

// Attach Socket.io to the HTTP server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

/**
 * ========== ROUTES ==========
 * These are placeholder routes for now.
 * We'll add authentication, rooms, and messages routes in Phase 3-4.
 */

/**
 * Health check endpoint - use this to verify the server is running
 */
app.get("/api/health", (req, res) => {
  res.json({ message: "✅ Server is running!", timestamp: new Date() });
});

/**
 * ========== SOCKET.IO CONNECTION ==========
 * This is where real-time events will be handled in Phase 5.
 * For now, we just log when a client connects.
 */
io.on("connection", (socket) => {
  console.log(`🔗 User connected: ${socket.id}`);

  // Log when user disconnects
  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

/**
 * ========== START SERVER ==========
 * Listen on the specified PORT and display a startup message
 */
server.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║     🚀 MERN Chat Server Started Successfully!             ║
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
  console.error("❌ Server error:", err);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n⏹️  Shutting down server...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});
