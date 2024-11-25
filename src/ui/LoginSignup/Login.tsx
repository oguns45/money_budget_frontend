import React, { useState, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserClock, FaLock } from "react-icons/fa";
import './LoginSignup.css'; 
import { IncomeContext } from '../../context/IncomeContext';
import axios from 'axios';
import ynab from './ynab.png';
import hero from './hero-dollars.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const context = useContext(IncomeContext);
  const setCurrentUser = context?.setCurrentUser;
  const apiBaseUrl = 'http://localhost:5000/api/auth/login'; // Ensure this endpoint matches your API

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiBaseUrl, { email, password });
      if (response.status === 200) {
        const _id = response.data.data.user._id; // Adjust based on your API response structure
        // Save the user data and token to localStorage
        

         // Save userId and other user data in localStorage
         localStorage.setItem('user', JSON.stringify({ _id  }));

         // Update the context with the current user
         if (setCurrentUser) {
           setCurrentUser( _id  );
         }
 
        
        alert('Login successful');
        console.log("Login successful. Navigating to dashboard...");
        navigate('/LandingPage'); // Redirect to dashboard
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <div className="herowraper">
        <img 
          src={hero} 
          loading="eager" 
          alt="" 
          className="hero-dollars"
        />
        <img 
          className="floating-hero" 
          src={ynab} 
          alt="An illustrated version of the YNAB app on a mobile device" 
        />
      </div>
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
    </div>
  );
};

export default Login;


