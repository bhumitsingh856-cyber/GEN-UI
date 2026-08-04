import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { Github, Folder, Code, Menu, X } from "lucide-react";
import Auth from "./Auth";
import { Show } from "@clerk/nextjs";

export function NavBar({ limit }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-5xl flex items-center justify-between px-6 pt-6  relative z-20 top-0" // ← Added sticky top-0
    >
      <Logo />

      {/* Desktop */}
      <div className="hidden sm:flex items-center gap-6">
        <Show when="signed-in">
          <Link
            href="/projects"
            className="text-[13px] flex text-white underline decoration-zinc-300 underline-offset-4 hover:text-white/55 transition group"
          >
            <Folder className="w-4 h-4 mr-1 group-hover:text-cyan-400 transition-colors" />
            <span className="group-hover:text-cyan-400 transition-colors">
              My
            </span>
            <span className="text-cyan-400">Projects</span>
          </Link>
        </Show>
        <Link
          href="/editor"
          className="text-[13px] flex text-white underline decoration-zinc-300 underline-offset-4 hover:text-white/55 transition group"
        >
          <Code className="w-4 h-4 mr-1 group-hover:text-cyan-400" />
          <span className="group-hover:text-cyan-400">Code</span>
          <span className="text-cyan-400">Editor</span>
        </Link>

        <Link
          href="https://github.com/bhumitsingh856-cyber/GEN-UI"
          target="_blank"
          className="text-[13px] text-white flex underline decoration-zinc-300 underline-offset-4 hover:text-white/55 transition group"
        >
          <Github className="w-4 h-4 mr-1 group-hover:text-cyan-400" />
          <span className="group-hover:text-cyan-400">Git</span>
          <span className="text-cyan-400">Hub</span>
        </Link>

        <Auth limit={limit} />
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="sm:hidden text-white/70"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 mx-4 p-4 backdrop-blur-xl border border-white/10 rounded-xl sm:hidden flex flex-col items-end ml-auto w-fit gap-4 z-20">
          <Show when="signed-in">
            <Link
              href="/projects"
              className="text-[13px] flex text-white underline decoration-zinc-300 underline-offset-4 hover:text-white/55 transition group"
            >
              <Folder className="w-4 h-4 mr-1 group-hover:text-cyan-400 transition-colors" />
              <span className="group-hover:text-cyan-400 transition-colors">
                My
              </span>
              <span className="text-cyan-400">Projects</span>
            </Link>
          </Show>
          <Link
            href="/editor"
            className="text-[13px] flex text-white underline decoration-zinc-300 underline-offset-4 hover:text-white/55 transition group"
            onClick={() => setOpen(false)}
          >
            <Code className="w-4 h-4 mr-1 group-hover:text-cyan-400" />
            <span className="group-hover:text-cyan-400">Code</span>
            <span className="text-cyan-400">Editor</span>
          </Link>

          <Link
            href="https://github.com/bhumitsingh856-cyber/GEN-UI"
            target="_blank"
            className="text-[13px] text-white flex underline decoration-zinc-300 underline-offset-4 hover:text-white/55 transition group"
            onClick={() => setOpen(false)}
          >
            <Github className="w-4 h-4 mr-1 group-hover:text-cyan-400" />
            <span className="group-hover:text-cyan-400">Git</span>
            <span className="text-cyan-400">Hub</span>
          </Link>
          <Auth limit={limit} />
        </div>
      )}
    </motion.nav>
  );
}
