'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart2, 
  PieChart, 
  Layers, 
  CreditCard, 
  ChevronLeft, 
  ChevronRight,
  Settings,
  HelpCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Sidebar({ isMobileOpen, setIsMobileOpen }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  useEffect(() => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  }, []);

  const isActive = (path) => {
    return pathname === path;
  };

  const navItems = [
    { path: '/portfolio', name: 'Portfolio Overview', icon: BarChart2 },
    { path: '/fundAnalysis', name: 'Fund Analysis', icon: PieChart },
    { path: '/holdings', name: 'Holdings', icon: Layers },
    { path: '/transactions', name: 'Transactions', icon: CreditCard },
  ];
  
  const bottomNavItems = [
    { path: '/settings', name: 'Settings', icon: Settings },
  ];

  return (
    <>
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      <div className={`
        ${isCollapsed ? 'w-16' : 'w-64'} 
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
        bg-neutral-900 h-screen fixed left-0 top-16 z-30
        transition-all duration-300 ease-in-out
        border-r border-neutral-800 flex flex-col
      `}>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-neutral-800 text-gray-400 hover:text-white
                    p-1 rounded-full border border-neutral-700 hidden md:flex"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
        
        <div className="p-3 flex-1 overflow-y-auto scrollbar-thin">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center text-white px-3 py-2 text-sm rounded-md transition-colors
                          ${isActive(item.path) ? 'bg-blue-600 text-white' : 'hover:bg-neutral-700'}`}
              >
                <item.icon size={18} className={isCollapsed ? 'mx-auto' : 'mr-2'} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
          <div className="border-t border-neutral-800 my-4"></div>
          
          <div className="text-xs text-gray-500 px-3 mb-2">
            {!isCollapsed && <span>ADDITIONAL</span>}
          </div>
          <nav className="space-y-1">
            {bottomNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center text-gray-400 hover:text-white px-3 py-2 text-sm rounded-md transition-colors
                          ${isActive(item.path) ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-700'}`}
              >
                <item.icon size={18} className={isCollapsed ? 'mx-auto' : 'mr-2'} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className={`p-3 border-t border-neutral-800 ${isCollapsed ? 'text-center' : ''}`}>
          <div className="flex items-center px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold">
              kT
            </div>
            {!isCollapsed && (
              <div className="ml-2 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">Ryan</p>
                <p className="text-xs text-gray-500 truncate">Premium Plan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}