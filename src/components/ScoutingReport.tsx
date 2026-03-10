"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const STATS = [
  { label: "Intensity", value: 99, color: "from-red-500 to-red-600" },
  { label: "Actual Skill", value: 12, color: "from-zinc-500 to-zinc-600" },
  { label: "Post-Game Analysis", value: 100, color: "from-pink-500 to-pink-600" },
  { label: "Stakes of the Game", value: 0, color: "from-zinc-700 to-zinc-800" },
  { label: "Blaming Teammates", value: 95, color: "from-orange-500 to-orange-600" },
  { label: "Tactical Awareness", value: 8, color: "from-zinc-500 to-zinc-600" },
];

export default function ScoutingReport() {
  return (
    <section className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-lg mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 golabi-text">
          Scouting Report
        </h2>
        <p className="text-zinc-500 text-center mb-12 text-lg">
          Sunday League &bull; Division: Irrelevant
        </p>

        {/* Player card */}
        <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-700 rounded-2xl overflow-hidden card-glow">
          {/* Card header */}
          <div className="bg-gradient-to-r from-pink-900/50 to-rose-900/50 p-4 text-center border-b border-zinc-700">
            <p className="text-pink-400 text-xs tracking-[0.3em] uppercase">Sunday League FC</p>
            <h3 className="text-white text-2xl font-bold">KAYVON DELDAR</h3>
            <p className="text-zinc-400 text-sm">Position: Wherever He Wants &bull; #99</p>
          </div>

          {/* Photo */}
          <div className="relative h-64 bg-zinc-800">
            <Image
              src="/photos/kayvon-03.jpeg"
              alt="Kayvon playing soccer"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4">
              <span className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded">
                OVR 34
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="p-6 space-y-3">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-zinc-400 text-sm">{stat.label}</span>
                  <span className="text-zinc-200 text-sm font-bold">{stat.value}/100</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Special stat */}
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <div className="flex justify-between">
                <span className="text-zinc-400 text-sm">How Seriously He Takes It</span>
                <span className="text-pink-400 text-sm font-bold">Yes</span>
              </div>
            </div>
          </div>

          {/* Scouting quote */}
          <div className="px-6 pb-6">
            <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
              <p className="text-zinc-300 text-sm italic">
                &ldquo;Plays like the trophy is on the line. There is no trophy.&rdquo;
              </p>
              <p className="text-zinc-500 text-xs mt-2">&mdash; Anonymous Scout</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
