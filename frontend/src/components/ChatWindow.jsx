import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/* Brain SVG used in the welcome card */
const BrainSVG = ({ size = 32, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 3C9.5 3 7.5 4.5 7 6.5C5.3 6.8 4 8.2 4 10C4 10.7 4.2 11.3 4.5 11.8C3.6 12.4 3 13.5 3 14.8C3 16.8 4.6 18.4 6.5 18.4H8.5C9 19.9 10.4 21 12 21C13.6 21 15 19.9 15.5 18.4H17.5C19.4 18.4 21 16.8 21 14.8C21 13.5 20.4 12.4 19.5 11.8C19.8 11.3 20 10.7 20 10C20 8.2 18.7 6.8 17 6.5C16.5 4.5 14.5 3 12 3Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(255,255,255,0.12)"
    />
    <path d="M9 10C9 10 9.5 11 12 11C14.5 11 15 10 15 10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 11V14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9.5 14.5C9.5 14.5 10.5 15.5 12 15.5C13.5 15.5 14.5 14.5 14.5 14.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FEATURED_PROMPTS = [
  '⚡ What is Machine Learning?',
  '⚛️ Explain React in simple terms',
  '🐳 How does Docker work?',
];

function ChatWindow({ messages, isLoading, t, onPromptClick }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="tv-chat-window">
      {messages.length === 0 && !isLoading ? (
        <div className="tv-empty-state">
          <div className="tv-welcome-card">
            {/* Logo */}
            <div className="tv-welcome-logo">
              <div className="tv-welcome-logo-inner">
                <BrainSVG size={34} color="#fff" />
              </div>
            </div>

            {/* Name + tagline */}
            <div>
              <div className="tv-welcome-name">TechVidhya</div>
              <p className="tv-welcome-tag">
                {t?.subgreeting || 'Your AI guide to the world of technology.\nAsk me anything — CS, coding, cloud, and beyond.'}
              </p>
            </div>

            {/* Featured quick chips */}
            <div className="tv-pills">
              {FEATURED_PROMPTS.map(p => (
                <button
                  key={p}
                  className="tv-pill"
                  onClick={() => onPromptClick && onPromptClick(p.replace(/^[^ ]+ /, ''))}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {messages.map((msg, i) => (
            <div key={i} className={`tv-msg-row ${msg.role}`}>
              <div className="tv-avatar">
                {msg.role === 'user' ? '👤' : <BrainSVG size={16} />}
              </div>
              <div className="tv-msg-bubble">
                {msg.role === 'bot' ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="tv-msg-row bot">
              <div className="tv-avatar"><BrainSVG size={16} /></div>
              <div className="tv-msg-bubble">
                <div className="tv-typing">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatWindow;
