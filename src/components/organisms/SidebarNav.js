import { useState, useEffect, useCallback } from 'react';
import FloatingButton from '../atoms/FloatingButton';
import SidebarContainer from '../atoms/SidebarContainer';
import SidebarMenu from '../molecules/SidebarMenu';

// Helper para parsear headings en jerarquía tipo 1.0/1.1
function buildIndexTree(headings) {
  // headings: [{id, label, level, numberStr}] // ejemplo: 1.0, 1.1
  const root = [];
  const nodes = {};
  headings.forEach(h => {
    nodes[h.numberStr] = {...h, children: []};
  });
  headings.forEach(h => {
    const parts = h.numberStr.split('.');
    if (parts.length === 1) {
      root.push(nodes[h.numberStr]);
    } else {
      const parentNum = parts.slice(0, -1).join('.');
      if (nodes[parentNum]) {
        nodes[parentNum].children.push(nodes[h.numberStr]);
      } else {
        root.push(nodes[h.numberStr]); // fallback
      }
    }
  });
  return root;
}

function getHeadingsFromDocument() {
  // Busca los headings con data-index-number y texto visible
  const els = Array.from(document.querySelectorAll('[data-index-number]'));
  return els.map(el => ({
    id: el.id,
    label: el.textContent,
    numberStr: el.getAttribute('data-index-number') || '',
    level: parseInt(el.tagName.replace('H', '')) || 2,
  }));
}

export default function SidebarNav() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  // Construye árbol de índice en mount y cuando cambie el doc
  const refreshIndex = useCallback(() => {
    const headings = getHeadingsFromDocument();
    setItems(buildIndexTree(headings));
  }, []);

  useEffect(() => {
    refreshIndex();
    // Podría eficientizar con ResizeObserver o evento custom si el doc cambia
  }, [refreshIndex]);

  // Scroll suave al elemento correspondiente al seleccionar
  const handleSelect = item => {
    setOpen(false);
    if (item.id) {
      const el = document.getElementById(item.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {!open && <FloatingButton onClick={() => setOpen(true)}>
        {/* icon hamburger */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <rect y="4" width="24" height="3" rx="1.5" fill="#fff" />
          <rect y="10" width="24" height="3" rx="1.5" fill="#fff" />
          <rect y="16" width="24" height="3" rx="1.5" fill="#fff" />
        </svg>
      </FloatingButton>}
      <SidebarContainer open={open} onClose={() => setOpen(false)}>
        <h3 className="mb-4 text-lg font-bold text-blue-700">Navegación</h3>
        <SidebarMenu items={items} onSelect={handleSelect} />
      </SidebarContainer>
    </>
  );
}
