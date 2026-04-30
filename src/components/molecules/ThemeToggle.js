import React, { useContext, useCallback } from 'react';
import ThemeToggleButton from '../atoms/ThemeToggleButton';
import { ThemeContext } from '../../../ThemeContext';

// Cíclico: system->light->dark->system
function nextTheme(current) {
  if (current === 'system') return 'light';
  if (current === 'light') return 'dark';
  return 'system';
}

/**
 * Molécula: ThemeToggle
 * Botón + manejo de cambio de estado de theme.
 * NO lógica de storage/context, sólo usa ThemeContext.
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  const onClick = useCallback(() => {
    setTheme(nextTheme(theme));
  }, [setTheme, theme]);
  return <ThemeToggleButton theme={theme} onClick={onClick} />;
}
