import { render, fireEvent } from '@testing-library/react';
import SidebarMenu from './SidebarMenu';

describe('SidebarMenu', () => {
  const tree = [
    {
      label: '1.0 Raíz',
      id: '1.0',
      children: [
        { label: '1.1 Subnivel', id: '1.1', children: [] },
      ]
    },
    { label: '2.0 Segundo', id: '2.0', children: [] }
  ];
  test('renderiza árbol y responde a onSelect', () => {
    const onSelect = jest.fn();
    const { getByText } = render(<SidebarMenu items={tree} onSelect={onSelect} />);
    fireEvent.click(getByText('1.1 Subnivel'));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({id: '1.1'}));
  });
});
