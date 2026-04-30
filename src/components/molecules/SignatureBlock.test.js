import { render, screen } from '@testing-library/react';
import SignatureBlock from './SignatureBlock';
test('renderiza nombre y rol', () => {
  render(<SignatureBlock nombre="Juan" rol="Alumno" />);
  expect(screen.getAllByText(/alumno/i)).toHaveLength(2);
  expect(screen.getByText(/juan/i)).toBeInTheDocument();
});
