import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Mapeamento para ordenar os meses
const monthOrder = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

// Função para extrair o mês e o ano da referência e ordenar corretamente
const getMonthIndex = (referencia) => {
  if (!referencia) return { monthIndex: -1, year: 0 };
  const [month, year] = referencia.split('/');
  return {
    monthIndex: monthOrder.indexOf(month),
    year: parseInt(year, 10)
  };
};

// Função para agrupar os dados por mês e ano e calcular o somatório e a média
const aggregateData = (data) => {
  const aggregated = data.reduce((acc, curr) => {
    const key = curr.referencia;
    if (!acc[key]) {
      acc[key] = {
        referencia: curr.referencia,
        energiaConsumida: 0,
        energiaCompensada: 0,
        valorSemGDR: 0,
        economiaGDR: 0,
        count: 0
      };
    }
    acc[key].energiaConsumida += curr.energiaConsumida;
    acc[key].energiaCompensada += curr.energiaCompensada;
    acc[key].valorSemGDR += curr.valorSemGDR;
    acc[key].economiaGDR += curr.economiaGDR;
    acc[key].count += 1;

    return acc;
  }, {});

  // Retorna tanto a soma quanto a média para cada variável
  return Object.values(aggregated).map(item => ({
    referencia: item.referencia,
    energiaConsumidaSomatorio: item.energiaConsumida, // Somatório
    energiaConsumidaMedia: item.energiaConsumida / item.count, // Média
    energiaCompensadaSomatorio: item.energiaCompensada, // Somatório
    energiaCompensadaMedia: item.energiaCompensada / item.count, // Média
    valorSemGDRSomatorio: item.valorSemGDR, // Somatório
    valorSemGDRMedia: item.valorSemGDR / item.count, // Média
    economiaGDRSomatorio: item.economiaGDR, // Somatório
    economiaGDRMedia: item.economiaGDR / item.count // Média
  }));
};

const EnergyLineChart = ({ data }) => {
  // Verifica se o dado é válido antes de processar
  if (!data || !data.faturas) {
    return <p>Sem dados para exibir</p>;
  }

  // Ajustar e agregar os dados
  const formattedData = data.faturas.map((fatura) => ({
    referencia: fatura.referencia_mes,
    energiaConsumida: fatura.consumo_kwh,
    energiaCompensada: fatura.FaturaDetalhe?.energiaCompensadaGD_quantidade || 0,
    valorSemGDR: parseFloat(fatura.valor_total),
    economiaGDR: parseFloat(fatura.FaturaDetalhe?.energiaCompensadaGD_valor * -1 || 0)
  }));

  // Ordenar e agregar os dados por mês e ano
  const sortedAndAggregatedData = aggregateData(formattedData).sort((a, b) => {
    const aDate = getMonthIndex(a.referencia);
    const bDate = getMonthIndex(b.referencia);
    
    // Ordenar pelo ano primeiro e depois pelo mês
    if (aDate.year === bDate.year) {
      return aDate.monthIndex - bDate.monthIndex;
    }
    return aDate.year - bDate.year;
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={sortedAndAggregatedData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="referencia" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Linhas para Energia Consumida */}
        <Line type="monotone" dataKey="energiaConsumidaSomatorio" stroke="#8884d8" name="Energia Consumida (Somatório kWh)" />
        <Line type="monotone" dataKey="energiaConsumidaMedia" stroke="#82ca9d" name="Energia Consumida (Média kWh)" />
        
        {/* Linhas para Energia Compensada */}
        <Line type="monotone" dataKey="energiaCompensadaSomatorio" stroke="#ff7300" name="Energia Compensada (Somatório kWh)" />
        <Line type="monotone" dataKey="energiaCompensadaMedia" stroke="#387908" name="Energia Compensada (Média kWh)" />
        
        {/* Linhas para Valor Sem GDR */}
        <Line type="monotone" dataKey="valorSemGDRSomatorio" stroke="#ff0000" name="Valor Sem GDR (Somatório R$)" />
        <Line type="monotone" dataKey="valorSemGDRMedia" stroke="#00ff00" name="Valor Sem GDR (Média R$)" />
        
        {/* Linhas para Economia GDR */}
        <Line type="monotone" dataKey="economiaGDRSomatorio" stroke="#0000ff" name="Economia GDR (Somatório R$)" />
        <Line type="monotone" dataKey="economiaGDRMedia" stroke="#f44290" name="Economia GDR (Média R$)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EnergyLineChart;
