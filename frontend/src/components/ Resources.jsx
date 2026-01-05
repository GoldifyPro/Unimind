import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  School,
  LibraryBooks,
  VideoLibrary,
  Article,
  Group,
  SelfImprovement,
  FitnessCenter,
  Restaurant,
  AccessTime,
  Bookmark,
  BookmarkBorder,
  Download,
  PlayArrow,
  Share,
  Search,
  FilterList,
  TrendingUp,
  Star
} from '@mui/icons-material';
import '../styles/glassmorphism.css';

const Resources = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [savedResources, setSavedResources] = useState(['1', '4']);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Resources', icon: <LibraryBooks />, count: 24 },
    { id: 'articles', label: 'Articles', icon: <Article />, count: 8 },
    { id: 'videos', label: 'Videos', icon: <VideoLibrary />, count: 6 },
    { id: 'groups', label: 'Support Groups', icon: <Group />, count: 4 },
    { id: 'mindfulness', label: 'Mindfulness', icon: <SelfImprovement />, count: 5 },
    { id: 'university', label: 'University', icon: <School />, count: 7 },
  ];

  const resources = [
    {
      id: '1',
      title: 'Coping with Academic Stress',
      category: 'articles',
      type: 'Article',
      duration: '5 min read',
      description: 'Practical strategies to manage academic pressure and maintain balance during exam periods.',
      author: 'Dr. Sarah Johnson',
      rating: 4.8,
      saved: true,
      tags: ['Stress', 'Academics', 'Time Management'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: '2',
      title: 'Mindful Breathing Exercises',
      category: 'videos',
      type: 'Video',
      duration: '10 min',
      description: 'Guided breathing techniques to reduce anxiety and improve focus.',
      author: 'Mindfulness Center',
      rating: 4.9,
      saved: false,
      tags: ['Mindfulness', 'Anxiety', 'Breathing'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: '3',
      title: 'International Student Support Group',
      category: 'groups',
      type: 'Support Group',
      duration: 'Weekly',
      description: 'Connect with other international students facing similar challenges.',
      author: 'Global Student Services',
      rating: 4.7,
      saved: false,
      tags: ['Community', 'International', 'Support'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '4',
      title: 'Sleep Hygiene for Students',
      category: 'articles',
      type: 'Article',
      duration: '7 min read',
      description: 'Improve your sleep quality with science-backed tips and routines.',
      author: 'Sleep Research Lab',
      rating: 4.6,
      saved: true,
      tags: ['Sleep', 'Health', 'Wellness'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: '5',
      title: 'Campus Counseling Services Guide',
      category: 'university',
      type: 'Guide',
      duration: '3 min read',
      description: 'Complete guide to accessing mental health services on campus.',
      author: 'University Health Services',
      rating: 4.8,
      saved: false,
      tags: ['University', 'Services', 'Counseling'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: '6',
      title: 'Building Healthy Relationships',
      category: 'videos',
      type: 'Video',
      duration: '15 min',
      description: 'Learn communication skills and boundary setting for healthy relationships.',
      author: 'Relationships Expert',
      rating: 4.5,
      saved: false,
      tags: ['Relationships', 'Communication', 'Social'],
      color: 'from-pink-500 to-rose-500'
    },
  ];

  const wellnessTips = [
    { icon: <FitnessCenter />, title: 'Physical Activity', tip: '30 mins of exercise daily' },
    { icon: <Restaurant />, title: 'Nutrition', tip: 'Eat balanced meals regularly' },
    { icon: <AccessTime />, title: 'Time Management', tip: 'Use the Pomodoro technique' },
    { icon: <SelfImprovement />, title: 'Mindfulness', tip: 'Practice daily meditation' },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleSaveResource = (resourceId) => {
    setSavedResources(prev =>
      prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="glass-card-gradient p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Resources Library</h1>
            <p className="text-gray-300">
              Curated content to support your mental health journey
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input pl-10 pr-4 py-2 w-64"
              />
            </div>
            <button className="glass-button flex items-center space-x-2 px-4 py-2">
              <FilterList />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'glass-button-outline text-gray-300 hover:text-white'
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeCategory === category.id
                  ? 'bg-white/20'
                  : 'bg-gray-700'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Featured Resources</h2>
          <div className="flex items-center space-x-2 text-gray-300">
            <TrendingUp />
            <span className="text-sm">Most Popular</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredResources.slice(0, 2).map((resource) => (
            <div key={resource.id} className="glass-card-gradient p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center`}>
                  {resource.category === 'videos' ? <VideoLibrary /> : <LibraryBooks />}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleSaveResource(resource.id)}
                    className="glass-button p-2 rounded-lg"
                  >
                    {savedResources.includes(resource.id) ? (
                      <Bookmark className="text-yellow-500" />
                    ) : (
                      <BookmarkBorder />
                    )}
                  </button>
                  <button className="glass-button p-2 rounded-lg">
                    <Share />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
              <p className="text-gray-300 mb-4">{resource.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 rounded-full text-gray-300 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-500 text-sm" />
                    <span className="text-white">{resource.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-300">
                    <AccessTime className="text-sm" />
                    <span className="text-sm">{resource.duration}</span>
                  </div>
                  <span className="text-gray-300 text-sm">By {resource.author}</span>
                </div>
                
                <button className="glass-button flex items-center space-x-2 px-4 py-2">
                  {resource.type === 'Video' ? (
                    <>
                      <PlayArrow />
                      <span>Watch Now</span>
                    </>
                  ) : (
                    <>
                      <LibraryBooks />
                      <span>Read More</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Resources */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">All Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.slice(2).map((resource) => (
            <div key={resource.id} className="glass-card-light p-4 rounded-xl">
              <div className="flex justify-between items-start mb-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${resource.color} rounded-lg flex items-center justify-center`}>
                  {resource.category === 'videos' ? <VideoLibrary /> : <LibraryBooks />}
                </div>
                <button
                  onClick={() => toggleSaveResource(resource.id)}
                  className="p-1"
                >
                  {savedResources.includes(resource.id) ? (
                    <Bookmark className="text-yellow-500" />
                  ) : (
                    <BookmarkBorder className="text-gray-400" />
                  )}
                </button>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">{resource.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-500 text-xs" />
                    <span className="text-white text-sm">{resource.rating}</span>
                  </div>
                  <span className="text-gray-300 text-sm">•</span>
                  <span className="text-gray-300 text-sm">{resource.duration}</span>
                </div>
                
                <button className="text-purple-300 hover:text-purple-200 text-sm">
                  {resource.type === 'Video' ? 'Watch' : 'Read'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wellness Tips */}
      <div className="glass-card-dark p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-4">Daily Wellness Tips</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wellnessTips.map((tip, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <div className="text-white">
                  {tip.icon}
                </div>
              </div>
              <h4 className="text-white font-medium mb-1">{tip.title}</h4>
              <p className="text-gray-300 text-sm">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* University Specific */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <School className="text-purple-400" />
          <h2 className="text-xl font-bold text-white">University Specific Resources</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Counseling Center Hours',
              description: 'Check updated hours and appointment availability',
              action: 'View Schedule'
            },
            {
              title: 'Peer Support Program',
              description: 'Connect with trained peer supporters',
              action: 'Join Program'
            },
            {
              title: 'Workshop Calendar',
              description: 'Upcoming mental health workshops',
              action: 'View Calendar'
            }
          ].map((item, index) => (
            <div key={index} className="glass-card-gradient p-4 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{item.description}</p>
              <button className="glass-button-outline w-full py-2">
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;