'use client';

import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ThemeSwitcher = () => {
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== 'undefined'
      ? window.localStorage.getItem('theme') === 'dark'
      : false
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  if (!isClient) return;

  return (
    <div className='fixed bottom-6 right-6 flex items-center justify-center z-[9999]'>
      <div className='h-12 flex items-center p-1.5 rounded-full shadow border border-border'>
        <button
          type='button'
          className={cn(
            'aspect-square h-full w-full flex rounded-full items-center justify-center',
            { 'bg-gray-300': !isDarkMode }
          )}
          onClick={() => setIsDarkMode(false)}
        >
          <SunIcon size={22} />
        </button>
        <button
          type='button'
          className={cn(
            'aspect-square h-full w-full flex rounded-full items-center justify-center',
            { 'bg-white text-black': isDarkMode }
          )}
          onClick={() => setIsDarkMode(true)}
        >
          <MoonIcon size={22} />
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
