import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import axios from 'axios';

export function useChat() {
  const { language } = useLanguage();
  const messagesEndRef = useRef(null);

  // Chat state
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [responseType, setResponseType] = useState('text');
  const [isRecording, setIsRecording] = useState(false);

  // Initial greeting
  useEffect(() => {
    const greeting =
      language === 'english'
        ? "Hello! I'm Unimind, your AI mental health companion. How are you feeling today?"
        : 'Habari! Mimi ni Unimind, mshirika wako wa afya ya akili. Unajisikiaje leo?';

    setMessages([
      {
        id: 1,
        text: greeting,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [language]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Optional: speech synthesis for voice responses
  const speakText = (text) => {
    if ('speechSynthesis' in window && responseType === 'voice') {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.lang = language === 'english' ? 'en-US' : 'sw-TZ';
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  // ========== Backend API Integration ==========
  const sendMessageToAPI = async (text) => {
    try {
      setIsThinking(true);

      // Add user message to chat immediately
      const userMessage = {
        id: Date.now(),
        text,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, userMessage]);
      setInputText('');

      // Call FastAPI backend
      const response = await axios.post('http://localhost:8000/chat', { message: text });

      // Backend returns { reply: "..." }
      const botMessage = {
        id: Date.now() + 1,
        text: response.data.reply,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMessage]);
      speakText(response.data.reply);

      setIsThinking(false);
    } catch (error) {
      console.error('API Error:', error);
      setIsThinking(false);
    }
  };


  // Handler for sending text
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    sendMessageToAPI(inputText);
  };

  // Optional: simple voice input simulation
  const handleVoiceInput = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        const recognizedText =
          language === 'english'
            ? "I've been feeling stressed about my exams lately."
            : 'Nimekuwa nikihisi msongo kuhusu mitihani yangu hivi karibuni.';
        setInputText(recognizedText);
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  // Press Enter to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    language,
    messages,
    inputText,
    isThinking,
    isRecording,
    responseType,
    messagesEndRef,
    setInputText,
    setResponseType,
    handleSendMessage,
    handleVoiceInput,
    handleKeyPress,
  };
}
