<div align="center">

<img src="https://img.shields.io/badge/GEN-UI-22d3ee?style=for-the-badge&labelColor=030305&color=22d3ee" alt="GEN UI" />

# GEN UI

**Prompt → Full React App in seconds.**

AI‑powered frontend generator that turns a text description into a complete, production‑ready React application — with live preview and one‑click deploy.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## ✨ What is GEN UI?

GEN UI is an open‑source AI frontend builder.  
Simply describe what you need — a landing page, dashboard, portfolio, etc. — and GEN UI generates a fully functional React app with real components, animations, and styles. No templates, no drag‑and‑drop. Just code.

```txt
"Create a dark SaaS landing page for an AI startup with pricing and testimonials"
        ↓
Full React app — Navbar, Hero, Features, Stats, Testimonials, CTA, Footer
        ↓
Live preview in browser + one‑click open in CodeSandbox
```

---

## 🎬 Demo

> Write your prompt → watch code stream file by file → preview renders live → deploy instantly

---

## 🚀 Features

- **AI Code Generation** – Fireworks AI creates complete React apps at 400 tokens/sec (up to 32k tokens).  
- **Instant Preview** – Sandpack renders the app in‑browser with zero setup.  
- **File Explorer** – Full component tree with syntax‑highlighted viewer.  
- **Live Link** – Open a shareable URL in CodeSandbox instantly.  
- **Export as ZIP** – Download the project and run locally.  
- **Split View** – Side‑by‑side code editor and live preview.  

---

## 🛠 Tech Stack

| Layer                | Technology                         |
|----------------------|------------------------------------|
| Framework            | Next.js 15 (App Router)            |
| AI Model             | Deepseek‑v4‑flash via Fireworks AI |
| In‑browser Preview   | Sandpack (`@codesandbox/sandpack-react`) |
| Animations           | Framer Motion                      |
| Styling              | Tailwind CSS                       |
| State Management     | Zustand                            |
| Deploy               | CodeSandbox Define API             |
| Icons                | Lucide React                       |

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/gen-ui.git
cd gen-ui

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your API keys
```

### Environment Variables

```bash
# .env.local
FIREWORKS_API_KEY=your_key_here
GROQ_API=your_key_here
```

### Run Locally

```bash
npm run dev
```

Open <http://localhost:3000> and start generating.

---

## ⚙️ How It Works


1. **Prompt** → POST `/api/genui` → AI returns a JSON map of files.  
2. **Success** → JSON → Zustand store → navigation to the editor.  
3. **Editor** → renders file tree, code editor, and live preview.  
4. **Live Link** → deploys to CodeSandbox, giving a shareable URL.

---

## 🎨 System Prompt

GEN UI uses a carefully engineered system prompt that instructs the model to:

- Return a single valid JSON object (no markdown, no preamble).  
- Generate complete, working React components with real content.  
- Apply a dark glassmorphism design using Framer Motion animations.  
- Follow strict file structure: `index.js`, `App.js`, `src/components/*.js`.  
- Inject Tailwind via CDN in `index.js` (no build tools needed).  
- Use only valid Lucide icon names.

See [`services/SystemPrompt.js`](services/SystemPrompt.js) for the full prompt.

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repo.  
2. Create a feature branch (`git checkout -b feature/awesome-feature`).  
3. Open a pull request with a clear description of your changes.

---

## 📋 Roadmap

- [ ] Multiple AI model support (GPT‑4o, Claude, Gemini)  
- [ ] Edit and regenerate individual components  
- [ ] Project history & saved generations  
- [ ] Custom design system / theme input  
- [ ] Direct GitHub push integration  
- [ ] Multi‑page app generation  
- [ ] Image upload → UI generation from screenshots  

---

## 🐛 Known Issues

- Sandpack preview requires the **React** template; the Vite template triggers `esbuild-wasm` errors.  
- Very long generations (30k+ tokens) may timeout on Vercet Hobby tier (`maxDuration: 60`).  
- LLM may occasionally generate invalid Lucide icon names — they are sanitized client‑side.

---

## 🤖 UI Assistant

A built‑in AI assistant lets you edit any file directly from the editor.
- **Live updates** – click **Save Changes** to sync the current file to the store.
- **File mentions** – reference files with `@/path/to/file` in the chat to focus the assistant.
- **Context‑aware suggestions** – the assistant uses the latest project state to generate accurate code.

## ⚡ Prompt Enhancer

The prompt enhancer refines your natural language prompts before they are sent to the LLM, ensuring higher quality code generation.
- **Pre‑processing** – adds system‑prompt directives, sanitizes inputs, and formats multi‑step instructions.
- **Dynamic token budgeting** – trims prompts to stay within model limits while preserving intent.

---

<div align="center">

Built with ☕ and way too many JSON parse errors.

⭐ Star this repo if you find it useful

</div>
