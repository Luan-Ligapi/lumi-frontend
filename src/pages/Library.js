import React, { useState, useEffect } from 'react';
import { getClientes } from '../services/api';

function Library() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getClientes();
      setClientes(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Biblioteca de Faturas</h1>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nome} - Número do Cliente: {cliente.numeroCliente}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Library;
