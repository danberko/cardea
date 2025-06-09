'use client';

interface ActivityItem {
  id: string;
  type: 'workout' | 'milestone' | 'phase' | 'achievement';
  description: string;
  date: string;
  datetime: string;
}

interface ActivityProps {
  completedDates: Set<string>;
}

// Helper function to generate timeline entries from completed dates
const generateActivityData = (completedDates: Set<string>): ActivityItem[] => {
  const activities: ActivityItem[] = [];
  
  // Convert completed dates to activity items
  const sortedDates = Array.from(completedDates).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  sortedDates.forEach((dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    
    activities.push({
      id: `workout-${dateString}`,
      type: 'workout',
      description: `Completed ${dayName} workout`,
      date: formattedDate,
      datetime: dateString
    });
  });
  
  return activities;
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'workout':
      return (
        <svg className="size-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
        </svg>
      );
    case 'milestone':
      return (
        <svg className="size-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    case 'phase':
      return (
        <svg className="size-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      );
    case 'achievement':
      return (
        <svg className="size-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M1 8.25a1.25 1.25 0 1 1 2.5 0v7.5a1.25 1.25 0 1 1-2.5 0v-7.5ZM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0 1 14 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 0 1-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 0 1-1.341-.317l-2.734-1.366A3 3 0 0 0 6.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 0 1 2.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388Z" />
        </svg>
      );
    default:
      return (
        <svg className="size-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
        </svg>
      );
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'workout':
      return 'bg-green-500';
    case 'milestone':
      return 'bg-yellow-500';
    case 'phase':
      return 'bg-blue-500';
    case 'achievement':
      return 'bg-purple-500';
    default:
      return 'bg-gray-400';
  }
};

export function Activity({ completedDates }: ActivityProps) {
  const activityData = generateActivityData(completedDates);
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight">
          Activity Timeline
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Track your fitness journey and celebrate your achievements
        </p>
        
        {activityData.length === 0 ? (
          <div className="mt-8 text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No activity yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by completing your first workout!</p>
          </div>
        ) : (
          <div className="mt-8 flow-root">
            <ul role="list" className="-mb-8">
              {activityData.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activityData.length - 1 ? (
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className={`flex size-8 items-center justify-center rounded-full ${getActivityColor(activity.type)} ring-8 ring-white`}>
                        {getActivityIcon(activity.type)}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime={activity.datetime}>{activity.date}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>
    </div>
  );
} 