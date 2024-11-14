
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './ui/Login';
import Signup from './ui/Signup';

// Placeholder for authentication status
const isAuthenticated = false; // Replace with actual authentication logic

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </Router>
    );
};


export default App;

