export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export type SortField = "duration" | "calories" | "rating";
export type SortOrder = "asc" | "desc";

export interface ToastMessage {
  id: string;
  text: string;
  type?: "success" | "info" | "warning";
}

export interface FitLogContextType {
  workouts: Workout[];
  plan: Workout[];
  saved: Workout[];
  completedIds: number[];
  loading: boolean;
  error: string | null;
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (workoutId: number) => void;
  saveWorkout: (workout: Workout) => boolean;
  removeSaved: (workoutId: number) => void;
  markAsDone: (workoutId: number) => void;
  isInPlan: (workoutId: number) => boolean;
  isSaved: (workoutId: number) => boolean;
  isCompleted: (workoutId: number) => boolean;
  refreshWorkouts: () => Promise<void>;
  showToast: (text: string, type?: "success" | "info" | "warning") => void;
}
