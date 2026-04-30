import { render, screen } from '@testing-library/react';
import Card from './Card';

test('muestra children en el card', () => {
  render(<Card>Contenido del card</Card>);
  expect(screen.getByText(/contenido del card/i)).toBeInTheDocument();
});
