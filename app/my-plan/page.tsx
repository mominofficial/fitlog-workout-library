"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFitLog } from "@/lib/context";
import MetricCard from "@/components/MetricCard";
import EmptyState from "@/components/EmptyState";
import {
  Clock3,
  Flame,
  Star,
  Dumbbell,
  Check,
  X,
  ExternalLink,
  Plus,
  Trash2,
} from "lucide-react";

type ActiveTab = "plan" | "saved";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    completedIds,
    removeFromPlan,
    removeSaved,
    addToPlan,
    markAsDone,
    isInPlan,
    isCompleted,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState<ActiveTab>("plan");

  // Dynamic Metrics calculated from Today's Plan
  const metrics = useMemo(() => {
    const exercises = plan.length;
    const minutes = plan.reduce((acc, curr) => acc + (curr.duration || 0), 0);
    const calories = plan.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0);
    return { exercises, minutes, calories };
  }, [plan]);

  return (
    <div className="w-full max-w-[1184px] mx-auto px-4 sm:px-6 my-8 sm:my-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-[30px] font-bold uppercase text-white leading-tight">
          MY PLAN
        </h1>
        <p className="font-body text-sm text-[#8A92A0] mt-1.5">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Row: 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
        <MetricCard
          label="EXERCISES"
          value={metrics.exercises}
          unit={`/ 5 MAX`}
          icon={Dumbbell}
          highlight={metrics.exercises > 0}
        />
        <MetricCard
          label="MINUTES"
          value={metrics.minutes}
          unit="MIN"
          icon={Clock3}
        />
        <MetricCard
          label="CALORIES"
          value={metrics.calories}
          unit="KCAL"
          icon={Flame}
        />
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#1F242D] mb-8">
        <button
          type="button"
          onClick={() => setActiveTab("plan")}
          className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-150 relative focus:outline-none ${
            activeTab === "plan"
              ? "text-white"
              : "text-[#9CA3AF] hover:text-white"
          }`}
        >
          <span>TODAY&apos;S PLAN</span>
          <span
            className={`px-1.5 py-0.5 rounded-xs font-display text-xs ${
              activeTab === "plan"
                ? "bg-[#CCFF00] text-black font-bold"
                : "bg-[#1F242D] text-[#8A92A0]"
            }`}
          >
            {plan.length}
          </span>
          {activeTab === "plan" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#CCFF00]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("saved")}
          className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-150 relative focus:outline-none ${
            activeTab === "saved"
              ? "text-white"
              : "text-[#9CA3AF] hover:text-white"
          }`}
        >
          <span>SAVED</span>
          <span
            className={`px-1.5 py-0.5 rounded-xs font-display text-xs ${
              activeTab === "saved"
                ? "bg-[#CCFF00] text-black font-bold"
                : "bg-[#1F242D] text-[#8A92A0]"
            }`}
          >
            {saved.length}
          </span>
          {activeTab === "saved" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#CCFF00]" />
          )}
        </button>
      </div>

      {/* Tab Content: Today's Plan */}
      {activeTab === "plan" && (
        <div className="space-y-4">
          {plan.length === 0 ? (
            <EmptyState
              title="NOTHING HERE YET"
              description="Browse the library and add a lift to get today moving."
              actionText="Go to workouts"
              actionHref="/"
            />
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {plan.map((workout) => {
                const done = isCompleted(workout.id);
                return (
                  <div
                    key={workout.id}
                    className={`bg-[#15171D] border rounded-xs p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-200 ${
                      done
                        ? "border-[#CCFF00]/40 bg-[#13161D]/90 opacity-80"
                        : "border-[#1F242D] hover:border-[#CCFF00]/30"
                    }`}
                  >
                    {/* Left: Thumbnail & Info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#090A0D] border border-[#1F242D] flex-shrink-0 rounded-xs overflow-hidden flex items-center justify-center">
                        {workout.image ? (
                          <Image
                            src={workout.image}
                            alt={workout.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        ) : (
                          <Dumbbell className="w-6 h-6 text-[#CCFF00]/40" />
                        )}
                        {done && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Check className="w-8 h-8 text-[#CCFF00] stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className={`font-display text-base sm:text-lg font-bold uppercase tracking-wide truncate ${
                              done ? "line-through text-[#8A92A0]" : "text-white"
                            }`}
                          >
                            {workout.name}
                          </h3>
                          {done && (
                            <span className="bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/30 px-1.5 py-0.5 text-[10px] font-bold uppercase rounded-xs">
                              DONE
                            </span>
                          )}
                        </div>

                        <p className="font-body text-xs text-[#8A92A0] mb-2 truncate">
                          {workout.equipment}
                        </p>

                        {/* Stats Badges */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#E5E7EB]">
                          <span className="flex items-center gap-1 text-[#9CA3AF]">
                            <Clock3 className="w-3.5 h-3.5 text-[#8A92A0]" />
                            {workout.duration} min
                          </span>
                          <span className="flex items-center gap-1 text-[#9CA3AF]">
                            <Flame className="w-3.5 h-3.5 text-[#8A92A0]" />
                            {workout.caloriesBurned} kcal
                          </span>
                          <span className="flex items-center gap-1 text-[#9CA3AF]">
                            <Star className="w-3.5 h-3.5 fill-[#CCFF00] text-[#CCFF00]" />
                            {workout.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-[#1F242D]">
                      {/* Mark as Done */}
                      <button
                        type="button"
                        onClick={() => markAsDone(workout.id)}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase rounded-xs transition-colors focus:outline-none ${
                          done
                            ? "bg-[#CCFF00] text-black hover:bg-[#C2F800]"
                            : "bg-[#1F242D] text-[#E5E7EB] hover:bg-[#CCFF00] hover:text-black"
                        }`}
                        title={done ? "Mark incomplete" : "Mark as completed"}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{done ? "COMPLETED" : "MARK DONE"}</span>
                      </button>

                      {/* View Details */}
                      <Link
                        href={`/workout/${workout.id}`}
                        className="flex items-center gap-1.5 px-3 py-2 bg-[#15171D] border border-[#1F242D] hover:border-[#CCFF00]/50 text-xs font-semibold text-white rounded-xs transition-colors"
                      >
                        <span>DETAILS</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#9CA3AF]" />
                      </Link>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromPlan(workout.id)}
                        className="p-2 text-[#9CA3AF] hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-xs transition-colors"
                        aria-label={`Remove ${workout.name} from plan`}
                        title="Remove from plan"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Saved */}
      {activeTab === "saved" && (
        <div className="space-y-4">
          {saved.length === 0 ? (
            <EmptyState
              title="NO SAVED WORKOUTS"
              description="Save lifts from the library or workout details to quickly access them later."
              actionText="Browse library"
              actionHref="/"
            />
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {saved.map((workout) => {
                const inPlan = isInPlan(workout.id);
                return (
                  <div
                    key={workout.id}
                    className="bg-[#15171D] border border-[#1F242D] hover:border-[#CCFF00]/30 rounded-xs p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-200"
                  >
                    {/* Left: Thumbnail & Info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#090A0D] border border-[#1F242D] flex-shrink-0 rounded-xs overflow-hidden flex items-center justify-center">
                        {workout.image ? (
                          <Image
                            src={workout.image}
                            alt={workout.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        ) : (
                          <Dumbbell className="w-6 h-6 text-[#CCFF00]/40" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-base sm:text-lg font-bold uppercase tracking-wide text-white truncate mb-1">
                          {workout.name}
                        </h3>

                        <p className="font-body text-xs text-[#8A92A0] mb-2 truncate">
                          {workout.equipment}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#E5E7EB]">
                          <span className="flex items-center gap-1 text-[#9CA3AF]">
                            <Clock3 className="w-3.5 h-3.5 text-[#8A92A0]" />
                            {workout.duration} min
                          </span>
                          <span className="flex items-center gap-1 text-[#9CA3AF]">
                            <Flame className="w-3.5 h-3.5 text-[#8A92A0]" />
                            {workout.caloriesBurned} kcal
                          </span>
                          <span className="flex items-center gap-1 text-[#9CA3AF]">
                            <Star className="w-3.5 h-3.5 fill-[#CCFF00] text-[#CCFF00]" />
                            {workout.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-[#1F242D]">
                      {/* Add to plan shortcut */}
                      {!inPlan && (
                        <button
                          type="button"
                          onClick={() => addToPlan(workout)}
                          className="flex items-center gap-1.5 px-3 py-2 bg-[#CCFF00] hover:bg-[#C2F800] text-black text-xs font-bold uppercase rounded-xs transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>ADD TO PLAN</span>
                        </button>
                      )}

                      {/* View Details */}
                      <Link
                        href={`/workout/${workout.id}`}
                        className="flex items-center gap-1.5 px-3 py-2 bg-[#15171D] border border-[#1F242D] hover:border-[#CCFF00]/50 text-xs font-semibold text-white rounded-xs transition-colors"
                      >
                        <span>DETAILS</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#9CA3AF]" />
                      </Link>

                      {/* Remove from Saved */}
                      <button
                        type="button"
                        onClick={() => removeSaved(workout.id)}
                        className="p-2 text-[#9CA3AF] hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-xs transition-colors"
                        aria-label={`Remove ${workout.name} from saved`}
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
