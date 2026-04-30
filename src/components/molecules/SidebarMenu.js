/**
 * SidebarMenu: renderiza lista de árbol jerárquico tipo 1.0, 1.1, ...
 * props: items=[ { label: '1.0 Introducción', id: '1.0', children: [ ... ] } ... ]
 */
export default function SidebarMenu({ items, onSelect }) {
  // Recursivo para dibujar árbol
  return (
    <ul className="space-y-1 pl-2">
      {items.map((item, idx) => (
        <li key={`${item.id}-${item.numberStr || ''}-${idx}`}>
          <button
            className="block text-left px-2 py-1 rounded hover:bg-blue-50 w-full text-gray-700"
            onClick={() => onSelect(item)}
          >
            {item.label}
          </button>
          {item.children && item.children.length > 0 && (
            <SidebarMenu items={item.children} onSelect={onSelect} />
          )}
        </li>
      ))}
    </ul>
  );
}
