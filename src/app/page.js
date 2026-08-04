"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useCodeStore } from "@/store/zustand";
import { useRouter } from "next/navigation";
import { saveProject } from "@/actions/saveProject";
import GeneratingOverlay from "@/Components/Generating";
import { NavBar } from "@/Components/HomeNav";
import toast from "react-hot-toast";
import { Send, Loader2 } from "lucide-react";
import { HeroSection } from "@/Components/HeroSection";
import FeaturesCapsules from "@/Components/FeaturesCapsules";
import { useUser } from "@clerk/nextjs";
const SUGGESTIONS = [
  "Landing page for an AI startup",
  "Modern SaaS dashboard UI",
  "Portfolio with scroll animations",
  "Pricing page with 3 tiers",
  "Crypto analytics dashboard",
  "Blog homepage with sidebar",
];

const TOAST_STYLES = {
  background: "#050507",
  color: "#fff",
  border: "1px solid #06b6d4",
};

const ERROR_TOAST_STYLES = {
  background: "#050507",
  color: "#fff",
  border: "1px solid #ef4444",
};

// ── Sub-components ────────────────────────────────────────────────────────────

const BackgroundEffects = React.memo(() => (
  <>
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
  </>
));

const SuggestionButton = React.memo(({ suggestion, onClick }) => (
  <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    onClick={onClick}
    className="px-3.5 py-[7px] rounded-full text-[12px] font-light transition-all duration-150 hover:scale-105"
    style={{
      color: "rgba(255,255,255,0.32)",
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.07)",
      letterSpacing: "0.01em",
    }}
    whileHover={{
      color: "rgba(255,255,255,0.65)",
      borderColor: "rgba(6,182,212,0.28)",
      background: "rgba(6,182,212,0.05)",
    }}
  >
    {suggestion}
  </motion.button>
));

// ── Main Component ────────────────────────────────────────────────────────────

