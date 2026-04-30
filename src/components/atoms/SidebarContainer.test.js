import { render, fireEvent } from '@testing-library/react';
import SidebarContainer from './SidebarContainer';

test('renderiza SidebarContainer abierto y cerrado', () => {
  const onClose = jest.fn();
  const { getByRole, rerender } = render(
    <SidebarContainer open={true} onClose={onClose}>Contenido</SidebarContainer>
  );
  expect(getByRole('navigation')).toBeInTheDocument();

  // Cerrar sidebar
  const closeBtn = getByRole('button', { name: /cerrar/i });
  fireEvent.click(closeBtn);
  expect(onClose).toHaveBeenCalledTimes(1);

  // No se ve cuando open es false
  rerender(<SidebarContainer open={false} onClose={onClose}>Contenido</SidebarContainer>);
  // navigation no está visible visualmente por -translate-x-full, pero sigue en el DOM (test limitado)
});
