import { render, screen } from '@testing-library/react';
import InfoHeader from './InfoHeader';
test('renderiza todos los campos de configuración', () => {
  render(<InfoHeader alumno="Juan" profesor="Ana" titulo="Proyecto" fecha_revision="Hoy" />);
  expect(screen.getByText(/juan/i)).toBeInTheDocument();
  expect(screen.getByText(/ana/i)).toBeInTheDocument();
  expect(screen.getByText(/proyecto/i)).toBeInTheDocument();
  expect(screen.getByText(/hoy/i)).toBeInTheDocument();
});
