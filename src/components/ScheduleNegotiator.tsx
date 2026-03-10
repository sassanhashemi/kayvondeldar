"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EXCUSES = [
  "Kayvon has a 'work thing' at Voxel.",
  "The handler said no.",
  "Kayvon needs to wash his post-GAP wardrobe.",
  "Kayvon is busy analyzing a poker hand from 2019.",
  "Kayvon's girlfriend has plans. So Kayvon has plans.",
  "Kayvon is preparing his Sunday League scouting report.",
  "This conflicts with Kayvon's credit card roulette recovery session.",
  "Kayvon needs at least 6 weeks notice for social events.",
  "Kayvon would come but only if his girlfriend can come to boys' night.",
  "Kayvon is free but spiritually unavailable.",
  "Kayvon's handler is checking the handler's handler.",
  "Kayvon already committed to staring at his phone that day.",
  "Kayvon is still processing his pickleball loss to Kian.",
  "Denied. Kayvon has a mandatory outfit planning session.",
];

const MONTHS = ["January", "February", "March", "April", "May", "June"];

interface SlotState {
  month: number;
  day: number;
  status: "available" | "rejected" | "final";
  excuse?: string;
}

export default function ScheduleNegotiator() {
  const [attempts, setAttempts] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [rejectedSlots, setRejectedSlots] = useState<Record<string, string>>({});
  const [showFinal, setShowFinal] = useState(false);
  const [showExcuse, setShowExcuse] = useState<string | null>(null);

  const generateDays = useCallback((monthIndex: number) => {
    const days = [];
    const daysInMonth = [31, 28, 31, 30, 31, 30][monthIndex];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, []);

  const handleDayClick = (day: number) => {
    const key = `${currentMonth}-${day}`;
    if (rejectedSlots[key]) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= 10 && currentMonth >= 2 && day === 17) {
      setShowFinal(true);
      return;
    }

    const excuse = EXCUSES[Math.floor(Math.random() * EXCUSES.length)];
    setRejectedSlots((prev) => ({ ...prev, [key]: excuse }));
    setShowExcuse(excuse);
    setTimeout(() => setShowExcuse(null), 4000);
  };

  const getDayStatus = (day: number): "available" | "rejected" | "final" => {
    const key = `${currentMonth}-${day}`;
    if (rejectedSlots[key]) return "rejected";
    if (attempts >= 10 && currentMonth >= 2 && day === 17) return "final";
    return "available";
  };

  return (
    <section className="py-24 px-4 bg-zinc-950/50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 golabi-text">
          Schedule Negotiator
        </h2>
        <p className="text-zinc-500 text-center mb-2 text-lg">
          Think you can find a time Kayvon is free? Good luck.
        </p>
        <p className="text-zinc-600 text-center mb-8 text-sm">
          Attempts: {attempts} | Slots rejected: {Object.keys(rejectedSlots).length}
        </p>

        {/* Month navigation */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => setCurrentMonth((m) => Math.max(0, m - 1))}
            className="text-zinc-400 hover:text-pink-400 transition-colors px-3 py-1"
            disabled={currentMonth === 0}
          >
            &larr;
          </button>
          <span className="text-zinc-300 font-medium text-lg min-w-[140px] text-center">
            {MONTHS[currentMonth]} 2026
          </span>
          <button
            onClick={() => setCurrentMonth((m) => Math.min(5, m + 1))}
            className="text-zinc-400 hover:text-pink-400 transition-colors px-3 py-1"
            disabled={currentMonth === 5}
          >
            &rarr;
          </button>
        </div>

        {/* Calendar grid */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i} className="text-center text-zinc-500 text-xs font-medium p-1">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {generateDays(currentMonth).map((day) => {
              const status = getDayStatus(day);
              return (
                <motion.button
                  key={day}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDayClick(day)}
                  className={`
                    aspect-square rounded-lg text-sm font-medium transition-all
                    ${status === "rejected"
                      ? "bg-red-950/50 text-red-400/50 cursor-not-allowed line-through"
                      : status === "final"
                        ? "bg-green-900/50 border-2 border-green-500 text-green-400 animate-pulse"
                        : "bg-zinc-800/50 text-zinc-300 hover:bg-pink-900/30 hover:text-pink-300 cursor-pointer"
                    }
                  `}
                  disabled={status === "rejected"}
                >
                  {day}
                </motion.button>
              );
            })}
          </div>
        </div>

        {attempts >= 10 && (
          <p className="text-green-400/70 text-xs text-center mt-4 animate-pulse">
            Hint: Try March 17th...
          </p>
        )}

        {/* Excuse popup */}
        <AnimatePresence>
          {showExcuse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-zinc-900 border border-red-500/30 rounded-xl p-6 max-w-sm shadow-2xl"
            >
              <p className="text-red-400 text-xs font-bold mb-2 tracking-wider">REJECTED</p>
              <p className="text-zinc-300">{showExcuse}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final booking popup */}
        <AnimatePresence>
          {showFinal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
              onClick={() => setShowFinal(false)}
            >
              <motion.div
                className="bg-zinc-900 border border-pink-500/30 rounded-2xl p-8 max-w-sm mx-4 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-4xl mb-4">&#128197;</div>
                <h3 className="text-xl font-bold text-pink-400 mb-2">SLOT FOUND!</h3>
                <p className="text-zinc-300 mb-2">
                  Tuesday, March 17, 2026 at 2:47 PM
                </p>
                <p className="text-zinc-500 text-sm mb-6">
                  (3 months from now. Only available slot.)
                </p>
                <div className="bg-zinc-800 rounded-lg p-4">
                  <p className="text-yellow-400 text-sm italic">
                    &ldquo;Kayvon needs to check with his handler &mdash; he&apos;ll get back to you.&rdquo;
                  </p>
                </div>
                <button
                  onClick={() => setShowFinal(false)}
                  className="mt-4 text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
                >
                  Close (Kayvon won&apos;t get back to you)
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
