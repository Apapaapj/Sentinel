"use client";

import { useEffect, useState } from 'react';
import { Moon, Sun, Palette } from 'lucide-react';

export function ThemePicker() {
  const [theme, setTheme] = useState('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') || 'system';
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const applyTheme = (t: string) => {
    const html = document.documentElement;
    if (t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex gap-2">
      <button onClick={() => { setTheme('light'); localStorage.setItem('theme', 'light'); applyTheme('light'); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" title="Light">
        <Sun size={20} />
      </button>
      <button onClick={() => { setTheme('dark'); localStorage.setItem('theme', 'dark'); applyTheme('dark'); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" title="Dark">
        <Moon size={20} />
      </button>
      <button onClick={() => { setTheme('system'); localStorage.setItem('theme', 'system'); applyTheme('system'); }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg" title="System">
        <Palette size={20} />
      </button>
    </div>
  );
}
