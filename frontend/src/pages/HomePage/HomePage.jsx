// pages/HomePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './HomePage.css';

const moods = [
  { emoji: '😊', label: 'Great', labelSw: 'Nzuri', color: '#4CAF50' },
  { emoji: '🙂', label: 'Good', labelSw: 'Sawa', color: '#8BC34A' },
  { emoji: '😐', label: 'Okay', labelSw: 'Uko sawa', color: '#FFC107' },
  { emoji: '😔', label: 'Low', labelSw: 'Chini', color: '#FF9800' },
  { emoji: '😢', label: 'Struggling', labelSw: 'Kuhangaika', color: '#F44336' }
];

function HomePage({ onAuthClick }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [showQuote, setShowQuote] = useState(false);
  const { language } = useLanguage();

  const features = [
    { 
      icon: 'fas fa-comment-dots', 
      title: language === 'english' ? 'AI Chat Support' : 'Msaada wa AI',
      desc: language === 'english' ? 'Talk about school, family, or anything on your mind' : 'Ongea kuhusu shule, familia, au chochote kichwani mwako',
      path: '/talk', 
      color: '#6366f1' 
    },
    { 
      icon: 'fas fa-wind', 
      title: language === 'english' ? 'Guided Breathing' : 'Mwongozo wa Kupumua',
      desc: language === 'english' ? '4-7-8 technique to calm your mind' : 'Mbinu ya 4-7-8 kutuliza akili yako',
      path: '/breathe', 
      color: '#06b6d4' 
    },
    { 
      icon: 'fas fa-book', 
      title: language === 'english' ? 'Mental Health Resources' : 'Nyenzo za Afya ya Akili',
      desc: language === 'english' ? 'Free & Pro tools for your wellbeing' : 'Zana za Bure na za Kulipwa kwa afya yako',
      path: '/resources', 
      color: '#ec4899' 
    }
  ];

  const handleContinue = () => {
    setShowQuote(true);
    setTimeout(() => setShowQuote(false), 5000);
  };

  return (
    <div className="page home-page">
      <div className="hero-section">
        <h1 className="glass-title">
          {language === 'english' ? 'Welcome to Unimind' : 'Karibu Unimind'}
        </h1>
        <p className="hero-subtitle">
          {language === 'english' 
            ? 'Your AI-powered mental health companion for university life'
            : 'Mshirika wako wa afya ya akili unaotumia AI kwa maisha ya chuo'}
        </p>
      </div>

      {/* Mood Check-in Card */}
      <div className="glass-card mood-card">
        <h2>
          <i className="fas fa-smile-wink"></i>
          {language === 'english' ? 'How are you feeling right now?' : 'Unajisikiaje sasa hivi?'}
        </h2>
        <p className="mood-subtitle">
          {language === 'english' ? 'Select your mood to continue' : 'Chagua hisia yako kuendelea'}
        </p>
        <div className="mood-grid">
          {moods.map(mood => (
            <button
              key={mood.label}
              className={`mood-btn ${selectedMood?.label === mood.label ? 'selected' : ''}`}
              onClick={() => setSelectedMood(mood)}
              style={{ '--mood-color': mood.color }}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-label">{language === 'english' ? mood.label : mood.labelSw}</span>
            </button>
          ))}
        </div>
        <button
          className={`continue-btn ${selectedMood ? 'active' : ''}`}
          disabled={!selectedMood}
          onClick={handleContinue}
        >
          {selectedMood 
            ? (language === 'english' ? `Continue as ${selectedMood.label}` : `Endelea kama ${selectedMood.labelSw}`)
            : (language === 'english' ? 'Pick a feeling first' : 'Chagua hisia kwanza')}
          <i className="fas fa-arrow-right"></i>
        </button>
        {showQuote && (
          <div className="quote-animation">
            <i className="fas fa-heart"></i>
            <p>
              {language === 'english' 
                ? "You're not alone. Let's work through this together."
                : 'Huko peke yako. Tufanye kazi pamoja kutatua hili.'}
            </p>
          </div>
        )}
      </div>

      {/* Feature Cards */}
      <div className="features-section">
        <h2 className="section-title">
          {language === 'english' ? 'Explore tools for your wellbeing' : 'Chunguza zana za afya yako'}
        </h2>
        <div className="features-grid">
          {features.map(feature => (
            <Link to={feature.path} key={feature.title} className="feature-card-link">
              <div className="glass-card feature-card" style={{ borderTopColor: feature.color }}>
                <div className="feature-icon" style={{ backgroundColor: `${feature.color}20`, color: feature.color }}>
                  <i className={feature.icon}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
                <span className="feature-arrow">
                  <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Guest Mode Option */}
      <div className="guest-mode-card glass-card">
        <p>
          <i className="fas fa-user-friends"></i>
          {language === 'english' ? 'Prefer to stay anonymous?' : 'Unapendelea kubaki bila kujulikana?'}
        </p>
        <button onClick={onAuthClick} className="guest-btn">
          <i className="fas fa-door-open"></i>
          {language === 'english' ? 'Continue as Guest (No history saved)' : 'Endelea kama Mgeni (Historia haihifadhiwi)'}
        </button>
      </div>
    </div>
  );
}

export default HomePage;