import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full max-w-[1232px] mx-auto px-4 sm:px-6 my-6 sm:my-10">
      <div className="bg-[#15171D] border border-[#1F242D] min-h-[448px] p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative overflow-hidden">
        {/* Left: Hero Editorial Text */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-xl z-10">
          <span className="font-body text-[11px] font-bold uppercase tracking-[1.1px] text-[#C2F800] mb-3">
            WORKOUT LIBRARY
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[60px] font-bold text-white uppercase leading-[1] tracking-[-1.5px] mb-5">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="font-body text-base text-[#9CA3AF] leading-[1.5] mb-8 max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s
            plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="inline-flex items-center gap-2.5 bg-[#CCFF00] hover:bg-[#C2F800] text-black font-body text-xs sm:text-sm font-bold tracking-wider uppercase px-6 py-3.5 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
          >
            <span>BROWSE WORKOUTS</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Right: Anatomical Hero Illustration */}
        <div className="flex-1 w-full flex items-center justify-center lg:justify-end relative min-h-[300px] sm:min-h-[360px] lg:min-h-[400px]">
          {/* Subtle dark athletic glow behind graphic */}
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-[#CCFF00]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square flex items-center justify-center">
            <Image
              src="/banner.png"
              alt="FitLog Training Anatomy Illustration"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
