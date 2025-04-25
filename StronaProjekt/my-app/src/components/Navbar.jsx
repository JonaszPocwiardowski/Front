import React, { useState, useEffect } from 'react';
import { Navbar, Button } from 'flowbite-react';
import { BellIcon } from '@heroicons/react/outline';
import { FaBatteryFull, FaBatteryHalf, FaBatteryEmpty } from 'react-icons/fa';
import NotificationModal from './AlarmModal';
import notificationsData from '../data/AlarmData.json';
import weatherData from '../data/StationData.json';

function MyNavbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState(new Set());
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    const storedRead = JSON.parse(localStorage.getItem("readNotifications")) || [];
    setReadNotifications(new Set(storedRead));

    if (!weatherData || weatherData.length === 0) return;

    const latest = weatherData.reduce((latestEntry, currentEntry) => {
      const currentDate = new Date(currentEntry.year, currentEntry.month - 1, currentEntry.day, currentEntry.hour);
      const latestDate = new Date(latestEntry.year, latestEntry.month - 1, latestEntry.day, latestEntry.hour);
      return currentDate > latestDate ? currentEntry : latestEntry;
    }, weatherData[0]);

    setBatteryLevel(latest.battery);
    setNotifications([...notificationsData].sort((a, b) => b.id - a.id));
  }, []);

  const handleBellClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const markAsRead = (id) => {
    setReadNotifications((prev) => {
      const updated = new Set(prev);
      updated.add(id);
      localStorage.setItem("readNotifications", JSON.stringify([...updated]));
      return updated;
    });
  };

  const renderBatteryIcon = () => {
    const iconSize = "text-[clamp(1.5rem,6vw,2rem)]";
    if (batteryLevel > 75) return <FaBatteryFull className={`text-green-500 ${iconSize}`} />;
    if (batteryLevel > 25) return <FaBatteryHalf className={`text-yellow-500 ${iconSize}`} />;
    return <FaBatteryEmpty className={`text-red-500 ${iconSize}`} />;
  };

  return (
    <div className="bg-gray-100">
      <Navbar 
        fluid={true} 
        rounded={false} 
        className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg z-10 py-1 md:py-2"
      >
        <div className="flex items-center justify-between w-full px-2 sm:px-3 gap-2">
          <div className="flex-shrink-0 overflow-hidden min-w-[50%]">
            <div className="
              relative 
              font-extrabold 
              text-[clamp(1.25rem,6vw,2rem)]
              inline-block
              px-[clamp(0.5rem,3vw,1.5rem)]
              py-[clamp(0.25rem,1vw,0.5rem)]
              bg-gradient-to-br from-sky-100/20 to-blue-300/30
              rounded-[clamp(0.75rem,2vw,1.5rem)]
              shadow-lg
              transition-all
              group
              overflow-hidden
              border-2 border-white/20
              backdrop-blur-sm
            ">
              <div className="absolute inset-0 opacity-20 md:opacity-30 transition-opacity">
                <div className="absolute -top-1 -left-2 w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full animate-pulse-slow" />
              </div>

              <div className="flex items-center space-x-1 md:space-x-2">
                <span className="
                  bg-gradient-to-r 
                  from-blue-100 
                  to-blue-200 
                  bg-clip-text 
                  text-transparent
                  drop-shadow-sm
                ">
                  Pogoda
                </span>
                
                <span className="relative">
                  <span className="
                    bg-gradient-to-r 
                    from-amber-200 
                    to-yellow-300 
                    bg-clip-text 
                    text-transparent
                  ">
                    Toruń
                  </span>
                  
                  <svg 
                    className="
                      absolute -top-2 -right-2
                      w-4 h-4
                      text-yellow-300/40
                      md:hidden
                    " 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <div className="flex items-center text-white text-[clamp(0.8rem,3vw,1rem)]">
              {renderBatteryIcon()}
              <span className="ml-1">{batteryLevel}%</span>
            </div>

            <div className="relative">
              <Button 
                onClick={handleBellClick}
                className="!p-1 !bg-transparent hover:!bg-white/10 min-w-[2rem]"
              >
                <BellIcon className="w-[clamp(1.25rem,5vw,1.5rem)] h-[clamp(1.25rem,5vw,1.5rem)] text-white" />
              </Button>
              {notifications.some(n => !readNotifications.has(n.id)) && (
                <span className="
                  absolute top-0 right-0 
                  bg-red-500 text-white 
                  text-[clamp(0.6rem,2vw,0.75rem)] 
                  font-bold px-1 py-0.5 
                  rounded-full
                ">
                  {notifications.filter(n => !readNotifications.has(n.id)).length}
                </span>
              )}
            </div>
          </div>
        </div>
      </Navbar>

      <NotificationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        notifications={notifications}
        markAsRead={markAsRead}
        readNotifications={readNotifications}
      />
    </div>
  );
}

export default MyNavbar;