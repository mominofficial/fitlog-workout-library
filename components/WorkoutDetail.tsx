"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/lib/types";
import { useFitLog } from "@/lib/context";
import { formatStepNumber } from "@/lib/utils";
import {
  ArrowLeft,
  Plus,
  Check,
  Bookmark,
  BookmarkCheck,
  Star,
  Dumbbell,
  Clock3,
  Flame,
  Activity,
  Layers,
  Repeat,
  ShieldAlert,
} from "lucide-react";

interface WorkoutDetailProps {
  workout: Workout;
}

export default function WorkoutDetail({ workout }: WorkoutDetailProps) {
  const {
    plan,
    addToPlan,
    removeFromPlan,
    saveWorkout,
    removeSaved,
    isInPlan,
    isSaved,
  } = useFitLog();

  const [imageError, setImageError] = useState(false);

  const inPlan = isInPlan(workout.id);
  const inSaved = isSaved(workout.id);
  const isPlanFull = plan.length >= 5;

  const handlePlanToggle = () => {
    if (inPlan) {
      removeFromPlan(workout.id);
    } else {
      addToPlan(workout);
    }
  };

  const handleSaveToggle = () => {
    if (inSaved) {
      removeSaved(workout.id);
    } else {
      saveWorkout(workout);
    }
  };

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment, icon: Dumbbell },
    { label: "DIFFICULTY", value: workout.difficulty, icon: Activity },
    { label: "SETS", value: workout.sets.toString(), icon: Layers },
    { label: "REPS", value: workout.reps, icon: Repeat },
    { label: "DURATION", value: `${workout.duration} min`, icon: Clock3 },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal`, icon: Flame },
    { label: "RATING", value: workout.rating.toFixed(1), icon: Star, isRating: true },
  ];

  return (
    <div className="w-full max-w-[1232px] mx-auto px-4 sm:px-6 my-6 sm:my-10">
      {/* Back to Library Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#8A92A0] hover:text-[#CCFF00] uppercase tracking-wider mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
        <span>BACK TO LIBRARY</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Column: Large Workout Image */}
        <div className="w-full">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#15171D] border border-[#1F242D] rounded-xs overflow-hidden flex items-center justify-center">
            {!imageError && workout.image ? (
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 text-[#8A92A0]">
                <Dumbbell className="w-16 h-16 text-[#CCFF00]/40" />
                <span className="font-display tracking-widest text-sm text-[#9CA3AF]">
                  FITLOG EXERCISE
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#15171D] via-transparent to-transparent pointer-events-none opacity-80" />
          </div>

          {/* Action Buttons (Desktop under image or beside) */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch gap-3">
            {/* Primary Action: Add to today's plan */}
            <button
              type="button"
              onClick={handlePlanToggle}
              disabled={!inPlan && isPlanFull}
              className={`flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 rounded-xs focus:outline-none focus:ring-2 focus:ring-[#CCFF00] ${
                inPlan
                  ? "bg-[#CCFF00] text-black hover:bg-[#C2F800]"
                  : isPlanFull
                  ? "bg-[#1F242D] text-[#8A92A0] cursor-not-allowed"
                  : "bg-[#CCFF00] text-black hover:bg-[#C2F800] shadow-[0_4px_16px_rgba(204,255,0,0.2)]"
              }`}
            >
              {inPlan ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>ALREADY IN TODAY&apos;S PLAN</span>
                </>
              ) : isPlanFull ? (
                <>
                  <ShieldAlert className="w-4 h-4 text-[#8A92A0]" />
                  <span>PLAN LIMIT REACHED (5/5)</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>ADD TO TODAY&apos;S PLAN</span>
                </>
              )}
            </button>

            {/* Secondary Action: Save for later */}
            <button
              type="button"
              onClick={handleSaveToggle}
              className={`flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider border rounded-xs transition-colors focus:outline-none focus:ring-1 focus:ring-[#CCFF00] ${
                inSaved
                  ? "bg-[#1F242D] border-[#CCFF00]/50 text-[#CCFF00]"
                  : "bg-[#15171D] border-[#1F242D] text-[#E5E7EB] hover:border-[#CCFF00]/40 hover:text-white"
              }`}
            >
              {inSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-[#CCFF00]" />
                  <span>SAVED</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>SAVE FOR LATER</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Information, Specs, Instructions */}
        <div className="flex flex-col space-y-8">
          {/* Header & Tags */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {workout.muscleGroups?.map((group) => (
                <span
                  key={group}
                  className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-[#15171D] text-[#CCFF00] border border-[#CCFF00]/40 rounded-xs"
                >
                  {group}
                </span>
              ))}
            </div>

            <h1 className="font-display text-3xl sm:text-[36px] font-bold uppercase text-white leading-[1.11] tracking-[-0.9px] mb-3">
              {workout.name}
            </h1>

            <p className="font-body text-base text-[#9CA3AF] leading-[1.5]">
              {workout.description}
            </p>
          </div>

          {/* KEY SPECS Panel */}
          <div className="bg-[#15171D] border border-[#1F242D] rounded-xs p-5 sm:p-6">
            <h2 className="font-body text-xs font-bold uppercase tracking-[1.2px] text-[#CCFF00] pb-4 mb-4 border-b border-[#1F242D]">
              KEY SPECS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {specs.map((spec) => (
                <div key={spec.label} className="flex flex-col">
                  <span className="font-body text-[12px] font-bold uppercase tracking-[0.6px] text-[#9CA3AF] mb-1">
                    {spec.label}
                  </span>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[#E5E7EB]">
                    {spec.isRating ? (
                      <>
                        <Star className="w-3.5 h-3.5 fill-[#CCFF00] text-[#CCFF00]" />
                        <span>{spec.value}</span>
                      </>
                    ) : (
                      <span>{spec.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <div className="bg-[#15171D] border border-[#1F242D] rounded-xs p-5 sm:p-6">
            <h2 className="font-body text-xs font-bold uppercase tracking-[1.2px] text-[#CCFF00] pb-4 mb-5 border-b border-[#1F242D]">
              INSTRUCTIONS
            </h2>

            <div className="space-y-4">
              {workout.instructions && workout.instructions.length > 0 ? (
                workout.instructions.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="font-display text-lg font-bold text-[#CCFF00] leading-none pt-0.5 min-w-[28px]">
                      {formatStepNumber(idx)}
                    </span>
                    <p className="font-body text-sm sm:text-[15px] text-[#E5E7EB] leading-[1.5]">
                      {step}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#9CA3AF]">No instructions provided for this workout.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
