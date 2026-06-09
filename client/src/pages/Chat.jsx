import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000");

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [room, setRoom] = useState("general");
  const [joined, setJoined] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const bottomRef = useRef();

  useEffect(() => {
    socket.emit("joinRoom", { room, username: user.username });
    setJoined(true);

    socket.on("receiveMessage", (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on("userJoined", ({ message }) => {
      setMessages(prev => [...prev, { id: Date.now(), content: message, sender: "System", timestamp: new Date() }]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userJoined");
    };
  }, [room]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("sendMessage", { room, message: input, username: user.username });
    setInput("");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Chat — {room}</h2>
        <div>
          <span>{user.username}</span>
          <button onClick={handleLogout} style={{ marginLeft: 10, padding: "5px 10px" }}>Logout</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        {["general", "tech", "random"].map(r => (
          <button key={r} onClick={() => { setRoom(r); setMessages([]); }}
            style={{ padding: "5px 15px", background: room === r ? "#4CAF50" : "#eee", color: room === r ? "white" : "black", border: "none", cursor: "pointer", borderRadius: 4 }}>
            #{r}
          </button>
        ))}
      </div>

      <div style={{ border: "1px solid #ddd", height: 400, overflowY: "auto", padding: 10, marginBottom: 10, borderRadius: 4 }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ marginBottom: 8 }}>
            <strong>{msg.sender}: </strong>
            <span>{msg.content}</span>
            <span style={{ fontSize: 11, color: "#999", marginLeft: 8 }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 10, border: "1px solid #ddd", borderRadius: 4 }} />
        <button onClick={sendMessage}
          style={{ padding: "10px 20px", background: "#4CAF50", color: "white", border: "none", cursor: "pointer", borderRadius: 4 }}>
          Send
        </button>
      </div>
    </div>
  );
}
