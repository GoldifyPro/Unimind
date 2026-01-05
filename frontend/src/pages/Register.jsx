import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Psychology, 
  Person, 
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff,
  School,
  HowToReg 
} from '@mui/icons-material';
import LanguageSelector from '../components/LanguageSelector';
import '../styles/glassmorphism.css';

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    university: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!formData.agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    setLoading(true);
    
    // Simulate registration API call
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      setLoading(false);
      navigate('/chat');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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
        
        {/* Registration Card */}
        <div className="glass-card-gradient p-8 rounded-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Psychology className="text-white text-4xl" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Join Unimind
            </h1>
            <p className="text-gray-300">
              Create your account to access AI-powered mental health support
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Person className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="glass-input w-full pl-12 pr-4 py-3"
                    required
                  />
                </div>
              </div>
              
              {/* Email */}
              <div>
                <label className="block text-gray-300 mb-2">
                  University Email
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
              
              {/* University */}
              <div>
                <label className="block text-gray-300 mb-2">
                  University
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <School className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    placeholder="Your University"
                    className="glass-input w-full pl-12 pr-4 py-3"
                    required
                  />
                </div>
              </div>
              
              {/* Student ID */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Student ID (Optional)
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <School className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="ST123456"
                    className="glass-input w-full pl-12 pr-4 py-3"
                  />
                </div>
              </div>
              
              {/* Password */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Password
                </label>
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
              
              {/* Confirm Password */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Lock className="text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="glass-input w-full pl-12 pr-12 py-3"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Terms Agreement */}
            <div className="mt-6">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1"
                />
                <span className="text-gray-300 text-sm">
                  I agree to the{' '}
                  <Link to="/terms" className="text-purple-300 hover:text-purple-200">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-purple-300 hover:text-purple-200">
                    Privacy Policy
                  </Link>
                  . I understand that this service provides AI-based support and is not a replacement for professional medical care.
                </span>
              </label>
            </div>
            
            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="glass-button w-full py-3 text-lg flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <HowToReg />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </div>
          </form>
          
          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>
          
          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-purple-300 hover:text-purple-200 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
        
        {/* Verification Notice */}
        <div className="mt-8 glass-card-light p-4 rounded-xl">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <School className="text-white" />
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">
                University Verification
              </h4>
              <p className="text-gray-300 text-sm">
                Your .edu email will be verified for access. Student ID verification is optional but provides additional features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;