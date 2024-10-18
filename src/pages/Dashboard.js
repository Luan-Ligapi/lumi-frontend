import React, { useState, useEffect } from 'react';
import { getFaturas } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [faturas, setFaturas] = useState([]);
  const [totalEnergy, setTotalEnergy] = useState(0);
  const [totalEconomy, setTotalEconomy] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching faturas...");
        const data = await getFaturas();
        console.log("Faturas fetched:", data);
        setFaturas(data);

        // Calcular totais de energia e economia
        const totalEnergy = data.reduce((acc, fatura) => acc + (fatura.energiaConsumida || 0), 0);
        const totalEconomy = data.reduce((acc, fatura) => acc + (fatura.economia || 0), 0);
        console.log("Total energy calculated:", totalEnergy);
        console.log("Total economy calculated:", totalEconomy);
        setTotalEnergy(totalEnergy);
        setTotalEconomy(totalEconomy);
      } catch (error) {
        console.error("Error fetching faturas:", error);
      }
    }
    fetchData();
  }, []);

  return (
// Dentro do componente Dashboard:
<div className="container">
  <h1>Dashboard de Energia</h1>
  <div className="cards">
    <div className="card">
      <h3>Energia Total Consumida (kWh)</h3>
      <p>{totalEnergy} kWh</p>
    </div>
    <div className="card">
      <h3>Economia Total (R$)</h3>
      <p>R$ {totalEconomy}</p>
    </div>
  </div>

  <div className="actions">
    <button className="btn btn-primary">Ver Detalhes</button>
    <button className="btn btn-secondary">Exportar Dados</button>
  </div>


      <h2>Consumo de Energia vs Economia</h2>
      <ResponsiveContainer width="95%" height={400}>
        <LineChart data={faturas}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="energiaConsumida" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="economia" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;
