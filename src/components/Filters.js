import React from 'react';

const Filters = ({ cliente, periodo, onClienteChange, onPeriodoChange, onApplyFilters }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Filtrar por Cliente"
        value={cliente}
        onChange={(e) => onClienteChange(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        placeholder="Filtrar por Período (ex: 2024)"
        value={periodo}
        onChange={(e) => onPeriodoChange(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={onApplyFilters}>Aplicar Filtros</button>
    </div>
  );
};

export default Filters;
