<div align="center">

<img src="https://img.shields.io/badge/GEN-UI-22d3ee?style=for-the-badge&labelColor=030305&color=22d3ee" alt="GEN UI" />

# GEN UI

**Prompt → Full React App in seconds.**

AI-powered frontend generator that turns a text description into a complete, production-ready React application — with live preview and one-click deploy.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-ff0055?style=flat-square&logo=framer)](https://www.framer.com/motion)

[Demo](#) · [Report Bug](issues) · [Request Feature](issues)

</div>

---

## ✨ What is GEN UI?

GEN UI is an open-source AI frontend builder. You describe what you want — a landing page, a dashboard, a portfolio — and GEN UI generates a fully working React application with real components, animations, and styles. No templates. No drag and drop. Just code.

```
"Create a dark SaaS landing page for an AI startup with pricing and testimonials"
                                    ↓
        Full React app — Navbar, Hero, Features, Stats, Testimonials, CTA, Footer
                                    ↓
              Live preview in browser + one-click open in CodeSandbox
```

---

## 🎬 Demo

> Write your prompt → watch code stream file by file → preview renders live → deploy instantly

![GEN UI Demo](https://placehold.co/900x500/030305/22d3ee?text=GEN+UI+Demo+GIF)

---

## 🚀 Features

- **AI Code Generation** — Kimi K2.5 via Fireworks AI generates complete React apps at 400 tokens/sec upto 32k tokens.
- **Instant Preview** — Sandpack renders your app in the browser with zero setup
- **File Explorer** — Full component tree with syntax-highlighted code viewer
- **One-Click Deploy** — Opens a live shareable URL in CodeSandbox instantly
- **Export as ZIP** — Download your generated project and run it locally
- **Split View** — Side-by-side code editor and live preview

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| AI Model | Kimi K2.5 via Fireworks AI |
| In-browser Preview | Sandpack (`@codesandbox/sandpack-react`) |
| Animations | Framer Motion |
| Styling | Tailwind CSS |
| State | Zustand |
| Deploy | CodeSandbox Define API |
| Icons | Lucide React |

---

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- A [Fireworks AI](https://fireworks.ai) account and API key

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/gen-ui.git
cd gen-ui

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

```bash
# .env.local
FIREWORKS_API_KEY=fw_your_key_here
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start generating.

---

## ⚙️ How It Works

```
1. User types a prompt on the landing page

2. POST /api/genui
   └── Fireworks AI (Kimi K2.5) returns a JSON object
       containing all files according to sandbod code format : { "/src/App.js": { code: "..." }, ... }

3. On __success__ signal:
   └── JSON.parse() → Zustand store → router.push("/editor")

4. Editor page reads from Zustand store
   └── File tree sidebar renders component structure
   └── Sandpack renders live preview in browser

5. User clicks "Live Link"
   └── POST /api/deploy → CodeSandbox Define API
   └── Returns live URL: https://{sandbox_id}.csb.app
```

---

## 🎨 System Prompt

GEN UI uses a carefully engineered system prompt that instructs the model to:

- Return a single valid JSON object (no markdown, no preamble)
- Generate complete, working React components with real content
- Use dark glassmorphism design with Framer Motion animations
- Follow strict file structure: `index.js`, `App.js`, `src/components/*.js`
- Inject Tailwind via CDN in `index.js` (no build tools needed)
- Only use valid Lucide icon names

See [`services/SystemPrompt.js`](services/SystemPrompt.js) for the full prompt.

---

## 🤝 Contributing

Contributions are welcome. Here's how:

```bash
# Fork the repo and create your branch
git checkout -b feature/your-feature

# Make your changes and commit
git commit -m "feat: add your feature"

# Push and open a Pull Request
git push origin feature/your-feature
```

Please open an issue first for major changes.

---

## 📋 Roadmap

- [ ] Multiple AI model support (GPT-4o, Claude, Gemini)
- [ ] Edit and regenerate individual components
- [ ] Project history and saved generations
- [ ] Custom design system / theme input
- [ ] Direct GitHub push integration
- [ ] Multi-page app generation
- [ ] Image upload → generate UI from screenshot

---

## 🐛 Known Issues

- Sandpack preview requires `react` template — Vite template causes esbuild-wasm errors
- Very long generations (30k+ tokens) may timeout on Vercel Hobby tier (`maxDuration: 60`)
- LLM occasionally generates invalid Lucide icon names — sanitized client-side

---

## 📄 License

MIT © [Your Name](https://github.com/bhumitsingh856-cyber)

---

<div align="center">

Built with ☕ and way too many JSON parse errors.

⭐ Star this repo if you find it useful

</div>
