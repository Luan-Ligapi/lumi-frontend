import { render, screen } from '@testing-library/react';
import Library from './Library';

test('renders Library and fetches clients', () => {
  render(<Library />);
  const titleElement = screen.getByText(/Biblioteca de Faturas/i);
  expect(titleElement).toBeInTheDocument();
});

test('displays client selection dropdown', () => {
  render(<Library />);
  const clientLabel = screen.getByText(/Selecione o Cliente/i);
  expect(clientLabel).toBeInTheDocument();
});
