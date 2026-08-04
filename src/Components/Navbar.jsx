import Export from "./Export";
import { AIFixButton } from "./MagicFix";
import LiveLink from "./LiveLink";
import Logo from "./Logo";
import { MessageSquare, Menu, X, Folder } from "lucide-react";
import SyncButton from "./SyncCodes";
import { useState } from "react";
import Auth from "./Auth";
import { Show } from "@clerk/nextjs";
import Link from "next/link";
function Navbar({ onChatToggle, chatOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="flex gap-1 items-center justify-between bg-black rounded-l-full overflow-hidden p-1">
      <Logo />

      {/* Desktop Buttons */}
      <div className="hidden sm:flex gap-2 items-center">
        <Show when={"signed-in"}>
          <Link
            href="/projects"
            className="px-3 py-1 text-xs hover:scale-105 rounded-full bg-white/10 text-white/80 hover:bg-white/20 border border-white/20 transition flex items-center gap-1"
          >
            <Folder className="w-3 h-3" />
            Projects
          </Link>
        </Show>
        <SyncButton />
        <LiveLink />
        <Export />
        <AIFixButton />
        <button
          onClick={onChatToggle}
          className={`
            px-3 py-1 text-xs rounded-full 
            transition-all duration-200
            ${
              chatOpen
                ? "bg-purple-500/30 text-purple-300 border border-purple-400/50"
                : "bg-purple-500/15 text-purple-200 hover:bg-purple-500/25 border border-purple-500/20 hover:border-purple-400/40"
            }
            `}
        >
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            UI Assistant
          </span>
        </button>
        <Auth />
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="sm:hidden text-white/70 hover:text-white p-1"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full right-0 mt-2 p-3  bg-black/40 backdrop-blur-sm  border border-white/10 rounded-xl sm:hidden flex flex-col items-end gap-2 z-[99] mr-2 min-w-[150px]">
          <Auth />

          <Show when={"signed-in"}>
            <Link
              href="/projects"
              className="px-3 py-1 text-xs hover:scale-105 rounded-full bg-white/10 text-white/80 hover:bg-white/20 border border-white/20 transition flex items-center gap-1"
            >
              <Folder className="w-3 h-3" />
              Projects
            </Link>
          </Show>
          <SyncButton />
          <LiveLink />
          <Export />
          <AIFixButton />
          <button
            onClick={() => {
              onChatToggle();
              setMobileMenuOpen(false);
            }}
            className={`
              px-3 py-1 text-xs rounded-full w-full 
              transition-all duration-200
              ${
                chatOpen
                  ? "bg-purple-500/30 text-purple-300 border border-purple-400/50"
                  : "bg-purple-500/15 text-purple-300 hover:bg-purple-500/25 border border-purple-500/20 hover:border-purple-400/40"
              }
            `}
          >
            <span className="flex items-center justify-center gap-1">
              <MessageSquare className="w-3 h-3 " />
              <span>UI Assistant</span>
            </span>
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
