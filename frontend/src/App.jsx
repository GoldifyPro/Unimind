// App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import TalkPage from './pages/TalkPage/TalkPage.jsx';
import BreathePage from './pages/BreathePage/BreathePage.jsx';
import ResourcesPage from './pages/ResourcesPage/ResourcesPage.jsx';
import EmergencyPanel from './components/EmergencyPanel/EmergencyPanel.jsx';
import AuthModal from './components/AuthModal/AuthModal.jsx';
import { useAuth } from './context/AuthContext.jsx';
import './App.css';

function App() {
  const [showEmergency, setShowEmergency] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  const openEmergency = () => setShowEmergency(true);
  const closeEmergency = () => setShowEmergency(false);

  return (
    <div className="app">
      <Navbar 
        onEmergencyClick={openEmergency} 
        onAuthClick={() => setShowAuthModal(true)}
      />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage onAuthClick={() => setShowAuthModal(true)} />} />
          <Route path="/talk" element={<TalkPage onEmergency={openEmergency} />} />
          <Route path="/breathe" element={<BreathePage />} />
          <Route path="/resources" element={<ResourcesPage onEmergency={openEmergency} />} />
        </Routes>
      </main>

      {showEmergency && <EmergencyPanel onClose={closeEmergency} />}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      
      <button className="sos-floating-btn" onClick={openEmergency}>
        <i className="fas fa-phone-alt"></i>
        <span className="sos-text">SOS</span>
        <span className="sos-pulse"></span>
      </button>
    </div>
  );
}

export default App;