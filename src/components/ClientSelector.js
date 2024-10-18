import React from 'react';

/**
 * ClientSelector
 * @description Componente que exibe um dropdown para selecionar um cliente.
 * @param {Array} clientes - Lista de clientes para exibição.
 * @param {Function} handleClientSelection - Função para lidar com a seleção do cliente.
 * @param {string} selectedClientId - ID do cliente atualmente selecionado.
 */
function ClientSelector({ clientes, handleClientSelection, selectedClientId }) {
  return (
    <div className="filter">
      <label>Selecione o Cliente:</label>
      <select value={selectedClientId} onChange={handleClientSelection}>
        <option value="">Selecione</option>
        {clientes.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nome} - {cliente.numeroCliente}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ClientSelector;
