import { render, screen } from '@testing-library/react';
import InfoRow from './InfoRow';
test('renderiza label y value', () => {
  render(<InfoRow label="Alumno:" value="Juan" />);
  expect(screen.getByText(/alumno/i)).toBeInTheDocument();
  expect(screen.getByText(/juan/i)).toBeInTheDocument();
});
