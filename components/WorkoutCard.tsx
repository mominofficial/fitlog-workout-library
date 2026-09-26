"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/lib/types";
import { Clock3, Flame, Star, Dumbbell } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col bg-[#15171D] border border-[#1F242D] hover:border-[#CCFF00]/60 transition-all duration-200 overflow-hidden rounded-xs focus:outline-none focus:ring-1 focus:ring-[#CCFF00]"
      aria-label={`View details for ${workout.name}`}
    >
      {/* Card Image Area */}
      <div className="relative w-full h-[192px] bg-[#090A0D] overflow-hidden flex items-center justify-center">
        {!imageError && workout.image ? (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 392px"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-[#8A92A0]">
            <Dumbbell className="w-8 h-8 text-[#CCFF00]/50" />
            <span className="text-xs uppercase tracking-wider font-display">FITLOG LIFT</span>
          </div>
        )}

        {/* Subtle dark gradient overlay at top & bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#15171D] via-transparent to-black/30 pointer-events-none" />

        {/* Category Tags in top-left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {workout.muscleGroups?.map((group) => (
            <span
              key={group}
              className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-[#0F1115]/90 text-[#CCFF00] border border-[#CCFF00]/30 rounded-xs backdrop-blur-xs"
            >
              {group}
            </span>
          ))}
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Card Title */}
          <h3 className="font-display text-[18px] font-bold uppercase tracking-[0.45px] text-white leading-[1.55] group-hover:text-[#CCFF00] transition-colors line-clamp-1">
            {workout.name}
          </h3>

          {/* Equipment */}
          <p className="font-body text-xs text-[#8A92A0] mt-1 line-clamp-1">
            {workout.equipment}
          </p>
        </div>

        {/* Stats Row */}
        <div className="pt-4 mt-4 border-t border-[#1F242D] flex items-center justify-between text-xs text-[#E5E7EB]">
          {/* Duration */}
          <div className="flex items-center gap-1.5 text-[#9CA3AF]">
            <Clock3 className="w-3.5 h-3.5 text-[#8A92A0]" />
            <span className="font-medium text-[#E5E7EB]">{workout.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1.5 text-[#9CA3AF]">
            <Flame className="w-3.5 h-3.5 text-[#8A92A0]" />
            <span className="font-medium text-[#E5E7EB]">{workout.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-[#9CA3AF]">
            <Star className="w-3.5 h-3.5 fill-[#CCFF00] text-[#CCFF00]" />
            <span className="font-medium text-[#E5E7EB]">{workout.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
