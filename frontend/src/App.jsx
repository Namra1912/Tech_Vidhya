import React, { useState, useRef, useEffect } from 'react';
import './index.css';
import TopicsPanel from './components/TopicsPanel';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import translations from './translations';

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
          <div className="tv-logo">T</div>
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
        {/* Backdrop for mobile */}
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
          <ChatWindow messages={messages} isLoading={isLoading} t={t} />
          <InputBar onSend={sendMessage} isLoading={isLoading} t={t} />
        </div>
      </div>
    </div>
  );
}

export default App;
