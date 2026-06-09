import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://bubbles-fx11.onrender.com/api/auth/login", form);
      login(res.data.user, res.data.token);
      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 20 }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input placeholder="Email" value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }} />
      <input placeholder="Password" type="password" value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        style={{ display: "block", width: "100%", marginBottom: 10, padding: 8 }} />
      <button onClick={handleSubmit}
        style={{ width: "100%", padding: 10, background: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
        Login
      </button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}
