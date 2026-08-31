import React, { useState, useRef } from 'react';

function InputBar({ onSend, isLoading, t }) {
  const [value, setValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

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
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser.');
      return;
    }

    // Toggle off if already recording
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setIsRecording(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setValue(prev => (prev ? prev + ' ' : '') + transcript);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height =
          Math.min(textareaRef.current.scrollHeight, 120) + 'px';
      }
    };

    recognition.onend = () => setIsRecording(false);
    recognition.onerror = () => setIsRecording(false);

    recognition.start();
  };

  return (
    <div className="tv-input-bar">
      <div className="tv-input-wrap">
        {/* Attachment */}
        <button className="tv-input-btn" title="Attach file" onClick={() => {}}>
          📎
        </button>

        <textarea
          ref={textareaRef}
          className="tv-textarea"
          rows={1}
          placeholder={t?.placeholder || 'Ask anything about tech… (Enter to send)'}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />

        {/* Mic — pulses red while recording */}
        <button
          className={`tv-input-btn${isRecording ? ' tv-mic-pulse' : ''}`}
          title={isRecording ? 'Stop recording' : 'Voice input'}
          onClick={handleVoice}
        >
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
