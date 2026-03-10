"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIMES = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM"];

const REJECTION_MESSAGES = [
  "Kayvon needs to check with his handler first.",
  "This conflicts with Kayvon's imaginary plans.",
  "Kayvon is free but has decided you're not.",
  "Sorry, Kayvon has a 'work thing' at Voxel.",
  "Kayvon is reviewing last week's poker hand at this time.",
  "Kayvon needs at least 3 business days notice.",
  "This time was available 5 minutes ago. Too late.",
  "Kayvon's handler has veto'd this time slot.",
  "Kayvon is busy preparing his Sunday League game tape.",
  "Kayvon needs to run this by his girlfriend's calendar first.",
  "This slot requires executive approval from the handler.",
];

export default function Scheduler() {
  const [popup, setPopup] = useState<{ message: string; x: number; y: number } | null>(null);

  const handleSlotClick = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPopup({
      message: REJECTION_MESSAGES[Math.floor(Math.random() * REJECTION_MESSAGES.length)],
      x: rect.left,
      y: rect.top,
    });
    setTimeout(() => setPopup(null), 4000);
  };

  return (
    <section className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 golabi-text">
          The Kayvon Scheduler&trade;
        </h2>
        <p className="text-zinc-500 text-center mb-12 text-lg">
          Try to book a time. We dare you.
        </p>

        <div className="overflow-x-auto">
          <div className="min-w-[700px] bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
            {/* Header */}
            <div className="grid grid-cols-8 gap-1 mb-2">
              <div className="text-zinc-600 text-sm p-2" />
              {DAYS.map((day) => (
                <div key={day} className="text-center text-zinc-400 text-sm font-medium p-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Time slots */}
            {TIMES.map((time) => (
              <div key={time} className="grid grid-cols-8 gap-1 mb-1">
                <div className="text-zinc-500 text-xs p-2 flex items-center">{time}</div>
                {DAYS.map((day) => (
                  <button
                    key={`${day}-${time}`}
                    onClick={handleSlotClick}
                    className="bg-red-950/30 border border-red-900/30 rounded text-[10px] text-red-400/70 p-1.5 hover:bg-red-900/40 transition-colors cursor-not-allowed truncate"
                  >
                    UNAVAILABLE
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <p className="text-zinc-600 text-xs text-center mt-4 italic">
          For scheduling inquiries, please contact Kayvon&apos;s handler directly.
        </p>

        {/* Rejection popup */}
        <AnimatePresence>
          {popup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-zinc-900 border border-pink-500/30 rounded-xl p-6 max-w-sm shadow-2xl shadow-pink-500/10"
            >
              <p className="text-pink-300 text-sm font-medium mb-1">SCHEDULING DENIED</p>
              <p className="text-zinc-300">{popup.message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
