import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import React from "react";

// ── Constants ─────────────────────────────────────────────────────────────────

const STEPS = [
  "Parsing your prompt",
  "Planning component structure",
  "Writing React components",
  "Applying styles & animations",
  "Finalizing output",
];

const ACTIVITY = [
  "Reading prompt intent...",
  "Identifying UI patterns...",
  "Mapping component tree...",
  "Planning layout structure...",
  "Writing Components...",
  "Adding Tailwind classes...",
  "Tuning spacing & colors...",
  "Cleaning imports...",
  "Validating JSX...",
  "Almost ready...",
];

const FILE_TREE = [
  { type: "folder", name: "src", depth: 0, id: "src" },
  { type: "folder", name: "components", depth: 1, id: "components" },
  { type: "file", name: "Header.jsx", depth: 2, id: "f1", ext: "jsx" },
  { type: "file", name: "Hero.jsx", depth: 2, id: "f2", ext: "jsx" },
  { type: "file", name: "Card.jsx", depth: 2, id: "f3", ext: "jsx" },
  { type: "file", name: "Footer.jsx", depth: 2, id: "f4", ext: "jsx" },
  { type: "folder", name: "hooks", depth: 1, id: "hooks" },
  { type: "file", name: "useTheme.js", depth: 2, id: "f5", ext: "js" },
  { type: "folder", name: "styles", depth: 1, id: "styles" },
  { type: "file", name: "globals.css", depth: 2, id: "f6", ext: "css" },
  { type: "file", name: "App.jsx", depth: 1, id: "f7", ext: "jsx" },
  { type: "file", name: "main.jsx", depth: 1, id: "f8", ext: "jsx" },
  { type: "file", name: "tailwind.config.js", depth: 0, id: "f9", ext: "js" },
  { type: "file", name: "package.json", depth: 0, id: "f10", ext: "json" },
];

