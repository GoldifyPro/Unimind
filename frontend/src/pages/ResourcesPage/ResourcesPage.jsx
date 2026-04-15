// pages/ResourcesPage/ResourcesPage.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './ResourcesPage.css';

function ResourcesPage({ onEmergency }) {
  const { language } = useLanguage();

  const resources = [
    { 
      title: language === 'english' ? 'University Counseling' : 'Ushauri wa Chuo Kikuu',
      desc: language === 'english' ? 'Free confidential sessions with campus therapists' : 'Vipindi vya bure vya siri na wataalamu wa chuo',
      type: 'free', 
      icon: 'fas fa-graduation-cap', 
      action: 'call', 
      number: '+1234567890',
      hotline: false
    },
    { 
      title: language === 'english' ? 'National Crisis Helpline' : 'Njia ya Dharura ya Kitaifa',
      desc: language === 'english' ? '24/7 support for mental health emergencies' : 'Msaada wa saa 24/7 kwa dharura za afya ya akili',
      type: 'free', 
      icon: 'fas fa-phone-alt', 
      action: 'call', 
      number: '988',
      hotline: true
    },
    { 
      title: language === 'english' ? 'Student Support Groups' : 'Vikundi vya Msaada vya Wanafunzi',
      desc: language === 'english' ? 'Peer-led support circles every Wednesday' : 'Vikundi vya msaada vya wenzao kila Jumatano',
      type: 'free', 
      icon: 'fas fa-users', 
      action: 'info',
      hotline: false
    },
    { 
      title: language === 'english' ? 'Mindfulness Premium' : 'Kuzingatia Akili Premium',
      desc: language === 'english' ? 'Guided meditations & sleep stories' : 'Tafakari za kuongozwa & hadithi za kulala',
      type: 'pro', 
      icon: 'fas fa-spa', 
      action: 'info',
      badge: '⭐ PRO',
      hotline: false
    },
    { 
      title: language === 'english' ? 'Therapy Matching' : 'Ulinganifu wa Tiba',
      desc: language === 'english' ? 'Find the right therapist for you' : 'Tafuta mtaalamu sahihi kwako',
      type: 'pro', 
      icon: 'fas fa-handshake', 
      action: 'info',
      badge: '⭐ PRO',
      hotline: false
    },
    { 
      title: language === 'english' ? 'Emergency Support' : 'Msaada wa Dharura',
      desc: language === 'english' ? 'Immediate help - crisis resources' : 'Msaada wa haraka - nyenzo za dharura',
      type: 'free', 
      icon: 'fas fa-exclamation-triangle', 
      action: 'emergency',
      hotline: true
    }
  ];

  const handleResourceClick = (resource) => {
    if (resource.action === 'call') {
      window.location.href = `tel:${resource.number}`;
    } else if (resource.action === 'emergency') {
      onEmergency();
    } else {
      alert(language === 'english' 
        ? `More info about ${resource.title} coming soon!`
        : `Taarifa zaidi kuhusu ${resource.title} zitakuja hivi karibuni!`);
    }
  };

  return (
    <div className="page resources-page">
      <div className="resources-header">
        <h1 className="glass-title">
          <i className="fas fa-book-open"></i>
          {language === 'english' ? 'Mental Health Resources' : 'Nyenzo za Afya ya Akili'}
        </h1>
        <p>
          {language === 'english' 
            ? 'Curated tools and support for your wellbeing journey'
            : 'Zana zilizochaguliwa na msaada kwa safari yako ya afya'}
        </p>
      </div>

      <div className="resources-grid">
        {resources.map((resource, idx) => (
          <div 
            key={idx} 
            className={`glass-card resource-card ${resource.type} ${resource.hotline ? 'hotline' : ''}`}
            onClick={() => handleResourceClick(resource)}
          >
            <div className="resource-icon">
              <i className={resource.icon}></i>
            </div>
            <div className="resource-content">
              <h3>{resource.title}</h3>
              <p>{resource.desc}</p>
              {resource.badge && <span className="pro-badge">{resource.badge}</span>}
              <div className="resource-action">
                {resource.action === 'call' && (
                  <><i className="fas fa-phone"></i> {language === 'english' ? 'Tap to Call' : 'Bonyeza Kupiga'}</>
                )}
                {resource.action === 'emergency' && (
                  <><i className="fas fa-exclamation-circle"></i> {language === 'english' ? 'Get Immediate Help' : 'Pata Msaada wa Haraka'}</>
                )}
                {resource.action === 'info' && (
                  <><i className="fas fa-info-circle"></i> {language === 'english' ? 'Learn More →' : 'Jifunze Zaidi →'}</>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="disclaimer-card glass-card">
        <p>
          <i className="fas fa-shield-alt"></i>
          {language === 'english' 
            ? '⚠️ Remember: These resources are here to support you. If you\'re in immediate danger, please call emergency services (911) or go to your nearest hospital.'
            : '⚠️ Kumbuka: Nyenzo hizi ziko hapa kukusaidia. Ikiwa uko katika hatari ya haraka, tafadhali piga huduma za dharura (911) au nenda kwenye hospitali iliyo karibu nawe.'}
        </p>
      </div>
    </div>
  );
}

export default ResourcesPage;