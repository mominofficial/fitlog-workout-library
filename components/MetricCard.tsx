import React from "react";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: number | string;
  unit?: string;
  icon?: LucideIcon;
  highlight?: boolean;
}

export default function MetricCard({
  label,
  value,
  unit,
  icon: Icon,
  highlight = false,
}: MetricCardProps) {
  return (
    <div
      className={`p-5 sm:p-6 bg-[#15171D] border border-[#1F242D] rounded-xs flex flex-col justify-between transition-colors ${
        highlight ? "border-[#CCFF00]/40" : ""
      }`}
    >
      <div className="flex items-center justify-between text-[#8A92A0] mb-3">
        <span className="font-body text-xs font-bold uppercase tracking-[0.6px]">
          {label}
        </span>
        {Icon && <Icon className="w-4 h-4 text-[#9CA3AF]" />}
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-none">
          {value}
        </span>
        {unit && (
          <span className="font-body text-xs text-[#8A92A0] font-medium uppercase tracking-wider">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
