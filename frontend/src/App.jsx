import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import ChatPage from './components/ChatPage/ChatPage.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage />} 
        />
        <Route 
          path="/chat" 
          element={<ChatPage />} 
        />
      </Routes>
    </div>
  );
}

export default App;