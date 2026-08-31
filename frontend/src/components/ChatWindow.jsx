import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const QUICK_PROMPTS = [
  'What is Machine Learning?',
  'Explain React hooks',
  'How does DNS work?',
  'What is Docker?',
  'Explain REST vs GraphQL',
];

function ChatWindow({ messages, isLoading, t }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="tv-chat-window">
      {messages.length === 0 && !isLoading ? (
        <div className="tv-empty-state">
          <div className="tv-empty-icon">🤖</div>
          <div>
            <h1 className="tv-empty-title">
              {t?.greeting || 'Hi! Ask me anything about tech'}
            </h1>
            <p className="tv-empty-sub">
              {t?.subgreeting || 'I can explain concepts, help you learn, and answer your CS questions.'}
            </p>
          </div>
          <div className="tv-pills">
            {QUICK_PROMPTS.map(p => (
              <div key={p} className="tv-pill">{p}</div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {messages.map((msg, i) => (
            <div key={i} className={`tv-msg-row ${msg.role}`}>
              <div className="tv-avatar">
                {msg.role === 'user' ? '👤' : '🤖'}
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
              <div className="tv-avatar">🤖</div>
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
