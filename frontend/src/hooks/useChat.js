import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

export function useChat() {
  const { language } = useLanguage();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [responseType, setResponseType] = useState('text');
  const [emergencyModal, setEmergencyModal] = useState(false);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);

      let botResponse;
      if (language === 'english') {
        botResponse =
          "Thank you for sharing that with me. It takes courage to open up about your feelings. Let's explore this together. Can you tell me more about what's been on your mind recently?";
      } else {
        botResponse =
          'Asante kwa kunishirikisha hilo. Inahitaji ujasiri kufungua juu ya hisia zako. Hebu tuchunguze hili pamoja. Unaweza kuniambia zaidi juu ya kile kilichokuwa kichwani mwako hivi karibuni?';
      }

      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);

      if (responseType === 'voice') {
        speakText(botResponse);
      }
    }, 2000);
  };

  const handleVoiceInput = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        const recognizedText =
          language === 'english'
            ? "I've been feeling stressed about my exams lately."
            : 'Nimekuwa nikihisi mstari kuhusu mitihani yangu hivi karibuni.';
        setInputText(recognizedText);
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
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
      alert(
        language === 'english'
          ? 'Connecting you to university counseling services...'
          : 'Tunakuunganisha na huduma za ushauri za chuo kikuu...'
      );
    } else {
      alert(
        language === 'english'
          ? 'Connecting you to emergency services...'
          : 'Tunakuunganisha na huduma za dharura...'
      );
    }
    setEmergencyModal(false);
  };

  const openEmergencyModal = () => setEmergencyModal(true);
  const closeEmergencyModal = () => setEmergencyModal(false);

  return {
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
    handleFileUpload,
    handleKeyPress,
    handleEmergencyCall,
    openEmergencyModal,
    closeEmergencyModal,
  };
}

