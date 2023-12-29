'use client';

import { useEffect } from 'react';

import { ThemeProvider, useTheme } from 'next-themes';

type ThemeContextProviderProps = {
  children: JSX.Element;
};

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const { systemTheme, setTheme } = useTheme();

  useEffect(() => {
    const isDark = systemTheme === 'dark' ? true : false;

    if (isDark) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
