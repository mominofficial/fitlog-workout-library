"use client";

import React, { useState, useRef, useEffect } from "react";
import { SortField, SortOrder } from "@/lib/types";
import { ChevronDown, ArrowUpDown } from "lucide-react";

interface SortDropdownProps {
  currentField: SortField;
  currentOrder: SortOrder;
  onSortChange: (field: SortField, order: SortOrder) => void;
}

const SORT_OPTIONS: { label: string; field: SortField }[] = [
  { label: "Duration", field: "duration" },
  { label: "Calories", field: "calories" },
  { label: "Rating", field: "rating" },
];

export default function SortDropdown({
  currentField,
  currentOrder,
  onSortChange,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLabel =
    SORT_OPTIONS.find((opt) => opt.field === currentField)?.label || "Duration";

  const toggleOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSortChange(currentField, currentOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="relative inline-flex items-center gap-1.5" ref={dropdownRef}>
      <span className="text-xs text-[#8A92A0] uppercase tracking-wider font-semibold">
        Sort By:
      </span>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-[#15171D] border border-[#1F242D] hover:border-[#CCFF00]/50 text-xs font-semibold text-white px-3 py-1.5 rounded-xs transition-colors focus:outline-none focus:ring-1 focus:ring-[#CCFF00]"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span>{currentLabel}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#9CA3AF] transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div
            role="listbox"
            className="absolute right-0 mt-1 w-36 bg-[#15171D] border border-[#1F242D] shadow-xl z-30 py-1 rounded-xs animate-in fade-in duration-100"
          >
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.field}
                type="button"
                role="option"
                aria-selected={currentField === opt.field}
                onClick={() => {
                  onSortChange(opt.field, currentOrder);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                  currentField === opt.field
                    ? "text-[#CCFF00] bg-[#13161D] font-bold"
                    : "text-[#E5E7EB] hover:bg-[#13161D] hover:text-white"
                }`}
              >
                <span>{opt.label}</span>
                {currentField === opt.field && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Order Toggle (Asc / Desc) */}
      <button
        type="button"
        onClick={toggleOrder}
        title={currentOrder === "asc" ? "Ascending order" : "Descending order"}
        className="p-1.5 bg-[#15171D] border border-[#1F242D] hover:border-[#CCFF00]/50 text-[#9CA3AF] hover:text-[#CCFF00] rounded-xs transition-colors focus:outline-none"
        aria-label={`Toggle sort order, currently ${currentOrder}`}
      >
        <ArrowUpDown className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
