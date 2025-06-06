export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  description?: string;
}

export interface DaySchedule {
  date: string; // YYYY-MM-DD format
  dayOfWeek: string;
  phase: string;
  cardioGoal?: string;
  gymExercises: Exercise[];
  homeExercises: Exercise[];
  mobilityExercises: Exercise[];
}

// Helper function to get mobility exercises
const getMobilityExercises = (): Exercise[] => [
  { name: "Shoulder Rolls", sets: "2", reps: "10 each direction", description: "Shoulder mobility warm-up" },
  { name: "Neck Stretches", sets: "2", reps: "30 sec each direction", description: "Neck and upper trap stretches" },
  { name: "Cat-Cow Stretches", sets: "2", reps: "10", description: "Spinal mobility exercise" },
  { name: "Hip Circles", sets: "2", reps: "10 each direction", description: "Hip mobility exercise" },
  { name: "Leg Swings", sets: "2", reps: "10 each leg", description: "Dynamic leg mobility" },
  { name: "Torso Twists", sets: "2", reps: "10 each side", description: "Spinal rotation mobility" },
  { name: "Calf Stretches", sets: "2", reps: "30 sec each leg", description: "Calf and achilles stretches" }
];

// Generate comprehensive exercise schedule
function generateExerciseSchedule(): DaySchedule[] {
  const schedule: DaySchedule[] = [];
  
  // Phase definitions with date ranges (timezone-safe)
  const phases = [
    { name: "Phase 1", start: new Date(2025, 5, 9), end: new Date(2025, 5, 27), sets: "3" },  // June 9-27
    { name: "Phase 2", start: new Date(2025, 5, 30), end: new Date(2025, 6, 25), sets: "3" }, // June 30 - July 25
    { name: "Phase 3", start: new Date(2025, 6, 28), end: new Date(2025, 7, 22), sets: "3" }, // July 28 - Aug 22
    { name: "Phase 4", start: new Date(2025, 7, 25), end: new Date(2025, 8, 26), sets: "4" }, // Aug 25 - Sep 26
    { name: "Phase 5", start: new Date(2025, 8, 29), end: new Date(2025, 10, 21), sets: "4" }, // Sep 29 - Nov 21
    { name: "Phase 6", start: new Date(2025, 10, 24), end: new Date(2025, 11, 26), sets: "5" }, // Nov 24 - Dec 26
  ];
  
  // Exercise templates by day type
  const exerciseTemplates = {
    monday: {
      cardioGoal: "Run/Treadmill 3+ miles",
      gymExercises: [
        { name: "Bench Press", reps: "8–10", description: "Chest pressing movement" },
        { name: "Shoulder Press", reps: "10", description: "Overhead shoulder strengthening exercise" },
        { name: "Triceps Pushdown", reps: "12–15", description: "Cable triceps isolation exercise" }
      ],
      homeExercises: [
        { name: "Push-ups", reps: "12–15", description: "Bodyweight chest and triceps exercise" },
        { name: "KB Floor Press", reps: "10", description: "Kettlebell chest press on floor" },
        { name: "KB Overhead Press", reps: "10", description: "Kettlebell shoulder press" },
        { name: "KB Triceps Extensions", reps: "12", description: "Kettlebell triceps exercise" }
      ]
    },
    wednesday: {
      cardioGoal: "Run/Treadmill 3+ miles",
      gymExercises: [
        { name: "Seated Row", reps: "10", description: "Back pulling exercise" },
        { name: "Lat Pulldown", reps: "10", description: "Latissimus dorsi exercise" },
        { name: "Face Pulls", reps: "15", description: "Rear deltoid and upper back exercise" },
        { name: "Dumbbell Curls", reps: "12", description: "Biceps strengthening exercise" }
      ],
      homeExercises: [
        { name: "KB Rows", reps: "12", description: "Kettlebell rowing movement" },
        { name: "KB High Pulls", reps: "10/side", description: "Kettlebell pulling exercise" },
        { name: "Band Pull-aparts", reps: "20", description: "Resistance band upper back exercise" },
        { name: "KB Curls", reps: "12", description: "Kettlebell bicep curls" }
      ]
    },
    friday: {
      cardioGoal: "Run/Treadmill 3+ miles",
      gymExercises: [
        { name: "Squats", reps: "8", description: "Lower body compound exercise" },
        { name: "RDLs", reps: "10", description: "Romanian deadlifts for hamstrings" },
        { name: "Leg Press", reps: "12", description: "Machine leg strengthening exercise" },
        { name: "Calf Raises", reps: "15–20", description: "Calf strengthening exercise" },
        { name: "Planks", reps: "30–60 sec", description: "Core stability exercise" }
      ],
      homeExercises: [
        { name: "KB Goblet Squats", reps: "12–15", description: "Kettlebell front-loaded squats" },
        { name: "KB RDLs", reps: "10", description: "Kettlebell Romanian deadlifts" },
        { name: "KB Swings", reps: "15–20", description: "Kettlebell swing exercise" },
        { name: "V-ups", reps: "15", description: "Abdominal strengthening exercise" },
        { name: "Suitcase Carries", reps: "30 sec/side", description: "Unilateral carry exercise" }
      ]
    }
  };
  
  // Adjust reps based on phase
  function adjustRepsForPhase(baseReps: string, phase: string): string {
    switch (phase) {
      case "Phase 4":
        return baseReps.includes("8–10") ? "6–8" : 
               baseReps.includes("10") ? "8–10" : 
               baseReps.includes("12") ? "10–12" : baseReps;
      case "Phase 5":
        return baseReps.includes("8–10") ? "5–7" : 
               baseReps.includes("10") ? "6–8" : 
               baseReps.includes("12") ? "8–10" : baseReps;
      case "Phase 6":
        return baseReps.includes("8–10") ? "4–6" : 
               baseReps.includes("10") ? "5–7" : 
               baseReps.includes("12") ? "6–8" : baseReps;
      default:
        return baseReps;
    }
  }
  
  // Generate schedule for each phase
  phases.forEach(phase => {
    const current = new Date(phase.start);
    const end = new Date(phase.end);
    
    while (current <= end) {
      const dayOfWeek = current.toLocaleDateString('en-US', { weekday: 'long' });
      const dateStr = current.toISOString().split('T')[0];
      
      if (dayOfWeek === 'Monday' || dayOfWeek === 'Wednesday' || dayOfWeek === 'Friday') {
        const templateKey = dayOfWeek.toLowerCase() as keyof typeof exerciseTemplates;
        const template = exerciseTemplates[templateKey];
        
        schedule.push({
          date: dateStr,
          dayOfWeek,
          phase: phase.name,
          cardioGoal: template.cardioGoal,
          gymExercises: template.gymExercises.map(ex => ({
            ...ex,
            sets: phase.sets,
            reps: adjustRepsForPhase(ex.reps, phase.name)
          })),
          homeExercises: template.homeExercises.map(ex => ({
            ...ex,
            sets: phase.sets,
            reps: adjustRepsForPhase(ex.reps, phase.name)
          })),
          mobilityExercises: []
        });
      } else if (dayOfWeek === 'Tuesday' || dayOfWeek === 'Thursday') {
        schedule.push({
          date: dateStr,
          dayOfWeek,
          phase: phase.name,
          gymExercises: [],
          homeExercises: [],
          mobilityExercises: getMobilityExercises()
        });
      }
      
      current.setDate(current.getDate() + 1);
    }
  });
  
  return schedule;
}

export const exerciseSchedule: DaySchedule[] = generateExerciseSchedule();

// Helper function to get exercises for a specific date
export function getExercisesForDate(date: string): DaySchedule | undefined {
  return exerciseSchedule.find(day => day.date === date);
}

// Helper function to get exercises for today
export function getTodaysExercises(): DaySchedule | undefined {
  const today = new Date().toISOString().split('T')[0];
  return getExercisesForDate(today);
}

// Helper function to get current phase based on date
export function getCurrentPhase(date: Date): string {
  const dateStr = date.toISOString().split('T')[0];
  
  if (dateStr >= '2025-06-09' && dateStr <= '2025-06-27') return 'Phase 1';
  if (dateStr >= '2025-06-30' && dateStr <= '2025-07-25') return 'Phase 2';
  if (dateStr >= '2025-07-28' && dateStr <= '2025-08-22') return 'Phase 3';
  if (dateStr >= '2025-08-25' && dateStr <= '2025-09-26') return 'Phase 4';
  if (dateStr >= '2025-09-29' && dateStr <= '2025-11-21') return 'Phase 5';
  if (dateStr >= '2025-11-24' && dateStr <= '2025-12-26') return 'Phase 6';
  
  return 'No active phase';
} 