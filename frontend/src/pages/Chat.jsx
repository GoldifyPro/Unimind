import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Psychology, 
  Logout, 
  Settings, 
  Help, 
  Emergency,
  Menu,
  Close
} from '@mui/icons-material';
import ChatInterface from '../components/ChatInterface.jsx';
import LanguageSelector from '../components/LanguageSelector.jsx';
import EmergencyHelp from '../components/EmergencyHelp.jsx';
import Resources from '../components/ Resources.jsx';
import '../styles/glassmorphism.css';

const Chat = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [userName, setUserName] = useState('Student');
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
    
    // Get user info (in real app, from API)
    const storedName = localStorage.getItem('userName') || 'Student';
    setUserName(storedName);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    navigate('/');
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />;
      case 'emergency':
        return <EmergencyHelp />;
      case 'resources':
        return <Resources />;
      case 'settings':
        return (
          <div className="glass-card-light p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
            <p className="text-gray-300">Settings page coming soon...</p>
          </div>
        );
      default:
        return <ChatInterface />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 glass-button p-2 rounded-xl"
      >
        {sidebarOpen ? <Close /> : <Menu />}
      </button>
      
      {/* Sidebar */}
      <div className={`
        fixed md:relative inset-y-0 left-0 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 
        w-64 md:w-80 z-40
      `}>
        <div className="h-full glass-nav flex flex-col">
          {/* Logo and User Info */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
                <Psychology className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Unimind</h1>
                <p className="text-gray-300 text-sm">Mental Health Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {userName.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-white font-medium">{userName}</h3>
                <p className="text-gray-300 text-sm">University Student</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 p-4 space-y-2">
            <button
              onClick={() => {
                setActiveTab('chat');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                activeTab === 'chat' 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <Psychology />
              <span>AI Chat</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('emergency');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                activeTab === 'emergency' 
                  ? 'bg-red-500/20 text-white' 
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <Emergency />
              <span>Emergency Help</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('resources');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                activeTab === 'resources' 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <Help />
              <span>Resources</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('settings');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                activeTab === 'settings' 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <Settings />
              <span>Settings</span>
            </button>
          </div>
          
          {/* Bottom Actions */}
          <div className="p-4 border-t border-white/10 space-y-3">
            <LanguageSelector />
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 glass-button-outline py-2"
            >
              <Logout />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {activeTab === 'chat' && 'AI Chat Assistant'}
                {activeTab === 'emergency' && 'Emergency Help'}
                {activeTab === 'resources' && 'Resources'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
              <p className="text-gray-300">
                {activeTab === 'chat' && 'Talk to your AI mental health assistant'}
                {activeTab === 'emergency' && 'Immediate help and crisis support'}
                {activeTab === 'resources' && 'Helpful articles and contacts'}
                {activeTab === 'settings' && 'Configure your preferences'}
              </p>
            </div>
            
            {/* Status Indicator */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300">AI Online</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="h-[calc(100vh-180px)] md:h-[calc(100vh-200px)]">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;