import { render, screen, fireEvent } from '@testing-library/react';
import ClientSelector from './ClientSelector';

test('renders ClientSelector with options', () => {
  const mockClientes = [
    { id: 1, nome: 'Cliente 1', numeroCliente: '12345' },
    { id: 2, nome: 'Cliente 2', numeroCliente: '67890' },
  ];
  
  const mockHandleClientSelection = jest.fn();
  
  render(
    <ClientSelector 
      clientes={mockClientes} 
      handleClientSelection={mockHandleClientSelection} 
      selectedClientId={''} 
    />
  );
  
  const selectElement = screen.getByLabelText(/Selecione o Cliente/i);
  expect(selectElement).toBeInTheDocument();
  
  fireEvent.change(selectElement, { target: { value: '1' } });
  expect(mockHandleClientSelection).toHaveBeenCalledTimes(1);
});
