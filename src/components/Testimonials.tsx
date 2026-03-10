"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Sassan",
    title: "Site Creator & Witness to the Chaos",
    quote: "Kayvon sees a losing streak at credit card roulette and says 'let's go again.' The man is an inspiration to masochists everywhere.",
    connection: "1st",
  },
  {
    name: "Kian",
    title: "Pickleball Champion & Kayvon's Nemesis",
    quote: "I beat him 11-3 in pickleball. I had a bad toe. He said 'the game was closer than the score indicates.' It was not.",
    connection: "1st",
  },
  {
    name: "Adi",
    title: "Friend & Reluctant Audience Member",
    quote: "I've never met someone who treats a Sunday rec league game like it's the World Cup final. The post-game analysis is longer than the game.",
    connection: "1st",
  },
  {
    name: "Imon",
    title: "Friend & Schedule Victim",
    quote: "Planning anything with Kayvon requires a minimum 2-week lead time, handler approval, and a backup plan for when he cancels anyway.",
    connection: "1st",
  },
  {
    name: "Nikki",
    title: "Girlfriend & Handler-in-Chief",
    quote: "I don't control his schedule. I just happen to have plans every time his friends ask him to hang out. It's a coincidence.",
    connection: "❤️",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 bg-zinc-950/50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 golabi-text">
          What People Are Saying
        </h2>
        <p className="text-zinc-500 text-center mb-12 text-lg">
          Professional recommendations from Kayvon&apos;s network
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 card-glow"
            >
              {/* LinkedIn style header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {t.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-zinc-200 font-semibold">{t.name}</h3>
                    <span className="text-pink-400 text-xs border border-pink-500/30 rounded px-1.5 py-0.5">
                      {t.connection}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-sm">{t.title}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-zinc-300 text-sm leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* LinkedIn engagement */}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-zinc-800 text-zinc-500 text-xs">
                <span>&#128077; {[42, 18, 31, 27, 56][i]}</span>
                <span>&#128514; {[23, 11, 19, 8, 34][i]}</span>
                <span className="ml-auto">Kayvon Deldar reacted: &#128544;</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
