<div align="center">


# GEN UI

**Describe a UI → Generate a React app → Edit and preview it instantly.**

GEN UI is an AI-powered frontend builder that turns a natural-language prompt into a working React UI with live preview, file-based editing, project saving, and authentication-aware project history.

</div>

---

## What GEN UI Does

GEN UI helps you go from idea to working UI in minutes.

**Example Prompt:**
"Create a modern dark landing page for an AI SaaS product with a hero section, pricing, testimonials, and a footer."

**What You Get:**
- Complete React project structure
- Live preview inside the editor
- File explorer with code editing
- AI chat assistant for refinements
- One-click export and deployment

---

## Core Features

| Feature | Description |
|---------|-------------|
| AI UI Generation | Generate React apps from text prompts |
| Live Preview | See changes instantly with Sandpack |
| File Explorer | Browse and edit generated files |
| Chat Assistant | Edit files via natural language |
| Magic Fix | Send runtime errors to AI for fixing |
| Live Link | Publish to CodeSandbox instantly |
| Export ZIP | Download the generated project |
| Project Saving | Save projects to MongoDB (signed-in users) |
| Project History | Load previously saved projects |
| Clerk Auth | Secure user authentication |


---

## 🧩 How the app works

1. The user enters a prompt on the landing page.
2. The prompt is enhanced and sent to the generation backend.
3. The generated file structure is stored in Zustand.
4. If the user is signed in, the project is saved to MongoDB and linked to the user.
5. The user is redirected to the editor to preview and refine the UI.
6. The editor can load a previously saved project from the project store and save updates back to the database.

---

## 🛠 Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS |
| State | Zustand |
| Editor/Preview | Sandpack |
| Animations | Framer Motion |
| Auth | Clerk |
| Database | MongoDB + Mongoose |
| AI generation | LangChain + LLM providers |
| Icons | Lucide React |

---

## AI Models

| Task | Model |
|------|-------|
| Prompt Enhancer | openai/gpt-oss-20b |
| Code Generation | deepseek-v4-flash |
| Code Update | llama-3.3-70b-versatile |
| Magic Fix | llama-3.3-70b-versatile |

---

## 📦 Installation

```bash
git clone <your-repo-url>
cd gen-ui
npm install
```

### Environment variables

Create a `.env.local` file with the required values:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
MONGODB_URI=your_mongodb_connection_string

# AI provider keys depending on your setup
GROQ_API=your_groq_key
OPENAI_API_KEY=your_openai_key
FIREWORKS_API_KEY=your_fireworks_key
```

### Run locally

```bash
npm run dev
```

Then open:

```txt
http://localhost:3000
```

---

## 🗂 Project structure

```txt
src/
  app/                # Next.js app routes
  components/         # UI components such as navbar, chat panel, export
  actions/            # Server actions for saving/loading projects
  services/           # AI generation, prompt enhancement, LLM wiring
  models/             # Mongoose models
  store/              # Zustand store
```

---

## 🧠 AI generation flow

GEN UI uses a prompt pipeline that:

- enhances the user prompt and creates proper structure for app,
- sends it to the generation service,
- parses the response into a file-based React project,
- stores it in the current editor state,
- optionally persists it to the database for signed-in users,
- and allows the user to refine the result through the assistant or Magic Fix.

---

## 🧪 Development notes

- The editor uses Sandpack for live rendering.
- The current project files are stored in Zustand so the UI can be edited instantly.
- Signed-in users can save their current project and reopen it from the Projects page.
- The Projects page loads a project’s stored files into the editor state.

---

## 🤖 UI Assistant

The built-in assistant lets you edit files directly from the editor.

Features:
- mention files like `@/path/to/file` in chat
- apply edits to the current generation state
- save your current work back to the project store

---

## 📤 Export and sharing

Users can export the generated UI as a ZIP archive and also use the live preview workflow to inspect the generated app.

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 📝 Roadmap

- better project version history
- component-level regeneration
- richer prompt templates
- improved error handling for generation failures
- more AI provider integrations

---

## ⭐ Notes

GEN UI is designed for fast prototyping and iterative UI generation. It is a strong starting point for AI-assisted frontend development, especially for landing pages, dashboards, and rapid mockups.
