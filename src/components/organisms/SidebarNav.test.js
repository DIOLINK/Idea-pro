import { fireEvent, render, screen } from '@testing-library/react';
import SidebarNav from './SidebarNav';

describe('SidebarNav edge cases', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('muestra headings non-ASCII y scroll', async () => {
    document.body.innerHTML = `
      <h2 id="h-ñ" data-index-number="1.0">Sección Ñ</h2>
      <h3 id="h-特殊" data-index-number="1.1">Título 特殊</h3>
    `;
    const scrollIntoView = jest.fn();
    render(<SidebarNav />);
    const abrirBtn = await screen.findByRole('button', { name: /abrir/i });
    fireEvent.click(abrirBtn);

    const btn = await screen.findByRole('button', { name: /Título 特殊/i });
    btn.scrollIntoView = scrollIntoView;
    fireEvent.click(btn);

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  test('muestra headings repetidos y navega a ambos', async () => {
    document.body.innerHTML = `
      <h2 id="hr1" data-index-number="1.0">Repetido</h2>
      <h3 id="hr2" data-index-number="2.0">Diferente</h3>
      <h2 id="hr3" data-index-number="3.0">Repetido</h2>
    `;
    const scroll1 = jest.fn();
    const scroll2 = jest.fn();
    render(<SidebarNav />);
    const abrirBtn = await screen.findByRole('button', { name: /abrir/i });
    fireEvent.click(abrirBtn);

    const buttons = await screen.findAllByRole('button', { name: /Repetido/i });
    buttons[0].scrollIntoView = scroll1;
    buttons[1].scrollIntoView = scroll2;

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);

    expect(scroll1).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
    expect(scroll2).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  test('soporta estructura profunda', async () => {
    document.body.innerHTML = `
      <h2 id="lvl1" data-index-number="1.0">Nivel 1</h2>
      <h3 id="lvl2" data-index-number="1.1">Nivel 2</h3>
      <h4 id="lvl3" data-index-number="1.1.1">Nivel 3</h4>
      <h5 id="lvl4" data-index-number="1.1.1.1">Nivel 4</h5>
    `;
    const scrollIntoView = jest.fn();
    render(<SidebarNav />);
    const abrirBtn = await screen.findByRole('button', { name: /abrir/i });
    fireEvent.click(abrirBtn);

    const btn = await screen.findByRole('button', { name: /Nivel 4/i });
    btn.scrollIntoView = scrollIntoView;
    fireEvent.click(btn);

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  test('genera menú igual a headings y navega sin error', async () => {
    document.body.innerHTML = `
      <h2 id="h-1" data-index-number="1.0">Uno</h2>
      <h3 id="h-1-2" data-index-number="1.1">Dos</h3>
      <h2 id="h-2" data-index-number="2.0">Tres</h2>
    `;
    const scrollIntoView = jest.fn();
    render(<SidebarNav />);
    const abrirBtn = await screen.findByRole('button', { name: /abrir/i });
    fireEvent.click(abrirBtn);

    const btn = await screen.findByRole('button', { name: /Uno/i });
    btn.scrollIntoView = scrollIntoView;
    fireEvent.click(btn);

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });
});
