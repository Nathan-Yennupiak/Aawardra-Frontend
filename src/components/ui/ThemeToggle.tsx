'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const currentTheme = resolvedTheme || theme || 'dark';

  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="px-3 py-1.5 md:px-4 md:py-2 rounded-md bg-bg-surface hover:bg-bg-surface-hover border border-border-subtle transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ml-2 md:ml-0"
      aria-label="Toggle theme"
    >
      {currentTheme === 'dark' ? (
        <>
          <Sun className="w-4 h-4 md:w-5 md:h-5 text-primary-accent" />
          <span className="text-sm font-medium text-text-main">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 md:w-5 md:h-5 text-text-main" />
          <span className="text-sm font-medium text-text-main">Dark</span>
        </>
      )}
    </button>
  );
}
