import { render, screen } from '@testing-library/react';
import App from './App';

test('muestra cargando al iniciar', () => {
  render(<App />);
  const loadingElement = screen.getByText(/cargando/i);
  expect(loadingElement).toBeInTheDocument();
});
