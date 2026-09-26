"use client";

import React from "react";
import Hero from "@/components/Hero";
import WorkoutGrid from "@/components/WorkoutGrid";
import { useFitLog } from "@/lib/context";

export default function HomePage() {
  const { workouts, loading, error, refreshWorkouts } = useFitLog();

  return (
    <div className="w-full pb-16">
      <Hero />
      <WorkoutGrid
        workouts={workouts}
        loading={loading}
        error={error}
        onRetry={refreshWorkouts}
      />
    </div>
  );
}
