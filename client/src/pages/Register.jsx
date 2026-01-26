import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      alert("Registered successfully! Please login.");
      navigate("/"); // go to login
    } catch (err) {
      alert(err.response.data.message || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required style={{ display: "block", margin: "10px auto" }} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ display: "block", margin: "10px auto" }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ display: "block", margin: "10px auto" }} />
        <button type="submit" style={{ margin: "10px auto" }}>Register</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Register;
