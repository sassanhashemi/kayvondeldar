"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import confetti from "canvas-confetti";

export default function GolabiCertification() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });
  const hasFired = useRef(false);

  useEffect(() => {
    if (isInView && !hasFired.current) {
      hasFired.current = true;
      // Fire confetti from both sides
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ["#f472b6", "#fb7185", "#fda4af", "#d4af37", "#fbbf24"];

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [isInView]);

  return (
    <section className="py-24 px-4" ref={ref}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 golabi-text">
          Official Certification
        </h2>

        {/* Certificate */}
        <div className="relative bg-gradient-to-b from-amber-50 to-amber-100 rounded-lg p-1">
          {/* Ornate border */}
          <div className="border-4 border-double border-amber-800/30 rounded-lg p-8 md:p-12 text-center">
            {/* Seal */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
              <span className="text-amber-900 text-lg">&#9733;</span>
            </div>

            <p className="text-amber-800/60 text-xs tracking-[0.4em] uppercase mt-4 mb-6">
              Certificate of Achievement
            </p>

            <p className="text-amber-900/70 text-sm mb-2">This hereby certifies that</p>

            <h3 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-2">
              Kayvon Deldar
            </h3>

            <p className="text-amber-900/70 text-sm mb-6">
              has achieved full and irrevocable
            </p>

            <div className="inline-block bg-gradient-to-r from-pink-200 to-rose-200 rounded-lg px-6 py-3 mb-6">
              <span className="text-3xl font-bold text-pink-800 tracking-wider">
                GOLABI STATUS
              </span>
            </div>

            <p className="text-amber-800/60 text-sm max-w-sm mx-auto mb-8">
              In recognition of outstanding contributions to schedule avoidance,
              poker over-analysis, fashion misadventures, and general golabi behavior
              above and beyond the call of duty.
            </p>

            {/* Signatures */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-amber-800/20 pt-6">
              {["Sassan", "Kian", "Adi", "Imon"].map((name) => (
                <div key={name}>
                  <p className="font-serif italic text-amber-800 text-lg">{name}</p>
                  <div className="w-full h-px bg-amber-800/30 mt-1" />
                  <p className="text-amber-800/50 text-[10px] mt-1">Witness</p>
                </div>
              ))}
            </div>

            {/* Date & seal */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <p className="text-amber-800/50 text-xs">Effective: Forever</p>
              <div className="w-16 h-16 rounded-full border-2 border-amber-800/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-amber-800/40 text-[8px] tracking-wider">OFFICIAL</p>
                  <p className="text-amber-800/60 text-[10px] font-bold">GOLABI</p>
                  <p className="text-amber-800/40 text-[8px] tracking-wider">SEAL</p>
                </div>
              </div>
              <p className="text-amber-800/50 text-xs">Status: Permanent</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
