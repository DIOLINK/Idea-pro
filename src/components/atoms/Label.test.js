import { render, screen } from '@testing-library/react';
import Label from './Label';

test('renderiza el texto hijo', () => {
  render(<Label>Hola mundo</Label>);
  expect(screen.getByText(/hola mundo/i)).toBeInTheDocument();
});
