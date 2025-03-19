'use client';
import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function AppLayout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar 
        isMobileSidebarOpen={isMobileSidebarOpen} 
        setIsMobileSidebarOpen={setIsMobileSidebarOpen} 
      />
      
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        setIsMobileOpen={setIsMobileSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'md:w-full md:ml-16' : 'md:w-[calc(100%-16rem)] md:ml-64'
      }`}>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
