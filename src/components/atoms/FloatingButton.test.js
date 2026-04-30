import { render, fireEvent } from '@testing-library/react';
import FloatingButton from './FloatingButton';

test('renderiza FloatingButton y responde a click', () => {
  const onClick = jest.fn();
  const { getByRole } = render(<FloatingButton onClick={onClick}>Btn</FloatingButton>);
  const btn = getByRole('button');
  expect(btn).toBeInTheDocument();
  fireEvent.click(btn);
  expect(onClick).toHaveBeenCalledTimes(1);
});
