// pages/TalkPage/TalkPage.jsx (using the hook)
import React from 'react';
import { useChat } from '../../hooks/useChat.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './TalkPage.css';

const topics = ['School', 'Family', 'Social', 'Life', 'Stress', 'Sleep'];

function TalkPage({ onEmergency }) {
  const { language } = useLanguage();
  const {
    messages,
    inputText,
    isThinking,
    isRecording,
    selectedTopic,
    messagesEndRef,
    setInputText,
    handleSendMessage,
    handleVoiceInput,
    handleKeyPress,
    handleTopicClick
  } = useChat(onEmergency);

  return (
    <div className="page talk-page">
      <div className="chat-container glass-card">
        <div className="chat-header">
          <h2>
            <i className="fas fa-comment-dots"></i>
            {language === 'english' ? 'Talk with Unimind' : 'Ongea na Unimind'}
          </h2>
          <p>
            {language === 'english' 
              ? 'Your safe space to share anything' 
              : 'Nafasi yako salama kushiriki chochote'}
          </p>
        </div>

        {/* Topic Pills */}
        <div className="topics-container">
          {topics.map(topic => (
            <button
              key={topic}
              className={`topic-pill ${selectedTopic === topic ? 'active' : ''}`}
              onClick={() => handleTopicClick(topic)}
            >
              <i className={`fas fa-${
                topic === 'School' ? 'book' : 
                topic === 'Family' ? 'home' : 
                topic === 'Social' ? 'users' : 
                topic === 'Life' ? 'heart' : 
                topic === 'Stress' ? 'brain' : 'moon'
              }`}></i>
              {topic}
            </button>
          ))}
        </div>

        {/* Messages Area */}
        <div className="messages-area">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
              <div className="message-bubble">
                {msg.sender !== 'user' && (
                  <div className="avatar bot-avatar">
                    <i className="fas fa-robot"></i>
                  </div>
                )}
                <div className="message-text">
                  <p>{msg.text}</p>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
                {msg.sender === 'user' && (
                  <div className="avatar user-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="message bot typing">
              <div className="message-bubble">
                <div className="avatar bot-avatar">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area with Voice */}
        <div className="chat-input-area">
          <button 
            className={`voice-btn ${isRecording ? 'recording' : ''}`}
            onClick={handleVoiceInput}
          >
            <i className={`fas ${isRecording ? 'fa-stop' : 'fa-microphone'}`}></i>
          </button>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={language === 'english' ? 'Type your thoughts here...' : 'Andika mawazo yako hapa...'}
            className="chat-input"
            rows="1"
          />
          <button onClick={handleSendMessage} className="send-btn" disabled={!inputText.trim()}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="chat-disclaimer">
          <i className="fas fa-shield-alt"></i>
          <p>
            {language === 'english'
              ? 'Unimind is a supportive tool, not a replacement for professional help.'
              : 'Unimind ni zana ya usaidizi, sio mbadala wa msaada wa kitaalam.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TalkPage;