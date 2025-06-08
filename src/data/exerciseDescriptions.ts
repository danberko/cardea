export interface ExerciseDescription {
  name: string;
  description: string;
  howToPerform: string;
  videoUrl: string;
}

export const exerciseDescriptions: ExerciseDescription[] = [
  {
    name: "Bench Press",
    description: "Compound chest exercise performed with barbell or dumbbells on a flat bench.",
    howToPerform: "Lie flat on a bench, grip bar wider than shoulders, lower to chest, push back up.",
    videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg"
  },
  {
    name: "Shoulder Press",
    description: "Overhead press targeting the shoulders, using dumbbells or a machine.",
    howToPerform: "Sit or stand, press weights overhead while keeping core tight and elbows under wrists.",
    videoUrl: "https://www.youtube.com/embed/qEwKCR5JCog"
  },
  {
    name: "Triceps Pushdown",
    description: "Isolation move using a cable machine to work the triceps.",
    howToPerform: "Stand tall, elbows at sides, push bar down until arms are straight, return slowly.",
    videoUrl: "https://www.youtube.com/embed/2-LAMcpzODU"
  },
  {
    name: "KB Floor Press",
    description: "Chest press with a kettlebell while lying on the floor.",
    howToPerform: "Lie on back, press kettlebells from chest to overhead, keep elbows at 45° angle.",
    videoUrl: "https://www.youtube.com/embed/i_URJN83nys"
  },
  {
    name: "KB Overhead Press",
    description: "Overhead shoulder press using one or two kettlebells.",
    howToPerform: "Hold KB at shoulder, press straight overhead, avoid arching back.",
    videoUrl: "https://www.youtube.com/embed/X-uFqWtjpGI"
  },
  {
    name: "Push-ups",
    description: "Bodyweight exercise targeting chest, triceps, and core.",
    howToPerform: "Hands shoulder-width, body in plank, lower chest to floor, push back up.",
    videoUrl: "https://www.youtube.com/embed/Eh00_rniF8E"
  },
  {
    name: "KB Triceps Extensions",
    description: "Overhead triceps exercise using a kettlebell.",
    howToPerform: "Hold KB overhead with both hands, bend elbows, lower behind head, extend arms.",
    videoUrl: "https://www.youtube.com/embed/nRiJVZDpdL0"
  },
  {
    name: "Lat Pulldown",
    description: "Back exercise using a cable machine, pulling bar to chest.",
    howToPerform: "Grip bar wide, pull to upper chest, squeeze shoulder blades, return slowly.",
    videoUrl: "https://www.youtube.com/embed/AOpi-p0cJkc"
  },
  {
    name: "Seated Row",
    description: "Rowing motion with a machine or cables to work back muscles.",
    howToPerform: "Sit upright, pull handle to torso, elbows close, squeeze shoulder blades.",
    videoUrl: "https://www.youtube.com/embed/Hca2qDMj0C4"
  },
  {
    name: "Face Pulls",
    description: "Rear delt and upper back isolation using a cable machine.",
    howToPerform: "Use rope on cable, pull toward eyes with elbows high and wide.",
    videoUrl: "https://www.youtube.com/embed/4UhV4cCkugM"
  },
  {
    name: "Dumbbell Curls",
    description: "Bicep curl using dumbbells.",
    howToPerform: "Hold dumbbells, curl to shoulders without swinging, lower with control.",
    videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo"
  },
  {
    name: "KB Rows",
    description: "Bent-over row using kettlebells to target the back.",
    howToPerform: "Bend at hips, pull kettlebell to waist, squeeze shoulder blade at top.",
    videoUrl: "https://www.youtube.com/embed/b9nR-3Xze94"
  },
  {
    name: "Band Pull-aparts",
    description: "Band exercise for upper back and posture muscles.",
    howToPerform: "Hold band at shoulder height, pull apart until arms are wide, return slowly.",
    videoUrl: "https://www.youtube.com/embed/nzkvFc8VeyM"
  },
  {
    name: "KB High Pulls",
    description: "Explosive pull with a kettlebell to target traps and shoulders.",
    howToPerform: "Swing KB upward with hips, lead with elbow, stop at shoulder height.",
    videoUrl: "https://www.youtube.com/embed/ok8NSlqCOO8"
  },
  {
    name: "KB Curls",
    description: "Bicep curls using a kettlebell.",
    howToPerform: "Hold KB by horns, curl to shoulders, keep elbows close to body.",
    videoUrl: "https://www.youtube.com/embed/nOL1WJBLHPg"
  },
  {
    name: "Squats",
    description: "Lower body compound movement using bodyweight or weights.",
    howToPerform: "Feet shoulder-width, bend knees and hips, keep chest up, return to stand.",
    videoUrl: "https://www.youtube.com/embed/aclHkVaku9U"
  },
  {
    name: "Leg Press",
    description: "Machine-based squat press targeting quads and glutes.",
    howToPerform: "Feet on platform, lower until knees are 90°, push back without locking knees.",
    videoUrl: "https://www.youtube.com/embed/IZxyjW7MPJQ"
  },
  {
    name: "RDLs",
    description: "Romanian deadlifts, hinge movement for hamstrings and glutes.",
    howToPerform: "Hold weights, soft knees, hinge at hips, lower to mid-shin, return upright.",
    videoUrl: "https://www.youtube.com/embed/2SHsk9AzdjA"
  },
  {
    name: "Calf Raises",
    description: "Ankle flexion movement to build calf muscles.",
    howToPerform: "Stand tall, rise onto toes, pause, lower slowly.",
    videoUrl: "https://www.youtube.com/embed/-M4-G8p8fmc"
  },
  {
    name: "Planks",
    description: "Isometric core hold for abdominal strength.",
    howToPerform: "Forearms on floor, body in straight line, hold without sagging hips.",
    videoUrl: "https://www.youtube.com/embed/pSHjTRCQxIw"
  },
  {
    name: "KB Goblet Squats",
    description: "Squats holding a kettlebell at the chest.",
    howToPerform: "Hold KB at chest, squat down with upright torso, return to stand.",
    videoUrl: "https://www.youtube.com/embed/IkcOjDnHwyI"
  },
  {
    name: "KB Swings",
    description: "Explosive hip hinge exercise for power and cardio.",
    howToPerform: "Hinge hips, swing KB to chest height using hip thrust, not arms.",
    videoUrl: "https://www.youtube.com/embed/f2a6uBQGKtc"
  },
  {
    name: "KB RDLs",
    description: "Hamstring and glute work using kettlebell deadlifts.",
    howToPerform: "Hold KB with both hands, hinge at hips, lower to mid-shin, stand tall.",
    videoUrl: "https://www.youtube.com/embed/JLVrIPnmm5A"
  },
  {
    name: "Suitcase Carries",
    description: "Core exercise involving walking while holding a kettlebell on one side.",
    howToPerform: "Hold KB in one hand, walk with upright posture, keep core braced.",
    videoUrl: "https://www.youtube.com/embed/t9eN3vWc_Zc"
  },
  {
    name: "V-ups",
    description: "Abdominal exercise combining a crunch and leg raise.",
    howToPerform: "Lie on back, lift legs and arms to meet at top, lower with control.",
    videoUrl: "https://www.youtube.com/embed/JiZsTWnJvlw"
  },
  {
    name: "Cat-Cow",
    description: "Spinal mobility exercise moving between flexion and extension.",
    howToPerform: "On hands and knees, alternate arching your back (cow) and rounding it (cat) slowly. (10 slow reps)",
    videoUrl: "https://www.youtube.com/embed/ESJ6Ghvgr6k"
  },
  {
    name: "T-Spine Rotations",
    description: "Improves thoracic spine mobility and rotation.",
    howToPerform: "On hands and knees, place one hand behind your head and rotate elbow up toward the ceiling, then back down. (10 reps per side)",
    videoUrl: "https://www.youtube.com/embed/7-GDuhjOAU8"
  },
  {
    name: "Arm Circles",
    description: "Warms up and loosens shoulder joints.",
    howToPerform: "Extend arms to sides and make small to large circles, forward and backward. (20 seconds each direction)",
    videoUrl: "https://www.youtube.com/embed/P3dzI9opLGE"
  },
  {
    name: "Wall Angels",
    description: "Strengthens postural muscles and shoulder mobility.",
    howToPerform: "Stand against a wall, press arms and hands into wall, slide them up and down like a snow angel. (10 slow reps)",
    videoUrl: "https://www.youtube.com/embed/1UU4VvklQ44"
  },
  {
    name: "World's Greatest Stretch",
    description: "Full-body dynamic stretch that targets hips, spine, and hamstrings.",
    howToPerform: "Lunge forward, place both hands inside front foot, twist toward front leg, hold briefly, return and switch sides. (5 per side)",
    videoUrl: "https://www.youtube.com/embed/3Pr6n-nKfMA"
  },
  {
    name: "90/90 Hip Switches",
    description: "Improves internal and external hip rotation.",
    howToPerform: "Sit with both legs bent in a 90-degree position and rotate side to side without using your hands. (10 reps)",
    videoUrl: "https://www.youtube.com/embed/F1eZ4XcXTAE"
  },
  {
    name: "Ankle Rocking",
    description: "Improves ankle dorsiflexion for better squats and running.",
    howToPerform: "Kneel in front of a wall, drive your knee over toes while keeping heel down. (10 per side)",
    videoUrl: "https://www.youtube.com/embed/4yJk3zv1V6Y"
  },
  {
    name: "Glute Bridge Marches",
    description: "Activates glutes and core with added coordination.",
    howToPerform: "In a bridge position, lift one knee at a time while keeping hips elevated. (10 per side)",
    videoUrl: "https://www.youtube.com/embed/m2Zx-57cSok"
  },
  {
    name: "Dead Bug",
    description: "Core control exercise that also improves spine stability.",
    howToPerform: "Lie on your back with arms and legs up, lower opposite arm and leg while keeping core braced. (10 per side)",
    videoUrl: "https://www.youtube.com/embed/g_BYB0R-4Ws"
  },
  {
    name: "Bird Dog",
    description: "Core and back stabilizer exercise.",
    howToPerform: "On hands and knees, extend opposite arm and leg, hold briefly, and return. (10 per side)",
    videoUrl: "https://www.youtube.com/embed/2aGunzN5YWA"
  },
  {
    name: "Side Plank",
    description: "Builds lateral core strength and shoulder stability.",
    howToPerform: "Lie on side, prop up on forearm, keep body in a straight line, hold position. (20 seconds per side)",
    videoUrl: "https://www.youtube.com/embed/aFk1SjShgO4"
  }
];

export function getExerciseDescription(exerciseName: string): ExerciseDescription | undefined {
  return exerciseDescriptions.find(desc => desc.name.toLowerCase() === exerciseName.toLowerCase());
}

export function getYouTubeEmbedUrl(url: string): string {
  // If already an embed URL, add parameters if they're missing
  if (url.includes('youtube.com/embed/')) {
    // Add parameters to help with embedding issues if not already present
    if (!url.includes('?')) {
      return `${url}?enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`;
    }
    return url;
  }
  
  // Convert YouTube watch URL to embed URL
  // From: https://www.youtube.com/watch?v=VIDEO_ID
  // To: https://www.youtube.com/embed/VIDEO_ID
  const videoIdMatch = url.match(/[?&]v=([^&]+)/);
  if (videoIdMatch) {
    return `https://www.youtube.com/embed/${videoIdMatch[1]}?enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`;
  }
  return url; // Return original if not a YouTube URL
} 