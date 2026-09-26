"use client";

import React, { useState, useMemo } from "react";
import { Workout, SortField, SortOrder } from "@/lib/types";
import { sortWorkouts } from "@/lib/utils";
import WorkoutCard from "./WorkoutCard";
import SortDropdown from "./SortDropdown";
import LoadingState from "./LoadingState";
import { AlertCircle, RefreshCw } from "lucide-react";

interface WorkoutGridProps {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function WorkoutGrid({
  workouts,
  loading,
  error,
  onRetry,
}: WorkoutGridProps) {
  const [sortField, setSortField] = useState<SortField>("duration");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const sortedWorkouts = useMemo(() => {
    return sortWorkouts(workouts, sortField, sortOrder);
  }, [workouts, sortField, sortOrder]);

  const handleSortChange = (field: SortField, order: SortOrder) => {
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <section id="library" className="w-full max-w-[1184px] mx-auto px-4 sm:px-6 my-10 sm:my-14 scroll-mt-24">
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#1F242D] mb-8">
        <div>
          <h2 className="font-display text-2xl sm:text-[30px] font-bold text-white uppercase leading-[1.2] tracking-[-0.75px]">
            THE LIBRARY
          </h2>
          <p className="font-body text-sm sm:text-base text-[#9CA3AF] mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Sort Controls */}
        {!loading && !error && workouts.length > 0 && (
          <div className="self-start sm:self-auto">
            <SortDropdown
              currentField={sortField}
              currentOrder={sortOrder}
              onSortChange={handleSortChange}
            />
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && <LoadingState message="Loading workouts…" />}

      {/* Error State */}
      {!loading && error && (
        <div className="bg-[#15171D] border border-red-500/30 p-8 rounded-xs text-center max-w-lg mx-auto my-8">
          <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xs flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="font-display text-lg font-bold uppercase text-white mb-2">
            Failed to load workouts
          </h3>
          <p className="text-sm text-[#8A92A0] mb-6">{error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 bg-[#CCFF00] hover:bg-[#C2F800] text-black text-xs font-bold uppercase px-4 py-2 rounded-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && workouts.length === 0 && (
        <div className="bg-[#15171D] border border-[#1F242D] p-12 text-center rounded-xs">
          <p className="text-[#8A92A0] text-sm uppercase tracking-wider font-display">
            No workouts found in library.
          </p>
        </div>
      )}

      {/* Workouts Grid */}
      {!loading && !error && workouts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
