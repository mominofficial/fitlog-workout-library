import { Workout, SortField, SortOrder } from "./types";

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatStepNumber(index: number): string {
  const num = index + 1;
  return num < 10 ? `0${num}` : `${num}`;
}

export function sortWorkouts(
  workouts: Workout[],
  field: SortField,
  order: SortOrder = "asc"
): Workout[] {
  return [...workouts].sort((a, b) => {
    let valA = 0;
    let valB = 0;

    switch (field) {
      case "duration":
        valA = a.duration;
        valB = b.duration;
        break;
      case "calories":
        valA = a.caloriesBurned;
        valB = b.caloriesBurned;
        break;
      case "rating":
        valA = a.rating;
        valB = b.rating;
        break;
    }

    return order === "asc" ? valA - valB : valB - valA;
  });
}
