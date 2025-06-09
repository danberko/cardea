export interface NutritionPlan {
  phase: string;
  phaseName: string;
  weeks: string;
  zepbound: string;
  goal: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  water: string;
  sleep: string;
  weightLoss: string;
}

export const nutritionPlans: NutritionPlan[] = [
  {
    phase: "Phase 1",
    phaseName: "Reboot & Foundation",
    weeks: "1-4",
    zepbound: "2.5 mg",
    goal: "Rebuild habit, steady cardio, light strength",
    calories: "1900-2100",
    protein: "120-140g (25-30%)",
    carbs: "190-210g (40-42%)",
    fat: "63-78g (30-35%)",
    water: "100-110 oz",
    sleep: "7.5-8 hrs (10PM-6AM)",
    weightLoss: "3-4 lbs"
  },
  {
    phase: "Phase 2",
    phaseName: "Strength & Fat Burn",
    weeks: "5-8",
    zepbound: "5 mg",
    goal: "Moderate strength training + consistent cardio",
    calories: "1700-1900",
    protein: "130-150g (30-32%)",
    carbs: "150-175g (35-38%)",
    fat: "57-70g (30-33%)",
    water: "105-115 oz",
    sleep: "8-8.5 hrs (9:30PM-6AM)",
    weightLoss: "5-6 lbs"
  },
  {
    phase: "Phase 3",
    phaseName: "Progression & Composition Shift",
    weeks: "9-12",
    zepbound: "7.5 mg",
    goal: "Heavier lifts (gym or KB), add HIIT 1x/week",
    calories: "1650-1850",
    protein: "140-160g (34-36%)",
    carbs: "140-165g (34-36%)",
    fat: "50-62g (27-30%)",
    water: "110-120 oz",
    sleep: "8-8.5 hrs (9:30PM-6AM)",
    weightLoss: "5-7 lbs"
  },
  {
    phase: "Phase 4",
    phaseName: "Efficiency & Endurance",
    weeks: "13-16",
    zepbound: "10 mg",
    goal: "Add volume (longer runs, more reps), full-body circuits",
    calories: "1750-1950",
    protein: "145-165g (33-34%)",
    carbs: "175-200g (40-41%)",
    fat: "58-72g (30-33%)",
    water: "115-125 oz",
    sleep: "8.5 hrs min (9:30PM-6AM)",
    weightLoss: "6-7 lbs"
  },
  {
    phase: "Phase 5",
    phaseName: "Peak Burn & Performance",
    weeks: "17-20",
    zepbound: "12.5 mg",
    goal: "Peak output: strength circuits, speed intervals",
    calories: "1550-1750",
    protein: "145-165g (37-38%)",
    carbs: "115-140g (30-32%)",
    fat: "43-55g (25-28%)",
    water: "120-130 oz",
    sleep: "8.5-9 hrs (9PM-6AM)",
    weightLoss: "6-8 lbs"
  },
  {
    phase: "Phase 6",
    phaseName: "Polish & Maintain",
    weeks: "21-28",
    zepbound: "12.5-15 mg",
    goal: "Mix strength + recovery; maintain lean body mass",
    calories: "1600-1800",
    protein: "140-160g (35-36%)",
    carbs: "140-165g (35-37%)",
    fat: "47-56g (26-28%)",
    water: "110-120 oz",
    sleep: "8-8.5 hrs (9:30PM-6AM)",
    weightLoss: "10-14 lbs"
  }
];

// Helper function to get nutrition plan for a specific phase
export function getNutritionPlan(phaseName: string): NutritionPlan | undefined {
  return nutritionPlans.find(plan => plan.phase === phaseName);
}

// Summary data
export const nutritionSummary = {
  totalProjectedWeightLoss: "35-46 lbs",
  startingWeight: "220 lbs",
  targetEndWeight: "174-185 lbs",
  programDuration: "28 weeks"
}; 