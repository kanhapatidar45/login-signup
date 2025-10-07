import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignupPage() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("Signup successful! You can now login.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <br />
        <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <br />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <br />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <br />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignupPage;
