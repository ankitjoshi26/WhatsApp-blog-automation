import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./style.css";

const API = "http://localhost:5000/api";

function App() {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/subscribers/subscribe`, form);
      setMessage(res.data.message);
      setForm({ name: "", phone: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Request failed");
    }
  };

  return <main>
    <h1>WhatsApp Blog Notifications</h1>
    <p>Subscribe to receive new blog links on WhatsApp.</p>
    <form onSubmit={submit}>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
      <input placeholder="Phone e.g. 919876543210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
      <label><input type="checkbox" required /> I agree to receive blog notifications on WhatsApp.</label>
      <button>Subscribe</button>
    </form>
    {message && <p>{message}</p>}
  </main>;
}

createRoot(document.getElementById("root")).render(<App />);
