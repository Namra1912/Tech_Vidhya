import React from 'react';

const TOPIC_GROUPS = [
  {
    cat: 'prog',
    label: 'Programming',
    topics: [
      { icon: '⚛️', text: 'What is React and how does it work?' },
      { icon: '🐍', text: 'Explain Python list comprehensions' },
      { icon: '🔷', text: 'TypeScript vs JavaScript differences' },
      { icon: '🔗', text: 'How do JavaScript Promises work?' },
    ],
  },
  {
    cat: 'cs',
    label: 'Computer Science',
    topics: [
      { icon: '🧠', text: 'What is Machine Learning?' },
      { icon: '🌐', text: 'How does the internet work?' },
      { icon: '🔒', text: 'Explain public key cryptography' },
      { icon: '🗄️', text: 'SQL vs NoSQL databases' },
    ],
  },
  {
    cat: 'devops',
    label: 'DevOps & Cloud',
    topics: [
      { icon: '🐳', text: 'What is Docker and containerization?' },
      { icon: '☁️', text: 'AWS vs Azure vs GCP comparison' },
      { icon: '⚙️', text: 'What is CI/CD pipeline?' },
      { icon: '🔧', text: 'Explain Kubernetes in simple terms' },
    ],
  },
];

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिंदी' },
  { value: 'gu', label: 'ગુજરાતી' },
];

function TopicsPanel({ open, language, onLanguageChange, onTopicClick }) {
  return (
    <aside className={`tv-sidebar${open ? ' open' : ''}`}>
      <div className="tv-sidebar-header">
        <div className="tv-sidebar-title">Quick Topics</div>
      </div>

      <div className="tv-topics-list">
        {TOPIC_GROUPS.map(group => (
          <div key={group.cat} className="tv-topic-group" data-cat={group.cat}>
            <div className="tv-topic-group-label">{group.label}</div>
            {group.topics.map(topic => (
              <button
                key={topic.text}
                className="tv-topic-btn"
                onClick={() => onTopicClick(topic.text)}
                title={topic.text}
              >
                <span className="tv-topic-icon">{topic.icon}</span>
                {topic.text}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Language selector styled as pill */}
      <div className="tv-lang-pill">
        <span className="tv-lang-globe">🌐</span>
        <select
          value={language}
          onChange={e => onLanguageChange(e.target.value)}
          title="Select language"
        >
          {LANGUAGES.map(l => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
        <span className="tv-lang-chevron">▾</span>
      </div>
    </aside>
  );
}

export default TopicsPanel;
