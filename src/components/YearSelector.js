import React from 'react';

/**
 * YearSelector
 * @description Componente que exibe um dropdown para selecionar o ano.
 * @param {string} selectedYear - O ano atualmente selecionado.
 * @param {Function} setSelectedYear - Função para definir o ano selecionado.
 */
function YearSelector({ selectedYear, setSelectedYear }) {
  return (
    <div className="filter">
      <label>Selecione o Ano:</label>
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="">Selecione</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        {/* Adicione outros anos conforme necessário */}
      </select>
    </div>
  );
}

export default YearSelector;
