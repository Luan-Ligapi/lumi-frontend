import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EnergyLineChart = ({ energiaData }) => {
  // Check if the data is available and correctly structured
  const formattedData = energiaData.map(fatura => {
    // Safely access nested fields with optional chaining (?.) to avoid errors
    const energiaEletrica = parseFloat(fatura?.FaturaDetalhe?.energiaEletrica_quantidade || 0);
    const energiaCompensada = parseFloat(fatura?.FaturaDetalhe?.energiaCompensadaGD_quantidade || 0);
    const valorPago = parseFloat(fatura?.valor_a_pagar || 0);

    return {
      referencia_mes: fatura.referencia_mes || "Mês não disponível",
      energiaEletrica,
      energiaCompensada,
      valorPago,
    };
  });

  return (
    <ResponsiveContainer width="95%" height={400}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="referencia_mes" />
        <YAxis />
        <Tooltip />
        <Legend />

        {/* Line for Energy Consumption */}
        <Line 
          type="monotone" 
          dataKey="energiaEletrica" 
          stroke="#8884d8" 
          activeDot={{ r: 8 }} 
          name="Consumo Energia Elétrica (kWh)" 
        />

        {/* Line for Compensated Energy */}
        <Line 
          type="monotone" 
          dataKey="energiaCompensada" 
          stroke="#82ca9d" 
          name="Energia Compensada (kWh)" 
        />

        {/* Line for Paid Value */}
        <Line 
          type="monotone" 
          dataKey="valorPago" 
          stroke="#ff7300" 
          name="Valor Pago (R$)" 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EnergyLineChart;
