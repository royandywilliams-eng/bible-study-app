import { useEffect, useState } from 'react';
import BibleReader from '../components/Bible/BibleReader';
import Navigation from '../components/Layout/Navigation';
import Header from '../components/Layout/Header';

export default function BibleReaderPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <Header isDarkMode={isDarkMode} onThemeChange={setIsDarkMode} />
      <div className="flex flex-col md:flex-row">
        <Navigation />
        <main className="flex-1 overflow-auto">
          <BibleReader />
        </main>
      </div>
    </div>
  );
}
