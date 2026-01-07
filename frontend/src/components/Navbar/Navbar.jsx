import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useLanguage } from '../../context/LanguageContext.jsx';

const Navbar = ({ onEmergencyClick }) => {
  const navigate = useNavigate();
  const { language, setLanguage, toggleLanguage } = useLanguage();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Brand */}
        <div className="navbar-brand" onClick={handleLogoClick}>
          <div className="navbar-logo">
            <i className="fas fa-brain"></i>
          </div>
          <div className="navbar-title">
            <h1>Unimind</h1>
            <p className="navbar-subtitle">
              {language === 'english' 
                ? 'Your Mental Health Companion' 
                : 'Mshirika Wako wa Afya ya Akili'}
            </p>
          </div>
        </div>

        {/* Navbar Controls */}
        <div className="navbar-controls">
          {/* Language Toggle */}
          <div className="language-switcher">
            <button className="lang-switch-btn" onClick={toggleLanguage}>
              <i className="fas fa-globe"></i>
              <span>{language === 'english' ? 'EN' : 'SW'}</span>
              <i className="fas fa-chevron-down"></i>
            </button>
            <div className="language-dropdown">
              <div 
                className={`dropdown-item ${language === 'english' ? 'active' : ''}`}
                onClick={() => setLanguage('english')}
              >
                <span>English</span>
                <i className="fas fa-check"></i>
              </div>
              <div 
                className={`dropdown-item ${language === 'swahili' ? 'active' : ''}`}
                onClick={() => setLanguage('swahili')}
              >
                <span>Kiswahili</span>
                <i className="fas fa-check"></i>
              </div>
            </div>
          </div>

          {/* Emergency Button */}
          <button className="btn btn-danger emergency-btn" onClick={onEmergencyClick}>
            <i className="fas fa-phone-alt"></i>
            <span>
              {language === 'english' ? 'Emergency Call' : 'Simu ya Dharura'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;