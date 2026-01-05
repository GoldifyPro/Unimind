import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';  // App-specific styles

// Import pages
import Home from './pages/Home';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6a11cb',
    },
    secondary: {
      main: '#2575fc',
    },
    background: {
      default: '#0a0a0a',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        {/* Background Animation */}
        <div className="background-animation">
          <div className="animated-bg"></div>
        </div>
        
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
        
        {/* Footer */}
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-links">
              <a href="/privacy" className="footer-link">Privacy Policy</a>
              <a href="/terms" className="footer-link">Terms of Service</a>
              <a href="/contact" className="footer-link">Contact Us</a>
              <a href="/resources" className="footer-link">Resources</a>
            </div>
            <p className="copyright">
              © {new Date().getFullYear()} Unimind. All rights reserved.
            </p>
          </div>
        </footer>
        
        {/* Toast Container */}
        <div className="toast-container" id="toast-container"></div>
      </div>
    </ThemeProvider>
  );
}

export default App;