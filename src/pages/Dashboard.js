import React, { useState, useEffect } from 'react';
import { getClientes, getEnergiaData, getResumoData } from '../services/api'; 
import ClientSelector from '../components/ClientSelector';
import YearSelector from '../components/YearSelector';
import EnergyLineChart from '../components/EnergyLineChart';
import Cards from '../components/Cards';
import './Dashboard.css';

function Dashboard() {
  const [clientes, setClientes] = useState([]); // Lista de clientes
  const [selectedClientId, setSelectedClientId] = useState(''); // ID do cliente selecionado
  const [selectedClientNumber, setSelectedClientNumber] = useState(''); // Número do cliente selecionado
  const [selectedYear, setSelectedYear] = useState(''); // Ano selecionado
  const [energiaData, setEnergiaData] = useState([]); // Dados de energia
  const [totalEnergiaConsumida, setTotalEnergiaConsumida] = useState(0); // Total de energia consumida
  const [totalEnergiaCompensada, setTotalEnergiaCompensada] = useState(0); // Total de energia compensada
  const [errorMessage, setErrorMessage] = useState(''); // Mensagens de erro
  const [loading, setLoading] = useState(false); // Estado de carregamento

  // UseEffect para buscar clientes ao carregar a página
  useEffect(() => {
    async function fetchClientes() {
      try {
        setLoading(true); // Iniciar o carregamento
        const clientesData = await getClientes();
        setClientes(clientesData);
        setLoading(false); // Terminar o carregamento
      } catch (error) {
        console.error("Error fetching clients:", error);
        setErrorMessage("Erro ao carregar clientes.");
        setLoading(false);
      }
    }
    fetchClientes();
  }, []);

  // UseEffect para buscar os dados gerais ao carregar a página
  useEffect(() => {
    async function fetchResumo() {
      try {
        setLoading(true); // Iniciar o carregamento
        const resumo = await getResumoData();
        setEnergiaData(resumo.faturas);
        setTotalEnergiaConsumida(resumo.totalEnergiaConsumida);
        setTotalEnergiaCompensada(resumo.totalEnergiaCompensada);
        setLoading(false); // Terminar o carregamento
      } catch (error) {
        console.error("Error fetching resumo data:", error);
        setErrorMessage("Erro ao carregar resumo.");
        setLoading(false);
      }
    }
    fetchResumo();
  }, []);

  // Lidar com a seleção de cliente
  const handleClientSelection = (e) => {
    const clientId = e.target.value;
    const selectedClient = clientes.find(cliente => cliente.id === parseInt(clientId));
    setSelectedClientId(clientId);
    setSelectedClientNumber(selectedClient ? selectedClient.numeroCliente : '');
  };

  // Lidar com a busca de dados filtrados
  const handleSearch = async () => {
    if (selectedClientNumber || selectedYear) {
      try {
        setLoading(true); // Iniciar o carregamento
        const energia = await getEnergiaData(selectedClientNumber, selectedYear);
        if (energia.faturas.length === 0) {
          setErrorMessage("Nenhuma fatura encontrada para este ano.");
          setEnergiaData([]);
        } else {
          setErrorMessage('');
          setEnergiaData(energia.faturas);
          setTotalEnergiaConsumida(energia.totalEnergiaConsumida);
          setTotalEnergiaCompensada(energia.totalEnergiaCompensada);
        }
        setLoading(false); // Terminar o carregamento
      } catch (error) {
        console.error("Error fetching energia data:", error);
        setErrorMessage("Erro ao buscar dados de energia.");
        setEnergiaData([]);
        setLoading(false);
      }
    } else {
      setErrorMessage("Selecione um cliente e um ano para buscar dados.");
      setEnergiaData([]);
    }
  };

  return (
    <div className="container">
      <h1>Dashboard de Energia</h1>

      <div className="filter-section">
        <ClientSelector 
          clientes={clientes}
          handleClientSelection={handleClientSelection}
          selectedClientId={selectedClientId}
        />
        <YearSelector 
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <button className="btn btn-search" onClick={handleSearch}>Buscar Dados</button>
      </div>

      {loading && <p>Carregando dados...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Exibir os totais gerais ou filtrados */}
      <Cards 
        totalEnergiaConsumida={totalEnergiaConsumida}
        totalEnergiaCompensada={totalEnergiaCompensada}
      />

      {/* Gráfico de Linha para exibir os dados de energia */}
      {energiaData.length > 0 && (
        <div>
          <h2>Consumo de Energia vs Economia</h2>
          <EnergyLineChart energiaData={energiaData} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
