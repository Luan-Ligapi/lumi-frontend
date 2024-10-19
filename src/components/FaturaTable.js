import React from 'react';
import './FaturaTable.css';
import { FaFilePdf } from 'react-icons/fa'; // Importando o ícone de PDF

function FaturaTable({ faturas, clientes }) {

  // Função para pegar o nome do cliente, associando o clienteId corretamente
  const getClientName = (clienteId) => {
    const cliente = clientes && clientes.find(cliente => cliente.id === parseInt(clienteId));
    if (!cliente) {
      console.log(`Cliente não encontrado para clienteId: ${clienteId}`);
      return 'Cliente não encontrado';
    }
    return cliente.nome;
  };

  // Agrupar faturas por unidade consumidora (numero_fatura)
  const groupedFaturas = faturas.reduce((acc, fatura) => {
    const { numero_fatura } = fatura;
    if (!acc[numero_fatura]) {
      acc[numero_fatura] = {
        ...fatura,
        meses: {} // Para armazenar os links dos PDFs por mês
      };
    }
    // Adicionar o link PDF ao mês correspondente
    const mes = fatura.referencia_mes?.split('/')[0]; // Supondo que o mês está na primeira parte da referência
    acc[numero_fatura].meses[mes] = `/pdf/${fatura.numero_fatura}`;
    return acc;
  }, {});

  // Ordenar as faturas com base no nome do cliente
  const sortedFaturas = Object.values(groupedFaturas).sort((a, b) => {
    const nomeA = getClientName(a.clienteId);
    const nomeB = getClientName(b.clienteId);
    return nomeA.localeCompare(nomeB);
  });

  return (
    <table className="fatura-table">
      <thead>
        <tr>
          <th>Número da UC</th>
          <th>Nome do Consumidor</th>
          <th>Jan</th>
          <th>Feb</th>
          <th>Mar</th>
          <th>Apr</th>
          <th>May</th>
          <th>Jun</th>
          <th>Jul</th>
          <th>Aug</th>
          <th>Sep</th>
          <th>Oct</th>
          <th>Nov</th>
          <th>Dec</th>
        </tr>
      </thead>
      <tbody>
        {sortedFaturas.map((fatura) => (
          <tr key={fatura?.numero_fatura}>
            <td>{fatura?.numero_fatura}</td>
            <td>{getClientName(fatura?.clienteId)}</td>
            {/* Exibir o ícone de PDF somente para o mês correspondente */}
            <td>{fatura?.meses['JAN'] ? <a href={fatura.meses['JAN']}><FaFilePdf size={20} color="white" /></a> : '-'}</td>
            <td>{fatura?.meses['FEV'] ? <a href={fatura.meses['FEV']}><FaFilePdf size={20} color="white" /></a> : '-'}</td>
            <td>{fatura?.meses['MAR'] ? <a href={fatura.meses['MAR']}><FaFilePdf size={20} color="white" /></a> : '-'}</td>
            <td>{fatura?.meses['ABR'] ? <a href={fatura.meses['ABR']}><FaFilePdf size={20} color="white" /></a> : '-'}</td>
            <td>{fatura?.meses['MAI'] ? <a href={fatura.meses['MAI']}><FaFilePdf size={20} color="white" /></a> : '-'}</td>
            <td>{fatura?.meses['JUN'] ? <a href={fatura.meses['JUN']}><FaFilePdf size={20} color="white" /></a> : '-'}</td>
            <td>{fatura?.meses['JUL'] ? <a href={fatura.meses['JUL']}><FaFilePdf size={20} color="white" /></a> : '-'}</td>
            <td>{fatura?.meses['AGO'] ? <a href={fatura.meses['AGO']}><FaFilePdf size={20} color="white" /></a> : '-'}</td>
            <td>{fatura?.meses['SET'] ? <a href={fatura.meses['SET']}><FaFilePdf size={20} color="white" /></a> : '-'}</td>
            <td>{fatura?.meses['OUT'] ? <a href={fatura.meses['OUT']}><FaFilePdf size={20} color="white" /></a> : '-'}</td>
            <td>{fatura?.meses['NOV'] ? <a href={fatura.meses['NOV']}><FaFilePdf size={20} color="white" /></a> : '-'}</td>
            <td>{fatura?.meses['DEZ'] ? <a href={fatura.meses['DEZ']}><FaFilePdf size={20} color="white" /></a> : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FaturaTable;
