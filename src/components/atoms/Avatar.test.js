import { render } from '@testing-library/react';
import Avatar from './Avatar';
test('renderiza imagen con alt', () => {
  const { getByAltText } = render(<Avatar src="/logo.png" alt="Logo" />);
  expect(getByAltText(/logo/i)).toBeInTheDocument();
});
