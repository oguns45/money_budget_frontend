// import React from 'react';
// import './LoginSignup.css'; 
// import { FaUserClock, FaLock } from "react-icons/fa";
// import { GoCrossReference } from "react-icons/go";

// export const Signup: React.FC = () => {
//   return (
//     <div className="wrapper">
//       <form action="">
//         <h1>Signup</h1>
//         <div className="input-box">
//           <input type="text" placeholder="email" required />
//           <FaLock className="icon" />
//         </div>
//         <div className="input-box">
//           <input type="text" placeholder="Username" required />
//           <FaUserClock className="icon" />
//         </div>
//         <div className="input-box">
//           <input type="password" placeholder="Password" required />
//           <FaLock className="icon" />
//         </div> 
//         <div className="input-box">
//           <input type="text" placeholder="referal"  />
//           <GoCrossReference className="icon" />
//         </div> 
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// }

// export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserClock, FaLock } from "react-icons/fa";
import { GoCrossReference } from "react-icons/go";
import './LoginSignup.css'; 
import axios from 'axios';

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [referral, setReferral] = useState("");
  const [error, setError] = useState("");
  const apiBaseUrl = 'http://localhost:5000/api/auth/register';
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiBaseUrl, { email, username, password});
      if (response.status === 200) {
        alert('Signup successful');
        navigate("/Login"); // Redirect to Login page on success
        console.log(navigate)
      }
    } catch (err) {
      setError('Failed to sign up');
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <div className="input-box">
          <input 
            type="text" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <FaLock className="icon" />
        </div>
        <div className="input-box">
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        {/* <div className="input-box">
          <input 
            type="text" 
            placeholder="Referral" 
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
          />
          <GoCrossReference className="icon" />
        </div>  */}
        {error && <p className="error">{error}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
