"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const EXCLUDED = [22];
const ALL_PHOTOS = Array.from({ length: 40 }, (_, i) => i + 1)
  .filter((n) => !EXCLUDED.includes(n))
  .map((n) => {
    const num = String(n).padStart(2, "0");
    const ext = [2, 14, 15, 16, 17].includes(n) ? "jpg" : "jpeg";
    return `/photos/kayvon-${num}.${ext}`;
  });

const CAPTIONS = [
  "Peak golabi energy",
  "This is the face of a man who just lost credit card roulette",
  "\"The game was closer than the score indicates\"",
  "Styled by: Kayvon's Mom (GAP clearance section)",
  "Analyzing your browsing patterns right now",
  "POV: You just asked Kayvon to hang out this weekend",
  "The handler has not approved this photo",
  "Sunday League MVP (self-nominated)",
  "\"Let me see the rest of the deck\"",
  "Calculating the EV of this pose",
  "Schedule dictator in his natural habitat",
  "This man triple-barrel bluffed into quads",
  "Golabi Certified since birth",
  "\"Actually, can we re-analyze that?\"",
  "Sales at Voxel, Golabi at heart",
  "The short king rises",
  "Handler-approved social event attendance",
  "Post-game analysis face",
  "\"I was right about that poker hand\"",
  "Fashion icon (source: himself)",
  "11-3 pickleball energy",
  "\"My girlfriend says we have plans\"",
  "Intensity: 99. Skill: 12.",
  "The communications major of the friend group",
  "\"Can we run it out?\"",
  "Preparing his next 20-minute hand breakdown",
  "The man, the myth, the golabi",
  "Kayvon.exe has stopped working",
  "When someone suggests credit card roulette",
  "\"Let me check with my handler first\"",
  "Scouting report: Do not draft",
  "Fashion evolution: still golabi",
  "The only man who WANTS to play credit card roulette",
  "Post-Sunday-League Champions-League-level celebration",
  "\"I have style now\" (narrator: he didn't)",
  "Processing that pickleball loss",
  "When the handler says yes for once",
  "Kayvon Deldar: A golabi for all seasons",
  "The original schedule dictator",
  "Permanently golabi. Officially certified.",
];

export default function PhotoArchive() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 golabi-text">
          The Evidence
        </h2>
        <p className="text-zinc-500 text-center mb-8 text-lg">
          A photographic archive of golabi behavior
        </p>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {ALL_PHOTOS.map((src, i) => (
            <motion.div
              key={src}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => setLightbox(i)}
            >
              <div className="relative overflow-hidden rounded-xl bg-zinc-800">
                <Image
                  src={src}
                  alt={`Kayvon photo ${i + 1}`}
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-xs">{CAPTIONS[i % CAPTIONS.length]}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-3xl max-h-[80vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={ALL_PHOTOS[lightbox]}
                  alt={`Kayvon photo ${lightbox + 1}`}
                  width={800}
                  height={1000}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                />
                <p className="text-zinc-400 text-sm text-center mt-4 italic">
                  {CAPTIONS[lightbox % CAPTIONS.length]}
                </p>
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-zinc-800 rounded-full text-zinc-400 hover:text-white flex items-center justify-center"
                >
                  &#10005;
                </button>

                {/* Nav arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full text-white flex items-center justify-center hover:bg-black/80"
                >
                  &larr;
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox + 1) % ALL_PHOTOS.length);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full text-white flex items-center justify-center hover:bg-black/80"
                >
                  &rarr;
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
