import React, { useState } from 'react';
import './index.css';
import TopicsPanel from './components/TopicsPanel';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import translations from './translations';

/* Inline brain SVG for the header logo */
const HeaderBrainSVG = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 3C9.5 3 7.5 4.5 7 6.5C5.3 6.8 4 8.2 4 10C4 10.7 4.2 11.3 4.5 11.8C3.6 12.4 3 13.5 3 14.8C3 16.8 4.6 18.4 6.5 18.4H8.5C9 19.9 10.4 21 12 21C13.6 21 15 19.9 15.5 18.4H17.5C19.4 18.4 21 16.8 21 14.8C21 13.5 20.4 12.4 19.5 11.8C19.8 11.3 20 10.7 20 10C20 8.2 18.7 6.8 17 6.5C16.5 4.5 14.5 3 12 3Z"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(255,255,255,0.15)"
    />
    <path d="M9 10C9 10 9.5 11 12 11C14.5 11 15 10 15 10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 11V14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9.5 14.5C9.5 14.5 10.5 15.5 12 15.5C13.5 15.5 14.5 14.5 14.5 14.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const t = translations[language] || translations['en'];

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;
    const userMsg = { role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'bot', content: '⚠️ Could not connect to the server. Please make sure the backend is running.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`tv-app ${darkMode ? '' : 'light-mode'}`}>
      {/* ── Header ── */}
      <header className="tv-header">
        <div className="tv-header-left">
          <button
            className="tv-icon-btn tv-sidebar-toggle"
            onClick={() => setSidebarOpen(o => !o)}
            title="Toggle sidebar"
          >
            ☰
          </button>

          {/* Gradient brain logo */}
          <div className="tv-logo">
            <HeaderBrainSVG />
          </div>

          <div>
            <div className="tv-header-title">TechVidhya</div>
            <div className="tv-header-subtitle">
              <span className="tv-status-dot" />
              AI Learning Assistant
            </div>
          </div>
        </div>

        <div className="tv-header-right">
          <button
            className="tv-icon-btn"
            onClick={() => setDarkMode(d => !d)}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="tv-body">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: 'rgba(0,0,0,0.5)',
            }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <TopicsPanel
          open={sidebarOpen}
          language={language}
          onLanguageChange={setLanguage}
          onTopicClick={(topic) => {
            setSidebarOpen(false);
            sendMessage(topic);
          }}
          t={t}
        />

        <div className="tv-chat-area">
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            t={t}
            onPromptClick={sendMessage}
          />
          <InputBar onSend={sendMessage} isLoading={isLoading} t={t} />
        </div>
      </div>
    </div>
  );
}

export default App;
