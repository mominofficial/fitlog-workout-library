import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-[60vh] max-w-[1184px] mx-auto px-4 flex flex-col items-center justify-center text-center my-12">
      <div className="w-16 h-16 bg-[#15171D] border border-[#1F242D] rounded-xs flex items-center justify-center mb-6 text-[#CCFF00]">
        <Dumbbell className="w-8 h-8 stroke-[1.5]" />
      </div>

      <span className="font-display text-6xl sm:text-8xl font-bold tracking-tight text-white/90 mb-2">
        404
      </span>

      <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white mb-3">
        WORKOUT NOT FOUND
      </h1>

      <p className="font-body text-sm sm:text-base text-[#9CA3AF] max-w-md mb-8 leading-relaxed">
        The workout lift or page you requested does not exist or has been moved. Check the library to find the right exercise.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2.5 bg-[#CCFF00] hover:bg-[#C2F800] text-black font-body text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO WORKOUTS</span>
      </Link>
    </div>
  );
}
