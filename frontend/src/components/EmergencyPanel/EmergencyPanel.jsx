// components/EmergencyPanel/EmergencyPanel.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './EmergencyPanel.css';

function EmergencyPanel({ onClose }) {
  const { language } = useLanguage();

  const contacts = [
    { name: language === 'english' ? 'University Counseling Center' : 'Kituo cha Ushauri cha Chuo', number: '+1234567890', desc: language === 'english' ? 'On-campus support, Mon-Fri 9am-5pm' : 'Msaada chuoni, Jumatatu-Ijumaa 9am-5pm' },
    { name: language === 'english' ? 'National Suicide Prevention Lifeline' : 'Njia ya Kitaifa ya Kuzuia Kujiua', number: '988', desc: language === 'english' ? '24/7 confidential support' : 'Msaada wa siri wa saa 24/7' },
    { name: language === 'english' ? 'Trusted Contact' : 'Mawasiliano Unayemwamini', number: '', desc: language === 'english' ? 'Add your own emergency contact' : 'Ongeza mawasiliano yako ya dharura', isCustom: true }
  ];

  const handleCall = (number) => {
    if (number) {
      window.location.href = `tel:${number}`;
    } else {
      alert(language === 'english' ? 'Please add a trusted contact number in your profile settings.' : 'Tafadhali ongeza namba ya mawasiliano unayemwamini kwenye mipangilio ya wasifu wako.');
    }
  };

  return (
    <div className="emergency-overlay">
      <div className="emergency-panel glass-card">
        <button className="emergency-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <div className="emergency-header">
          <div className="emergency-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h2>{language === 'english' ? 'Immediate Support Available' : 'Msaada wa Haraka Unapatikana'}</h2>
          <p>{language === 'english' ? 'You don\'t have to go through this alone. Reach out now.' : 'Hupaswi kupitia hii peke yako. Wasiliana sasa.'}</p>
        </div>

        <div className="emergency-contacts">
          {contacts.map((contact, idx) => (
            <button 
              key={idx} 
              className="emergency-contact-btn"
              onClick={() => handleCall(contact.number)}
            >
              <span className="contact-icon">
                <i className="fas fa-phone-alt"></i>
              </span>
              <div className="contact-info">
                <strong>{contact.name}</strong>
                <small>{contact.desc}</small>
                {contact.number && <span className="contact-number">{contact.number}</span>}
              </div>
              <span className="call-arrow">
                <i className="fas fa-arrow-right"></i>
              </span>
            </button>
          ))}
        </div>

        <div className="emergency-tips">
          <p><i className="fas fa-heart"></i> {language === 'english' ? 'While you wait for help:' : 'Unaposubiri msaada:'}</p>
          <ul>
            <li>{language === 'english' ? 'Take slow, deep breaths' : 'Pumua polepole na kwa kina'}</li>
            <li>{language === 'english' ? 'Remind yourself: "This feeling will pass"' : 'Jikumbushe: "Hisia hii itapita"'}</li>
            <li>{language === 'english' ? 'Stay where you feel safe' : 'Kaa mahali unapojisikia salama'}</li>
            <li>{language === 'english' ? 'You are valued and not alone' : 'Wewe ni muhimu na huko peke yako'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EmergencyPanel;