const FILE_CODE = {
  "Header.jsx": [
    "import { Menu, X } from 'lucide-react'",
    "import { useState } from 'react'",
    "",
    "export default function Header() {",
    "  const [open, setOpen] = useState(false)",
    "  return (",
    '    <header className="sticky top-0 z-50 backdrop-blur',
    '                        border-b border-white/5">',
    '      <div className="max-w-6xl mx-auto flex',
    '                      items-center justify-between px-6 h-16">',
    '        <span className="text-lg font-bold tracking-tight">',
    "          Brand",
    "        </span>",
    '        <nav className="hidden md:flex gap-6 text-sm text-zinc-400">',
    '          <a href="#features">Features</a>',
    '          <a href="#pricing">Pricing</a>',
    "        </nav>",
    "        <button onClick={() => setOpen(!open)}>",
    "          {open ? <X size={20}/> : <Menu size={20}/>}",
    "        </button>",
    "      </div>",
    "    </header>",
    "  )",
    "}",
  ],
  "Hero.jsx": [
    "import { motion } from 'framer-motion'",
    "",
    "export default function Hero() {",
    "  return (",
    '    <section className="relative py-32 text-center">',
    "      <motion.h1",
    "        initial={{ opacity: 0, y: 20 }}",
    "        animate={{ opacity: 1, y: 0 }}",
    '        className="text-5xl font-extrabold',
    "                   bg-clip-text text-transparent",
    '                   bg-gradient-to-r from-cyan-400 to-violet-500"',
    "      >",
    "        Build faster with AI",
    "      </motion.h1>",
    '      <p className="mt-4 text-zinc-400 max-w-md mx-auto">',
    "        Generate production-ready UI in seconds.",
    "      </p>",
    "    </section>",
    "  )",
    "}",
  ],
  "Card.jsx": [
    "export default function Card({ title, desc, icon }) {",
    "  return (",
    '    <div className="group rounded-2xl p-6',
    "                    bg-white/[0.03] border border-white/5",
    '                    hover:border-cyan-500/20 transition-all">',
    '      <div className="text-2xl mb-3">{icon}</div>',
    '      <h3 className="font-semibold text-white mb-1">{title}</h3>',
    '      <p className="text-sm text-zinc-500">{desc}</p>',
    "    </div>",
    "  )",
    "}",
  ],
  "Footer.jsx": [
    "export default function Footer() {",
    "  return (",
    '    <footer className="border-t border-white/5 py-10 text-center">',
    '      <p className="text-sm text-zinc-600">',
    "        2025 GenUI. All rights reserved.",
    "      </p>",
    "    </footer>",
    "  )",
    "}",
  ],
  "useTheme.js": [
    "import { useState, useEffect } from 'react'",
    "",
    "export function useTheme() {",
    "  const [dark, setDark] = useState(true)",
    "  useEffect(() => {",
    "    document.documentElement.classList",
    "      .toggle('dark', dark)",
    "  }, [dark])",
    "  return { dark, toggle: () => setDark(d => !d) }",
    "}",
  ],
  "globals.css": [
    "@tailwind base;",
    "@tailwind components;",
    "@tailwind utilities;",
    "",
    ":root {",
    "  --accent: #22d3ee;",
    "  --radius: 12px;",
    "}",
    "",
    "body {",
    "  @apply bg-zinc-950 text-zinc-100;",
    "  font-family: 'Inter', sans-serif;",
    "}",
  ],
  "App.jsx": [
    "import Header from './components/Header'",
    "import Hero   from './components/Hero'",
    "import Card   from './components/Card'",
    "import Footer from './components/Footer'",
    "",
    "export default function App() {",
    "  return (",
    '    <div className="min-h-screen">',
    "      <Header />",
    "      <Hero />",
    '      <section className="grid grid-cols-3 gap-4 max-w-5xl mx-auto p-8">',
    '        <Card title="Fast"  desc="AI-powered"     icon="⚡"/>',
    '        <Card title="Smart" desc="Context-aware"  icon="🧠"/>',
    '        <Card title="Clean" desc="Production code" icon="✨"/>',
    "      </section>",
    "      <Footer />",
    "    </div>",
    "  )",
    "}",
  ],
  "main.jsx": [
    "import React from 'react'",
    "import ReactDOM from 'react-dom/client'",
    "import App from './App'",
    "import './styles/globals.css'",
    "",
    "ReactDOM.createRoot(",
    "  document.getElementById('root')",
    ").render(",
    "  <React.StrictMode>",
    "    <App />",
    "  </React.StrictMode>",
    ")",
  ],
  "tailwind.config.js": [
    "export default {",
    "  content: [",
    "    './index.html',",
    "    './src/**/*.{js,ts,jsx,tsx}',",
    "  ],",
    "  theme: {",
    "    extend: {",
    "      colors: {",
    "        accent: '#22d3ee',",
    "      },",
    "    },",
    "  },",
    "  plugins: [],",
    "}",
  ],
  "package.json": [
    "{",
    '  "name": "genui-app",',
    '  "private": true,',
    '  "scripts": {',
    '    "dev": "vite",',
    '    "build": "vite build"',
    "  },",
    '  "dependencies": {',
    '    "react": "^18.2.0",',
    '    "react-dom": "^18.2.0",',
    '    "framer-motion": "^11.0.0",',
    '    "lucide-react": "^0.359.0"',
    "  }",
    "}",
  ],
};

// ── Syntax highlighter ────────────────────────────────────────────────────────

