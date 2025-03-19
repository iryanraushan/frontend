'use client';
import { useState, useEffect } from 'react';
import { X, Bell, Check, AlertTriangle, Info, Mail, FileCheck, Clock, Battery, UserPlus } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const predefinedNotifications = [
    {
      id: 1,
      type: 'info',
      title: 'New message received',
      message: 'John Smith sent you a message regarding the project proposal. Check your inbox for details.',
      timestamp: '10:23 AM',
      icon: <Mail size={20} className="text-blue-500" />
    },
    {
      id: 2,
      type: 'success',
      title: 'File uploaded successfully',
      message: 'Your document "Q1_Report.pdf" has been uploaded to the shared drive. All team members can now access it.',
      timestamp: '9:45 AM',
      icon: <FileCheck size={20} className="text-green-500" />
    },
    {
      id: 3,
      type: 'warning',
      title: 'Meeting in 30 minutes',
      message: 'Reminder: Weekly team meeting starts in 30 minutes. Join via the calendar link or meeting room 305.',
      timestamp: '9:12 AM',
      icon: <Clock size={20} className="text-yellow-500" />
    },
    {
      id: 4,
      type: 'error',
      title: 'Low battery warning',
      message: 'Your device battery is at 10%. Please connect to a power source soon to avoid interruption.',
      timestamp: '8:56 AM',
      icon: <Battery size={20} className="text-red-500" />
    },
    {
      id: 5,
      type: 'info',
      title: 'New connection request',
      message: 'Sarah Johnson wants to connect with you. View their profile and respond to their request.',
      timestamp: '8:30 AM',
      icon: <UserPlus size={20} className="text-blue-500" />
    }
  ];

  useEffect(() => {
    // Load the predefined notifications
    setNotifications(predefinedNotifications);
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getBackground = (type) => {
    switch (type) {
      case 'success': return 'border-l-4 border-green-500 bg-neutral-700';
      case 'warning': return 'border-l-4 border-yellow-500 bg-neutral-700';
      case 'error': return 'border-l-4 border-red-500 bg-neutral-700';
      case 'info':
      default: return 'border-l-4 border-blue-500 bg-neutral-700';
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className=" rounded-lg shadow-lg p-6 mx-auto">
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold flex items-center text-gray-800 text-white">
          <Bell className="mr-3 text-blue-600" size={24} />
          Notifications
          {notifications.length > 0 && (
            <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1">
              {notifications.length}
            </span>
          )}
        </h2>
        {notifications.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <Bell size={48} className="mb-3 opacity-30" />
          <p className="text-lg">No notifications to display</p>
          <p className="text-sm mt-1">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`relative p-4 rounded-md ${getBackground(notification.type)} shadow-sm transition-all hover:shadow-md`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  {notification.icon}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-800 text-lg  text-white">{notification.title}</h3>
                    <p className="text-xs text-gray-500 mt-1  text-white">{notification.timestamp}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 text-white">{notification.message}</p>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none hover:bg-gray-100 p-1 rounded-full transition-colors"
                  aria-label="Delete notification"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t text-center">
        <p className="text-sm text-gray-500">
          {notifications.length > 0 ? 'Showing all notifications' : 'You have no new notifications'}
        </p>
      </div>
    </div>
  );
};

export default Notifications;