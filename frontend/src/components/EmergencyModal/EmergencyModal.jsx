import React from 'react';
import './EmergencyModal.css';
import { useLanguage } from '../../context/LanguageContext.jsx';

const EmergencyModal = ({ onEmergencyCall, onClose }) => {
  const { language } = useLanguage();
  return (
    <div className="emergency-modal-overlay">
      <div className="emergency-modal">
        <h3>
          <i className="fas fa-phone-alt"></i>
          {language === 'english' ? 'Emergency Contact' : 'Mawasiliano ya Dharura'}
        </h3>
        <p>
          {language === 'english' 
            ? 'Please select the appropriate emergency contact:' 
            : 'Tafadhali chagua mawasiliano ya dharura yanayofaa:'}
        </p>
        <div className="emergency-options">
          <button 
            className="btn btn-secondary emergency-option"
            onClick={() => onEmergencyCall('counseling')}
          >
            <i className="fas fa-user-md"></i>
            {language === 'english' ? 'University Counseling' : 'Ushauri wa Chuo Kikuu'}
          </button>
          <button 
            className="btn btn-danger emergency-option"
            onClick={() => onEmergencyCall('emergency')}
          >
            <i className="fas fa-ambulance"></i>
            {language === 'english' ? 'Emergency Services' : 'Huduma za Dharura'}
          </button>
        </div>
        <button 
          className="btn btn-sm close-btn"
          onClick={onClose}
        >
          {language === 'english' ? 'Cancel' : 'Ghairi'}
        </button>
      </div>
    </div>
  );
};

export default EmergencyModal;