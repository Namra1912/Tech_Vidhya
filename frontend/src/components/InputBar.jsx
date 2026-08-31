import React, { useState, useRef } from 'react';

function InputBar({ onSend, isLoading, t }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setValue(prev => prev + transcript);
    };
    recognition.start();
  };

  return (
    <div className="tv-input-bar">
      <div className="tv-input-wrap">
        <button className="tv-input-btn" title="Attach file" onClick={() => {}}>
          📎
        </button>
        <textarea
          ref={textareaRef}
          className="tv-textarea"
          rows={1}
          placeholder={t?.placeholder || 'Ask anything about tech…'}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button className="tv-input-btn" title="Voice input" onClick={handleVoice}>
          🎙️
        </button>
      </div>
      <button
        className="tv-send-btn"
        onClick={handleSend}
        disabled={!value.trim() || isLoading}
        title="Send message"
      >
        ➤
      </button>
    </div>
  );
}

export default InputBar;
