import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders Dashboard and fetches data', () => {
  render(<Dashboard />);
  const titleElement = screen.getByText(/Dashboard de Energia/i);
  expect(titleElement).toBeInTheDocument();
});

test('displays total energy and economy', () => {
  render(<Dashboard />);
  const energyText = screen.getByText(/Energia Total Consumida/i);
  const economyText = screen.getByText(/Economia Total/i);
  expect(energyText).toBeInTheDocument();
  expect(economyText).toBeInTheDocument();
});