export default function LandingPrompt() {
  const [prompt, setPrompt] = useState("");
  const [focused, setFocused] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setFiles, setCurrentProjectID } = useCodeStore();
  const { user } = useUser();
  const [limit, setLimit] = useState(null);
  const textareaRef = useRef(null);
  const router = useRouter();

  // ── Auto-resize textarea ──────────────────────────────────────────────────
  useEffect(() => {
    if (!user) {
      const savedLimit = localStorage.getItem("genui_limit");
      if (!savedLimit) {
        localStorage.setItem("genui_limit", "3");
        setLimit(3);
      } else if (parseInt(savedLimit, 10) <= 0) {
        setLimit(0);
        toast.error(
          "You have reached your free limit of 3 generations. Please Sign up to get more.",
          {
            icon: "⚠️",
            style: ERROR_TOAST_STYLES,
            duration: 4000,
          },
        );
      } else {
        setLimit(parseInt(savedLimit, 10));
      }
    }
  }, []);
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [prompt]);

  // ── Welcome toast ────────────────────────────────────────────────────────

  useEffect(() => {
    toast.success("Welcome to GEN UI", {
      icon: "✨",
      style: TOAST_STYLES,
      duration: 3000,
    });
  }, []);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();

      if (!prompt.trim() || isGenerating || isLoading) return;

      setSubmittedPrompt(prompt);
      setIsGenerating(true);
      setIsLoading(true);

      try {
        const res = await axios.post("/api/genui", { prompt });

        if (res.data.success) {
          setFiles(res.data.res);
          toast.success("UI Generated Successfully! 🎉", {
            icon: "🚀",
            style: TOAST_STYLES,
            duration: 3000,
          });

          const saved = await saveProject({ files: res.data.res, prompt });
          if (saved?.success && saved.project?._id) {
            setCurrentProjectID(saved.project._id);
          }
          // Check for non users limit
          if (!user && limit && limit > 0) {
            const newLimit = limit - 1;
            setLimit(newLimit);
            localStorage.setItem("genui_limit", newLimit.toString());
          }
          router.push("/editor");
        } else {
          throw new Error(res.data.message || "Generation failed");
        }
      } catch (error) {
        setIsGenerating(false);
        toast.error(
          error.response?.data?.message || "Something went wrong. Try again.",
          {
            icon: "❌",
            style: ERROR_TOAST_STYLES,
            duration: 4000,
          },
        );
      } finally {
        setIsLoading(false);
      }
    },
    [prompt, isGenerating, isLoading, setFiles, router],
  );

  const handleSuggestionClick = useCallback((suggestion) => {
    setPrompt(suggestion);
    textareaRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit],
  );

  // ── Memoized values ─────────────────────────────────────────────────────

  const isButtonDisabled = useMemo(
    () => !prompt.trim() || isGenerating || isLoading || limit == 0,
    [prompt, isGenerating, isLoading, limit],
  );

  const buttonStyles = useMemo(() => {
    if (isButtonDisabled) {
      return {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        color: "rgba(255,255,255,0.18)",
        cursor: "not-allowed",
      };
    }
    return {
      background:
        "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(124,58,237,0.15))",
      border: "1px solid rgba(6,182,212,0.38)",
      boxShadow: "0 0 16px rgba(6,182,212,0.12)",
      color: "#22d3ee",
    };
  }, [isButtonDisabled]);

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      <AnimatePresence>
        {isGenerating && <GeneratingOverlay prompt={submittedPrompt} />}
      </AnimatePresence>

      <div className="relative min-h-screen w-full bg-[#050507] text-white flex flex-col items-center overflow-x-hidden">
        <style jsx>{`
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap");
          * {
            font-family: "Inter", sans-serif;
          }
          textarea {
            outline: none !important;
            resize: none;
          }
          textarea::placeholder {
            color: rgba(80, 80, 100, 0.9);
            font-size: 0.9rem;
          }
          ::selection {
            background: rgba(6, 182, 212, 0.2);
          }
        `}</style>

        <BackgroundEffects />

        <NavBar limit={limit} />

        <HeroSection />

        {/* ── Input Section ── */}
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
            {/* Focus indicator line */}
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

            {/* Textarea */}
            <div className="flex items-end gap-2 px-4 pt-[14px] pb-3">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder="Create a modern SaaS landing page with hero, features and CTA..."
                className="flex-1 bg-transparent text-white/85 leading-[1.65] px-1"
                style={{
                  fontSize: "0.9375rem",
                  minHeight: "54px",
                  maxHeight: "200px",
                }}
                disabled={isGenerating || isLoading}
              />

              {/* Submit Button */}
              <motion.button
                onClick={handleSubmit}
                disabled={isButtonDisabled}
                whileHover={!isButtonDisabled ? { scale: 1.07 } : {}}
                whileTap={!isButtonDisabled ? { scale: 0.92 } : {}}
                className="flex-shrink-0 mb-[2px] w-[38px] h-[38px] rounded-xl flex items-center justify-center transition-all duration-200 relative"
                style={buttonStyles}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </motion.button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 pb-[13px]">
              <div className="flex items-center gap-1.5">
                <motion.span
                  className="w-[6px] h-[6px] rounded-full"
                  style={{ background: "#22d3ee" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span className="text-[11px] font-medium text-zinc-400">
                  Deepseek-v4-flash
                </span>
              </div>
              <span className="text-[11px] text-zinc-400">
                ⇧ Enter · new line
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Suggestions ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mt-5 max-w-[640px] px-4 z-10"
        >
          {SUGGESTIONS.map((s, i) => (
            <SuggestionButton
              key={s}
              suggestion={s}
              onClick={() => handleSuggestionClick(s)}
            />
          ))}
        </motion.div>

        {/* ── Features Capsules ── */}
        <FeaturesCapsules />
      </div>
    </>
  );
}
