// hooks/useChat.js
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';

const crisisKeywords = ['kill myself', 'suicide', 'want to die', 'end my life', 'hurt myself', 'self harm', 'cut myself', 'kill me', 'end it'];

export function useChat(onEmergency) {
  const { language } = useLanguage();
  const { user, isGuest, saveChatHistory } = useAuth();
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [responseType, setResponseType] = useState('text');
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Initial greeting
  useEffect(() => {
    const greeting = language === 'english'
      ? "Hi there! I'm Unimind. How are you feeling today? You can talk to me about anything - school, relationships, stress, or just life in general."
      : "Habari! Mimi ni Unimind. Unajisikiaje leo? Unaweza kuzungumza nami kuhusu chochote - shule, mahusiano, msongo, au maisha kwa ujumla.";
    
    setMessages([{
      id: 1,
      text: greeting,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  }, [language]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save chat history (only for non-guest users)
  useEffect(() => {
    if (!isGuest && user && messages.length > 0) {
      saveChatHistory(messages);
    }
  }, [messages]);

  const detectCrisis = (text) => {
    const lowerText = text.toLowerCase();
    return crisisKeywords.some(keyword => lowerText.includes(keyword));
  };

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

  // Send message to FastAPI backend
  const sendMessageToAPI = async (text) => {
    if (!text.trim()) return;

    const isCrisis = detectCrisis(text);

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsThinking(true);

    // Trigger emergency panel if crisis detected
    if (isCrisis && onEmergency) {
      onEmergency();
    }

    try {
      // Call your FastAPI backend
      const response = await axios.post('http://localhost:8000/chat', { 
        message: text,
        language: language,
        isCrisis: isCrisis
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.reply || getFallbackResponse(text, isCrisis),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      speakText(response.data.reply || getFallbackResponse(text, isCrisis));
      setIsThinking(false);

    } catch (error) {
      console.error('API Error:', error);
      // Fallback response if backend is down
      const fallbackReply = getFallbackResponse(text, isCrisis);
      const botMessage = {
        id: Date.now() + 1,
        text: fallbackReply,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      speakText(fallbackReply);
      setIsThinking(false);
    }
  };

  // Fallback responses (same as before)
  const getFallbackResponse = (userMessage, isCrisis = false) => {
    if (isCrisis) {
      return language === 'english'
        ? "💙 I'm really concerned about what you just shared. Your wellbeing is the most important thing right now. Please reach out to someone who can help immediately."
        : "💙 Nina wasiwasi sana kuhusu ulichokisema. Afya yako ndiyo muhimu zaidi sasa hivi. Tafadhali wasiliana na mtu anayeweza kukusaidia mara moja.";
    }

    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('school') || lowerMsg.includes('exam')) {
      return language === 'english'
        ? "School pressure can be really tough. Would you like to talk about study strategies?"
        : "Shinikizo la shule linaweza kuwa gumu. Ungependa kuzungumza kuhusu mikakati ya kusoma?";
    }
    if (lowerMsg.includes('family') || lowerMsg.includes('parent')) {
      return language === 'english'
        ? "Family relationships can be complicated. Would you like to talk about improving communication?"
        : "Mahusiano ya kifamilia yanaweza kuwa magumu. Ungependa kuzungumza kuhusu kuboresha mawasiliano?";
    }
    if (lowerMsg.includes('friend') || lowerMsg.includes('lonely')) {
      return language === 'english'
        ? "Making friends in university can be challenging. Want to talk about building social connections?"
        : "Kupata marafiki chuoni kunaweza kuwa changamoto. Ungependa kuzungumza kuhusu kujenga uhusiano wa kijamii?";
    }
    
    return language === 'english'
      ? "Thank you for sharing that with me. Would you like to explore this topic more?"
      : "Asante kwa kunishirikisha hilo. Ungependa kuchunguza mada hii zaidi?";
  };

  // Voice input simulation (kept from your original)
  const handleVoiceInput = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate voice recognition
      setTimeout(() => {
        setIsRecording(false);
        const recognizedText = language === 'english'
          ? "I've been feeling stressed about my exams lately."
          : 'Nimekuwa nikihisi msongo kuhusu mitihani yangu hivi karibuni.';
        setInputText(recognizedText);
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    sendMessageToAPI(inputText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    const topicMessages = {
      School: language === 'english' ? "I've been feeling really anxious about my grades and deadlines..." : "Nimekuwa nikihisi wasiwasi kuhusu alama zangu...",
      Family: language === 'english' ? "Things at home have been tense lately." : "Mambo nyumbani yamekuwa makali hivi karibuni.",
      Social: language === 'english' ? "I find it hard to make friends on campus." : "Naona vigumu kupata marafiki chuoni.",
      Life: language === 'english' ? "Just feeling lost about the future." : "Nahisi kupotea kuhusu maisha ya baadaye.",
      Stress: language === 'english' ? "Everything feels overwhelming right now." : "Kila kitu kinanilemea sasa hivi.",
      Sleep: language === 'english' ? "I can't sleep at night. My mind races." : "Siwezi kulala usiku. Akili yangu inakimbia."
    };
    setInputText(topicMessages[topic] || `Let's talk about ${topic}`);
  };

  return {
    language,
    messages,
    inputText,
    isThinking,
    isRecording,
    responseType,
    selectedTopic,
    messagesEndRef,
    setInputText,
    setResponseType,
    handleSendMessage,
    handleVoiceInput,
    handleKeyPress,
    handleTopicClick,
    sendMessageToAPI
  };
}