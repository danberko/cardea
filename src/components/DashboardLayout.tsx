'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { MobileSidebar } from './MobileSidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export function DashboardLayout({ children, onNavigate, currentPage }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-50 h-screen overflow-hidden">
      {/* Mobile sidebar */}
      <MobileSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      {/* Desktop sidebar */}
      <Sidebar onNavigate={onNavigate} currentPage={currentPage} />

      <div className="lg:pl-20 h-full flex flex-col">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Main content */}
        <main className="bg-gray-50 flex-1 overflow-hidden">
          <div className="h-full p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 