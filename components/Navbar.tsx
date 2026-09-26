"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/lib/context";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  const planCount = plan.length;
  const savedCount = saved.length;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0F1115] border-b border-[#1F242D] transition-colors">
      <div className="max-w-[1232px] mx-auto px-4 sm:px-6 lg:px-8 h-[76px] sm:h-[81px] flex items-center justify-between">
        {/* Left: Brand Logo & Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-[#CCFF00]"
          aria-label="FitLog Home"
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={32}
              height={32}
              priority
              className="object-contain w-full h-full filter drop-shadow-[0_0_8px_rgba(204,255,0,0.35)]"
            />
          </div>
          <span className="font-display text-xl sm:text-[20px] font-bold tracking-[1.2px] text-white uppercase group-hover:text-[#CCFF00] transition-colors">
            FITLOG
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
          <Link
            href="/"
            className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-150 rounded-sm ${
              isWorkoutActive
                ? "text-white bg-[#15171D] border border-[#1F242D] shadow-sm"
                : "text-[#9CA3AF] hover:text-white hover:bg-[#13161D]"
            }`}
          >
            WORKOUT
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-150 rounded-sm ${
              isMyPlanActive
                ? "text-white bg-[#15171D] border border-[#1F242D] shadow-sm"
                : "text-[#9CA3AF] hover:text-white hover:bg-[#13161D]"
            }`}
          >
            MY PLAN
          </Link>
        </nav>

        {/* Right: Status Badges (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* PLAN Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 bg-[#CCFF00] text-black px-3 py-1.5 text-xs font-bold tracking-wider uppercase rounded-xs hover:bg-[#C2F800] transition-colors focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
            aria-label={`Today's plan contains ${planCount} workouts`}
          >
            <span>PLAN</span>
            <span className="bg-black/15 text-black px-1.5 py-0.5 rounded-xs font-display text-[13px] leading-none min-w-[18px] text-center">
              {planCount}
            </span>
          </Link>

          {/* SAVED Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 bg-[#15171D] border border-[#1F242D] text-[#E5E7EB] px-3 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-xs hover:border-[#CCFF00]/60 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-[#CCFF00]"
            aria-label={`Saved library contains ${savedCount} workouts`}
          >
            <span className="text-[#9CA3AF]">SAVED</span>
            <span className="bg-[#1F242D] text-white px-1.5 py-0.5 rounded-xs font-display text-[13px] leading-none min-w-[18px] text-center">
              {savedCount}
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 bg-[#CCFF00] text-black px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded-xs"
          >
            <span>PLAN</span>
            <span className="font-display">{planCount}</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#9CA3AF] hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#1F242D] bg-[#0F1115] px-4 py-4 space-y-3 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 text-xs font-semibold tracking-wider uppercase rounded-xs ${
                isWorkoutActive
                  ? "text-white bg-[#15171D] border border-[#1F242D]"
                  : "text-[#9CA3AF] hover:text-white"
              }`}
            >
              WORKOUT
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 text-xs font-semibold tracking-wider uppercase rounded-xs ${
                isMyPlanActive
                  ? "text-white bg-[#15171D] border border-[#1F242D]"
                  : "text-[#9CA3AF] hover:text-white"
              }`}
            >
              MY PLAN
            </Link>
          </div>

          <div className="pt-2 border-t border-[#1F242D] flex items-center gap-3">
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#CCFF00] text-black py-2 text-xs font-bold uppercase rounded-xs"
            >
              <span>PLAN ({planCount})</span>
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#15171D] border border-[#1F242D] text-white py-2 text-xs font-semibold uppercase rounded-xs"
            >
              <span>SAVED ({savedCount})</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
