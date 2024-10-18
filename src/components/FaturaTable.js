import React from 'react';
import './FaturaTable.css';

function FaturaTable({ faturas, clientes }) {

  // Função para pegar o nome do cliente, associando o clienteId corretamente
  const getClientName = (clienteId) => {
    console.log("Clientes disponíveis: ", clientes); // Log dos clientes disponíveis
    console.log("Procurando clienteId: ", clienteId); // Log do clienteId que estamos procurando

    const cliente = clientes && clientes.find(cliente => cliente.id === clienteId);

    if (!cliente) {
      console.log(`Cliente não encontrado para clienteId: ${clienteId}`);
      return 'Cliente não encontrado';
    }

    console.log(`Cliente encontrado: ${cliente.nome} para clienteId: ${clienteId}`);
    return cliente.nome;
  };

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
        {faturas.map((fatura) => (
          <tr key={fatura.id}>
            <td>{fatura.numero_fatura}</td>
            <td>{getClientName(fatura.clienteId)}</td>
            {/* Exibir o ícone de PDF somente para o mês correspondente */}
            <td>{fatura.data_emissao.includes('-01-') ? <a href={`/pdf/${fatura.numero_fatura}`}><img src="/pdf-icon.png" alt="PDF" /></a> : '-'}</td>
            <td>{fatura.data_emissao.includes('-02-') ? <a href={`/pdf/${fatura.numero_fatura}`}><img src="/pdf-icon.png" alt="PDF" /></a> : '-'}</td>
            <td>{fatura.data_emissao.includes('-03-') ? <a href={`/pdf/${fatura.numero_fatura}`}><img src="/pdf-icon.png" alt="PDF" /></a> : '-'}</td>
            <td>{fatura.data_emissao.includes('-04-') ? <a href={`/pdf/${fatura.numero_fatura}`}><img src="/pdf-icon.png" alt="PDF" /></a> : '-'}</td>
            <td>{fatura.data_emissao.includes('-05-') ? <a href={`/pdf/${fatura.numero_fatura}`}><img src="/pdf-icon.png" alt="PDF" /></a> : '-'}</td>
            <td>{fatura.data_emissao.includes('-06-') ? <a href={`/pdf/${fatura.numero_fatura}`}><img src="/pdf-icon.png" alt="PDF" /></a> : '-'}</td>
            <td>{fatura.data_emissao.includes('-07-') ? <a href={`/pdf/${fatura.numero_fatura}`}><img src="/pdf-icon.png" alt="PDF" /></a> : '-'}</td>
            <td>{fatura.data_emissao.includes('-08-') ? <a href={`/pdf/${fatura.numero_fatura}`}><img src="/pdf-icon.png" alt="PDF" /></a> : '-'}</td>
            <td>{fatura.data_emissao.includes('-09-') ? <a href={`/pdf/${fatura.numero_fatura}`}><img src="/pdf-icon.png" alt="PDF" /></a> : '-'}</td>
            <td>{fatura.data_emissao.includes('-10-') ? <a href={`/pdf/${fatura.numero_fatura}`}><img src="/pdf-icon.png" alt="PDF" /></a> : '-'}</td>
            <td>{fatura.data_emissao.includes('-11-') ? <a href={`/pdf/${fatura.numero_fatura}`}><img src="/pdf-icon.png" alt="PDF" /></a> : '-'}</td>
            <td>{fatura.data_emissao.includes('-12-') ? <a href={`/pdf/${fatura.numero_fatura}`}><img src="/pdf-icon.png" alt="PDF" /></a> : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FaturaTable;
