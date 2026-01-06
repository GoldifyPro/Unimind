import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import ChatPage from './components/ChatPage/ChatPage.jsx';
import './App.css';

function App() {
  const [language, setLanguage] = useState('english');
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<LandingPage language={language} setLanguage={setLanguage} />} 
          />
          <Route 
            path="/chat" 
            element={<ChatPage language={language} setLanguage={setLanguage} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;