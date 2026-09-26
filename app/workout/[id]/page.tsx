import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchWorkoutById } from "@/lib/api";
import WorkoutDetail from "@/components/WorkoutDetail";

interface WorkoutPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: WorkoutPageProps): Promise<Metadata> {
  const { id } = await params;
  const workout = await fetchWorkoutById(id);

  if (!workout) {
    return {
      title: "Workout Not Found — FitLog",
    };
  }

  return {
    title: `${workout.name} — FitLog Workout Library`,
    description: workout.description,
  };
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = await params;
  const workout = await fetchWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetail workout={workout} />;
}
