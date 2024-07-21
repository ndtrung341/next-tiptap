'use client';

import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className='fixed bottom-6 right-6 flex items-center justify-center z-[9999]'>
      <div className='h-12 flex items-center p-1.5 rounded-full shadow border border-border'>
        <button
          type='button'
          className={`aspect-square h-full w-full flex rounded-full items-center justify-center ${!isDarkMode ? 'bg-gray-300' : ''}`}
          onClick={() => setIsDarkMode(false)}
        >
          <SunIcon size={22} />
        </button>
        <button
          type='button'
          className={`aspect-square h-full w-full flex rounded-full items-center justify-center ${isDarkMode ? 'bg-white text-black' : ''}`}
          onClick={() => setIsDarkMode(true)}
        >
          <MoonIcon size={22} />
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
