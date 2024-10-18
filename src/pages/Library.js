import React, { useState, useEffect } from 'react';
import { getClientes, getFaturasByClientAndYear, getFaturas } from '../services/api'; // Mantém o import de getClientes
import ClientSelector from '../components/ClientSelector';
import YearSelector from '../components/YearSelector';
import FaturaTable from '../components/FaturaTable';
import './Library.css';

function Library() {
  const [clientes, setClientes] = useState([]); // Para armazenar a lista de clientes
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedClientNumber, setSelectedClientNumber] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [faturas, setFaturas] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // UseEffect para buscar clientes
  useEffect(() => {
    async function fetchClientes() {
      try {
        const clientesData = await getClientes(); // Busca os clientes
        setClientes(clientesData);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setErrorMessage("Erro ao carregar clientes.");
      }
    }
    fetchClientes(); // Chama a função ao montar o componente
  }, []);

  // UseEffect para buscar todas as faturas
  useEffect(() => {
    async function fetchAllFaturas() {
      try {
        const faturasData = await getFaturas(); // Buscar todas as faturas
        setFaturas(faturasData);
      } catch (error) {
        console.error("Error fetching all faturas:", error);
        setErrorMessage("Erro ao carregar todas as faturas.");
      }
    }
    fetchAllFaturas(); // Chamar a função ao montar o componente
  }, []);
  
  const handleClientSelection = (e) => {
    const clientId = e.target.value;
    const selectedClient = clientes.find(cliente => cliente.id === parseInt(clientId));
    setSelectedClientId(clientId);
    setSelectedClientNumber(selectedClient ? selectedClient.numeroCliente : '');
  };

  const handleSearch = async () => {
    if (selectedClientNumber && selectedYear) {
      try {
        const faturas = await getFaturasByClientAndYear(selectedClientNumber, selectedYear); // Mudança para busca por ano
        if (faturas.length === 0) {
          setErrorMessage("Nenhuma fatura encontrada para este ano.");
          setFaturas([]);
        } else {
          setErrorMessage('');
          setFaturas(faturas);
        }
      } catch (error) {
        console.error("Error fetching faturas:", error);
        setErrorMessage("Erro ao buscar faturas.");
        setFaturas([]);
      }
    } else {
      setErrorMessage("Selecione um cliente e um ano para buscar faturas.");
      setFaturas([]);
    }
  };

  return (
    <div className="container">
      <h1>Biblioteca de Faturas</h1>

      <div className="filter-section">
        <ClientSelector 
          clientes={clientes} // Exibe os clientes no seletor
          handleClientSelection={handleClientSelection} 
          selectedClientId={selectedClientId} 
        />
        <YearSelector 
          selectedYear={selectedYear} 
          setSelectedYear={setSelectedYear} 
        />
        <button className="btn btn-search" onClick={handleSearch}>Buscar Faturas</button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {faturas.length > 0 && <FaturaTable faturas={faturas} />}
    </div>
  );
}

export default Library;
