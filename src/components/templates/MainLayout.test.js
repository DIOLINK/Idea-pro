import { render, screen } from '@testing-library/react';
import MainLayout from './MainLayout';
test('renderiza header, children y footer', () => {
  render(<MainLayout header={<div>Cabecera</div>} footer={<div>Pie</div>}>Cuerpo</MainLayout>);
  expect(screen.getByText(/cabecera/i)).toBeInTheDocument();
  expect(screen.getByText(/cuerpo/i)).toBeInTheDocument();
  expect(screen.getByText(/pie/i)).toBeInTheDocument();
});
