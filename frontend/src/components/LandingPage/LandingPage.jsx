import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from '../FeatureCard/FeatureCard';
import './LandingPage.css';
import { useLanguage } from '../../context/LanguageContext.jsx';

const LandingPage = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  
  // Content based on language
  const content = {
    english: {
      title: "Your AI-powered mental health companion designed specifically for university students.",
      subtitle: "Share your concerns, and let's work through them together.",
      cards: [
        {
          title: "24/7 Support",
          description: "Chat anytime, anywhere",
          icon: "fa-clock",
          color: "#4361ee"
        },
        {
          title: "Multilingual",
          description: "Support in English & Swahili",
          icon: "fa-language",
          color: "#4cc9f0"
        },
        {
          title: "Voice Input",
          description: "Speak your thoughts",
          icon: "fa-microphone",
          color: "#f72585"
        }
      ],
      startButton: "Start Conversation",
      disclaimer: "Remember: Unimind is a supportive tool, not a replacement for professional help. If you're in crisis, please contact your university counseling center or emergency services."
    },
    swahili: {
      title: "Mshirika wako wa afya ya akili unaotumia AI iliyoundwa mahsusi kwa wanafunzi wa chuo kikuu.",
      subtitle: "Shiriki mashaka yako, na tufanye kazi pamoja kuyatatua.",
      cards: [
        {
          title: "Msaada 24/7",
          description: "Chat wakati wowote, popote",
          icon: "fa-clock",
          color: "#4361ee"
        },
        {
          title: "Lugha Nyingi",
          description: "Msaada katika Kiingereza na Kiswahili",
          icon: "fa-language",
          color: "#4cc9f0"
        },
        {
          title: "Ingiza kwa Sauti",
          description: "Toa mawazo yako kwa sauti",
          icon: "fa-microphone",
          color: "#f72585"
        }
      ],
      startButton: "Anza Mazungumzo",
      disclaimer: "Kumbuka: Unimind ni zana ya usaidizi, sio mbadala wa msaada wa kitaalam. Ikiwa uko katika msukosuko, tafadhali wasiliana na kituo cha ushauri cha chuo kikuu chako au huduma za dharura."
    }
  };

  const currentContent = content[language];

  const handleStartConversation = () => {
    navigate('/chat');
  };

  return (
    <div className="landing-page">
      {/* Language Toggle */}
      <div className="language-toggle">
        <button 
          className={`lang-btn ${language === 'english' ? 'active' : ''}`}
          onClick={() => setLanguage('english')}
        >
          English
        </button>
        <button 
          className={`lang-btn ${language === 'swahili' ? 'active' : ''}`}
          onClick={() => setLanguage('swahili')}
        >
          Kiswahili
        </button>
      </div>

      <div className="landing-container">
        {/* Logo */}
        <div className="logo-container fade-in">
          <div className="mind-logo">
            <div className="mind-circle">
              <i className="fas fa-brain"></i>
            </div>
            <h1 className="logo-text">Unimind</h1>
          </div>
        </div>

        {/* Hero Text */}
        <div className="hero-section fade-in">
          <h2 className="hero-title">{currentContent.title}</h2>
          <p className="hero-subtitle">{currentContent.subtitle}</p>
        </div>

        {/* Feature Cards */}
        <div className="features-section fade-in">
          <div className="features-grid">
            {currentContent.cards.map((card, index) => (
              <FeatureCard
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                color={card.color}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="cta-section fade-in">
          <button className="btn btn-primary start-btn" onClick={handleStartConversation}>
            <i className="fas fa-comments"></i>
            {currentContent.startButton}
          </button>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer-section fade-in">
          <div className="disclaimer-box">
            <i className="fas fa-exclamation-circle"></i>
            <p>{currentContent.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;