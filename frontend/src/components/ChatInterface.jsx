import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Psychology, Person } from '@mui/icons-material';
import SpeechRecognitionComponent from './SpeechRecognition';
import '../styles/glassmorphism.css';

const ChatInterface = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    { text: t('greeting'), isBot: true, time: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSpeechTranscript = (transcript) => {
    setInputMessage(transcript);
  };
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {
      text: inputMessage,
      isBot: false,
      time: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        "I understand how you're feeling. Many students experience similar challenges.",
        "Have you tried talking to someone about this? Sometimes sharing helps.",
        "Remember to practice self-care. Take breaks when you need them.",
        "Your university counseling center might have resources that could help.",
        "It's okay to feel this way. Progress takes time."
      ];
      
      const botMessage = {
        text: responses[Math.floor(Math.random() * responses.length)],
        isBot: true,
        time: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="glass-card p-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center">
            <Psychology className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">Unimind AI</h2>
            <p className="text-gray-300 text-sm">Online • Ready to help</p>
          </div>
        </div>
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`flex max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.isBot 
                  ? 'bg-gradient-to-br from-purple-600 to-blue-500 mr-2' 
                  : 'bg-gradient-to-br from-pink-500 to-orange-500 ml-2'
              }`}>
                {message.isBot ? (
                  <Psychology className="text-white text-sm" />
                ) : (
                  <Person className="text-white text-sm" />
                )}
              </div>
              <div className={message.isBot ? 'bot-bubble' : 'user-bubble'}>
                <p className="p-3">{message.text}</p>
                <span className="text-xs opacity-70 block text-right px-3 pb-1">
                  {message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bot-bubble">
              <div className="flex space-x-1 p-3">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="glass-card p-4">
        <div className="flex space-x-2">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('typeMessage')}
              className="glass-input w-full p-3 resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="2"
            />
          </div>
          
          <div className="flex flex-col space-y-2">
            <SpeechRecognitionComponent 
              onTranscript={handleSpeechTranscript}
              language={localStorage.getItem('language') || 'en'}
            />
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="glass-button p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;