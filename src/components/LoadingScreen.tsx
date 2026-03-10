"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_FACTS = [
  "Did you know? Kayvon once triple-barrel bluffed into quads...",
  "Loading Kayvon's schedule... just kidding, he's not free",
  "Calculating Kayvon's poker win rate... still calculating...",
  "Asking Kayvon's handler for permission to load this page...",
  "Kayvon is analyzing whether this website should load...",
  "Checking if Kayvon's girlfriend approved this visit...",
  "Running it out... one more card... just one more...",
  "Kayvon lost credit card roulette while this page loaded",
  "Loading Kayvon's fashion sense... file not found",
  "Consulting Kayvon's Sunday League game tape...",
  "Kayvon wants to re-analyze the loading bar",
  "The game was closer than the loading bar indicates",
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [fact] = useState(() => LOADING_FACTS[Math.floor(Math.random() * LOADING_FACTS.length)]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + 1;
      });
    }, 40);

    const timer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold golabi-text mb-4">
            KAYVON DELDAR
          </h1>
          <p className="text-zinc-500 text-sm tracking-[0.3em] uppercase mb-12">
            Official Website Loading...
          </p>
        </motion.div>

        <div className="w-64 md:w-80 h-1 bg-zinc-800 rounded-full overflow-hidden mb-8">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-zinc-400 text-sm md:text-base italic max-w-md text-center px-4"
        >
          {fact}
        </motion.p>

        <div className="absolute bottom-8 text-zinc-600 text-xs">
          Golabi Certified &trade;
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
