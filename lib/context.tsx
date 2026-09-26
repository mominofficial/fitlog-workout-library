"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useId } from "react";
import { Workout, ToastMessage, FitLogContextType } from "./types";
import { STORAGE_KEYS, getStoredItem, setStoredItem } from "./storage";
import { fetchWorkouts } from "./api";

const FitLogContext = createContext<FitLogContextType | null>(null);

const MAX_PLAN_CAP = 5;

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [hydrated, setHydrated] = useState<boolean>(false);

  // Show Toast
  const showToast = useCallback((text: string, type: "success" | "info" | "warning" = "success") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, text, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const storedPlan = getStoredItem<Workout[]>(STORAGE_KEYS.PLAN, []);
      const storedSaved = getStoredItem<Workout[]>(STORAGE_KEYS.SAVED, []);
      const storedCompleted = getStoredItem<number[]>(STORAGE_KEYS.COMPLETED, []);

      setPlan(Array.isArray(storedPlan) ? storedPlan : []);
      setSaved(Array.isArray(storedSaved) ? storedSaved : []);
      setCompletedIds(Array.isArray(storedCompleted) ? storedCompleted : []);
    } catch (e) {
      console.error("Hydration error:", e);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Fetch Workouts
  const loadWorkouts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWorkouts();
      setWorkouts(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load workouts";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  // Sync Plan to localStorage
  useEffect(() => {
    if (!hydrated) return;
    setStoredItem(STORAGE_KEYS.PLAN, plan);
  }, [plan, hydrated]);

  // Sync Saved to localStorage
  useEffect(() => {
    if (!hydrated) return;
    setStoredItem(STORAGE_KEYS.SAVED, saved);
  }, [saved, hydrated]);

  // Sync Completed to localStorage
  useEffect(() => {
    if (!hydrated) return;
    setStoredItem(STORAGE_KEYS.COMPLETED, completedIds);
  }, [completedIds, hydrated]);

  // Actions
  const isInPlan = useCallback((workoutId: number) => {
    return plan.some((w) => w.id === workoutId);
  }, [plan]);

  const isSaved = useCallback((workoutId: number) => {
    return saved.some((w) => w.id === workoutId);
  }, [saved]);

  const isCompleted = useCallback((workoutId: number) => {
    return completedIds.includes(workoutId);
  }, [completedIds]);

  const addToPlan = useCallback((workout: Workout): boolean => {
    if (plan.some((w) => w.id === workout.id)) {
      showToast("Already in today's plan", "info");
      return false;
    }

    if (plan.length >= MAX_PLAN_CAP) {
      showToast("Plan limit reached (maximum 5 lifts)", "warning");
      return false;
    }

    setPlan((prev) => [...prev, workout]);
    showToast("Added to today's plan", "success");
    return true;
  }, [plan, showToast]);

  const removeFromPlan = useCallback((workoutId: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== workoutId));
    setCompletedIds((prev) => prev.filter((id) => id !== workoutId));
    showToast("Removed from today's plan", "info");
  }, [showToast]);

  const saveWorkout = useCallback((workout: Workout): boolean => {
    if (saved.some((w) => w.id === workout.id)) {
      showToast("Already saved", "info");
      return false;
    }

    setSaved((prev) => [...prev, workout]);
    showToast("Saved for later", "success");
    return true;
  }, [saved, showToast]);

  const removeSaved = useCallback((workoutId: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== workoutId));
    showToast("Workout removed from saved", "info");
  }, [showToast]);

  const markAsDone = useCallback((workoutId: number) => {
    setCompletedIds((prev) => {
      const isAlreadyDone = prev.includes(workoutId);
      if (isAlreadyDone) {
        showToast("Workout marked as incomplete", "info");
        return prev.filter((id) => id !== workoutId);
      } else {
        showToast("Workout marked as done", "success");
        return [...prev, workoutId];
      }
    });
  }, [showToast]);

  return (
    <FitLogContext.Provider
      value={{
        workouts,
        plan,
        saved,
        completedIds,
        loading,
        error,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSaved,
        markAsDone,
        isInPlan,
        isSaved,
        isCompleted,
        refreshWorkouts: loadWorkouts,
        showToast,
      }}
    >
      {children}
      {/* Toast Notification Container */}
      <div
        id="fitlog-toasts"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2.5 max-w-[90vw] sm:max-w-md pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 bg-[#15171D] border border-[#1F242D] text-white text-xs sm:text-sm font-medium shadow-2xl transition-all duration-200 animate-in slide-in-from-bottom-2 fade-in"
            style={{ borderLeft: "3px solid #CCFF00" }}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
              <span className="text-[#E5E7EB]">{toast.text}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-[#9CA3AF] hover:text-white transition-colors p-1"
              aria-label="Dismiss notification"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) {
    throw new Error("useFitLog must be used within a FitLogProvider");
  }
  return context;
}
