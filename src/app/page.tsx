'use client'

import { DashboardLayout } from '@/components/DashboardLayout';
import { Badge, BadgeColor } from '@/components/Badge';
import { getCurrentPhase } from '@/data/trainingPhases';
import { getExercisesForDate, Exercise } from '@/data/exercises';
import { useState } from 'react';

export default function Dashboard() {
  // State for dropdown
  const [selectedView, setSelectedView] = useState('Home Exercise');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 5, 9)); // Year, Month (0-based), Day - June 9 = Monday
  const [calendarViewDate, setCalendarViewDate] = useState(new Date(2025, 5, 9));

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
    setSelectedDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
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

  // Function to render exercise list
  const renderExercises = () => {
    const exercises = getFilteredExercises();
    
    if (exercises.length === 0) {
      return (
        <li className="py-8 text-center">
          <p className="text-gray-500">No {selectedView.toLowerCase()} scheduled for this date</p>
        </li>
      );
    }

    return exercises.map((exercise, index) => (
      <li key={index} className="flex items-center justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="size-12 flex-none rounded-lg bg-gray-100 flex items-center justify-center">
            <svg className="size-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="min-w-0 flex-auto">
            <p className="text-sm/6 font-semibold text-gray-900">{exercise.name}</p>
            <p className="mt-1 text-xs/5 text-gray-600">{exercise.sets} sets × {exercise.reps}</p>
            {exercise.description && (
              <p className="mt-1 truncate text-xs/5 text-gray-500">{exercise.description}</p>
            )}
          </div>
        </div>
        <div className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset">
          View details
        </div>
      </li>
    ));
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
                className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
                onClick={handlePreviousDay}
              >
                <span className="sr-only">Previous day</span>
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                type="button" 
                className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
                onClick={handleTodayClick}
              >
                Today
              </button>
              <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
              <button 
                type="button" 
                className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
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
                  className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50" 
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

                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                    <div className="py-1" role="none">
                      <button
                        className={`${selectedView === 'Home Exercise' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-gray-900`}
                        role="menuitem"
                        onClick={() => handleViewChange('Home Exercise')}
                      >
                        Home Exercise
                      </button>
                      <button
                        className={`${selectedView === 'Gym Exercise' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-gray-900`}
                        role="menuitem"
                        onClick={() => handleViewChange('Gym Exercise')}
                      >
                        Gym Exercise
                      </button>

                    </div>
                  </div>
                )}
              </div>
              <div className="ml-6 h-6 w-px bg-gray-300"></div>
              <button type="button" className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Mark complete</button>
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
              {/* Cardio Goal Section */}
              {daySchedule?.cardioGoal && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-sm font-semibold text-blue-900 mb-1">Cardio Goal</h3>
                  <p className="text-sm text-blue-700">{daySchedule.cardioGoal}</p>
                </div>
              )}
              
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
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
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
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
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
                
                return (
                  <button 
                    key={`${day.dateTime}-${index}`} 
                    type="button" 
                    className={buttonClasses}
                    onClick={() => handleDateClick(day.dateTime)}
                  >
                    <time dateTime={day.dateTime} className={timeClasses}>
                      {day.date}
                    </time>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
