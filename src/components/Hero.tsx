"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const [hoverScale, setHoverScale] = useState(1);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-950/20 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/30 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="text-pink-400 text-sm font-medium">Golabi Certified</span>
          <span className="text-pink-300">&#10003;</span>
        </motion.div>

        {/* Photo */}
        <motion.div
          className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 rounded-full overflow-hidden border-4 border-pink-500/30 cursor-pointer"
          onMouseEnter={() => setHoverScale(1.15)}
          onMouseLeave={() => setHoverScale(1)}
          animate={{ scale: hoverScale }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src="/photos/kayvon-01.jpeg"
            alt="Kayvon Deldar"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
          <span className="golabi-text">KAYVON DELDAR</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-zinc-400 font-light tracking-wide mb-6">
          Golabi. Analyst. Schedule Dictator.
        </p>

        {/* Tagline */}
        <p className="text-zinc-500 text-sm max-w-md mx-auto">
          Sales at Voxel &bull; Not a founder &bull; Surrounded by founders &bull; No autonomy over his time
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
