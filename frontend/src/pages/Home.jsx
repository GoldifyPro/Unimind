import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Psychology, 
  RecordVoiceOver, 
  Translate, 
  Emergency,
  School,
  Groups,
  Security,
  ArrowForward,
  PlayCircle,
  TrendingUp,
  Star,
  People,
  AccessTime,
  ChatBubble,
  SelfImprovement,
  Download,
  Instagram,
  Twitter,
  LinkedIn,
  Facebook,
  Notifications,
  Menu,
  Close
} from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import LanguageSelector from '../components/LanguageSelector';
import '../styles/glassmorphism.css';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('features');
  const [stats, setStats] = useState({
    users: 0,
    sessions: 0,
    languages: 0,
    satisfaction: 0
  });

  // Animated counter effect
  useEffect(() => {
    const targetStats = {
      users: 12500,
      sessions: 84320,
      languages: 8,
      satisfaction: 98
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = {};
    Object.keys(targetStats).forEach(key => {
      increment[key] = targetStats[key] / steps;
    });

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setStats(prev => ({
        users: Math.min(Math.floor(prev.users + increment.users), targetStats.users),
        sessions: Math.min(Math.floor(prev.sessions + increment.sessions), targetStats.sessions),
        languages: Math.min(Math.floor(prev.languages + increment.languages), targetStats.languages),
        satisfaction: Math.min(Math.floor(prev.satisfaction + increment.satisfaction), targetStats.satisfaction)
      }));

      if (currentStep >= steps) {
        clearInterval(interval);
        // Set exact values at the end
        setStats(targetStats);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Psychology />,
      title: "AI-Powered Support",
      description: "24/7 access to empathetic AI that understands student struggles",
      color: "from-purple-500 to-pink-500",
      details: [
        "Personalized conversation",
        "Mood tracking and analysis",
        "Progress monitoring"
      ]
    },
    {
      icon: <RecordVoiceOver />,
      title: "Voice Recognition",
      description: "Speak naturally in your language, get understanding responses",
      color: "from-blue-500 to-cyan-500",
      details: [
        "Real-time speech to text",
        "Multilingual voice support",
        "Emotion detection from tone"
      ]
    },
    {
      icon: <Translate />,
      title: "Multilingual",
      description: "Support in 8+ languages for international students",
      color: "from-green-500 to-emerald-500",
      details: [
        "Real-time translation",
        "Cultural context understanding",
        "Localized resources"
      ]
    },
    {
      icon: <Security />,
      title: "Privacy Focused",
      description: "End-to-end encryption and anonymous support options",
      color: "from-indigo-500 to-blue-500",
      details: [
        "No data storage",
        "Anonymous chat option",
        "University partnership secure"
      ]
    },
    {
      icon: <Groups />,
      title: "Peer Support",
      description: "Connect with fellow students in moderated group sessions",
      color: "from-orange-500 to-red-500",
      details: [
        "Anonymous group chats",
        "Moderated discussions",
        "Scheduled support groups"
      ]
    },
    {
      icon: <School />,
      title: "University Integration",
      description: "Seamless connection with campus mental health services",
      color: "from-yellow-500 to-orange-500",
      details: [
        "Direct counselor referral",
        "Campus event integration",
        "Academic support linkage"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Maria Chen",
      role: "International Student",
      university: "University of Toronto",
      text: "As someone far from home, Unimind became my safe space. The multilingual support helped me express myself freely.",
      avatar: "MC",
      rating: 5
    },
    {
      name: "David Rodriguez",
      role: "Graduate Student",
      university: "MIT",
      text: "The AI's understanding of academic stress is remarkable. It suggested strategies that actually worked for my PhD journey.",
      avatar: "DR",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Undergraduate",
      university: "Stanford University",
      text: "During finals week, Unimind was my constant companion. The voice feature made it easy to talk when typing felt hard.",
      avatar: "SJ",
      rating: 4
    }
  ];

  const universities = [
    "Stanford University",
    "MIT",
    "Harvard University",
    "University of Toronto",
    "University of Cambridge",
    "University of Sydney",
    "National University of Singapore",
    "University of Tokyo"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Navigation */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="glass-button p-2 rounded-lg md:hidden"
              >
                {sidebarOpen ? <Close /> : <Menu />}
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
                  <Psychology className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Unimind</h1>
                  <p className="text-gray-300 text-sm hidden md:block">Mental Health for Students</p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {['Features', 'How it Works', 'Testimonials', 'Resources'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.getElementById(item.toLowerCase().replace(' ', '-'));
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <button
                onClick={() => navigate('/login')}
                className="glass-button hidden md:flex items-center space-x-2 px-6 py-2"
              >
                <span>Login</span>
                <ArrowForward />
              </button>
              <button
                onClick={() => navigate('/chat')}
                className="glass-button flex items-center space-x-2 px-6 py-2"
              >
                <span>Try Now</span>
                <Psychology />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab="home"
        setActiveTab={() => {}}
      />

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left">
                <div className="inline-flex items-center space-x-2 glass-button px-4 py-2 rounded-full mb-6">
                  <TrendingUp />
                  <span className="text-sm">Trusted by 12,500+ students globally</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                  Your AI-Powered
                  <span className="text-gradient block">Mental Health</span>
                  Companion
                </h1>
                
                <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                  Unimind provides confidential, multilingual mental health support tailored specifically for university students. Available 24/7 through chat and voice.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/chat')}
                    className="glass-button px-8 py-4 text-lg flex items-center justify-center space-x-2 group"
                  >
                    <Psychology />
                    <span>Start Free Chat</span>
                    <ArrowForward className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button className="glass-button-outline px-8 py-4 text-lg flex items-center justify-center space-x-2">
                    <PlayCircle />
                    <span>Watch Demo</span>
                  </button>
                </div>
                
                <div className="mt-8 flex items-center space-x-6 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Security className="text-green-400" />
                    <span className="text-sm">100% Confidential</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AccessTime className="text-blue-400" />
                    <span className="text-sm">Available 24/7</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <School className="text-purple-400" />
                    <span className="text-sm">University Verified</span>
                  </div>
                </div>
              </div>
              
              <div className="relative animate-slide-in-right">
                <div className="glass-card-gradient p-8 rounded-3xl">
                  {/* Chat Preview */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
                        <Psychology className="text-white text-2xl" />
                      </div>
                      <div>
                        <div className="text-white font-bold">Unimind AI</div>
                        <div className="text-gray-300 text-sm">Online • Ready to help</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-end">
                        <div className="user-bubble max-w-xs">
                          <p className="p-3">I'm feeling overwhelmed with finals...</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-start">
                        <div className="bot-bubble max-w-xs">
                          <p className="p-3">I understand. Many students feel this way during finals. Would you like to try a breathing exercise?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Voice Input Preview */}
                  <div className="glass-card-light p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center recording">
                          <RecordVoiceOver className="text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">Voice Input Active</div>
                          <div className="text-gray-300 text-sm">Speak in any of 8+ languages</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full opacity-20 animate-float"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Students Helped', value: stats.users.toLocaleString(), icon: <People />, suffix: '+' },
                { label: 'Chat Sessions', value: stats.sessions.toLocaleString(), icon: <ChatBubble />, suffix: '+' },
                { label: 'Languages', value: stats.languages, icon: <Translate />, suffix: '+' },
                { label: 'Satisfaction', value: stats.satisfaction, icon: <Star />, suffix: '%' }
              ].map((stat, index) => (
                <div key={index} className="glass-card-light p-6 text-center rounded-2xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <div className="text-white text-2xl">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 glass-button px-4 py-2 rounded-full mb-4">
                <Psychology />
                <span>Why Choose Unimind</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Designed for Student Success
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We combine cutting-edge AI with deep understanding of university life
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="glass-card-gradient p-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover-lift group"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform`}>
                    <div className="text-white text-2xl">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-gray-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-gradient-to-r from-gray-900/50 to-black/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Simple steps to better mental health
              </p>
            </div>

            <div className="relative">
              {/* Timeline */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 transform -translate-y-1/2 z-0"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                {[
                  {
                    step: 1,
                    title: "Share Your Thoughts",
                    description: "Speak or type about what's on your mind. Our AI understands context and emotions.",
                    icon: <ChatBubble />
                  },
                  {
                    step: 2,
                    title: "Get Personalized Support",
                    description: "Receive AI-powered insights, coping strategies, and resources tailored to you.",
                    icon: <SelfImprovement />
                  },
                  {
                    step: 3,
                    title: "Access Professional Help",
                    description: "When needed, get connected directly to university counseling services.",
                    icon: <Emergency />
                  }
                ].map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 relative">
                      <div className="text-white text-3xl">
                        {step.icon}
                      </div>
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{step.step}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-300">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 glass-button px-4 py-2 rounded-full mb-4">
                <Star />
                <span>Student Stories</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Loved by Students Worldwide
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="glass-card-gradient p-6 rounded-2xl">
                  <div className="flex items-start mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{testimonial.avatar}</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-white font-bold">{testimonial.name}</h4>
                      <p className="text-gray-300 text-sm">{testimonial.role}</p>
                      <p className="text-purple-300 text-sm">{testimonial.university}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                  
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={i < testimonial.rating ? "text-yellow-500" : "text-gray-600"}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* University Partners */}
        <section className="py-20 bg-gradient-to-r from-gray-900/50 to-black/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Trusted by Leading Universities
              </h2>
              <p className="text-gray-300">
                Partnered with institutions worldwide to support student mental health
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {universities.map((university, index) => (
                <div
                  key={index}
                  className="glass-card-light p-6 rounded-xl text-center hover-lift"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <School className="text-white" />
                  </div>
                  <h3 className="text-white font-medium">{university}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="glass-card-gradient p-12 rounded-3xl text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Improve Your Mental Wellbeing?
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have found support, understanding, and growth through Unimind.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={() => navigate('/register')}
                  className="glass-button px-8 py-4 text-lg"
                >
                  Sign Up Free
                </button>
                
                <button
                  onClick={() => navigate('/chat')}
                  className="glass-button-outline px-8 py-4 text-lg"
                >
                  Try Demo Chat
                </button>
              </div>
              
              <div className="flex items-center justify-center space-x-8 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Security className="text-green-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Notifications className="text-blue-400" />
                  <span>University verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="text-purple-400" />
                  <span>Available on all devices</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="glass-nav border-t border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
                  <Psychology className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Unimind</h2>
              </div>
              <p className="text-gray-300 mb-6">
                AI-powered mental health support for university students worldwide.
              </p>
              <div className="flex space-x-4">
                {[Instagram, Twitter, LinkedIn, Facebook].map((Icon, index) => (
                  <button
                    key={index}
                    className="glass-button p-2 rounded-lg"
                  >
                    <Icon className="text-white" />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                {['Features', 'How it Works', 'Pricing', 'Download App'].map((item) => (
                  <li key={item}>
                    <button className="text-gray-300 hover:text-white transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                {['Blog', 'Research', 'Help Center', 'University Portal'].map((item) => (
                  <li key={item}>
                    <button className="text-gray-300 hover:text-white transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Compliance'].map((item) => (
                  <li key={item}>
                    <button className="text-gray-300 hover:text-white transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400">
              © 2024 Unimind. All rights reserved. This is not a replacement for professional medical care.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              If you're in immediate crisis, please contact emergency services or your local crisis hotline.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;