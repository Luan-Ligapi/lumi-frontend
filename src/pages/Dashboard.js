import React, { useState, useEffect } from 'react';
import { getFaturas } from '../services/api'; // Importe sua função para consumir a API

function Dashboard() {
  const [faturas, setFaturas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getFaturas();
      setFaturas(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard de Energia</h1>
      {/* Renderize os dados aqui */}
      {faturas.map((fatura) => (
        <div key={fatura.id}>
          <p>Cliente: {fatura.numeroCliente}</p>
          <p>Valor Total: R$ {fatura.valorTotal}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
