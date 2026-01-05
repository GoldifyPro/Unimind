import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Psychology, 
  ChatBubble,
  Emergency,
  School,
  LibraryBooks,
  Settings,
  Person,
  Logout,
  History,
  Favorite,
  Mood,
  Analytics,
  Notifications,
  LightMode,
  DarkMode,
  Translate,
  VolumeUp,
  Menu,
  Close,
  Home,
  Info,
  Support
} from '@mui/icons-material';
import LanguageSelector from './LanguageSelector';
import '../styles/glassmorphism.css';

const Sidebar = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);

  const userData = {
    name: 'Alex Johnson',
    university: 'Stanford University',
    avatar: 'AJ',
    status: 'Online',
    points: 1250,
    streak: 7
  };

  const mainMenu = [
    { id: 'home', label: 'Home', icon: <Home />, color: 'from-blue-500 to-cyan-500' },
    { id: 'chat', label: 'AI Chat', icon: <ChatBubble />, color: 'from-purple-500 to-pink-500' },
    { id: 'emergency', label: 'Emergency', icon: <Emergency />, color: 'from-red-500 to-orange-500' },
    { id: 'resources', label: 'Resources', icon: <LibraryBooks />, color: 'from-green-500 to-emerald-500' },
    { id: 'mood', label: 'Mood Tracker', icon: <Mood />, color: 'from-yellow-500 to-orange-500' },
    { id: 'progress', label: 'Progress', icon: <Analytics />, color: 'from-indigo-500 to-blue-500' },
  ];

  const supportMenu = [
    { id: 'history', label: 'Chat History', icon: <History /> },
    { id: 'favorites', label: 'Saved Resources', icon: <Favorite /> },
    { id: 'university', label: 'University Support', icon: <School /> },
  ];

  const settingsMenu = [
    { id: 'profile', label: 'Profile Settings', icon: <Person /> },
    { id: 'notifications', label: 'Notifications', icon: <Notifications /> },
    { id: 'appearance', label: 'Appearance', icon: darkMode ? <LightMode /> : <DarkMode /> },
    { id: 'language', label: 'Language', icon: <Translate /> },
    { id: 'sound', label: 'Sound Effects', icon: <VolumeUp /> },
  ];

  const handleNavigation = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      navigate('/');
    } else if (tabId === 'chat') {
      navigate('/chat');
    }
    onClose(); // Close sidebar on mobile
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleSettingToggle = (setting) => {
    switch (setting) {
      case 'darkMode':
        setDarkMode(!darkMode);
        break;
      case 'notifications':
        setNotifications(!notifications);
        break;
      case 'sound':
        setSound(!sound);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-50
        w-80 h-full transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-full flex flex-col glass-nav">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Psychology className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Unimind</h1>
                  <p className="text-gray-300 text-sm">Mental Health Companion</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="md:hidden glass-button p-2 rounded-lg"
              >
                <Close className="text-white" />
              </button>
            </div>

            {/* User Profile */}
            <div className="glass-card-gradient p-4 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{userData.avatar}</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold">{userData.name}</h3>
                  <p className="text-gray-300 text-sm">{userData.university}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300 text-xs">{userData.status}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Psychology className="text-yellow-500 text-sm" />
                      <span className="text-gray-300 text-xs">{userData.points} pts</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Streak */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Daily Streak</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-6 rounded-sm ${i < userData.streak ? 'bg-gradient-to-b from-yellow-500 to-orange-500' : 'bg-gray-700'}`}
                      />
                    ))}
                    <span className="text-white text-sm ml-2">{userData.streak} days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 px-2">
              Main Menu
            </h3>
            {mainMenu.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border-l-4 border-purple-500'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center`}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}

            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-6 mb-3 px-2">
              Support
            </h3>
            {supportMenu.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                  activeTab === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-6 mb-3 px-2">
              Settings
            </h3>
            {settingsMenu.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="text-gray-300">{item.label}</span>
                </div>
                {item.id === 'notifications' && (
                  <button
                    onClick={() => handleSettingToggle('notifications')}
                    className={`w-12 h-6 rounded-full transition-all duration-300 ${
                      notifications ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transform transition-transform duration-300 ${
                        notifications ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                )}
                {item.id === 'appearance' && (
                  <button
                    onClick={() => handleSettingToggle('darkMode')}
                    className={`w-12 h-6 rounded-full transition-all duration-300 ${
                      darkMode ? 'bg-purple-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transform transition-transform duration-300 ${
                        darkMode ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                )}
                {item.id === 'sound' && (
                  <button
                    onClick={() => handleSettingToggle('sound')}
                    className={`w-12 h-6 rounded-full transition-all duration-300 ${
                      sound ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transform transition-transform duration-300 ${
                        sound ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                )}
                {item.id === 'language' && (
                  <LanguageSelector variant="compact" />
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Support className="text-gray-400" />
                <span className="text-gray-300 text-sm">Need help?</span>
              </div>
              <button className="text-purple-300 hover:text-purple-200 text-sm">
                Contact Support
              </button>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full glass-button-outline flex items-center justify-center space-x-2 py-3 rounded-xl"
            >
              <Logout />
              <span>Logout</span>
            </button>

            <div className="mt-4 text-center">
              <p className="text-gray-400 text-xs">
                © 2024 Unimind • v1.0.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;