'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ isMobileSidebarOpen, setIsMobileSidebarOpen }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="h-16 bg-neutral-900 text-white flex items-center px-4 fixed top-0 right-0 left-0 z-40 shadow-md border-b border-neutral-800">
      <div className="flex items-center">
        <button 
          aria-label="Toggle sidebar"
          className="p-2 mr-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors md:hidden"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <Link href="/" className="flex items-center">
          <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-sm md:text-lg font-bold shadow">
            KT
          </div>
          <span className="text-lg font-semibold ml-2 hidden md:block">Khajana Tech</span>
        </Link>
      </div>

      <div className="hidden md:block mx-auto max-w-sm w-full px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search assets, transactions..."
            className="w-full bg-neutral-800 text-white pl-9 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="ml-auto flex items-center space-x-1 md:space-x-3">
        <div ref={searchRef} className="md:hidden relative">
          <button
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search size={18} />
          </button>
          
          {showSearch && (
            <div className="bg-neutral-800 rounded-lg shadow-lg p-2 border border-neutral-700 absolute top-10 right-0 w-64">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-neutral-700 text-white pl-8 pr-3 py-2 rounded-md text-sm focus:outline-none"
                  autoFocus
                />
                <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
              </div>
            </div>
          )}
        </div>

        <div ref={notificationsRef} className="relative">
          <button
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={18} />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center border border-neutral-900">
              3
            </span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 md:w-80 bg-neutral-800 rounded-md shadow-lg py-1 border border-neutral-700 z-10">
              <div className="px-4 py-2 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-sm font-medium">Notifications</h3>
                <button className="text-xs text-blue-400 hover:text-blue-300">Mark all as read</button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {[
                  { title: "Portfolio alert", desc: "AAPL is down 5% today", time: "15m ago" },
                  { title: "System update", desc: "New features have been added", time: "1h ago" },
                  { title: "Security alert", desc: "New login from Chrome on Mac", time: "2h ago" }
                ].map((notif, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium">{notif.title}</p>
                      <span className="text-xs text-gray-400">{notif.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{notif.desc}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-700 text-center">
                <Link href="/notifications" className="text-xs text-blue-400 hover:text-blue-300">
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        <div ref={profileRef} className="relative">
          <button
            className="p-2 rounded-full hover:bg-gray-800 transition-colors flex items-center"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold shadow">
              Rk
            </div>
            <ChevronDown size={14} className="ml-1 text-gray-400" />
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-neutral-800 rounded-md shadow-lg py-1 border border-neutral-700 z-10">
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-sm font-medium">Ryan</p>
                <p className="text-xs text-gray-400 truncate">ryanraushan513@gmail.com</p>
              </div>
              <Link href="/profile" className="px-4 py-2 text-sm hover:bg-gray-700 flex items-center">
                <User size={16} className="mr-2 text-gray-400" />
                Profile
              </Link>
              <Link href="/settings" className="px-4 py-2 text-sm hover:bg-gray-700 flex items-center">
                <Settings size={16} className="mr-2 text-gray-400" />
                Settings
              </Link>
              <div className="border-t border-gray-700 my-1"></div>
              <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center">
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}