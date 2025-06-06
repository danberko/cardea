import { navigation, classNames } from './navigation';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="relative z-50 lg:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-900/80" aria-hidden="true" onClick={onClose}></div>

      <div className="fixed inset-0 flex">
        {/* Sidebar panel */}
        <div className="relative mr-16 flex w-full max-w-xs flex-1">
          {/* Close button */}
          <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
            <button type="button" className="-m-2.5 p-2.5" onClick={onClose}>
              <span className="sr-only">Close sidebar</span>
              <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sidebar content */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 border-r border-gray-200">
            <div className="flex h-16 shrink-0 items-center px-2">
              <img 
                className="h-6 w-6" 
                src="/logo.svg" 
                alt="Cardea" 
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="-mx-2 flex-1 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                      )}
                    >
                      <item.icon className="size-6 shrink-0" aria-hidden="true" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
} 