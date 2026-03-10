"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const FASHION_ITEMS = [
  { image: "/photos/kayvon-05.jpeg", era: "2018", label: "Styled by: Kayvon's Mom", item: "Classic GAP Henley", rating: "Golabi" },
  { image: "/photos/kayvon-08.jpeg", era: "2019", label: "Styled by: Kayvon's Mom", item: "GAP Khakis + Polo Combo", rating: "Extra Golabi" },
  { image: "/photos/kayvon-12.jpeg", era: "2020", label: "Styled by: Kayvon's Mom (on sale)", item: "Clearance Rack Special", rating: "Golabi" },
  { image: "/photos/kayvon-15.jpeg", era: "2021", label: "Transition Era", item: "Trying Too Hard Phase", rating: "Still Golabi" },
  { image: "/photos/kayvon-18.jpeg", era: "2022", label: "Self-styled", item: "\"I have style now\" Era", rating: "Golabi (in denial)" },
  { image: "/photos/kayvon-22.jpeg", era: "2023", label: "Self-styled (debatable)", item: "The \"Evolved\" Look", rating: "Permanently Golabi" },
];

export default function FashionCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRating, setShowRating] = useState(false);

  const next = () => {
    setShowRating(false);
    setCurrentIndex((i) => (i + 1) % FASHION_ITEMS.length);
  };
  const prev = () => {
    setShowRating(false);
    setCurrentIndex((i) => (i - 1 + FASHION_ITEMS.length) % FASHION_ITEMS.length);
  };

  const item = FASHION_ITEMS[currentIndex];

  return (
    <section className="py-24 px-4 bg-zinc-950/50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 golabi-text">
          The GAP Collection
        </h2>
        <p className="text-zinc-500 text-center mb-12 text-lg">
          Kayvon Deldar: A Fashion Journey
        </p>

        <div className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
          {/* Image area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="relative h-[400px] md:h-[500px]"
            >
              <Image
                src={item.image}
                alt={item.item}
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Labels */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-pink-400 text-xs font-bold tracking-wider">
                  {item.era} &bull; {item.label}
                </span>
                <h3 className="text-white text-2xl font-bold mt-1">{item.item}</h3>
              </div>

              {/* Era badge */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-zinc-700 rounded-full px-3 py-1">
                <span className="text-zinc-300 text-sm">{currentIndex + 1} / {FASHION_ITEMS.length}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between p-4 bg-zinc-900/80">
            <button
              onClick={prev}
              className="text-zinc-400 hover:text-pink-400 transition-colors px-4 py-2"
            >
              &larr; Previous Era
            </button>

            <button
              onClick={() => setShowRating(true)}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Rate This Outfit
            </button>

            <button
              onClick={next}
              className="text-zinc-400 hover:text-pink-400 transition-colors px-4 py-2"
            >
              Next Era &rarr;
            </button>
          </div>
        </div>

        {/* Rating popup */}
        <AnimatePresence>
          {showRating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 bg-zinc-900 border border-pink-500/30 rounded-xl p-4 text-center"
            >
              <p className="text-zinc-400 text-sm mb-1">Fashion Rating:</p>
              <p className="text-3xl font-bold golabi-text">{item.rating}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
