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
    // handleFileUpload,
    handleKeyPress,
    handleEmergencyCall,
    openEmergencyModal,
    closeEmergencyModal,
  } = useChat();

  return (
    <div className="chat-page">
      <Navbar 
        onEmergencyClick={openEmergencyModal}
      />

      {/* Emergency Modal */}
      {emergencyModal && (
        <EmergencyModal
          onEmergencyCall={handleEmergencyCall}
          onClose={closeEmergencyModal}
        />
      )}

      <div className="chat-container">
        {/* Chat Messages Area */}
        <div className="chat-messages">
          {messages.map(message => (
            <Message 
              key={message.id} 
              message={message}
            />
          ))}
          
          {/* Thinking Indicator */}
          {isThinking && (
            <div className="thinking-indicator">
              <div className="thinking-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>{language === 'english' ? 'Unimind is thinking...' : 'Unimind anafikiria...'}</p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Area */}
        <div className="chat-input-area">

          {/* Text Input */}
         {/* Text Input */}
<div className="text-input-container">
  {/* Textarea */}
  <textarea
    className="chat-textarea"
    placeholder={language === 'english' 
      ? "Type your message here..." 
      : "Andika ujumbe wako hapa..."}
    value={inputText}
    onChange={(e) => setInputText(e.target.value)}
    onKeyPress={handleKeyPress}
    rows="3"
  />

  {/* Right-side controls INSIDE input box */}
  <div className="input-right-controls">
    {/* Voice Input */}
    <button 
      className={`btn-icon ${isRecording ? 'btn-danger' : 'btn-secondary'}`}
      onClick={handleVoiceInput}
      type="button"
    >
      <i className={`fas ${isRecording ? 'fa-stop' : 'fa-microphone'}`}></i>
    </button>

    {/* Response Type Toggle */}
    <div className="response-toggle">
      <button 
        className={`toggle-btn ${responseType === 'text' ? 'active' : ''}`}
        onClick={() => setResponseType('text')}
        type="button"
        title={language === 'english' ? 'Text Response' : 'Jibu la Maandishi'}
      >
        <i className="fas fa-keyboard"></i>
      </button>

      <button 
        className={`toggle-btn ${responseType === 'voice' ? 'active' : ''}`}
        onClick={() => setResponseType('voice')}
        type="button"
        title={language === 'english' ? 'Voice Response' : 'Jibu la Sauti'}
      >
        <i className="fas fa-volume-up"></i>
      </button>
    </div>

    {/* Send Button */}
    <button 
      className="btn btn-primary send-btn"
      onClick={handleSendMessage}
      disabled={!inputText.trim()}
      type="button"
    >
      <i className="fas fa-paper-plane"></i>
    </button>
  </div>
</div>


      

          {/* Chat Disclaimer */}
          <div className="chat-disclaimer">
            <i className="fas fa-exclamation-triangle"></i>
            <p>
              {language === 'english' 
                ? "This is a support tool. For emergencies, contact professional help immediately." 
                : "Hii ni zana ya usaidizi. Kwa dharura, wasiliana na msaada wa kitaalam mara moja."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;