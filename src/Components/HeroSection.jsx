import React from "react";
import {motion} from "framer-motion";
export const HeroSection = React.memo(() => (
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
      Describe a website or component — GEN UI builds the App.
    </p>
  </motion.div>
));