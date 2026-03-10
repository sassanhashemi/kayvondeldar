"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import Scheduler from "@/components/Scheduler";
import ScheduleNegotiator from "@/components/ScheduleNegotiator";
import PokerAnalyzer from "@/components/PokerAnalyzer";
import FashionCarousel from "@/components/FashionCarousel";
import ScoutingReport from "@/components/ScoutingReport";
import Testimonials from "@/components/Testimonials";
import ExcuseGenerator from "@/components/ExcuseGenerator";
import CreditCardRoulette from "@/components/CreditCardRoulette";
import GolabiCertification from "@/components/GolabiCertification";
import PhotoArchive from "@/components/PhotoArchive";
import GlobalFeatures from "@/components/GlobalFeatures";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <GlobalFeatures />

          <main className="min-h-screen bg-[#0a0a0a]">
            <Hero />

            {/* Divider */}
            <div className="max-w-xs mx-auto border-t border-zinc-800" />

            <Scheduler />

            <ScheduleNegotiator />

            <div className="max-w-xs mx-auto border-t border-zinc-800" />

            <PokerAnalyzer />

            <FashionCarousel />

            <div className="max-w-xs mx-auto border-t border-zinc-800" />

            <ScoutingReport />

            <Testimonials />

            <div className="max-w-xs mx-auto border-t border-zinc-800" />

            <ExcuseGenerator />

            <CreditCardRoulette />

            <div className="max-w-xs mx-auto border-t border-zinc-800" />

            <GolabiCertification />

            <PhotoArchive />

            {/* Footer */}
            <footer className="py-12 px-4 border-t border-zinc-800 text-center">
              <p className="text-zinc-600 text-sm">
                Made with &#128149; and zero respect for Kayvon
              </p>
              <p className="text-zinc-700 text-xs mt-2">
                &copy; {new Date().getFullYear()} The Friend Group &bull; Golabi Certified
              </p>
            </footer>
          </main>
        </motion.div>
      )}
    </>
  );
}
