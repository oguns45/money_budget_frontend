import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserClock, FaLock } from "react-icons/fa";
import './LoginSignup.css'; 
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const apiBaseUrl = 'http://localhost:5000/api/auth/login'; // Ensure this endpoint matches your API

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiBaseUrl, { email, password });
      if (response.status === 200) {
        alert('Login successful');
        console.log("Login successful. Navigating to dashboard...");
        navigate("/dashboard");// Redirect or handle successful login here
        console.log(navigate);
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input 
            type="text" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <FaUserClock className="icon" />
        </div>
        <div className="input-box">
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <FaLock className="icon" />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="remember-forget">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forget password?</a>
        </div>   
        <button type="submit">Login</button>
        <div className="register-link">
          <p>Don't have an account? <a href="./Signup">Register</a></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
