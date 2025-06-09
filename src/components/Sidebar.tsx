import { getNavigation, classNames } from './navigation';

interface SidebarProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export function Sidebar({ onNavigate, currentPage = 'Dashboard' }: SidebarProps = {}) {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-white lg:border-r lg:border-gray-200 lg:pb-4">
      <div className="flex h-16 shrink-0 items-center justify-center px-2">
        <img 
          className="h-6 w-6" 
          src="/logo.svg" 
          alt="Cardea" 
        />
      </div>
      <nav className="mt-8">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {getNavigation(currentPage).map((item) => (
            <li key={item.name}>
              <button
                onClick={() => onNavigate?.(item.name)}
                className={classNames(
                  item.current
                    ? 'bg-indigo-50 text-indigo-600 border-indigo-600'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50',
                  'group flex gap-x-3 rounded-md p-3 text-sm/6 font-semibold border border-transparent cursor-pointer w-full'
                )}
              >
                <item.icon className="size-6 shrink-0" aria-hidden="true" />
                <span className="sr-only">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 