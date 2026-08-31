# 🇮🇳 TechVidhya — AI Knowledge & Career Skill Assistant

TechVidhya is a modern, high-performance AI-powered learning and career assistant built for students, job seekers, and digital learners. It features multi-language support (English, Hindi, Gujarati), interactive topic exploration, voice speech recognition, file attachment handling, and real-time response generation using the **Groq API** (`llama-3.3-70b` / `groq/compound`).

---

## 🌟 Key Features

- 🤖 **Fast AI Intelligence**: Backend powered by Groq SDK & Llama 3.3 models for instant answers.
- 🌐 **Multilingual Interface**: Seamless switching between **English**, **Hindi (हिंदी)**, and **Gujarati (ગુજરાતી)**.
- 🎨 **Anti-Slop SaaS UI/UX**: Built with custom design tokens, high-contrast dark/light mode (WCAG AA compliant), and clean typography.
- 📱 **100vh Full Viewport App Shell**: Full-screen workspace layout inspired by ChatGPT & Linear.
- 🎤 **Voice Input**: Integrated Web Speech API for hands-free voice prompting.
- 📑 **Markdown Response Rendering**: AI replies format lists, code blocks, bold text, and tables with `react-markdown` and `remark-gfm`.
- 📚 **Topic Explorer**: Categorized quick suggestions for General Digital Skills and Student/Career Readiness.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19
- **Icons**: Lucide React Icons (`lucide-react`)
- **Formatting**: `react-markdown`, `remark-gfm`
- **Styling**: Vanilla CSS custom variables, Bootstrap 5 layout grid, Inter & Plus Jakarta Sans typography.

### Backend
- **Server**: Node.js & Express 5
- **AI SDK**: `@groq/groq-sdk`
- **Config**: `dotenv`, `cors`, `body-parser`

---

## 📁 Repository Structure

```
Tech_Vidhya/
├── backend/
│   ├── server.js          # Express server with Groq API integration
│   ├── StrictPrompt.js    # System instructions & scope guardrails
│   ├── .env.example       # Environment template
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx   # Message stream with Markdown rendering
│   │   │   ├── InputBar.jsx     # Voice, file, & message composer
│   │   │   └── TopicsPanel.jsx  # Categorized sidebar explorer
│   │   ├── App.jsx              # Main 100vh layout & theme controller
│   │   ├── index.css            # SaaS design system & WCAG AA tokens
│   │   ├── translations.js      # Multi-language translations
│   │   └── index.js
│   └── package.json
└── .gitignore
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install --legacy-peer-deps
npm start
```

The application will launch automatically at `http://localhost:3000`.

---

## 📜 License
ISC License — Created with ❤️ by **Namra Shah (Namra1912)**.
