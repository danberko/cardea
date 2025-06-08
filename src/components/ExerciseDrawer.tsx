'use client';

import { ExerciseDescription, getYouTubeEmbedUrl } from '@/data/exerciseDescriptions';

interface ExerciseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: ExerciseDescription | null;
  sets?: number;
  reps?: string;
  currentIndex: number;
  totalExercises: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function ExerciseDrawer({ isOpen, onClose, exercise, sets, reps, currentIndex, totalExercises, onPrevious, onNext }: ExerciseDrawerProps) {
  return (
    <div className={`fixed inset-y-0 right-0 z-50 flex max-w-full pl-10 ${isOpen && exercise ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className={`w-screen max-w-md transform transition-transform ease-in-out duration-500 ${isOpen && exercise ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
            {/* Header */}
            <div className="px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  {/* Exercise icon */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 mr-3">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                                     <h2 className="text-lg font-semibold text-gray-900" id="drawer-title">
                     {exercise?.name || ''}
                   </h2>
                </div>
                <div className="ml-3 flex h-7 items-center">
                                     <button
                     type="button"
                     className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                     onClick={onClose}
                   >
                    <span className="sr-only">Close panel</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative mt-6 flex-1 px-4 sm:px-6">
              {/* Sets and reps if provided */}
              {sets && reps && (
                <div className="mb-6">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {sets} sets × {reps}
                  </span>
                </div>
              )}

              {/* Description */}
                             <div className="mb-6">
                 <h3 className="text-sm font-medium text-gray-900 mb-3">Description</h3>
                 <p className="text-sm text-gray-600 leading-6">{exercise?.description || ''}</p>
               </div>

               {/* How to perform */}
               <div className="mb-6">
                 <h3 className="text-sm font-medium text-gray-900 mb-3">How to Perform</h3>
                 <p className="text-sm text-gray-600 leading-6">{exercise?.howToPerform || ''}</p>
               </div>

               {/* Video */}
               {exercise?.videoUrl && (
                 <div className="mb-6">
                   <h3 className="text-sm font-medium text-gray-900 mb-3">Video Demonstration</h3>
                   <div className="w-full aspect-video">
                     <iframe
                       src={getYouTubeEmbedUrl(exercise.videoUrl)}
                       title={`${exercise.name} exercise demonstration`}
                       className="w-full h-full rounded-lg"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                       allowFullScreen
                       loading="lazy"
                       referrerPolicy="strict-origin-when-cross-origin"
                     ></iframe>
                   </div>
                 </div>
               )}
            </div>

            {/* Footer */}
            <div className="flex flex-shrink-0 items-center justify-between px-4 py-4 sm:px-6">
              {/* Exercise counter */}
              <div className="text-sm text-gray-500">
                {currentIndex + 1} of {totalExercises}
              </div>
              
              {/* Navigation buttons */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  onClick={onPrevious}
                  disabled={currentIndex === 0}
                >
                  <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  onClick={onNext}
                  disabled={currentIndex === totalExercises - 1}
                >
                  Next
                  <svg className="ml-1.5 -mr-0.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
           </div>
         </div>
       </div>
   );
} 