const EXT_CLR = {
  jsx: "#61afef",
  js: "#e5c07b",
  css: "#56b6c2",
  json: "#98c379",
};

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function tokenize(line, depth = 0) {
  if (!line || depth > 5) {
    return `<span style="color:rgba(255,255,255,0.55)">${esc(line || "")}</span>`;
  }
  const rules = [
    { re: /(\/\/.*)/, c: "#5c6370" },
    {
      re: /(\bimport\b|\bexport\b|\bdefault\b|\bconst\b|\blet\b|\bfunction\b|\breturn\b|\bfrom\b|\bif\b|\bawait\b|\basync\b|\btrue\b|\bfalse\b)/,
      c: "#c678dd",
    },
    {
      re: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/,
      c: "#98c379",
    },
    { re: /\b([A-Z][a-zA-Z0-9]*)\b/, c: "#e5c07b" },
    { re: /\b(\d+(\.\d+)?)\b/, c: "#d19a66" },
    { re: /([@#][a-zA-Z_][\w-]*)/, c: "#e06c75" },
  ];
  for (let ri = 0; ri < rules.length; ri++) {
    const rule = rules[ri];
    const m = line.match(rule.re);
    if (m && m.index !== undefined) {
      const before = line.slice(0, m.index);
      const match = m[0];
      const after = line.slice(m.index + match.length);
      return (
        tokenize(before, depth + 1) +
        `<span style="color:${rule.c}">${esc(match)}</span>` +
        tokenize(after, depth + 1)
      );
    }
  }
  return `<span style="color:rgba(255,255,255,0.55)">${esc(line)}</span>`;
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function FileIcon({ name, ext }) {
  const c = EXT_CLR[ext] || "#888";
  const lbl =
    ext === "jsx"
      ? "Jx"
      : ext === "css"
        ? "#"
        : ext === "json"
          ? "{}"
          : ext || "?";
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect
        x="1"
        y="1"
        width="12"
        height="12"
        rx="3"
        fill={c}
        fillOpacity=".14"
        stroke={c}
        strokeOpacity=".4"
        strokeWidth=".7"
      />
      <text
        x="7"
        y="9.5"
        textAnchor="middle"
        fontSize="5.5"
        fill={c}
        fontFamily="monospace"
        fontWeight="700"
      >
        {lbl}
      </text>
    </svg>
  );
}

function FolderIcon({ open }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d={
          open
            ? "M1 4C1 3.17 1.67 2.5 2.5 2.5H5.5l1 1.5H11.5C12.33 4 13 4.67 13 5.5V10.5C13 11.33 12.33 12 11.5 12H2.5C1.67 12 1 11.33 1 10.5V4Z"
            : "M1 4C1 3.17 1.67 2.5 2.5 2.5H5.5l1 1.5H11.5C12.33 4 13 4.67 13 5.5V10C13 10.83 12.33 11.5 11.5 11.5H2.5C1.67 11.5 1 10.83 1 10V4Z"
        }
        fill="#e5c07b"
        fillOpacity=".2"
        stroke="#e5c07b"
        strokeOpacity=".5"
        strokeWidth=".7"
      />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export const GeneratingOverlay = ({ prompt }) => {
  const [step, setStep] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const [dots, setDots] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [visibleNodes, setVisibleNodes] = useState([]);
  const [activeFileId, setActiveFileId] = useState(null);
  const [streamedLines, setStreamedLines] = useState({});

  const streamRef = useRef(null);
  const codeEndRef = useRef(null);

  // ── Tick timers ────────────────────────────────────────────────────────────

  useEffect(() => {
    const ids = [
      setInterval(
        () => setStep((p) => Math.min(p + 1, STEPS.length - 1)),
        5000,
      ),
      setInterval(
        () => setActivityIndex((p) => Math.min(p + 1, ACTIVITY.length - 1)),
        2500,
      ),
      setInterval(() => setDots((p) => (p.length >= 3 ? "" : p + ".")), 400),
      setInterval(() => setElapsed((p) => p + 1), 1000),
    ];
    return () => ids.forEach(clearInterval);
  }, []);

  // ── File tree + code streamer ──────────────────────────────────────────────

  useEffect(() => {
    let cancelled = false;
    const timeouts = [];
    let idx = 0;

    function revealNext() {
      // guard: cancelled, out of bounds, or undefined node
      if (cancelled) return;
      if (idx >= FILE_TREE.length) return;
      const node = FILE_TREE[idx];
      if (!node) return;

      const currentIdx = idx;
      idx++;

      // add to visible list — prevent duplicates
      setVisibleNodes(function (prev) {
        if (prev.indexOf(currentIdx) !== -1) return prev;
        return prev.concat(currentIdx);
      });

      if (node.type === "file") {
        const lines =
          FILE_CODE[node.name] && FILE_CODE[node.name].length > 0
            ? FILE_CODE[node.name]
            : ["// " + node.name];

        if (!cancelled) setActiveFileId(node.id);
        if (!cancelled)
          setStreamedLines(function (p) {
            return Object.assign({}, p, { [node.id]: [] });
          });

        let li = 0;
        clearInterval(streamRef.current);
        streamRef.current = setInterval(
          function () {
            if (cancelled) {
              clearInterval(streamRef.current);
              return;
            }
            if (li < lines.length) {
              const captured = li;
              const capturedId = node.id;
              const capturedLine = lines[captured];
              setStreamedLines(function (p) {
                return Object.assign({}, p, {
                  [capturedId]: (p[capturedId] || []).concat(capturedLine),
                });
              });
              li++;
            } else {
              clearInterval(streamRef.current);
              const t = setTimeout(revealNext, 500);
              timeouts.push(t);
            }
          },
          60 + Math.random() * 40,
        );
      } else {
        // folder — just reveal it and move on
        const t = setTimeout(revealNext, 350);
        timeouts.push(t);
      }
    }

    const startT = setTimeout(revealNext, 800);
    timeouts.push(startT);

    return function () {
      cancelled = true;
      timeouts.forEach(clearTimeout);
      clearInterval(streamRef.current);
    };
  }, []);

  // ── Auto-scroll ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (codeEndRef.current) {
      codeEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [streamedLines]);

  // ── Derived values ─────────────────────────────────────────────────────────

  const progress = Math.round(((step + 1) / STEPS.length) * 99);
  const activeNode = activeFileId
    ? FILE_TREE.find(function (f) {
        return f.id === activeFileId;
      })
    : null;
  const activeLines =
    activeFileId && streamedLines[activeFileId]
      ? streamedLines[activeFileId]
      : [];
  const totalFilesWritten = Object.keys(streamedLines).length;
  const totalLinesWritten = Object.values(streamedLines).reduce(function (
    s,
    l,
  ) {
    return s + l.length;
  }, 0);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#050507] flex flex-col overflow-hidden"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Grid bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 100% 100% at 50% 50%,black,transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 25% 50%,rgba(6,182,212,0.045) 0%,transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 75% 45%,rgba(124,58,237,0.03) 0%,transparent 70%)",
        }}
      />

      {/* ── Top bar ── */}
      <div
        className="relative z-10 flex items-center justify-between px-6 h-14 flex-shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(5,5,7,0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg,rgba(6,182,212,0.2),rgba(124,58,237,0.12))",
              border: "1px solid rgba(6,182,212,0.2)",
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-sm rotate-45"
              style={{ background: "linear-gradient(135deg,#22d3ee,#a78bfa)" }}
            />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-white">
            GEN<span className="text-cyan-400">UI</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full"
            style={{
              background: "rgba(34,211,238,0.06)",
              border: "1px solid rgba(34,211,238,0.12)",
            }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ boxShadow: "0 0 6px rgba(34,211,238,0.5)" }}
            />
            <span className="text-[12px] font-medium text-cyan-400">
              Generating{dots}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span
              className="text-[11px] px-2 py-0.5 rounded-md"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.3)",
                fontFamily: "monospace",
              }}
            >
              {totalFilesWritten} files
            </span>
            <span
              className="text-[11px] px-2 py-0.5 rounded-md"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.3)",
                fontFamily: "monospace",
              }}
            >
              {totalLinesWritten} lines
            </span>
          </div>
        </div>

        <span
          className="text-[12px] font-mono tabular-nums"
        >
          {elapsed}s
        </span>
      </div>

      {/* ── Body ── */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* LEFT: Progress panel */}
        <div
          className="flex flex-col w-full md:w-[340px] flex-shrink-0 overflow-y-auto px-5 py-5 gap-4"
          style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}
        >
          {/* Prompt */}
          <div
            className="px-4 py-3 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="text-[10px] uppercase tracking-widest mb-1.5"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Your prompt
            </p>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              "{prompt}"
            </p>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span
                className="text-[12px]"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Progress
              </span>
              <span
                className="text-[12px] font-medium tabular-nums"
                style={{
                  color: "rgba(34,211,238,0.7)",
                  fontFamily: "monospace",
                }}
              >
                {progress}%
              </span>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg,#0d9488,#22d3ee,#818cf8)",
                }}
                animate={{ width: progress + "%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Steps */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {STEPS.map(function (s, i) {
              return (
                <div
                  key={`step-${i}`}
                  className="flex items-center gap-3 px-4 py-3 transition-colors duration-300"
                  style={{
                    background:
                      i === step ? "rgba(34,211,238,0.04)" : "transparent",
                    borderBottom:
                      i < STEPS.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                  }}
                >
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {i < step ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#22d3ee"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    ) : i === step ? (
                      <motion.div
                        className="w-2 h-2 rounded-full bg-cyan-400"
                        animate={{ opacity: [1, 0.3, 1], scale: [1, 0.85, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{ boxShadow: "0 0 8px rgba(34,211,238,0.4)" }}
                      />
                    ) : (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      />
                    )}
                  </div>
                  <span
                    className="text-[13px] flex-1 transition-colors duration-300"
                    style={{
                      color:
                        i < step
                          ? "rgba(34,211,238,0.5)"
                          : i === step
                            ? "rgba(255,255,255,0.85)"
                            : "rgba(255,255,255,0.2)",
                      fontWeight: i === step ? 500 : 400,
                    }}
                  >
                    {s}
                  </span>
                  {i < step && (
                    <span
                      className="text-[10px]"
                      style={{
                        color: "rgba(34,211,238,0.3)",
                        fontFamily: "monospace",
                      }}
                    >
                      ✓
                    </span>
                  )}
                  {i === step && (
                    <motion.span
                      className="text-[10px]"
                      style={{
                        color: "rgba(255,255,255,0.2)",
                        fontFamily: "monospace",
                      }}
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      now
                    </motion.span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Activity feed */}
          <div
            className="rounded-xl px-4 py-3 flex-1"
            style={{
              background: "rgba(255,255,255,0.015)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <p
              className="text-[10px] uppercase tracking-widest mb-3"
              style={{ color: "rgba(255,255,255,0.13)" }}
            >
              Live activity
            </p>
            <div className="flex flex-col gap-2" style={{ minHeight: 72 }}>
              <AnimatePresence mode="popLayout">
                {ACTIVITY.slice(
                  Math.max(0, activityIndex - 2),
                  activityIndex + 1,
                ).map(function (msg, i, arr) {
                  const isLast = i === arr.length - 1;
                  const actualIndex = Math.max(0, activityIndex - 2) + i;
                  return (
                    <motion.div
                      key={`activity-${actualIndex}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: isLast ? 1 : 0.2, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2.5"
                    >
                      {isLast ? (
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0"
                          animate={{ opacity: [1, 0.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          style={{ boxShadow: "0 0 4px rgba(34,211,238,0.5)" }}
                        />
                      ) : (
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "rgba(255,255,255,0.08)" }}
                        />
                      )}
                      <span
                        className="text-[11px]"
                        style={{
                          color: isLast
                            ? "rgba(255,255,255,0.6)"
                            : "rgba(255,255,255,0.18)",
                          fontFamily: "monospace",
                        }}
                      >
                        {msg}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          <p className="text-center text-[10px]">
            Usually 1–3 min · do not close this tab
          </p>
        </div>

        {/* CENTRE: File explorer */}
        <div
          className="hidden md:flex flex-col overflow-hidden"
          style={{
            width: 220,
            borderRight: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            className="px-3 py-2 flex-shrink-0 flex items-center justify-between"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(0,0,0,0.15)",
            }}
          >
            <span
              className="text-[10px] uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Explorer
            </span>
            <span
              className="text-[10px] tabular-nums"
              style={{
                color: "rgba(255,255,255,0.12)",
                fontFamily: "monospace",
              }}
            >
              {visibleNodes.length} items
            </span>
          </div>

          <div
            className="flex-1 overflow-y-auto py-2 px-1"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.06) transparent",
            }}
          >
            <AnimatePresence initial={false}>
              {visibleNodes
                .filter(function (treeIdx) {
                  return treeIdx >= 0 && treeIdx < FILE_TREE.length;
                })
                .map(function (treeIdx) {
                  const node = FILE_TREE[treeIdx];
                  // safety guard — skip undefined nodes
                  if (!node) return null;

                  const isFolder = node.type === "folder";
                  const isActive = node.id === activeFileId;
                  const isDone =
                    !isFolder &&
                    streamedLines[node.id] &&
                    streamedLines[node.id].length > 0 &&
                    node.id !== activeFileId;
                  const indent = (node.depth || 0) * 16;

                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, x: -10, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="flex items-center gap-2 py-1.5 rounded-md cursor-default"
                      style={{
                        paddingLeft: 10 + indent + "px",
                        paddingRight: "8px",
                        background: isActive
                          ? "rgba(34,211,238,0.06)"
                          : "transparent",
                      }}
                    >
                      {isFolder ? (
                        <FolderIcon open />
                      ) : (
                        <FileIcon name={node.name} ext={node.ext} />
                      )}

                      <span
                        className="text-[11px] truncate flex-1"
                        style={{
                          fontFamily: "monospace",
                          color: isActive
                            ? "#22d3ee"
                            : isDone
                              ? "rgba(255,255,255,0.4)"
                              : isFolder
                                ? "rgba(229,192,123,0.7)"
                                : "rgba(255,255,255,0.3)",
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        {node.name}
                      </span>

                      {isActive && (
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-auto flex-shrink-0"
                          animate={{ opacity: [1, 0.2, 1] }}
                          transition={{ duration: 0.7, repeat: Infinity }}
                          style={{ boxShadow: "0 0 4px rgba(34,211,238,0.5)" }}
                        />
                      )}
                      {isDone && !isActive && (
                        <svg
                          className="ml-auto flex-shrink-0"
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="rgba(34,211,238,0.3)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: Code streaming panel */}
        <div className="hidden md:flex flex-1 flex-col overflow-hidden min-w-0">
          {/* Editor chrome */}
          <div
            className="flex items-center gap-3 px-4 py-2.5 flex-shrink-0"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(0,0,0,0.2)",
            }}
          >
            <div className="flex gap-1.5">
              {["#ff5f57", "#febc2e", "#28c840"].map(function (c, idx) {
                return (
                  <div
                    key={`traffic-${idx}`}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: c, opacity: 0.8 }}
                  />
                );
              })}
            </div>

            {activeNode && (
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-md ml-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-sm"
                  style={{
                    background: EXT_CLR[activeNode.ext] || "#888",
                    opacity: 0.7,
                  }}
                />
                <span
                  className="text-[11px]"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "monospace",
                  }}
                >
                  {activeNode.name}
                </span>
                <motion.div
                  className="w-1 h-1 rounded-full bg-cyan-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              </div>
            )}

            <div className="ml-auto">
              <div
                className="px-2 py-0.5 rounded-md flex items-center gap-1.5"
                >
                <span className="text-[10px] px-4" >Dummy Generation</span>
                <div
                  className="w-1.5 h-1.5 rounded-full bg-green-500"
                  style={{ boxShadow: "0 0 4px rgba(34,197,94,0.4)" }}
                />
                <span
                  className="text-[10px]"
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    fontFamily: "monospace",
                  }}
                >
                  localhost:3000
                </span>
              </div>
            </div>
          </div>

          {/* Code body */}
          <div
            className="flex-1 overflow-y-auto px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.008)",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.06) transparent",
            }}
          >
            {activeNode ? (
              <div
                style={{
                  fontFamily: "'JetBrains Mono','Fira Code',monospace",
                  fontSize: 12,
                  lineHeight: "1.8",
                }}
              >
                <div
                  className="pb-2 mb-3 flex items-center gap-2"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <div
                    className="w-2 h-2 rounded-sm"
                    style={{
                      background: EXT_CLR[activeNode.ext] || "#888",
                      opacity: 0.5,
                    }}
                  />
                  <span style={{ color: "#5c6370", fontSize: 11 }}>
                    // {activeNode.name}
                  </span>
                </div>

                {activeLines.map(function (line, i) {
                  return (
                    <motion.div
                      key={`${activeFileId}-${i}`}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.1 }}
                      className="flex gap-3"
                      style={{ minHeight: 22 }}
                    >
                      <span
                        className="select-none tabular-nums text-right"
                        style={{
                          minWidth: 28,
                          color: "rgba(255,255,255,0.1)",
                          fontSize: 11,
                        }}
                      >
                        {i + 1}
                      </span>
                      <span
                        className="whitespace-pre"
                        dangerouslySetInnerHTML={{ __html: tokenize(line) }}
                      />
                    </motion.div>
                  );
                })}

                {/* Blinking cursor */}
                <div className="flex gap-3" style={{ minHeight: 22 }}>
                  <span
                    className="select-none tabular-nums text-right"
                    style={{
                      minWidth: 28,
                      color: "rgba(255,255,255,0.1)",
                      fontSize: 11,
                    }}
                  >
                    {activeLines.length + 1}
                  </span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                      duration: 0.65,
                      repeat: Infinity,
                      ease: "anticipate",
                    }}
                    style={{
                      display: "inline-block",
                      width: 7,
                      height: 16,
                      background: "#22d3ee",
                      borderRadius: 1,
                      boxShadow: "0 0 8px rgba(34,211,238,0.3)",
                    }}
                  />
                </div>
                <div ref={codeEndRef} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(34,211,238,0.06)",
                    border: "1px solid rgba(34,211,238,0.1)",
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div
                    className="w-3 h-3 rounded-sm rotate-45"
                    style={{ background: "rgba(34,211,238,0.3)" }}
                  />
                </motion.div>
                <span
                  className="text-[12px]"
                  style={{
                    color: "rgba(255,255,255,0.12)",
                    fontFamily: "monospace",
                  }}
                >
                  Initializing workspace...
                </span>
              </div>
            )}
          </div>

          {/* Editor footer */}
          <div
            className="flex items-center gap-3 px-5 py-2 flex-shrink-0"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.04)",
              background: "rgba(0,0,0,0.15)",
            }}
          >
            <span
              className="text-[10px]"
              style={{
                color: "rgba(255,255,255,0.12)",
                fontFamily: "monospace",
              }}
            >
              React · Tailwind · Motion
            </span>
            <div className="ml-auto flex items-center gap-4">
              <span
                className="text-[10px]"
                style={{
                  color: "rgba(255,255,255,0.1)",
                  fontFamily: "monospace",
                }}
              >
                Ln {activeLines.length}, Col 1
              </span>
              <div className="flex items-center gap-1.5">
                <motion.div
                  className="w-1 h-1 rounded-full bg-amber-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span
                  className="text-[10px]"
                  style={{
                    color: "rgba(255,255,255,0.15)",
                    fontFamily: "monospace",
                  }}
                >
                  Compiling...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
