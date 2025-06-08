'use client'

import { DashboardLayout } from '@/components/DashboardLayout';
import { Badge, BadgeColor } from '@/components/Badge';
import { ExerciseDrawer } from '@/components/ExerciseDrawer';
import { getCurrentPhase } from '@/data/trainingPhases';
import { getExercisesForDate, Exercise } from '@/data/exercises';
import { getExerciseDescription, ExerciseDescription } from '@/data/exerciseDescriptions';
import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function Dashboard() {
  // State for dropdown
  const [selectedView, setSelectedView] = useState('Home Exercise');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 5, 9)); // Year, Month (0-based), Day - June 9 = Monday
  const [calendarViewDate, setCalendarViewDate] = useState(new Date(2025, 5, 9));
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<{exercise: ExerciseDescription, sets: number, reps: string} | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [activeExerciseName, setActiveExerciseName] = useState<string | null>(null);

  // Get current date and phase
  const today = new Date();
  const currentPhase = getCurrentPhase(selectedDate);
  const currentMonth = calendarViewDate.toLocaleString('default', { month: 'long' });
  const currentYear = calendarViewDate.getFullYear();
  const currentDay = selectedDate.toLocaleString('default', { weekday: 'long' });
  
  // Format date for datetime attribute
  const selectedDateISO = selectedDate.toISOString().split('T')[0];
  const todayISO = today.toISOString().split('T')[0];
  
  // Get exercises for selected date
  const daySchedule = getExercisesForDate(selectedDateISO);
  
  // Display format for header
  const shortDateFormat = selectedDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
  const longDateFormat = selectedDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  // Generate mini calendar dates
  const firstDayOfMonth = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth(), 1);
  const lastDayOfMonth = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Previous month's trailing days
  const prevMonth = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 0);
  const prevMonthDays = prevMonth.getDate();
  const trailingDays = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1; // Adjust for Monday start
  
  // Generate calendar grid
  const calendarDays = [];
  
  // Previous month's trailing days
  for (let i = trailingDays; i > 0; i--) {
    const date = prevMonthDays - i + 1;
    const dateObj = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, date);
    const dateISO = dateObj.toISOString().split('T')[0];
    calendarDays.push({
      date,
      dateTime: dateISO,
      isCurrentMonth: false,
      isToday: dateISO === todayISO,
      isSelected: dateISO === selectedDateISO,
      isFirst: i === trailingDays,
      isLast: false
    });
  }
  
  // Current month days
  for (let date = 1; date <= daysInMonth; date++) {
    const dateObj = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth(), date);
    const dateISO = dateObj.toISOString().split('T')[0];
    const isToday = dateISO === todayISO;
    const isSelected = dateISO === selectedDateISO;
    calendarDays.push({
      date,
      dateTime: dateISO,
      isCurrentMonth: true,
      isToday,
      isSelected,
      isFirst: date === 1 && trailingDays === 0,
      isLast: false
    });
  }
  
  // Next month's leading days to fill the grid (42 total cells for 6 weeks)
  const remainingCells = 42 - calendarDays.length;
  for (let date = 1; date <= remainingCells; date++) {
    const dateObj = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, date);
    const dateISO = dateObj.toISOString().split('T')[0];
    calendarDays.push({
      date,
      dateTime: dateISO,
      isCurrentMonth: false,
      isToday: dateISO === todayISO,
      isSelected: dateISO === selectedDateISO,
      isFirst: false,
      isLast: date === remainingCells
    });
  }

  const handleViewChange = (view: string) => {
    setSelectedView(view);
    setIsDropdownOpen(false);
  };

  const handleDateClick = (date: string) => {
    // Parse the ISO date string to avoid timezone issues
    const [year, month, day] = date.split('-').map(Number);
    const newSelectedDate = new Date(year, month - 1, day); // month is 0-based
    setSelectedDate(newSelectedDate);
    // Update calendar view to show the month of the selected date
    setCalendarViewDate(newSelectedDate);
  };

  const handlePreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setSelectedDate(previousDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const handleTodayClick = () => {
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    setSelectedDate(todayDate);
    setCalendarViewDate(todayDate);
  };

  const handlePreviousMonth = () => {
    const previousMonth = new Date(calendarViewDate);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setCalendarViewDate(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(calendarViewDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCalendarViewDate(nextMonth);
  };

  const handleViewDetails = (exerciseName: string, sets: string, reps: string, exerciseIndex: number) => {
    const exerciseDetails = getExerciseDescription(exerciseName);
    if (exerciseDetails) {
      setSelectedExercise({ exercise: exerciseDetails, sets: parseInt(sets), reps });
      setCurrentExerciseIndex(exerciseIndex);
      setActiveExerciseName(exerciseName);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExercise(null);
    setCurrentExerciseIndex(0);
    setActiveExerciseName(null);
  };

  const handlePreviousExercise = () => {
    const exercises = getFilteredExercises();
    if (currentExerciseIndex > 0) {
      const newIndex = currentExerciseIndex - 1;
      const exercise = exercises[newIndex];
      const exerciseDetails = getExerciseDescription(exercise.name);
      if (exerciseDetails) {
        setSelectedExercise({ exercise: exerciseDetails, sets: parseInt(exercise.sets), reps: exercise.reps });
        setCurrentExerciseIndex(newIndex);
        setActiveExerciseName(exercise.name);
      }
    }
  };

  const handleNextExercise = () => {
    const exercises = getFilteredExercises();
    if (currentExerciseIndex < exercises.length - 1) {
      const newIndex = currentExerciseIndex + 1;
      const exercise = exercises[newIndex];
      const exerciseDetails = getExerciseDescription(exercise.name);
      if (exerciseDetails) {
        setSelectedExercise({ exercise: exerciseDetails, sets: parseInt(exercise.sets), reps: exercise.reps });
        setCurrentExerciseIndex(newIndex);
        setActiveExerciseName(exercise.name);
      }
    }
  };

  const handleMarkComplete = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio: number, opts: object) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  // Function to get phase color based on phase name
  const getPhaseColor = (phaseName: string): BadgeColor => {
    if (phaseName.includes('Phase 1')) return 'blue';
    if (phaseName.includes('Phase 2')) return 'green';
    if (phaseName.includes('Phase 3')) return 'yellow';
    if (phaseName.includes('Phase 4')) return 'red';
    if (phaseName.includes('Phase 5')) return 'purple';
    if (phaseName.includes('Phase 6')) return 'pink';
    return 'gray'; // fallback
  };

  // Function to get exercises based on selected filter
  const getFilteredExercises = (): Exercise[] => {
    if (!daySchedule) return [];
    
    switch (selectedView) {
      case 'Home Exercise':
        return [...daySchedule.homeExercises, ...daySchedule.mobilityExercises];
      case 'Gym Exercise':
        return [...daySchedule.gymExercises, ...daySchedule.mobilityExercises];
      default:
        return [...daySchedule.homeExercises, ...daySchedule.mobilityExercises];
    }
  };

  // Function to get appropriate icon for exercise type
  const getExerciseIcon = (exerciseName: string) => {
    const name = exerciseName.toLowerCase();
    
    // Chest exercises
    if (name.includes('bench press') || name.includes('push-up') || name.includes('floor press')) {
      return (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
    }
    
    // Shoulder exercises
    if (name.includes('shoulder press') || name.includes('overhead press') || name.includes('wall angels')) {
      return (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      );
    }
    
    // Back/Pulling exercises
    if (name.includes('row') || name.includes('pulldown') || name.includes('pull-apart') || name.includes('face pull') || name.includes('lat')) {
      return (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
      );
    }
    
    // Bicep/Curl exercises
    if (name.includes('curl')) {
      return (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.2 5.5-6 0-1.2-.5-2.3-1.3-3.2.4-1.1.4-2.4-.1-3.5 0 0-1.1-.3-3.5 1.3-2.1-.6-4.3-.6-6.4 0C6.5 2.8 5.4 3.1 5.4 3.1c-.5 1.1-.5 2.4-.1 3.5C4.5 7.5 4 8.6 4 9.8c0 4.8 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V19" />
        </svg>
      );
    }
    
    // Tricep exercises
    if (name.includes('tricep') || name.includes('pushdown') || name.includes('extension')) {
      return (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      );
    }
    
    // Leg exercises
    if (name.includes('squat') || name.includes('leg press') || name.includes('lunge')) {
      return (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      );
    }
    
    // RDL/Deadlift exercises
    if (name.includes('rdl') || name.includes('deadlift')) {
      return (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      );
    }
    
    // Calf exercises
    if (name.includes('calf')) {
      return (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    
    // Core/Ab exercises
    if (name.includes('plank') || name.includes('v-up') || name.includes('dead bug') || name.includes('bird dog') || name.includes('side plank')) {
      return (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      );
    }
    
    // KB Swings
    if (name.includes('swing')) {
      return (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    }
    
    // Carry exercises
    if (name.includes('carry')) {
      return (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );
    }
    
    // Mobility/Stretch exercises
    if (name.includes('cat-cow') || name.includes('rotation') || name.includes('stretch') || name.includes('hip switch') || name.includes('ankle rock')) {
      return (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    }
    
    // Arm circles
    if (name.includes('arm circle')) {
      return (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 2v20M14 2v20M4 7l4 5-4 5M20 7l-4 5 4 5" />
        </svg>
      );
    }
    
    // Glute bridge
    if (name.includes('glute bridge') || name.includes('bridge')) {
      return (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
        </svg>
      );
    }
    
    // Default exercise icon (lightning bolt)
    return (
      <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  };

  // Function to render exercise list
  const renderExercises = () => {
    const exercises = getFilteredExercises();
    const items = [];
    
    // Add cardio goal as first item if it exists
    if (daySchedule?.cardioGoal) {
      items.push(
        <li key="cardio-goal" className="flex items-center justify-between gap-x-6 py-5 px-4 mx-2 rounded-lg">
          <div className="flex min-w-0 gap-x-4">
            <div className="size-12 flex-none rounded-lg bg-gray-100 flex items-center justify-center">
              <svg className="size-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">Run/Treadmill/Elliptical</p>
              <p className="mt-1 text-xs/5 text-gray-600">3 miles or more</p>
              <p className="text-xs/5 text-gray-500">Cardio exercise</p>
            </div>
          </div>
        </li>
      );
    }
    
    if (exercises.length === 0) {
      if (items.length > 0) {
        return items; // Return cardio goal only
      }
      return (
        <li className="py-8 text-center">
          <p className="text-gray-500">No {selectedView.toLowerCase()} scheduled for this date</p>
        </li>
      );
    }

    // Add exercises
    const exerciseItems = exercises.map((exercise, index) => {
      const isActive = isModalOpen && activeExerciseName === exercise.name;
      
      return (
        <li key={index} className={`flex items-center justify-between gap-x-6 py-5 px-4 mx-2 rounded-lg transition-all duration-200 ${isActive ? 'bg-indigo-50 border border-indigo-200 shadow-sm' : ''}`}>
          <div className="flex min-w-0 gap-x-4">
            <div className={`size-12 flex-none rounded-lg flex items-center justify-center ${isActive ? 'bg-indigo-100' : 'bg-gray-100'}`}>
              <div className={`${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
                {getExerciseIcon(exercise.name)}
              </div>
            </div>
            <div className="min-w-0 flex-auto">
              <p className={`text-sm/6 font-semibold ${isActive ? 'text-indigo-900' : 'text-gray-900'}`}>{exercise.name}</p>
              <p className={`mt-1 text-xs/5 ${isActive ? 'text-indigo-700' : 'text-gray-600'}`}>{exercise.sets} sets × {exercise.reps}</p>
              {exercise.description && (
                <p className={`mt-1 truncate text-xs/5 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>{exercise.description}</p>
              )}
            </div>
          </div>
          <button 
            onClick={() => handleViewDetails(exercise.name, exercise.sets, exercise.reps, index)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold shadow-xs ring-1 ring-inset transition-colors cursor-pointer ${
              isActive 
                ? 'bg-indigo-600 text-white ring-indigo-600 hover:bg-indigo-700' 
                : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
            }`}
          >
            {isActive ? 'Currently viewing' : 'View details'}
          </button>
        </li>
      );
    });

    // Return combined items
    return [...items, ...exerciseItems];
  };

  return (
    <DashboardLayout>
      <div className="flex h-full flex-col border border-gray-200 rounded-lg overflow-hidden">
        <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <div className="flex items-center gap-x-3">
              <h1 className="text-base font-semibold text-gray-900">
                <time dateTime={selectedDateISO} className="sm:hidden">{shortDateFormat}</time>
                <time dateTime={selectedDateISO} className="hidden sm:inline">{longDateFormat}</time>
              </h1>
              <Badge color={getPhaseColor(currentPhase.phase)}>{currentPhase.phase}</Badge>
            </div>
            <p className="mt-1 text-sm text-gray-500">{currentDay}</p>
          </div>
          <div className="flex items-center">
            <div className="relative flex items-center rounded-md bg-white shadow-xs md:items-stretch">
              <button 
                type="button" 
                className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50 cursor-pointer"
                onClick={handlePreviousDay}
              >
                <span className="sr-only">Previous day</span>
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                type="button" 
                className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block cursor-pointer"
                onClick={handleTodayClick}
              >
                Today
              </button>
              <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
              <button 
                type="button" 
                className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50 cursor-pointer"
                onClick={handleNextDay}
              >
                <span className="sr-only">Next day</span>
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="hidden md:ml-4 md:flex md:items-center">
              <div className="relative">
                <button 
                  type="button" 
                  className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer" 
                  id="menu-button" 
                  aria-expanded={isDropdownOpen} 
                  aria-haspopup="true"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {selectedView}
                  <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>

                <div className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform transition-all duration-200 ease-out ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                    <div className="py-1" role="none">
                      <button
                        className={`${selectedView === 'Home Exercise' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-gray-900 cursor-pointer`}
                        role="menuitem"
                        onClick={() => handleViewChange('Home Exercise')}
                      >
                        Home Exercise
                      </button>
                      <button
                        className={`${selectedView === 'Gym Exercise' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-gray-900 cursor-pointer`}
                        role="menuitem"
                        onClick={() => handleViewChange('Gym Exercise')}
                      >
                        Gym Exercise
                      </button>

                    </div>
                  </div>
              </div>
              <div className="ml-6 h-6 w-px bg-gray-300"></div>
              <button type="button" className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer" onClick={handleMarkComplete}>Mark complete</button>
            </div>
            <div className="relative ml-6 md:hidden">
              <button type="button" className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500" id="menu-0-button" aria-expanded="false" aria-haspopup="true">
                <span className="sr-only">Open menu</span>
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <div className="isolate flex flex-1 overflow-hidden bg-white">
          <div className="flex flex-1 flex-col">
            <div className="flex-1 overflow-y-auto p-6">
              {/* Exercise List */}
              <ul role="list" className="divide-y divide-gray-100">
                {daySchedule ? renderExercises() : (
                  <li className="py-8 text-center">
                    <p className="text-gray-500">No exercises scheduled for this date</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
            <div className="flex items-center text-center text-gray-900">
              <button 
                type="button" 
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                onClick={handlePreviousMonth}
              >
                <span className="sr-only">Previous month</span>
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="flex-auto text-sm font-semibold">{currentMonth} {currentYear}</div>
              <button 
                type="button" 
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                onClick={handleNextMonth}
              >
                <span className="sr-only">Next month</span>
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="mt-6 grid grid-cols-7 text-center text-xs/6 text-gray-500">
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow-sm ring-1 ring-gray-200">
              {calendarDays.map((day, index) => {
                const isFirstInRow = index % 7 === 0;
                const isLastInRow = index % 7 === 6;
                const isFirstRow = index < 7;
                const isLastRow = index >= 35;
                
                let roundedClass = '';
                if (isFirstRow && isFirstInRow) roundedClass = 'rounded-tl-lg';
                if (isFirstRow && isLastInRow) roundedClass = 'rounded-tr-lg';
                if (isLastRow && isFirstInRow) roundedClass = 'rounded-bl-lg';
                if (isLastRow && isLastInRow) roundedClass = 'rounded-br-lg';
                
                const buttonClasses = [
                  roundedClass,
                  day.isCurrentMonth ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400',
                  'py-1.5 hover:bg-gray-100 focus:z-10'
                ].filter(Boolean).join(' ');
                
                const timeClasses = [
                  'mx-auto flex size-7 items-center justify-center rounded-full',
                  day.isToday ? 'bg-gray-900 font-semibold text-white' : '',
                  day.isSelected && !day.isToday ? 'bg-indigo-600 font-semibold text-white' : ''
                ].filter(Boolean).join(' ');

                // Get phase for this date
                const dayPhase = getCurrentPhase(new Date(day.dateTime));
                const phaseColor = getPhaseColor(dayPhase.phase);
                
                // Phase dot color mapping
                const phaseDotColors: Record<BadgeColor, string> = {
                  'blue': 'bg-blue-500',
                  'green': 'bg-green-500', 
                  'yellow': 'bg-yellow-500',
                  'red': 'bg-red-500',
                  'purple': 'bg-purple-500',
                  'pink': 'bg-pink-500',
                  'gray': 'bg-gray-500',
                  'indigo': 'bg-indigo-500'
                };
                
                return (
                  <button 
                    key={`${day.dateTime}-${index}`} 
                    type="button" 
                    className={`${buttonClasses} cursor-pointer flex flex-col items-center`}
                    onClick={() => handleDateClick(day.dateTime)}
                  >
                    <time dateTime={day.dateTime} className={timeClasses}>
                      {day.date}
                    </time>
                    {day.isCurrentMonth && (
                      <div className={`w-1 h-1 rounded-full mt-0.5 ${phaseDotColors[phaseColor]}`}></div>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Fitness Stats Card */}
            <div className="mt-8">
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                  <div className="size-12 flex-none rounded-lg bg-indigo-600 flex items-center justify-center ring-1 ring-gray-900/10">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-sm/6 font-medium text-gray-900">Cardea Fitness</div>
                  <div className="relative ml-auto">
                    <button type="button" className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500 cursor-pointer" id="options-menu-0-button" aria-expanded="false" aria-haspopup="true">
                      <span className="sr-only">Open options</span>
                      <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm/6">
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Current Phase</dt>
                    <dd className="text-gray-700">{currentPhase.phase}</dd>
                  </div>
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Workout Day</dt>
                    <dd className="flex items-start gap-x-2">
                      <div className="font-medium text-gray-900">{currentDay}</div>
                      <div className={`rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${daySchedule ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-gray-50 text-gray-700 ring-gray-600/20'}`}>
                        {daySchedule ? 'Active' : 'Rest Day'}
                      </div>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Exercise Count</dt>
                    <dd className="text-gray-700">{getFilteredExercises().length} exercises</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise Details Drawer */}
      <ExerciseDrawer
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        exercise={selectedExercise?.exercise || null}
        sets={selectedExercise?.sets}
        reps={selectedExercise?.reps}
        currentIndex={currentExerciseIndex}
        totalExercises={getFilteredExercises().length}
        onPrevious={handlePreviousExercise}
        onNext={handleNextExercise}
      />
    </DashboardLayout>
  );
}
