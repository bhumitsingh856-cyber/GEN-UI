"use client";

import React, { useState, useRef, useEffect, useEffectEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useCodeStore } from "@/store/zustand";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GeneratingOverlay } from "@/Components/Generating";
import Logo from "@/Components/Logo";
import toast from "react-hot-toast";
const SUGGESTIONS = [
  "Landing page for an AI startup",
  "Modern SaaS dashboard UI",
  "Portfolio with scroll animations",
  "Pricing page with 3 tiers",
  "Crypto analytics dashboard",
  "Blog homepage with sidebar",
];

const CAPS = ["React + Tailwind", "Responsive", "Production ready", "Instant"];

// ── Main ──
export default function LandingPrompt() {
  const [prompt, setPrompt] = useState("");
  const [focused, setFocused] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const textareaRef = useRef(null);
  const { setFiles } = useCodeStore();
  const router = useRouter();

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [prompt]);
  useEffect(() => {
    toast.success("Welcome to GEN UI", {
      icon: "✨",
      style: {
        backgroundColor: "#050507",
        color: "#fff",
        border: "1px solid #06b6d4",
      },
      duration: 3000,
    });
  }, []);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    setSubmittedPrompt(prompt);
    setIsGenerating(true);
    try {
      console.log("Data sent");
      const res = await axios.post("/api/genui", { prompt });
      console.log("Data recieved", res);
      if (res.data.success) {
        console.log("data", res.data);
        setFiles(res.data.res);
        router.push("/editor");
      } else {
        toast.error("Failed to generate code , Try again", {
          icon: "❌",
          style: {
            backgroundColor: "#050507",
            color: "#fff",
            border: "1px solid red",
          },
          duration: 3000,
        });
      }
    } catch (e) {
      console.log(e);
      setIsGenerating(false);
      toast.error("Something went wrong , Try again", {
        icon: "❌",
        style: {
          backgroundColor: "#050507",
          color: "#fff",
          border: "1px solid red",
        },
        duration: 3000,
      });
    }
  };

  return (
    <>
      <AnimatePresence>
        {/* {!isGenerating && <GeneratingOverlay prompt={submittedPrompt} />} */}
      </AnimatePresence>

      <div className="relative min-h-screen w-full bg-[#050507] text-white flex flex-col items-center overflow-x-hidden">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
          * { font-family: 'Inter', sans-serif; }
          textarea { outline: none !important; resize: none; }
          textarea::placeholder { color: rgba(80,80,100,0.9); font-size: 0.9rem; }
          ::selection { background: rgba(6,182,212,0.2); }
        `}</style>

        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 75% 55% at 50% 0%, black, transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[340px] z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(6,182,212,0.13) 0%, rgba(124,58,237,0.07) 50%, transparent 75%)",
            filter: "blur(40px)",
          }}
        />
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-5xl flex items-center justify-between px-6 pt-6 z-10"
        >
          <Logo></Logo>
          <div className="flex items-center gap-6">
            <Link
              href="/editor"
              className="text-[13px] flex text-white decoration-zinc-300 underline underline-offset-4 hover:text-white/55 transition-colors duration-150"
            >
              Code <h1 className="text-cyan-400">Editor</h1>
            </Link>
            <Link
              href="https://github.com/bhumitsingh856-cyber/GEN-UI"
              target="_blank"
              className="text-[13px] text-white flex underline decoration-zinc-300 underline-offset-4 hover:text-white/55 transition-colors duration-150"
            >
              Git <h1 className="text-cyan-400">Hub</h1>
            </Link>
          </div>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-[clamp(3.5rem,10vw,6rem)] mb-10 max-w-2xl px-4 z-10"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6"
            style={{
              background: "rgba(6,182,212,0.07)",
              border: "1px solid rgba(6,182,212,0.15)",
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[11px] text-cyan-400 font-medium tracking-widest uppercase">
              AI Frontend Builder
            </span>
          </div>

          <h1
            className="font-semibold leading-[1.07] mb-5"
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)",
              letterSpacing: "-0.035em",
            }}
          >
            Generate frontend UI
            <br />
            <span
              style={{
                background: "linear-gradient(95deg, #22d3ee 20%, #a78bfa 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              with AI
            </span>
          </h1>

          <p
            className="text-white/30 leading-relaxed font-light"
            style={{ fontSize: "0.9375rem" }}
          >
            Describe a website or component — GENUI writes the code.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[640px] px-4 z-10"
        >
          <motion.div
            animate={{
              boxShadow: focused
                ? "0 0 0 1px rgba(6,182,212,0.3), 0 8px 32px rgba(6,182,212,0.06), 0 24px 64px rgba(0,0,0,0.55)"
                : "0 0 0 1px rgba(255,255,255,0.07), 0 24px 64px rgba(0,0,0,0.4)",
            }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.032)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              className="relative h-[1px]"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <AnimatePresence>
                {focused && (
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 origin-center"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 5%, rgba(6,182,212,0.65) 35%, rgba(167,139,250,0.55) 65%, transparent 95%)",
                    }}
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-end gap-2 px-4 pt-[14px] pb-3">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Create a modern SaaS landing page with hero, features and CTA..."
                className="flex-1 bg-transparent text-white/85 leading-[1.65] px-1"
                style={{
                  fontSize: "0.9375rem",
                  minHeight: "54px",
                  maxHeight: "200px",
                }}
              />
              <motion.button
                onClick={handleSubmit}
                disabled={!prompt.trim() || isGenerating}
                whileHover={
                  prompt.trim() && !isGenerating ? { scale: 1.07 } : {}
                }
                whileTap={prompt.trim() && !isGenerating ? { scale: 0.92 } : {}}
                className="flex-shrink-0 mb-[2px] w-[38px] h-[38px] rounded-xl flex items-center justify-center transition-all duration-200"
                style={
                  prompt.trim() && !isGenerating
                    ? {
                        background:
                          "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(124,58,237,0.15))",
                        border: "1px solid rgba(6,182,212,0.38)",
                        boxShadow: "0 0 16px rgba(6,182,212,0.12)",
                        color: "#22d3ee",
                      }
                    : {
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        color: "rgba(255,255,255,0.18)",
                      }
                }
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </motion.button>
            </div>

            <div className="flex items-center justify-between px-5 pb-[13px]">
              <div className="flex items-center gap-1.5">
                <motion.span
                  className="w-[6px] h-[6px] rounded-full"
                  style={{ background: "#22d3ee" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span className="text-[11px] font-medium text-zinc-400">
                  Kimi K2.5
                </span>
              </div>
              <span className="text-[11px] text-zinc-400">
                ⇧ Enter · new line
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mt-5 max-w-[640px] px-4 z-10"
        >
          {SUGGESTIONS.map((s, i) => (
            <motion.button
              key={s}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38 + i * 0.045 }}
              onClick={() => {
                setPrompt(s);
                textareaRef.current?.focus();
              }}
              className="px-3.5 py-[7px] rounded-full text-[12px] font-light transition-all duration-150"
              style={{
                color: "rgba(255,255,255,0.32)",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                e.currentTarget.style.borderColor = "rgba(6,182,212,0.28)";
                e.currentTarget.style.background = "rgba(6,182,212,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.32)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.background = "rgba(255,255,255,0.025)";
              }}
            >
              {s}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.55 }}
          className="flex items-center gap-2 flex-wrap justify-center mt-14 px-4 z-10"
        >
          {CAPS.map((cap, i) => (
            <React.Fragment key={cap}>
              <span className="text-[12px] text-zinc-200 bg-blue-900/10 border border-blue-800/50 px-2 py-1 rounded-full">
                {cap}
              </span>
              {i < CAPS.length - 1 && (
                <span
                  className="w-[3px] h-[3px] rounded-full"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-14 mb-8 text-[11px] z-10 text-stone-400"
        >
          GEN UI — AI Frontend Builder
        </motion.p>
      </div>
    </>
  );
}
