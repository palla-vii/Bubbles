# BUBBLES - Real-Time Chat Application using MERN

A full-stack real-time chat application built with **MERN** (MongoDB, Express, React, Node.js) + **Socket.io**.

## Features

- User registration & login with **bcrypt** password hashing
- **JWT** token-based authentication (stateless, scalable)
- Create and join private chat rooms
- Real-time messaging via **Socket.io** WebSocket
- Persistent message history (MongoDB)
- Typing indicators (live feedback when users type)
- User presence (active user count per room)
- Protected routes (unauthenticated users redirected)

## Project Structure

```
mern-chat-app/
├── server/                 # Backend (Node.js + Express)
│   ├── models/            # Mongoose schemas (User, Room, Message)
│   ├── routes/            # REST API endpoints
│   ├── middleware/        # JWT verification middleware
│   ├── socket/            # Socket.io event handlers
│   ├── index.js           # Express + Socket.io server
│   ├── package.json
│   └── .env               # Environment variables (create this)
│
└── client/                 # Frontend (React + Vite)
    ├── src/
    │   ├── pages/         # Login, Register, ChatRoom
    │   ├── components/    # MessageList, MessageInput, etc.
    │   ├── context/       # AuthContext, SocketContext
    │   ├── hooks/         # Custom hooks (useAuth, useSocket)
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## Getting Started

### Prerequisites
- **Node.js** 18+ ([download](https://nodejs.org/))
- **MongoDB Atlas** account (free tier at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))
- **Git** installed

### Setup Instructions

#### Backend Setup
```bash
cd mern-chat-app/server
npm install
```

Create a `.env` file in the `server/` folder:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-chat
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

Start the server:
```bash
npm run dev
```
Server runs on `http://localhost:5000`

#### Frontend Setup
```bash
cd mern-chat-app/client
npm install
npm run dev
```
Client runs on `http://localhost:5173`

#### Test Real-Time Messaging
Open the frontend URL in **two browser tabs** and send messages between them!

## Build Phases

Following the structured approach from the documentation:

1. **Phase 1**: Project Setup & Express Server 
2. **Phase 2**: MongoDB & Mongoose Models (Next)
3. **Phase 3**: JWT Authentication (Login/Register)
4. **Phase 4**: REST API Routes (Rooms, Messages)
5. **Phase 5**: Socket.io Real-Time Layer
6. **Phase 6**: React Frontend

## Tech Stack

### Backend
- **Node.js 20 LTS** - JavaScript runtime
- **Express.js 4.x** - HTTP server framework
- **Socket.io 4.x** - WebSocket library
- **MongoDB 7.x** - NoSQL database
- **Mongoose 8.x** - ODM/schema validation
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **CORS** - Cross-origin requests

### Frontend
- **React 18.x** - UI library
- **Vite 5.x** - Build tool & dev server
- **Socket.io-client 4.x** - WebSocket client
- **Axios 1.x** - HTTP client
- **React Context API** - Global state management

## How It Works

### Authentication Flow
1. User registers with email + password
2. Password hashed with *bcrypt* before saving to MongoDB
3. On login, server verifies password and returns JWT token
4. Token stored in browser (httpOnly cookie or localStorage)
5. Token sent with every authenticated request

### Real-Time Messaging Flow
1. User joins a room → server adds socket to that room group
2. User sends a message → saved to MongoDB
3. Server broadcasts message to all sockets in that room
4. Clients receive message in real-time and append to chat

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - Get JWT token

### Rooms
- `GET /api/rooms` - List all chat rooms
- `POST /api/rooms` - Create new room

### Messages
- `GET /api/messages/:roomId` - Get message history with pagination

## Socket Events

### Client → Server
- `join-room` - User joins a room
- `send-message` - User sends a message
- `typing` - User is typing
- `disconnect` - User leaves

### Server → Client
- `new-message` - New message received
- `user-joined` - User entered room
- `user-typing` - User is typing
- `user-left` - User disconnected

## Learning Outcomes

By building this project, you'll master:
- ✅ Real-time communication with WebSockets
- ✅ Secure authentication using JWT & bcrypt
- ✅ NoSQL database design (MongoDB + Mongoose)
- ✅ RESTful API design with Express
- ✅ React state management (Context API + useReducer)
- ✅ Building production-grade applications

## 🤝 Contributing

This is an internship portfolio project. Feel free to fork and extend with features like:
- File sharing/image uploads
- User profiles & avatars
- Direct messaging (1-on-1)
- Message reactions & emojis
- Read receipts
- Voice/video calling

## License

MIT License - Feel free to use this for your portfolio!
