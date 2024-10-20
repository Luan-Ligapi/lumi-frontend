import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FinanceChart = ({ faturas }) => {
  if (!faturas || faturas.length === 0) return null;

  const formattedData = faturas?.map(fatura => ({
    month: fatura.referencia_mes,
    valorTotal: parseFloat(fatura.FaturaDetalhe.energiaEletrica_valor || 0),
    economiaGDR: parseFloat(fatura.FaturaDetalhe.energiaCompensadaGD_valor || 0)
  }));

  return (
    <div style={{ marginBottom: '40px' }}>
      <h2>Resultados Financeiros (R$) ao longo do Ano</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="valorTotal" stroke="#8884d8" name="Valor Total Sem GDR" />
          <Line type="monotone" dataKey="economiaGDR" stroke="#82ca9d" name="Economia GDR" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
