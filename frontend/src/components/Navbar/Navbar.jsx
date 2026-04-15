// components/Navbar/Navbar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './Navbar.css';

const Navbar = ({ onEmergencyClick, onAuthClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isGuest, logout } = useAuth();
  const { language, setLanguage, toggleLanguage } = useLanguage();

  const navLinks = [
    { path: '/', name: language === 'english' ? 'Home' : 'Nyumbani', icon: 'fas fa-home' },
    { path: '/talk', name: language === 'english' ? 'Talk' : 'Ongea', icon: 'fas fa-comment-dots' },
    { path: '/breathe', name: language === 'english' ? 'Breathe' : 'Pumua', icon: 'fas fa-wind' },
    { path: '/resources', name: language === 'english' ? 'Resources' : 'Nyenzo', icon: 'fas fa-book' },
  ];

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="glass-nav">
      <div className="nav-brand" onClick={handleLogoClick}>
        <div className="brand-icon">
          <i className="fas fa-brain"></i>
        </div>
        <span className="brand-name">Unimind</span>
      </div>

      <div className="nav-links">
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            <i className={link.icon}></i>
            <span>{link.name}</span>
          </Link>
        ))}
      </div>

      <div className="nav-controls">
        {/* Language Toggle */}
        <div className="language-switcher">
          <button className="lang-btn" onClick={toggleLanguage}>
            <i className="fas fa-globe"></i>
            <span>{language === 'english' ? 'EN' : 'SW'}</span>
          </button>
        </div>

        {/* Emergency Button */}
        <button className="emergency-nav-btn" onClick={onEmergencyClick}>
          <i className="fas fa-exclamation-triangle"></i>
        </button>

        {/* Auth Section */}
        {user ? (
          <div className="user-menu">
            <div className="user-avatar">
              {isGuest ? <i className="fas fa-user-friends"></i> : <i className="fas fa-user"></i>}
            </div>
            <span className="user-name">{isGuest ? 'Guest' : user.name?.split(' ')[0]}</span>
            <button onClick={logout} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        ) : (
          <button className="auth-btn" onClick={onAuthClick}>
            <i className="fas fa-user-plus"></i>
            <span>{language === 'english' ? 'Sign In' : 'Ingia'}</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;