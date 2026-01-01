import { useState } from "react";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function register() {
    const res = await fetch("http://localhost:5000/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return alert(data.error);
    alert("Registered successfully!");
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={register}>Register</button>
    </div>
  );
}
