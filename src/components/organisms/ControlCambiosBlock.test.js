import { render, screen } from '@testing-library/react';
import ControlCambiosBlock from './ControlCambiosBlock';

test('renderiza título y markdown', () => {
  render(<ControlCambiosBlock markdown={"# Cambios\nAgregado algo."} />);
  expect(screen.getByText(/control de cambios/i)).toBeInTheDocument();
  expect(screen.getByText(/agregado algo/i)).toBeInTheDocument();
});
