export interface TrainingPhase {
  phase: string;
  weeks: string;
  focus: string;
  metabolicImpact: string;
  goal: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

export const trainingPhases: TrainingPhase[] = [
  {
    phase: "Phase 1: Reboot & Foundation",
    weeks: "Weeks 1–4 (June)",
    focus: "Rebuild habit, steady cardio, light strength",
    metabolicImpact: "↑ Insulin sensitivity, kickstart fat oxidation, restore aerobic base",
    goal: "Adapt to routine, reduce water weight & inflammation",
    startDate: "2025-06-09",
    endDate: "2025-07-06"
  },
  {
    phase: "Phase 2: Strength & Fat Burn",
    weeks: "Weeks 5–8 (July)",
    focus: "Moderate strength training + consistent cardio",
    metabolicImpact: "Build lean mass, ↑ mitochondrial function, improve blood sugar response",
    goal: "Lose body fat, gain muscle tone, improve energy",
    startDate: "2025-07-07",
    endDate: "2025-08-03"
  },
  {
    phase: "Phase 3: Progression & Composition Shift",
    weeks: "Weeks 9–12 (August)",
    focus: "Heavier lifts (gym or KB), add HIIT 1x/week",
    metabolicImpact: "Muscle preservation + higher calorie burn; ↑ metabolic flexibility",
    goal: "Body recomposition: lose inches, stay strong",
    startDate: "2025-08-04",
    endDate: "2025-08-31"
  },
  {
    phase: "Phase 4: Efficiency & Endurance",
    weeks: "Weeks 13–16 (September)",
    focus: "Add volume (longer runs, more reps), full-body circuits",
    metabolicImpact: "Better oxygen use, cardiovascular efficiency, endurance",
    goal: "Improve pace & running form, sustain lean mass",
    startDate: "2025-09-01",
    endDate: "2025-09-28"
  },
  {
    phase: "Phase 5: Peak Burn & Performance",
    weeks: "Weeks 17–20 (October)",
    focus: "Peak output: strength circuits, speed intervals",
    metabolicImpact: "Maximize caloric burn, tap into fat stores, muscle retention",
    goal: "Stronger, leaner, higher performance threshold",
    startDate: "2025-09-29",
    endDate: "2025-10-26"
  },
  {
    phase: "Phase 6: Polish & Maintain",
    weeks: "Weeks 21–28 (Nov–Dec)",
    focus: "Mix strength + recovery; maintain lean body mass",
    metabolicImpact: "Preserve BMR, hormonal stability, joint health",
    goal: "Sustainable fitness, weight maintenance, confident body feel",
    startDate: "2025-10-27",
    endDate: "2025-12-21"
  }
];

// Helper function to get current phase based on date
export function getCurrentPhase(date: Date = new Date()): TrainingPhase {
  const dateString = date.toISOString().split('T')[0];
  
  const currentPhase = trainingPhases.find(phase => 
    dateString >= phase.startDate && dateString <= phase.endDate
  );
  
  // Default to Phase 1 if no match found (e.g., before start date)
  return currentPhase || trainingPhases[0];
}

// Helper function to get phase for specific date
export function getPhaseForDate(date: Date): TrainingPhase {
  return getCurrentPhase(date);
} 