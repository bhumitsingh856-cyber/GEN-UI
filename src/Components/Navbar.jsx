import Export from "./Export";
import { AIFixButton } from "./MagicFix";
import LiveLink from "./LiveLink";
import Logo from "./Logo";
import { MessageSquare } from "lucide-react";

function Navbar({ onChatToggle, chatOpen }) {
  return (
    <nav className="flex gap-1 items-center justify-between bg-black rounded-l-full overflow-hidden p-1">
      <Logo />
      <div className="flex gap-1 items-center">
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
        ? "bg-green-500/30 text-green-300 border border-green-400/50"
        : "bg-green-500/15 text-green-400 hover:bg-green-500/25 border border-green-500/20 hover:border-green-400/40"
    }
  `}
        >
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            UI Assistant
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
