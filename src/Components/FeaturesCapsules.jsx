import React from "react";
import { motion } from "framer-motion";

const CAPS = ["React + Tailwind", "Responsive", "Production ready", "Instant"];

function FeaturesCapsules() {
  return (
    <div>
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
      {/* ── Footer ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-14 mb-8 text-[11px] z-10 text-stone-400 text-center"
      >
        GEN UI — AI Frontend Builder
      </motion.div>
    </div>
  );
}

export default FeaturesCapsules;
