"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["intelligence", "clarity", "action", "outcomes", "minutes"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setWordIndex((i) => (i + 1) % WORDS.length),
      2400,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[88vh] flex flex-col justify-end pb-10 px-8 overflow-hidden">
      {/* ── Bottom-left content — exact reference layout ── */}
      <div className="max-w-lg relative z-10">
        {/* Badge pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center px-3 py-1 rounded-full mb-5 relative"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(8px)",
            filter: "url(#glass-effect)",
          }}
        >
          {/* Top gloss line */}
          <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="text-white/80 text-xs font-light relative z-10">
            AI-Powered Meeting Intelligence
          </span>
        </motion.div>

        {/* Main heading — reference uses font-light with italic accent */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="text-5xl md:text-6xl leading-[1.06] tracking-tight font-light text-white mb-4"
        >
          <span className="font-medium italic font-display">Exquisite</span>{" "}
          Meeting
          <br />
          <span className="font-light tracking-tight text-white">Into </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.32 }}
              className="font-medium italic font-display"
              style={{
                color: "#e07030",
                textShadow: "0 0 40px rgba(200,98,26,0.55)",
              }}
            >
              {WORDS[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="text-xs font-light text-white/60 mb-6 leading-relaxed max-w-sm"
        >
          Upload audio, images, or paste a transcript. AI extracts structured
          minutes, action items, and decisions — in seconds.
        </motion.p>

        {/* Buttons — reference style: outline + filled */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="flex items-center gap-4 flex-wrap"
        >
          <button
            onClick={() =>
              document
                .getElementById("app-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 rounded-full border text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer"
            style={{
              borderColor: "rgba(255,255,255,0.30)",
              background: "transparent",
            }}
          >
            See how it works
          </button>
          <button
            onClick={() =>
              document
                .getElementById("app-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer"
          >
            Get Started
          </button>
        </motion.div>
      </div>

      {/* ── Bottom-right pulsing orb — exact reference ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.55 }}
        className="absolute bottom-8 right-8 w-20 h-20 flex items-center justify-center z-10"
      >
        {/* Outer pulse rings */}
        <div
          className="absolute inset-0 rounded-full border animate-pulse-ring"
          style={{ borderColor: "rgba(200,98,26,0.35)" }}
        />
        <div
          className="absolute inset-2 rounded-full border animate-pulse-ring"
          style={{
            borderColor: "rgba(200,98,26,0.22)",
            animationDelay: "0.5s",
          }}
        />

        {/* Inner glowing dot */}
        <div
          className="relative w-11 h-11 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(200,98,26,0.12)",
            border: "1px solid rgba(200,98,26,0.35)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="w-3.5 h-3.5 rounded-full"
            style={{
              background: "#c8621a",
              boxShadow:
                "0 0 16px rgba(200,98,26,0.9), 0 0 32px rgba(200,98,26,0.45)",
            }}
          />
        </div>

        {/* Rotating text ring */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transform: "scale(1.65)", transformOrigin: "center" }}
        >
          <defs>
            <path
              id="c"
              d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
            />
          </defs>
          <text
            fill="rgba(255,255,255,0.40)"
            fontSize="7.5"
            fontFamily="monospace"
            letterSpacing="1.2"
          >
            <textPath href="#c" startOffset="0%">
              MEETMIND • AI MEETING INTELLIGENCE •{" "}
            </textPath>
          </text>
        </motion.svg>
      </motion.div>
    </section>
  );
}
