// pages/BreathePage/BreathePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './BreathePage.css';

function BreathePage() {
  const [phase, setPhase] = useState('ready');
  const [cycleCount, setCycleCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('');
  const intervalRef = useRef(null);
  const { language } = useLanguage();

  const phases = {
    inhale: { duration: 4, text: language === 'english' ? 'Breathe In' : 'Vuta Pumzi', next: 'hold' },
    hold: { duration: 7, text: language === 'english' ? 'Hold' : 'Shikilia', next: 'exhale' },
    exhale: { duration: 8, text: language === 'english' ? 'Breathe Out' : 'Toa Pumzi', next: 'inhale' }
  };

  useEffect(() => {
    if (isActive) {
      if (phase === 'ready') {
        setPhase('inhale');
        setTimer(phases.inhale.duration);
      }
      
      intervalRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            const currentPhase = phases[phase];
            if (currentPhase) {
              const nextPhase = currentPhase.next;
              if (nextPhase === 'inhale') {
                const newCycle = cycleCount + 1;
                setCycleCount(newCycle);
                if (newCycle >= 4) {
                  setIsActive(false);
                  setPhase('ready');
                  setMessage(language === 'english' 
                    ? '✨ Great job! You completed 4 cycles of 4-7-8 breathing. ✨'
                    : '✨ Umefanya vizuri! Umekamilisha mizunguko 4 ya kupumua 4-7-8. ✨');
                  clearInterval(intervalRef.current);
                  return 0;
                }
              }
              setPhase(nextPhase);
              return phases[nextPhase].duration;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, phase, cycleCount]);

  const startBreathing = () => {
    setCycleCount(0);
    setPhase('ready');
    setMessage('');
    setIsActive(true);
  };

  const stopBreathing = () => {
    setIsActive(false);
    setPhase('ready');
    setMessage(language === 'english' 
      ? 'Breathing session stopped. You can start again anytime.'
      : 'Kipindi cha kupumua kimekoma. Unaweza kuanza tena wakati wowote.');
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const getOrbSize = () => {
    if (!isActive) return 150;
    switch(phase) {
      case 'inhale': return 180 + (4 - timer) * 10;
      case 'hold': return 220;
      case 'exhale': return 220 - (8 - timer) * 12;
      default: return 150;
    }
  };

  const getPhaseColor = () => {
    switch(phase) {
      case 'inhale': return '#4CAF50';
      case 'hold': return '#FFC107';
      case 'exhale': return '#2196F3';
      default: return '#6366f1';
    }
  };

  return (
    <div className="page breathe-page">
      <div className="glass-card breathe-container">
        <h2>
          <i className="fas fa-wind"></i>
          {language === 'english' ? '4-7-8 Breathing Exercise' : 'Zoezi la Kupumua 4-7-8'}
        </h2>
        <p className="breathe-subtitle">
          {language === 'english' 
            ? 'Inhale for 4 seconds • Hold for 7 • Exhale for 8'
            : 'Vuta kwa sekunde 4 • Shikilia kwa 7 • Toa kwa 8'}
        </p>
        
        <div className="orb-container">
          <div 
            className="breathing-orb"
            style={{
              width: getOrbSize(),
              height: getOrbSize(),
              backgroundColor: getPhaseColor(),
              boxShadow: `0 0 40px ${getPhaseColor()}80`
            }}
          >
            {isActive && (
              <div className="phase-text">
                <span>{phases[phase]?.text || (language === 'english' ? 'Ready' : 'Tayari')}</span>
                <span className="timer-count">{timer}s</span>
              </div>
            )}
            {!isActive && cycleCount === 0 && (
              <div className="phase-text">
                {language === 'english' ? 'Ready to begin?' : 'Tayari kuanza?'}
              </div>
            )}
          </div>
        </div>

        <div className="breathing-controls">
          {!isActive ? (
            <button onClick={startBreathing} className="start-btn">
              <i className="fas fa-play"></i>
              {language === 'english' ? 'Start Breathing' : 'Anza Kupumua'}
            </button>
          ) : (
            <button onClick={stopBreathing} className="stop-btn">
              <i className="fas fa-stop"></i>
              {language === 'english' ? 'Stop Session' : 'Simamisha Kipindi'}
            </button>
          )}
        </div>

        {isActive && (
          <div className="cycle-counter">
            {language === 'english' ? 'Cycle' : 'Mzunguko'} {cycleCount + 1} {language === 'english' ? 'of' : 'kati ya'} 4
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(cycleCount / 4) * 100}%` }}></div>
            </div>
          </div>
        )}

        {message && (
          <div className="completion-message">
            {message}
          </div>
        )}

        <div className="breathing-tips">
          <p>
            <i className="fas fa-lightbulb"></i>
            {language === 'english' 
              ? 'Tip: Find a comfortable position, relax your shoulders, and breathe naturally.'
              : 'Kidokezo: Tafuta nafasi nzuri, legeza mabega yako, na pumua kawaida.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BreathePage;