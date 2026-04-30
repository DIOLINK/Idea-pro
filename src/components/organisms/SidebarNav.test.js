import { render, fireEvent, act } from '@testing-library/react';
import SidebarNav from './SidebarNav';

describe('SidebarNav edge cases', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });
  
  test('muestra headings non-ASCII y scroll', () => {
    document.body.innerHTML = `
      <h2 id="h-ñ" data-index-number="1.0">Sección Ñ</h2>
      <h3 id="h-特殊" data-index-number="1.1">Título 特殊</h3>
    `;
    const scrollIntoView = jest.fn();
    document.getElementById('h-特殊').scrollIntoView = scrollIntoView;
    const { getByRole, getAllByText } = render(<SidebarNav />);
    fireEvent.click(getByRole('button', { name: /abrir/i }));
    const btn = getAllByText('Título 特殊').filter(el => el.tagName === 'BUTTON')[0];
    act(() => { fireEvent.click(btn); });
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  test('muestra headings repetidos y navega a ambos', () => {
    document.body.innerHTML = `
      <h2 id="hr1" data-index-number="1.0">Repetido</h2>
      <h3 id="hr2" data-index-number="2.0">Diferente</h3>
      <h2 id="hr3" data-index-number="3.0">Repetido</h2>
    `;
    const scroll1 = jest.fn();
    const scroll2 = jest.fn();
    document.getElementById('hr1').scrollIntoView = scroll1;
    document.getElementById('hr3').scrollIntoView = scroll2;
    const { getByRole, getAllByText } = render(<SidebarNav />);
    fireEvent.click(getByRole('button', { name: /abrir/i }));
    const buttons = getAllByText('Repetido').filter(el => el.tagName === 'BUTTON');
    act(() => { fireEvent.click(buttons[0]); });
    act(() => { fireEvent.click(buttons[1]); });
    expect(scroll1).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(scroll2).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  test('soporta estructura profunda', () => {
    document.body.innerHTML = `
      <h2 id="lvl1" data-index-number="1.0">Nivel 1</h2>
      <h3 id="lvl2" data-index-number="1.1">Nivel 2</h3>
      <h4 id="lvl3" data-index-number="1.1.1">Nivel 3</h4>
      <h5 id="lvl4" data-index-number="1.1.1.1">Nivel 4</h5>
    `;
    const scrollIntoView = jest.fn();
    document.getElementById('lvl4').scrollIntoView = scrollIntoView;
    const { getByRole, getAllByText } = render(<SidebarNav />);
    fireEvent.click(getByRole('button', { name: /abrir/i }));
    const btn = getAllByText('Nivel 4').filter(el => el.tagName === 'BUTTON')[0];
    act(() => { fireEvent.click(btn); });
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  test('muestra estructura plana de headings', () => {
    document.body.innerHTML = `
      <h2 id="plano1" data-index-number="1.0">A</h2>
      <h2 id="plano2" data-index-number="2.0">B</h2>
      <h2 id="plano3" data-index-number="3.0">C</h2>
    `;
    const { getByRole, getAllByText } = render(<SidebarNav />);
    fireEvent.click(getByRole('button', { name: /abrir/i }));
    expect(getAllByText('A').length).toBeGreaterThan(0);
    expect(getAllByText('B').length).toBeGreaterThan(0);
    expect(getAllByText('C').length).toBeGreaterThan(0);
  });
  
  test('genera menú igual a headings y navega sin error', () => {
    document.body.innerHTML = `
      <h2 id="h-1" data-index-number="1.0">Uno</h2>
      <h3 id="h-1-2" data-index-number="1.1">Dos</h3>
      <h2 id="h-2" data-index-number="2.0">Tres</h2>
    `;
    const scrollIntoView = jest.fn();
    document.getElementById('h-1').scrollIntoView = scrollIntoView;
    const { getByRole, getAllByText } = render(<SidebarNav />);
    fireEvent.click(getByRole('button', { name: /abrir/i }));
    expect(getAllByText('Uno').length).toBeGreaterThan(0);
    expect(getAllByText('Dos').length).toBeGreaterThan(0);
    expect(getAllByText('Tres').length).toBeGreaterThan(0);
    const btn = getAllByText('Uno').filter(el => el.tagName === 'BUTTON')[0];
    act(() => { fireEvent.click(btn); });
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });
});

// Original test conservado
describe('SidebarNav básico', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <h2 id="h-intro" data-index-number="1.0">Introducción</h2>
      <h3 id="h-met" data-index-number="2.0">Metodología</h3>
      <h4 id="h-2-1" data-index-number="2.1">Subsección</h4>
    `;
  });
  afterEach(() => {
    document.body.innerHTML = '';
  });
  test('SidebarNav despliega menú y hace scroll (simulado)', () => {
    const scrollIntoView = jest.fn();
    document.getElementById('h-met').scrollIntoView = scrollIntoView;
    const { getByRole, getAllByText } = render(<SidebarNav />);
    // Abre con botón flotante
    fireEvent.click(getByRole('button', { name: /abrir/i }));
    // Encuentra el botón del menú (descartando el <h3> del doc)
    const buttons = getAllByText('Metodología').filter(el => el.tagName === 'BUTTON');
    act(() => {
      fireEvent.click(buttons[0]);
    });
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });
});
