import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("Login successful!");
        localStorage.setItem("token", data.token); // Save token for later
        // Navigate to protected page or homepage (example)
        navigate("/homePage");
      } else {
        setMessage(data.message || "Invalid credentials");
      }
    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <br />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Forgot your password? <Link to="/forgot-password">Reset Password</Link>
      </p>
      <p>
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginPage;
