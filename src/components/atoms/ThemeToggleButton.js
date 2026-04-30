import React from 'react';
/**
 * Atom - ThemeToggleButton
 * Visual-only; transición CSS. NO lógica.
 * Props:
 *  - theme: 'light', 'dark', 'system'
 *  - onClick()
 */
export default function ThemeToggleButton({ theme, onClick }) {
  return (
    <button
      type="button"
      aria-label={theme === 'system' ? 'Modo automático' : theme === 'dark' ? 'Modo oscuro' : 'Modo claro'}
      title={theme === 'system' ? 'Sistema' : theme === 'dark' ? 'Oscuro' : 'Claro'}
      className={
        'relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 transition-colors duration-300 group focus:outline-none focus-visible:ring ring-blue-400 ring-offset-2 overflow-hidden'
      }
      onClick={onClick}
    >
      {/* icono: sol/luna/auto animados */}
      <span
        className={
          'absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300 ' +
          (theme === 'dark' ? '-translate-y-10 opacity-0' : 'translate-y-0 opacity-100')
        }
        style={{ transition: 'all 0.3s' }}
        aria-hidden={theme === 'dark'}
      >
        {/* Sol */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg" className="text-yellow-400">
          <circle cx="12" cy="12" r="5" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.5">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </svg>
      </span>
      <span
        className={
          'absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300 ' +
          (theme === 'light' ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100')
        }
        style={{ transition: 'all 0.3s' }}
        aria-hidden={theme === 'light'}
      >
        {/* Luna */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span
        className={
          'absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300 ' +
          (theme === 'system' ? 'scale-100 opacity-100' : 'scale-0 opacity-0')
        }
        style={{ transition: 'all 0.3s' }}
        aria-hidden={theme !== 'system'}
      >
        {/* Sistema (computer) */}
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-blue-400">
          <rect x="3" y="4" width="18" height="14" rx="2" fill="currentColor" opacity="0.2" />
          <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="8" y="18" width="8" height="2" rx="1" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
}
