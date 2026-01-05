import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MicOff } from '@mui/icons-material';
import '../styles/glassmorphism.css';

const SpeechRecognitionComponent = ({ onTranscript, language = 'en-US' }) => {
  const [isListening, setIsListening] = useState(false);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  useEffect(() => {
    if (transcript && onTranscript) {
      onTranscript(transcript);
    }
  }, [transcript, onTranscript]);
  
  const handleListen = () => {
    if (!isListening) {
      SpeechRecognition.startListening({ 
        continuous: true,
        language: getSpeechRecognitionLang(language)
      });
      setIsListening(true);
    } else {
      SpeechRecognition.stopListening();
      setIsListening(false);
    }
  };
  
  const getSpeechRecognitionLang = (lang) => {
    const langMap = {
      'en': 'en-US',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'de': 'de-DE',
      'zh': 'zh-CN',
      'ar': 'ar-SA',
      'hi': 'hi-IN',
      'pt': 'pt-BR'
    };
    return langMap[lang] || 'en-US';
  };
  
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-red-500 text-sm">
        Your browser doesn't support speech recognition.
      </div>
    );
  }
  
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleListen}
        className={`glass-button p-3 rounded-full ${listening ? 'recording' : ''}`}
        style={{
          background: listening 
            ? 'linear-gradient(135deg, #ff416c, #ff4b2b)' 
            : 'linear-gradient(135deg, rgba(106, 17, 203, 0.8), rgba(37, 117, 252, 0.8))'
        }}
      >
        {listening ? (
          <MicOff className="text-white" />
        ) : (
          <Mic className="text-white" />
        )}
      </button>
      
      {listening && (
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-white text-sm">Listening...</span>
        </div>
      )}
    </div>
  );
};

export default SpeechRecognitionComponent;