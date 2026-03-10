"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PLAYERS = ["Sassan", "Kian", "Adi", "Imon", "Kayvon"];

export default function CreditCardRoulette() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [kayvonLosses, setKayvonLosses] = useState(47);
  const [othersLosses] = useState(3);
  const [showConvince, setShowConvince] = useState(false);

  const spin = () => {
    setSpinning(true);
    setResult(null);

    // Cycle through names for dramatic effect
    let count = 0;
    const interval = setInterval(() => {
      setResult(PLAYERS[count % PLAYERS.length]);
      count++;
    }, 100);

    // Always land on Kayvon
    setTimeout(() => {
      clearInterval(interval);
      setResult("Kayvon");
      setSpinning(false);
      setKayvonLosses((l) => l + 1);
    }, 2000 + Math.random() * 1000);
  };

  return (
    <section className="py-24 px-4 bg-zinc-950/50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-lg mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-2 golabi-text">
          Credit Card Roulette
        </h2>
        <p className="text-zinc-500 mb-8 text-lg">
          Someone&apos;s gotta pay. Guess who.
        </p>

        {/* Scoreboard */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="bg-zinc-900 border border-red-500/30 rounded-xl p-4 min-w-[140px]">
            <p className="text-red-400 text-3xl font-bold">{kayvonLosses}</p>
            <p className="text-zinc-500 text-sm">Kayvon Paid</p>
          </div>
          <div className="bg-zinc-900 border border-green-500/30 rounded-xl p-4 min-w-[140px]">
            <p className="text-green-400 text-3xl font-bold">{othersLosses}</p>
            <p className="text-zinc-500 text-sm">Anyone Else</p>
          </div>
        </div>

        {/* Cards spread */}
        <div className="flex justify-center gap-2 mb-8">
          {PLAYERS.map((player) => (
            <motion.div
              key={player}
              animate={spinning ? { y: [0, -10, 0] } : {}}
              transition={{ repeat: spinning ? Infinity : 0, duration: 0.3, delay: PLAYERS.indexOf(player) * 0.05 }}
              className={`w-16 h-24 md:w-20 md:h-28 rounded-lg border-2 flex items-center justify-center text-xs md:text-sm font-medium transition-all ${
                result === player && !spinning
                  ? player === "Kayvon"
                    ? "bg-red-950 border-red-500 text-red-300 scale-110"
                    : "bg-green-950 border-green-500 text-green-300"
                  : "bg-zinc-800 border-zinc-700 text-zinc-400"
              }`}
            >
              {result === player && !spinning ? player : "?"}
            </motion.div>
          ))}
        </div>

        {/* Spin button */}
        <button
          onClick={spin}
          disabled={spinning}
          className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold text-lg transition-all shadow-lg shadow-pink-900/30 mb-4"
        >
          {spinning ? "Shuffling..." : "Draw a Card"}
        </button>

        {/* Result */}
        <AnimatePresence>
          {result && !spinning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6"
            >
              <p className="text-red-400 text-2xl font-bold mb-2">
                KAYVON PAYS. AGAIN.
              </p>
              <p className="text-zinc-500 text-sm italic">
                &ldquo;The man sees a losing streak and says &apos;let&apos;s go again.&apos;&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Convince button */}
        <div className="mt-8">
          <button
            onClick={() => setShowConvince(true)}
            className="text-zinc-500 hover:text-zinc-300 text-sm underline transition-colors"
          >
            Convince Kayvon NOT to play
          </button>
          <AnimatePresence>
            {showConvince && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-pink-400 text-sm mt-2"
              >
                Impossible. He loves the pain.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
