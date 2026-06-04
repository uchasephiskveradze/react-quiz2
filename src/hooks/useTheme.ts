import { useCallback, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../constants';

function readStoredTheme(): boolean {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME);
  return saved === 'dark';
}

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => readStoredTheme());

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => setIsDarkMode((prev) => !prev), []);

  return { isDarkMode, toggleTheme };
}
