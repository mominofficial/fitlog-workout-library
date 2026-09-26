import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowRight } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}

export default function EmptyState({
  title = "NOTHING HERE YET",
  description = "Browse the library and add a lift to get today moving.",
  actionText = "Go to workouts",
  actionHref = "/",
}: EmptyStateProps) {
  return (
    <div className="w-full py-16 px-4 bg-[#15171D] border border-[#1F242D] rounded-xs flex flex-col items-center justify-center text-center max-w-[1184px] mx-auto my-6">
      <div className="w-14 h-14 bg-[#13161D] border border-[#1F242D] rounded-xs flex items-center justify-center mb-5 text-[#CCFF00]">
        <Dumbbell className="w-6 h-6 stroke-[1.5]" />
      </div>

      <h3 className="font-display text-[20px] font-bold uppercase tracking-[0.7px] text-white mb-2">
        {title}
      </h3>

      <p className="font-body text-sm text-[#8A92A0] max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {actionHref && actionText && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 bg-[#CCFF00] hover:bg-[#C2F800] text-black font-body text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xs transition-colors focus:outline-none focus:ring-1 focus:ring-[#CCFF00]"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}
