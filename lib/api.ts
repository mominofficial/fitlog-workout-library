import { Workout } from "./types";

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

export async function fetchWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(API_BASE, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error("Malformed data: expected an array of workouts");
    }

    return data;
  } catch (error) {
    console.error("fetchWorkouts error:", error);
    throw error;
  }
}

export async function fetchWorkoutById(id: number | string): Promise<Workout | null> {
  const numericId = Number(id);
  if (isNaN(numericId) || numericId <= 0) {
    return null;
  }

  try {
    const res = await fetch(`${API_BASE}/${numericId}`, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    if (!data || typeof data !== "object" || !data.id) {
      return null;
    }

    return data as Workout;
  } catch (error) {
    console.error(`fetchWorkoutById(${id}) error:`, error);
    throw error;
  }
}
