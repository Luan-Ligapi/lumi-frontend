import React from 'react';

const Cards = ({ totalEnergiaConsumida, totalEnergiaCompensada }) => {
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
    </div>
  );
};

export default Cards;
