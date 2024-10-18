import React from 'react';

/**
 * MonthSelector
 * @description Componente que exibe um dropdown para selecionar o mês.
 * @param {string} selectedMonth - O mês atualmente selecionado.
 * @param {Function} setSelectedMonth - Função para definir o mês selecionado.
 */
function MonthSelector({ selectedMonth, setSelectedMonth }) {
  return (
    <div className="filter">
      <label>Selecione o Mês:</label>
      <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
        <option value="">Selecione</option>
        <option value="01">Janeiro</option>
        <option value="02">Fevereiro</option>
        <option value="03">Março</option>
        {/* Adicione outros meses aqui */}
      </select>
    </div>
  );
}

export default MonthSelector;
