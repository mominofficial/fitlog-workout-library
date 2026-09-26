import React from "react";
import { Dumbbell } from "lucide-react";

export default function LoadingState({ message = "Loading workouts…" }: { message?: string }) {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center mb-4">
        {/* Animated pulse ring */}
        <div className="absolute w-12 h-12 rounded-full border border-[#CCFF00]/20 animate-ping" />
        <div className="w-10 h-10 rounded-full bg-[#15171D] border border-[#1F242D] flex items-center justify-center">
          <Dumbbell className="w-5 h-5 text-[#CCFF00] animate-spin" style={{ animationDuration: "3s" }} />
        </div>
      </div>
      <p className="font-display uppercase tracking-widest text-sm text-[#9CA3AF]">
        {message}
      </p>

      {/* Skeleton grid preview */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-[1184px]">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-[#15171D] border border-[#1F242D] h-[368px] rounded-xs animate-pulse overflow-hidden flex flex-col"
          >
            <div className="w-full h-[192px] bg-[#1F242D]/50" />
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="h-5 bg-[#1F242D] w-3/4 rounded-xs" />
                <div className="h-3 bg-[#1F242D]/60 w-1/2 rounded-xs" />
              </div>
              <div className="pt-4 border-t border-[#1F242D]/40 flex justify-between">
                <div className="h-3 bg-[#1F242D] w-16 rounded-xs" />
                <div className="h-3 bg-[#1F242D] w-16 rounded-xs" />
                <div className="h-3 bg-[#1F242D] w-12 rounded-xs" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
