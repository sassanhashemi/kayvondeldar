"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EXCUSES = [
  "He has to check with his handler.",
  "He has a 'work thing' at Voxel.",
  "He's free but you're not meeting at the right time.",
  "He's busy analyzing last week's poker hand.",
  "He's preparing his Sunday league game tape.",
  "He's reorganizing his post-GAP wardrobe.",
  "He's writing a 3-page analysis of why you should have called on the river.",
  "His handler is in meetings all day so he can't get clearance.",
  "He's running Monte Carlo simulations on his last poker session.",
  "He's available but only for exactly 47 minutes between 2:13 and 3:00 PM.",
  "He needs to consult his girlfriend's Google Calendar first.",
  "He's still recovering from losing credit card roulette last weekend.",
  "He's busy calculating the EV of attending your event.",
  "He said he'd come but then his handler said 'we have plans.'",
  "He's emotionally unavailable after that pickleball loss to Kian.",
  "He's free but wants to reschedule to a time that works better for him specifically.",
  "He triple-barrel committed to three other plans and now can't make any of them.",
];

export default function ExcuseGenerator() {
  const [currentExcuse, setCurrentExcuse] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const generate = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
    setCurrentExcuse(EXCUSES[Math.floor(Math.random() * EXCUSES.length)]);
  };

  return (
    <section className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-lg mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-2 golabi-text">
          Excuse Generator
        </h2>
        <p className="text-zinc-500 mb-12 text-lg">
          Why can&apos;t Kayvon hang out?
        </p>

        <motion.button
          onClick={generate}
          className={`w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 shadow-2xl shadow-red-900/50 text-white font-bold text-lg transition-all ${isShaking ? "animate-shake" : ""}`}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          PRESS ME
          <br />
          <span className="text-red-200 text-xs font-normal">(find out why)</span>
        </motion.button>

        <AnimatePresence mode="wait">
          {currentExcuse && (
            <motion.div
              key={currentExcuse}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6 card-glow"
            >
              <p className="text-zinc-300 text-lg">{currentExcuse}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
