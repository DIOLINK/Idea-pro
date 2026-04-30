import { useEffect, useState } from 'react';

/**
 * Hook para manejar preferencia de tema ('light', 'dark', 'system') con sessionStorage.
 * Prioriza el guardado del usuario, sino usa sistema, siempre 100% lógica (no manipula DOM directamente).
 *
 * Retorna: { theme, resolvedTheme, setTheme, isSystem }
 */
export function useTheme() {
  // Guardamos preferencia usuario ('light', 'dark', 'system')
  const [theme, setThemeState] = useState(() => {
    try {
      return sessionStorage.getItem('theme-preference') || 'system';
    } catch {
      return 'system';
    }
  });

  // Resuelto actualmente ('light'/'dark'), para CSS/botón
  const [resolvedTheme, setResolvedTheme] = useState('light');

  // Detecta preferencia SO
  useEffect(() => {
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e) => setResolvedTheme(e.matches ? 'dark' : 'light');
      setResolvedTheme(mq.matches ? 'dark' : 'light');
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  // Guarda elección
  const setTheme = (val) => {
    setThemeState(val);
    try { sessionStorage.setItem('theme-preference', val); } catch {}
  };

  return {
    theme, // preferencia del usuario
    resolvedTheme, // light/dark activo ahora
    setTheme,
    isSystem: theme === 'system',
  };
}
