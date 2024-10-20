import React, { useEffect } from 'react';

/**
 * YearSelector
 * @description Componente que exibe um dropdown para selecionar o ano. Lista apenas os anos que têm faturas e define o ano por padrão se houver apenas um ou se nenhum ano for encontrado.
 * @param {Array} faturas - Lista de faturas disponíveis.
 * @param {string} selectedYear - O ano atualmente selecionado.
 * @param {Function} setSelectedYear - Função para definir o ano selecionado.
 */
function YearSelector({ faturas, selectedYear, setSelectedYear }) {
  // Obter o ano atual
  const currentYear = new Date().getFullYear();
  
  // Extrair os anos únicos das faturas
  const availableYears = faturas
    ? [...new Set(faturas
        .map(fatura => fatura.referencia_mes?.split('/')[1])
        .filter(year => year && year.trim()))]
    : [];

  // Definir automaticamente o ano selecionado se houver apenas um ou se nenhum ano for encontrado
  useEffect(() => {
    if (availableYears.length === 1) {
      setSelectedYear(availableYears[0]);
    } else if (availableYears.length === 0) {
      setSelectedYear(currentYear.toString()); // Define o ano atual se nenhum ano for encontrado
    }
  }, [availableYears, setSelectedYear, currentYear]);

  return (
    <div className="filter">
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        {availableYears.length > 1 || availableYears.length === 0 ? (
          <option value="">Selecione</option>
        ) : null}
        {availableYears.length === 0 ? (
          <option value={currentYear}>{currentYear}</option>
        ) : (
          availableYears.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))
        )}
      </select>
    </div>
  );
}

export default YearSelector;
