import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import Message from '../Message/Message.jsx';
import EmergencyModal from '../EmergencyModal/EmergencyModal.jsx';
import './ChatPage.css';

const ChatPage = ({ language, setLanguage }) => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [responseType, setResponseType] = useState('text'); // 'text' or 'voice'
  const [emergencyModal, setEmergencyModal] = useState(false);

  // Initial greeting based on language
  useEffect(() => {
    const greeting = language === 'english' 
      ? "Hello! I'm Unimind, your AI mental health companion. How are you feeling today?"
      : "Habari! Mimi ni Unimind, mshirika wako wa afya ya akili. Unajisikiaje leo?";
    
    setMessages([
      {
        id: 1,
        text: greeting,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [language]);

  // Scroll to bottom when new message is added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsThinking(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      setIsThinking(false);
      
      // Sample responses based on language
      let botResponse;
      if (language === 'english') {
        botResponse = "Thank you for sharing that with me. It takes courage to open up about your feelings. Let's explore this together. Can you tell me more about what's been on your mind recently?";
      } else {
        botResponse = "Asante kwa kunishirikisha hilo. Inahitaji ujasiri kufungua juu ya hisia zako. Hebu tuchunguze hili pamoja. Unaweza kuniambia zaidi juu ya kile kilichokuwa kichwani mwako hivi karibuni?";
      }

      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      
      // If response type is voice, trigger text-to-speech
      if (responseType === 'voice') {
        speakText(botResponse);
      }
    }, 2000);
  };

  const handleVoiceInput = () => {
    if (!isRecording) {
      // Start recording simulation
      setIsRecording(true);
      
      // Simulate voice recognition
      setTimeout(() => {
        setIsRecording(false);
        const recognizedText = language === 'english' 
          ? "I've been feeling stressed about my exams lately." 
          : "Nimekuwa nikihisi mstari kuhusu mitihani yangu hivi karibuni.";
        setInputText(recognizedText);
      }, 3000);
    } else {
      // Stop recording
      setIsRecording(false);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.lang = language === 'english' ? 'en-US' : 'sw-TZ';
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // In a real app, you would send this to your AI
        console.log('File uploaded:', file.name);
        alert(`${language === 'english' ? 'File uploaded: ' : 'Faili imepakiwa: '}${file.name}`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmergencyCall = (type) => {
    if (type === 'counseling') {
      alert(language === 'english' 
        ? 'Connecting you to university counseling services...' 
        : 'Tunakuunganisha na huduma za ushauri za chuo kikuu...');
    } else {
      alert(language === 'english' 
        ? 'Connecting you to emergency services...' 
        : 'Tunakuunganisha na huduma za dharura...');
    }
    setEmergencyModal(false);
  };

  return (
    <div className="chat-page">
      <Navbar 
        language={language} 
        setLanguage={setLanguage} 
        onEmergencyClick={() => setEmergencyModal(true)}
      />

      {/* Emergency Modal */}
      {emergencyModal && (
        <EmergencyModal
          language={language}
          onEmergencyCall={handleEmergencyCall}
          onClose={() => setEmergencyModal(false)}
        />
      )}

      <div className="chat-container">
        {/* Chat Messages Area */}
        <div className="chat-messages">
          {messages.map(message => (
            <Message 
              key={message.id} 
              message={message} 
              language={language}
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
          <div className="input-controls">
            {/* File Upload */}
            <label className="btn-icon btn-secondary file-upload-btn">
              <i className="fas fa-paperclip"></i>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>

            {/* Voice Input */}
            <button 
              className={`btn-icon ${isRecording ? 'btn-danger' : 'btn-secondary'}`}
              onClick={handleVoiceInput}
            >
              <i className={`fas ${isRecording ? 'fa-stop' : 'fa-microphone'}`}></i>
            </button>

            {/* Response Type Toggle */}
            <div className="response-toggle">
              <button 
                className={`toggle-btn ${responseType === 'text' ? 'active' : ''}`}
                onClick={() => setResponseType('text')}
                title={language === 'english' ? 'Text Response' : 'Jibu la Maandishi'}
              >
                <i className="fas fa-keyboard"></i>
              </button>
              <button 
                className={`toggle-btn ${responseType === 'voice' ? 'active' : ''}`}
                onClick={() => setResponseType('voice')}
                title={language === 'english' ? 'Voice Response' : 'Jibu la Sauti'}
              >
                <i className="fas fa-volume-up"></i>
              </button>
            </div>
          </div>

          {/* Text Input */}
          <div className="text-input-container">
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
            <button 
              className="btn btn-primary send-btn"
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>

          {/* Input Footer */}
          <div className="input-footer">
            <div className="recording-indicator" style={{ opacity: isRecording ? 1 : 0 }}>
              <span className="recording-pulse"></span>
              <span>{language === 'english' ? 'Listening...' : 'Inasikiliza...'}</span>
            </div>
            <div className="response-type-indicator">
              {language === 'english' ? 'Response type: ' : 'Aina ya majibu: '}
              <span className="response-type">
                {responseType === 'text' 
                  ? (language === 'english' ? 'Text' : 'Maandishi') 
                  : (language === 'english' ? 'Voice' : 'Sauti')}
              </span>
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