# Cardea - 6-Phase Fitness Training App

A comprehensive Next.js fitness application that provides a structured 6-month training program with interactive calendar navigation and exercise management.

## 🏋️ Features

- **6-Phase Training Program**: Progressive training schedule from June 9 - December 26, 2025
- **Interactive Calendar**: Navigate through months and days with visual indicators
- **Exercise Filtering**: Switch between Home and Gym exercises (both include mobility)
- **Phase-Based Progression**: Increasing sets and intensity across 6 training phases
- **Responsive Design**: Modern UI with Tailwind CSS
- **Workout Schedule**: Monday/Wednesday/Friday workouts, Tuesday/Thursday mobility days

## 📅 Training Phases

1. **Phase 1** (June 9-27): Foundation - 3 sets, building base strength
2. **Phase 2** (June 30 - July 25): Development - 3 sets, continued building
3. **Phase 3** (July 28 - August 22): Progression - 3 sets, exercise variation
4. **Phase 4** (August 25 - September 26): Intensity - 4 sets, increased load
5. **Phase 5** (September 29 - November 21): High Intensity - 4 sets, reduced reps
6. **Phase 6** (November 24 - December 26): Peak - 5 sets, maximum intensity

## 🏃 Workout Structure

- **Monday**: Chest, Shoulders, Triceps + Cardio (3+ miles)
- **Tuesday**: Mobility and Recovery exercises
- **Wednesday**: Back, Lats, Biceps + Cardio (3+ miles)
- **Thursday**: Mobility and Recovery exercises  
- **Friday**: Legs, Glutes, Core + Cardio (3+ miles)
- **Weekend**: Rest days

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Components**: Custom React components
- **Date Handling**: Timezone-safe date management

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/[your-username]/cardea.git
   cd cardea
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📱 Usage

1. **Navigate Dates**: Use calendar or arrow buttons to select workout days
2. **Filter Exercises**: Toggle between "Home Exercise" and "Gym Exercise" views
3. **View Workouts**: See exercises, sets, reps, and descriptions for each day
4. **Track Progress**: Visual phase indicators show current training stage

## 🎨 Component Structure

```
src/
├── components/
│   ├── Badge.tsx           # Phase color indicators
│   ├── DashboardLayout.tsx # Main layout wrapper
│   ├── Header.tsx          # Navigation header
│   ├── MobileSidebar.tsx   # Mobile navigation
│   └── Sidebar.tsx         # Desktop sidebar
├── data/
│   ├── exercises.ts        # Complete exercise database
│   └── trainingPhases.ts   # Phase definitions
└── app/
    ├── layout.tsx          # Root layout
    └── page.tsx            # Main dashboard page
```

## 🔧 Key Features

### Exercise Data Generation
- Programmatically generates all workout days
- Timezone-safe date handling
- Progressive difficulty across phases
- Separate templates for each workout day

### Calendar Navigation  
- Month-by-month navigation
- Day-by-day navigation with arrows
- Today button for quick access
- Visual highlighting for selected dates

### Exercise Filtering
- Home exercises (bodyweight + kettlebell)
- Gym exercises (machines + free weights)
- Mobility exercises (included in both views)

## 🐛 Troubleshooting

- **Exercises not showing**: Ensure you're on a scheduled workout day (Mon/Wed/Fri)
- **Date misalignment**: Browser timezone should match exercise schedule
- **Calendar navigation**: Use month arrows to change view without affecting selected date

## 📄 License

This project is available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

Built with ❤️ for fitness enthusiasts who want a structured, progressive training program.
