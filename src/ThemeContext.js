import { createContext, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';

export const ThemeContext = createContext({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => {},
  isSystem: true,
});

export function ThemeProvider({ children }) {
  const { theme, resolvedTheme, setTheme, isSystem } = useTheme();

  // Aplica la clase dark al html
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, isSystem }}>
      {children}
    </ThemeContext.Provider>
  );
}

