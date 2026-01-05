import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Psychology, 
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff,
  Login as LoginIcon 
} from '@mui/icons-material';
import LanguageSelector from '../components/LanguageSelector';
import '../styles/glassmorphism.css';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      // In real app, you would:
      // 1. Call your Django auth endpoint
      // 2. Store tokens
      // 3. Redirect to chat
      localStorage.setItem('isLoggedIn', 'true');
      setLoading(false);
      navigate('/chat');
    }, 1500);
  };
  
  const handleDemoLogin = () => {
    // For demo purposes
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/chat');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Back */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="glass-button flex items-center space-x-2 px-4 py-2"
          >
            <span>←</span>
            <span>Back</span>
          </button>
          <LanguageSelector />
        </div>
        
        {/* Login Card */}
        <div className="glass-card-gradient p-8 rounded-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Psychology className="text-white text-4xl" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-300">
              Sign in to continue to Unimind
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Email className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@university.edu"
                    className="glass-input w-full pl-12 pr-4 py-3"
                    required
                  />
                </div>
              </div>
              
              {/* Password Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-300">
                    Password
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="text-purple-300 hover:text-purple-200 text-sm"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Lock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="glass-input w-full pl-12 pr-12 py-3"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                </div>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="glass-button w-full py-3 text-lg flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LoginIcon />
                    <span>Sign In</span>
                  </>
                )}
              </button>
              
              {/* Demo Login */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="glass-button-outline w-full py-3 text-lg"
              >
                Try Demo Account
              </button>
            </div>
          </form>
          
          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>
          
          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-purple-300 hover:text-purple-200 font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
        
        {/* Safety Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
            <Lock className="text-green-400" />
            <span>
              Your conversations are encrypted and confidential
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;