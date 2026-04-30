import { render, screen } from '@testing-library/react';
import SectionsList from './SectionsList';

test('renderiza markdownSections y sections', () => {
  const markdownSections = ['1.0.md'];
  const sections = { '1.0.md': '# Sección Uno' };
  render(<SectionsList markdownSections={markdownSections} sections={sections} />);
  expect(screen.getByText(/sección uno/i)).toBeInTheDocument();
});
