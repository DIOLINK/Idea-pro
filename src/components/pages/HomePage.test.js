import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
test('renderiza layout de homepage', () => {
  render(<HomePage header={<div>Encabezado</div>} sections={<div>Secciones</div>} controlCambios={<div>Cambios</div>} footer={<div>Pie</div>} />);
  expect(screen.getByText(/encabezado/i)).toBeInTheDocument();
  expect(screen.getByText(/secciones/i)).toBeInTheDocument();
  expect(screen.getByText(/cambios/i)).toBeInTheDocument();
  expect(screen.getByText(/pie/i)).toBeInTheDocument();
});
