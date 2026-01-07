import React from 'react';
import './Message.css';
import { useLanguage } from '../../context/LanguageContext.jsx';

const Message = ({ message }) => {
  const { language } = useLanguage();
  const isUser = message.sender === 'user';
  
  return (
    <div className={`message-container ${isUser ? 'user' : 'bot'}`}>
      <div className="message-avatar">
        {isUser ? (
          <i className="fas fa-user"></i>
        ) : (
          <i className="fas fa-robot"></i>
        )}
      </div>
      <div className="message-content">
        <div className="message-header">
          <span className="message-sender">
            {isUser 
              ? (language === 'english' ? 'You' : 'Wewe') 
              : 'Unimind'}
          </span>
          <span className="message-time">{message.timestamp}</span>
        </div>
        <div className="message-text">
          {message.text}
        </div>
      </div>
    </div>
  );
};

export default Message;