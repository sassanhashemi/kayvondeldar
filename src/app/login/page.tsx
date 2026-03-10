"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const HINTS = [
  "Hint: It's something only the boys would know",
  "Hint: Think Farsi... think Kayvon...",
  "Hint: What is Kayvon?",
];

export default function LoginPage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: input }),
      });

      if (res.ok) {
        window.location.href = "/";
      } else {
        setError(true);
        setAttempts((a) => a + 1);
        setTimeout(() => setError(false), 1500);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold golabi-text mb-4">
          KAYVON DELDAR
        </h1>
        <p className="text-zinc-500 text-sm tracking-[0.3em] uppercase mb-12">
          Official Website
        </p>

        <p className="text-zinc-400 text-sm mb-6">
          This site is password protected. Enter the password to continue.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <div className="relative w-full max-w-xs">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter password"
              className={`w-full bg-zinc-900 border ${
                error ? "border-red-500 animate-shake" : "border-zinc-700 focus:border-pink-500"
              } rounded-lg px-4 py-3 text-white text-center outline-none transition-colors`}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg text-sm font-medium transition-colors"
          >
            {submitting ? "..." : "Enter"}
          </button>
        </form>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-4"
          >
            Wrong password. Kayvon wouldn&apos;t let you in either.
          </motion.p>
        )}

        {attempts >= 2 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-zinc-500 text-xs mt-6 italic"
          >
            {HINTS[Math.min(attempts - 2, HINTS.length - 1)]}
          </motion.p>
        )}
      </motion.div>

      <div className="absolute bottom-8 text-zinc-600 text-xs">
        Golabi Certified &trade;
      </div>
    </div>
  );
}
