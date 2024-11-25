// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { IncomeProvider, IncomeContext } from './context/IncomeContext';
import Login from './ui/LoginSignup/Login';
import Signup from './ui/LoginSignup/Login';
import LandingPage from './ui/LandingPage/LandingPage';

// Placeholder for authentication status
const isAuthenticated = false; // Replace with actual authentication logic

const App: React.FC = () => {
    return (
        <IncomeProvider>
            <Router>
                <Routes>
                    {/* Default route */}
                    <Route path="/" element={isAuthenticated ? <Navigate to="/LandingPage" /> : <Login />} />
                    
                    {/* Signup route */}
                    <Route path="/signup" element={<Signup />} />
                    
                    {/* Protected route for authenticated users */}
                    <Route 
                        path="/LandingPage" 
                        element={<LandingPage />} 
                    />
                </Routes>
        </Router>
        </IncomeProvider> 
        // </UserProvider>

        
    );
};

export default App;
