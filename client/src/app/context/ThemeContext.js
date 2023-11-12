'use client';
import { useState, useEffect, createContext } from 'react';

const setInitTheme = () => {
  const userMediaDark = window.matchMedia('(prefers-color-scheme: dark)');
  const userMediaLight = window.matchMedia('(prefers-color-scheme: light)');

  if (userMediaDark.matches) return 'dark';
  if (userMediaLight.matches) return 'light';
};

export const ThemeContext = createContext({
  theme: null,
  setTheme: () => {},
});

export const ThemeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = useState('dark');

  const rawSetTheme = (rawTheme) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(rawTheme);

    localStorage.setItem('color-theme', rawTheme);
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  useEffect(() => {
    setTheme('dark');
  }, []);

  useEffect(() => rawSetTheme(theme), [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
