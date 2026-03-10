"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ANALYSIS_POPUPS = [
  "Kayvon noticed you scrolled past the poker section. He'd like to discuss.",
  "Kayvon thinks you should have clicked that button differently.",
  "Kayvon is analyzing your browsing pattern.",
  "Kayvon would like to re-read the scouting report. Can you scroll back?",
  "Kayvon wants to know why you haven't rated his outfit yet.",
  "Kayvon is calculating the EV of your page visit.",
  "Kayvon noticed you've been here for a while. His handler is concerned.",
  "Kayvon thinks you should run it out. Just one more section.",
  "Kayvon is preparing a 3-page analysis of your scroll behavior.",
  "Kayvon would like to invite his girlfriend to view this site.",
];

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export default function GlobalFeatures() {
  const [popup, setPopup] = useState<string | null>(null);
  const [showKonami, setShowKonami] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [scrollBackMsg, setScrollBackMsg] = useState(false);

  // Random analysis popups every 30-60 seconds
  useEffect(() => {
    const schedulePopup = () => {
      const delay = 30000 + Math.random() * 30000;
      return setTimeout(() => {
        setPopup(ANALYSIS_POPUPS[Math.floor(Math.random() * ANALYSIS_POPUPS.length)]);
        setTimeout(() => setPopup(null), 4000);
      }, delay);
    };

    let timer = schedulePopup();
    const interval = setInterval(() => {
      timer = schedulePopup();
    }, 45000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Random scroll-back
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && window.scrollY > 500) {
        window.scrollBy({ top: -200, behavior: "smooth" });
        setScrollBackMsg(true);
        setTimeout(() => setScrollBackMsg(false), 2500);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Konami code
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    setKonamiProgress((prev) => {
      if (e.key === KONAMI[prev]) {
        const next = prev + 1;
        if (next === KONAMI.length) {
          setShowKonami(true);
          return 0;
        }
        return next;
      }
      return e.key === KONAMI[0] ? 1 : 0;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* Analysis popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed top-20 right-4 z-40 max-w-xs bg-zinc-900 border border-pink-500/30 rounded-xl p-4 shadow-2xl shadow-pink-500/10"
          >
            <div className="flex items-start gap-2">
              <span className="text-pink-400 text-lg shrink-0">&#128064;</span>
              <div>
                <p className="text-pink-400 text-xs font-bold tracking-wider mb-1">KAYVON ANALYSIS</p>
                <p className="text-zinc-300 text-sm">{popup}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll back message */}
      <AnimatePresence>
        {scrollBackMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 bg-zinc-900 border border-zinc-700 rounded-full px-6 py-2 shadow-lg"
          >
            <p className="text-zinc-400 text-sm">
              &#8593; Kayvon wants to re-analyze that section
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konami code easter egg */}
      <AnimatePresence>
        {showKonami && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            onClick={() => setShowKonami(false)}
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-700 mb-4">
                The One Time Kayvon Was Actually Right
              </h2>
              <div className="h-40" />
              <p className="text-zinc-800 text-sm">(This page intentionally left blank)</p>
              <p className="text-zinc-800 text-xs mt-8">Click anywhere to go back</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
