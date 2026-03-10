"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SUITS = ["♠", "♥", "♦", "♣"];
const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const ANALYSES = [
  [
    "Okay so look at this hand objectively...",
    "Pre-flop, the raise sizing was WAY off. You should have 3-bet to at least 3.5x.",
    "Now on the flop, the texture is super wet. You HAVE to c-bet here at minimum 60% pot.",
    "The turn changes everything. This card completely shifts the range advantage.",
    "If we run it out — and we NEED to run it out — you'll see that statistically...",
    "Actually wait, let me see the rest of the deck.",
    "See? I KNEW the river would have changed everything.",
    "This is exactly why you can't just fold pre. The EV is clearly positive if you...",
    "Let me re-analyze this from a GTO perspective...",
  ],
  [
    "Alright, I've been thinking about this hand for three days now.",
    "The initial open from UTG is standard, but YOUR cold-call is suspicious.",
    "You're basically turning your hand face-up by flatting here instead of squeezing.",
    "On the flop, your check is fine, but my donk bet is GENIUS. Let me explain why.",
    "The pot odds are exactly 2.7:1 which means any hand with more than 27% equity should...",
    "Actually, can we run it out? I want to see what would have come.",
    "SEE? That's exactly what I was saying. The jack on the river changes EVERYTHING.",
    "I would have won this hand if we ran it five more times. The math supports me.",
  ],
  [
    "This is a CLASSIC cooler situation and I refuse to be results-oriented about it.",
    "My triple barrel was perfectly balanced. I had exactly 40% bluffs in my range.",
    "The problem isn't my play. The problem is that you had QUADS. That's a statistical anomaly.",
    "In a simulated 10,000 hand sample, my line prints money here. PRINTS. MONEY.",
    "Can we please run it out? Just the river? I need to see what would have come.",
    "Actually deal the whole deck. I want to do a full equity analysis.",
    "You know what, let me pull up my poker tracker stats on this exact spot...",
    "I'm not tilted. I'm just passionate about optimal play.",
  ],
];

function generateCard() {
  return {
    rank: RANKS[Math.floor(Math.random() * RANKS.length)],
    suit: SUITS[Math.floor(Math.random() * SUITS.length)],
  };
}

function Card({ rank, suit, faceDown }: { rank: string; suit: string; faceDown?: boolean }) {
  const isRed = suit === "♥" || suit === "♦";
  if (faceDown) {
    return (
      <div className="w-16 h-24 md:w-20 md:h-28 bg-gradient-to-br from-pink-800 to-pink-950 border border-pink-700/50 rounded-lg flex items-center justify-center">
        <span className="text-pink-600 text-2xl">?</span>
      </div>
    );
  }
  return (
    <div className="w-16 h-24 md:w-20 md:h-28 bg-white rounded-lg flex flex-col items-center justify-center shadow-lg">
      <span className={`text-lg font-bold ${isRed ? "text-red-600" : "text-zinc-900"}`}>
        {rank}
      </span>
      <span className={`text-2xl ${isRed ? "text-red-600" : "text-zinc-900"}`}>
        {suit}
      </span>
    </div>
  );
}

export default function PokerAnalyzer() {
  const [holeCards, setHoleCards] = useState(() => Array.from({ length: 2 }, generateCard));
  const [communityCards, setCommunityCards] = useState<{ rank: string; suit: string }[]>([]);
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const [runItOut, setRunItOut] = useState(false);
  const [revealIndex, setRevealIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnalysis = () => {
    const lines = ANALYSES[Math.floor(Math.random() * ANALYSES.length)];
    setAnalysis([]);
    setTyping(true);
    setRunItOut(false);
    setCommunityCards([]);
    setRevealIndex(0);

    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setAnalysis((prev) => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTyping(false);
      }
    }, 1200);
  };

  const dealNewHand = () => {
    setHoleCards(Array.from({ length: 2 }, generateCard));
    setCommunityCards([]);
    setRevealIndex(0);
    startAnalysis();
  };

  const handleRunItOut = () => {
    setRunItOut(true);
    const board = Array.from({ length: 5 }, generateCard);
    setCommunityCards(board);
    setRevealIndex(0);

    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      setRevealIndex(i);
      if (i >= 5) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setRunItOut(false);
      }
    }, 800);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 golabi-text">
          Poker Hand Analyzer&trade;
        </h2>
        <p className="text-zinc-500 text-center mb-12 text-lg">
          Every hand deserves a 20-minute breakdown. &mdash; Kayvon
        </p>

        {/* Poker table area */}
        <div className="bg-gradient-to-b from-green-950/40 to-green-950/20 border border-green-800/30 rounded-2xl p-8 mb-6">
          {/* Hole Cards */}
          <p className="text-green-400/60 text-xs text-center mb-2 tracking-wider">KAYVON&apos;S HAND</p>
          <div className="flex justify-center gap-2 md:gap-3 mb-6">
            {holeCards.map((card, i) => (
              <motion.div
                key={`hole-${i}`}
                initial={{ rotateY: 180 }}
                animate={{ rotateY: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <Card rank={card.rank} suit={card.suit} />
              </motion.div>
            ))}
          </div>

          {/* Community Cards */}
          <p className="text-green-400/60 text-xs text-center mb-2 tracking-wider">BOARD</p>
          <div className="flex justify-center gap-2 md:gap-3 mb-8">
            {Array.from({ length: 5 }).map((_, i) => {
              const card = communityCards[i];
              const revealed = i < revealIndex;
              return (
                <motion.div
                  key={`community-${i}`}
                  initial={revealed ? { scale: 0, rotateY: 180 } : {}}
                  animate={revealed ? { scale: 1, rotateY: 0 } : {}}
                  transition={{ duration: 0.4 }}
                >
                  {card && revealed ? (
                    <Card rank={card.rank} suit={card.suit} />
                  ) : (
                    <Card rank="" suit="" faceDown />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={dealNewHand}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Deal New Hand
            </button>
            <button
              onClick={handleRunItOut}
              disabled={runItOut || revealIndex >= 5}
              className="bg-zinc-700 hover:bg-zinc-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              {runItOut ? "Running it out..." : revealIndex >= 5 ? "Board complete (Kayvon wants to run it again)" : "Run It Out"}
            </button>
          </div>
        </div>

        {/* Analysis output */}
        {analysis.length > 0 && (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <p className="text-pink-400 text-xs font-bold tracking-wider mb-3">
              KAYVON&apos;S ANALYSIS
            </p>
            {analysis.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-zinc-300 text-sm mb-2"
              >
                {line}
              </motion.p>
            ))}
            {typing && (
              <span className="text-zinc-500 text-sm typing-cursor">Kayvon is still typing</span>
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
}
