import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Message from '../Message/Message.jsx';
import EmergencyModal from '../EmergencyModal/EmergencyModal.jsx';
import './ChatPage.css';
import { useChat } from '../../hooks/useChat.js';

const ChatPage = () => {
  const {
    language,
    messages,
    inputText,
    isThinking,
    isRecording,
    responseType,
    emergencyModal,
    messagesEndRef,
    setInputText,
    setResponseType,
    handleSendMessage,
    handleVoiceInput,
    handleKeyPress,
    handleEmergencyCall,
    openEmergencyModal,
    closeEmergencyModal,
  } = useChat();

  return (
    <div className="chat-page">
      <Navbar onEmergencyClick={openEmergencyModal} />

      {emergencyModal && (
        <EmergencyModal
          onEmergencyCall={handleEmergencyCall}
          onClose={closeEmergencyModal}
        />
      )}

      <div className="chat-container">
        {/* Messages */}
        <div className="chat-messages">
          <div className="chat-messages-inner">
            {messages.map(message => (
              <Message key={message.id} message={message} />
            ))}

            {isThinking && (
              <div className="thinking-indicator">
                <span></span><span></span><span></span>
                <p>
                  {language === 'english'
                    ? 'Unimind is thinking...'
                    : 'Unimind anafikiria...'}
                </p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>


        {/* Input Area */}
        <div className="chat-input-wrapper">
          <div className="chat-input-glass">
            <textarea
              className="chat-textarea"
              placeholder={
                language === 'english'
                  ? 'Type your message here...'
                  : 'Andika ujumbe wako hapa...'
              }
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              rows="2"
            />

            {/* OUTSIDE textarea – right side */}
            <div className="chat-actions">
              <button
                className={`icon-btn ${isRecording ? 'recording' : ''}`}
                onClick={handleVoiceInput}
                type="button"
              >
                <i className={`fas ${isRecording ? 'fa-stop' : 'fa-microphone'}`} />
              </button>

              <button
                className={`icon-btn ${responseType === 'voice' ? 'active' : ''}`}
                onClick={() => setResponseType(
                  responseType === 'text' ? 'voice' : 'text'
                )}
                type="button"
              >
                <i className="fas fa-volume-up" />
              </button>

              <button
                className="icon-btn send"
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                type="button"
              >
                <i className="fas fa-paper-plane" />
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="chat-disclaimer">
          <i className="fas fa-exclamation-triangle"></i>
          <p>
            {language === 'english'
              ? 'This is a support tool. For emergencies, contact professional help immediately.'
              : 'Hii ni zana ya usaidizi. Kwa dharura, wasiliana na msaada wa kitaalam mara moja.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
