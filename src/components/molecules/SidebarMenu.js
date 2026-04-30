import React from 'react';
import ThemeToggle from './ThemeToggle';

export default function SidebarMenu({ items, onSelect }) {
  return (
    <ul className="space-y-1 pl-2">
      {items.map((item, idx) => (
        <li key={`${item.id}-${item.numberStr || ''}-${idx}`}>
          <button
            className="block text-left px-2 py-1 rounded hover:bg-blue-50 w-full text-black font-semibold"
            onClick={() => onSelect(item)}
          >
            {item.numberStr && item.label !== item.numberStr ? `${item.numberStr} ` : ''}{item.label}
          </button>
          {item.children && item.children.length > 0 && (
            <SidebarMenu items={item.children} onSelect={onSelect} />
          )}
        </li>
      ))}
      {/* Toggle visual *final*/}
      <li className="mt-4 px-2">
        <ThemeToggle />
      </li>
    </ul>
  );
}
