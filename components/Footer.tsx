import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#090A0D] border-t border-[#1F242D] mt-auto">
      <div className="max-w-[1232px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Brand Logo & Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="FitLog Footer Home Link"
        >
          <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={24}
              height={24}
              className="object-contain w-full h-full filter drop-shadow-[0_0_6px_rgba(204,255,0,0.3)]"
            />
          </div>
          <span className="font-display text-lg font-bold tracking-[1.2px] text-white uppercase group-hover:text-[#CCFF00] transition-colors">
            FITLOG
          </span>
        </Link>

        {/* Right: Copyright & Tagline */}
        <p className="text-xs sm:text-sm text-[#8A92A0] text-center sm:text-right font-normal">
          © 2026 FitLog — Workout Library.{" "}
          <span className="text-[#9CA3AF]">Train hard, log honest.</span>
        </p>
      </div>
    </footer>
  );
}
