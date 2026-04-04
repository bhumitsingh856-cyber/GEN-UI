import Export from "./Export";
import { AIFixButton } from "./MagicFix";
import LiveLink from "./LiveLink";
import Logo from "./Logo";

function Navbar() {
  return (
    <nav className="flex gap-1 items-center justify-between bg-black rounded-l-full overflow-hidden p-1">
      <Logo />
      <div className="flex gap-1">
        <LiveLink />
        <AIFixButton />
        <Export />
      </div>
    </nav>
  );
}

export default Navbar;
