import React from 'react';

const SummaryChart = ({ totalEnergia, totalFinanceiro }) => {
  return (
    <div>
      <h3>Resumo</h3>
      <p>Total Energia Consumida: {totalEnergia} kWh</p>
      <p>Total Valor Pago: R$ {totalFinanceiro}</p>
    </div>
  );
};

export default SummaryChart;
