import Link from "next/link";
const Logo = () => {
  return (
    <Link href="/" className="flex items-center  gap-2">
      <div
        className="w-6 h-6 rounded-md flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(6,182,212,0.25), rgba(124,58,237,0.15))",
          border: "1px solid rgba(6,182,212,0.25)",
        }}
      >
        <div
          className="w-2 h-2 rounded-sm rotate-45"
          style={{
            background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
          }}
        />
      </div>
      <span className="text-[15px] font-semibold tracking-tight">
        GEN<span className="text-cyan-400">UI</span>
      </span>
    </Link>
  );
};

export default Logo;
