import React from 'react';
import './FeatureCard.css';

const FeatureCard = ({ title, description, icon, delay }) => {
  return (
    <div
      className="feature-card fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="feature-icon">
        <i className={`fas ${icon}`}></i>
      </div>

      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

export default FeatureCard;
