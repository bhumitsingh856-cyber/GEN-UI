"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";
import { useCodeStore } from "@/store/zustand";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Bot, User, X, Sparkles } from "lucide-react";

// ── helpers ──────────────────────────────────────────────────────────────────
function getShortName(path) {
  return path.split("/").pop();
}

function extractMentions(text) {
  const matches = text.match(/@(\S+)/g);
  if (!matches) return [];
  return matches.map(m => m.slice(1));
}

function removeMentions(text) {
  return text.replace(/@\S+/g, '').trim();
}

// ── ChatMessage ───────────────────────────────────────────────────────────────
function ChatMessage({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-3 items-start px-4 py-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/20">
          <Bot size={15} className="text-purple-400" />
        </div>
      )}

      <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
        isUser 
          ? 'bg-gradient-to-br from-purple-500/15 to-purple-600/5 border border-purple-500/20' 
          : 'bg-white/5 border border-white/10'
      }`}>
        <div className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap break-words">
          {msg.content}
        </div>
        {msg.patchedFile && (
          <div className="mt-2 text-[10px] text-green-400 font-mono opacity-80 flex items-center gap-1">
            <Sparkles size={10} />
            updated {getShortName(msg.patchedFile)}
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/20">
          <User size={15} className="text-purple-400" />
        </div>
      )}
    </div>
  );
}

// ── MentionTag ────────────────────────────────────────────────────────────────
function MentionTag({ file, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-2.5 py-0.5 text-[11px] text-cyan-400 font-mono">
      <span className="text-cyan-400/60">@</span>
      {getShortName(file)}
      <button
        onClick={onRemove}
        className="bg-none border-none text-cyan-400/30 cursor-pointer p-0 flex hover:text-cyan-400 transition-colors"
      >
        <X size={11} />
      </button>
    </span>
  );
}

// ── ChatPanel (main) ──────────────────────────────────────────────────────────
export default function ChatPanel({ isOpen, onClose }) {
  const { sandpack } = useSandpack();
  const { activeFile, files: sandpackFiles, updateFile } = sandpack;
  const { updateCode } = useCodeStore();

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! 👋 Mention a file with @filename and tell me what to change.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mentionedFiles, setMentionedFiles] = useState([]);
  
  // ── File dropdown states ──
  const [showFileDropdown, setShowFileDropdown] = useState(false);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [dropdownIndex, setDropdownIndex] = useState(0);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // ── Input handlers ──
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // Check for @ mention
    const lastAtIndex = value.lastIndexOf("@");
    if (lastAtIndex !== -1) {
      const afterAt = value.slice(lastAtIndex + 1);
      // Only show dropdown if no space after @
      if (!afterAt.includes(" ")) {
        const filtered = Object.keys(sandpackFiles).filter(f =>
          f.toLowerCase().includes(afterAt.toLowerCase())
        );
        setFilteredFiles(filtered);
        setShowFileDropdown(true);
        setDropdownIndex(0);
        return;
      }
    }

    setShowFileDropdown(false);
  };

  const handleFileSelect = (filePath) => {
    // Replace @query with @filename
    const lastAtIndex = input.lastIndexOf("@");
    const beforeAt = input.slice(0, lastAtIndex);
    const afterAt = input.slice(lastAtIndex).replace(/@\S*/, `@${filePath} `);
    setInput(beforeAt + afterAt);
    setShowFileDropdown(false);

    // Add to mentioned files
    setMentionedFiles(prev =>
      prev.includes(filePath) ? prev : [...prev, filePath]
    );

    inputRef.current?.focus();
  };

  const removeMention = (file) => {
    setMentionedFiles(prev => prev.filter(f => f !== file));
    setInput(prev => prev.replace(new RegExp(`@${file}\\b`), '').trim());
  };

  // ── Keyboard handlers ──
  const handleKeyDown = (e) => {
    if (showFileDropdown) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setDropdownIndex(prev => Math.min(prev + 1, filteredFiles.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setDropdownIndex(prev => Math.max(prev - 1, 0));
        return;
      }
      if (e.key === "Enter" && filteredFiles.length > 0) {
        e.preventDefault();
        handleFileSelect(filteredFiles[dropdownIndex]);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setShowFileDropdown(false);
        return;
      }
    }

    // Original Enter logic
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Send message ──
  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const targetFile = mentionedFiles.length > 0 ? mentionedFiles[0] : activeFile;
    const currentCode = sandpackFiles[targetFile]?.code || "";

    const mentionContext = {};
    mentionedFiles
      .filter(f => f !== targetFile)
      .forEach(f => {
        mentionContext[f] = sandpackFiles[f]?.code || "";
      });

    const cleanInstruction = removeMentions(trimmed);

    const userMsg = {
      role: "user",
      content: trimmed,
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setMentionedFiles([]);
    setLoading(true);

    try {
      const res = await axios.post("/api/editui", {
        filePath: targetFile,
        currentCode,
        instruction: cleanInstruction,
        mentionedFiles: mentionContext,
      });

      if (res.data.success) {
        updateFile(targetFile, res.data.code);
        updateCode(targetFile, { code: res.data.code });

        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: `✅ Done! I've updated **${getShortName(targetFile)}**`,
            patchedFile: targetFile,
          },
        ]);
      } else {
        throw new Error(res.data.error || "Edit failed");
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: `❌ ${err.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="flex flex-col w-full md:w-[380px] flex-shrink-0 h-[100dvh] bg-[#0a0a0f] border-l border-white/5 fixed top-0 right-0 z-[9999] overflow-hidden"
    >
      {/* ── Header ── */}
      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between flex-shrink-0 bg-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse" />
          <span className="text-sm font-semibold text-white/90">UI Assistant</span>
          <span className="text-[10px] text-white/80 bg-white/5 px-2 py-0.5 rounded-full font-mono border border-white/10">
            {getShortName(activeFile)}
          </span>
        </div>

        <button
          onClick={onClose}
          className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg p-1.5 text-white/40 hover:text-white/70 transition-all duration-200"
        >
          <X size={15} />
        </button>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto py-3 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
        {messages.map((msg, i) => (
          <ChatMessage key={i} msg={msg} />
        ))}

        {loading && (
          <div className="px-4 py-3 flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/20">
              <Bot size={15} className="text-purple-400" />
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10">
              <Loader2 size={14} className="text-purple-400 animate-spin" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Mention Tags ── */}
      <AnimatePresence>
        {mentionedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-2 border-t border-white/5 flex flex-wrap gap-1.5 flex-shrink-0"
          >
            {mentionedFiles.map((f) => (
              <MentionTag key={f} file={f} onRemove={() => removeMention(f)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Input ── */}
      <div className="px-4 py-3 border-t border-white/5 flex-shrink-0 bg-white/5 backdrop-blur-sm relative">
        <div className="flex gap-2 items-end bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 focus-within:border-purple-500/30 transition-colors">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={`@${getShortName(activeFile)} to edit, or ask...`}
            disabled={loading}
            className="flex-1 bg-transparent border-none outline-none text-white/85 text-sm py-1.5 font-sans disabled:opacity-50 placeholder:text-white/20"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className={`flex-shrink-0 w-8 h-8 rounded-lg border-none flex items-center justify-center transition-all ${
              input.trim() && !loading 
                ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-400 cursor-pointer hover:from-purple-500/30 hover:to-cyan-500/30' 
                : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Send size={14} />
            )}
          </button>
        </div>

        {/* ── File Dropdown ── */}
        <AnimatePresence>
          {showFileDropdown && filteredFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute bottom-full left-0 right-0 mb-1 bg-[#0a0a0f] border border-white/10 rounded-xl overflow-hidden shadow-2xl max-h-[200px] overflow-y-auto z-50"
            >
              {filteredFiles.map((f, index) => (
                <button
                  key={f}
                  onClick={() => handleFileSelect(f)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                    index === dropdownIndex
                      ? 'bg-purple-500/20 text-white'
                      : 'text-white/70 hover:bg-white/5'
                  }`}
                  onMouseEnter={() => setDropdownIndex(index)}
                >
                  <span className="text-cyan-400">@</span>
                  <span className="font-mono">{getShortName(f)}</span>
                  <span className="text-white/30 text-xs ml-auto">{f}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-2 text-[10px] text-white/60 text-center flex items-center justify-center gap-3">
          <span>@ to mention files</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>Enter to send</span>
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
      `}</style>
    </motion.div>
  );
}