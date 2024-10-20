import React from 'react';

const Cards = ({ totalEnergiaConsumida, totalEnergiaCompensada, totalValorSemGDR, totalEconomiaGDR }) => {
  return (
    <div className="cards-container">
      <div className="card">
        <h3>Total Energia Consumida</h3>
        <p>{totalEnergiaConsumida} kWh</p>
      </div>
      <div className="card">
        <h3>Total Energia Compensada</h3>
        <p>{totalEnergiaCompensada} kWh</p>
      </div>
      <div className="card">
        <h3>Valor Total sem GDR</h3>
        <p>R$ {totalValorSemGDR}</p>
      </div>
      <div className="card">
        <h3>Economia GDR</h3>
        <p>R$ {totalEconomiaGDR}</p>
      </div>
    </div>
  );
};

export default Cards;
