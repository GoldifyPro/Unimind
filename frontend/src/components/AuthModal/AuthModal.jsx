// components/AuthModal/AuthModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './AuthModal.css';

function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();
  const { language } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Simulate login
      login({ name: email.split('@')[0], email }, false);
    } else {
      // Simulate signup
      login({ name: name || email.split('@')[0], email }, false);
    }
    onClose();
  };

  const handleGuest = () => {
    login({ name: 'Guest', isGuest: true }, true);
    onClose();
  };

  const handleGoogle = () => {
    // Simulate Google login
    login({ name: 'Google User', email: 'user@gmail.com' }, false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="auth-header">
          <div className="auth-icon">
            <i className="fas fa-brain"></i>
          </div>
          <h2>
            {isLogin 
              ? (language === 'english' ? 'Welcome Back' : 'Karibu Tena')
              : (language === 'english' ? 'Create Account' : 'Jenga Akaunti')}
          </h2>
          <p>
            {isLogin 
              ? (language === 'english' ? 'Sign in to save your conversations' : 'Ingia ili kuhifadhi mazungumzo yako')
              : (language === 'english' ? 'Join Unimind for personalized support' : 'Jiunge na Unimind kwa msaada wa kibinafsi')}
          </p>
        </div>

        <button onClick={handleGoogle} className="google-btn">
          <i className="fab fa-google"></i>
          <span>{language === 'english' ? 'Continue with Google' : 'Endelea na Google'}</span>
        </button>

        <div className="auth-divider">
          <span>{language === 'english' ? 'or' : 'au'}</span>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder={language === 'english' ? 'Full Name' : 'Jina Kamili'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
              />
            </div>
          )}
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder={language === 'english' ? 'Email' : 'Barua pepe'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder={language === 'english' ? 'Password' : 'Nenosiri'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required={isLogin}
            />
          </div>
          <button type="submit" className="auth-submit">
            {isLogin 
              ? (language === 'english' ? 'Sign In' : 'Ingia')
              : (language === 'english' ? 'Sign Up' : 'Jisajili')}
          </button>
        </form>

        <div className="auth-footer">
          <button onClick={handleGuest} className="guest-link">
            <i className="fas fa-user-friends"></i>
            {language === 'english' ? 'Continue as Guest (No history saved)' : 'Endelea kama Mgeni (Historia haihifadhiwi)'}
          </button>
          <button onClick={() => setIsLogin(!isLogin)} className="switch-auth">
            {isLogin 
              ? (language === 'english' ? "Don't have an account? Sign Up" : 'Huna akaunti? Jisajili')
              : (language === 'english' ? 'Already have an account? Sign In' : 'Tayari una akaunti? Ingia')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;