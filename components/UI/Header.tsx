"use client";

import { ThemePicker } from './ThemePicker';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">VulnScanner</h1>
        </div>
        <ThemePicker />
      </div>
    </header>
  );
}
