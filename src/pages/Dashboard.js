import React, { useState, useEffect } from 'react';
import { getClientes, getResumoData } from '../services/api'; 
import ClientSelector from '../components/ClientSelector';
import YearSelector from '../components/YearSelector';
import EnergyLineChart from '../components/EnergyLineChart';
import Cards from '../components/Cards';
import './Dashboard.css';

function Dashboard() {
  const [clientes, setClientes] = useState([]); // Lista de clientes
  const [selectedClientId, setSelectedClientId] = useState(''); // ID do cliente selecionado
  const [selectedClientNumber, setSelectedClientNumber] = useState(''); // Número do cliente selecionado
  const [selectedYear, setSelectedYear] = useState('2024'); // Ano selecionado
  const [energiaData, setEnergiaData] = useState([]); // Dados de energia
  const [totalEnergiaConsumida, setTotalEnergiaConsumida] = useState(0); // Total de energia consumida
  const [totalEnergiaCompensada, setTotalEnergiaCompensada] = useState(0); // Total de energia compensada
  const [totalValorSemGDR, setTotalValorSemGDR] = useState(0); // Total Valor sem GDR
  const [totalEconomiaGDR, setTotalEconomiaGDR] = useState(0); // Total Economia GDR
  const [errorMessage, setErrorMessage] = useState(''); // Mensagens de erro
  const [loading, setLoading] = useState(false); // Estado de carregamento

  // UseEffect para buscar clientes ao carregar a página
  useEffect(() => {
    async function fetchClientes() {
      try {
        setLoading(true); // Iniciar o carregamento
        const clientesData = await getClientes();
        const resumo = await getResumoData(selectedClientNumber, selectedYear);
        setClientes(clientesData);
        setEnergiaData(resumo);
        setTotalEnergiaConsumida(resumo.totalEnergiaConsumida);
        setTotalEnergiaCompensada(resumo.totalEnergiaCompensada);
        setTotalValorSemGDR(resumo.totalValorSemGDR);
        setTotalEconomiaGDR(resumo.totalEconomiaGDR);
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
      if (selectedClientNumber && selectedYear) {
        try {
          setLoading(true); // Iniciar o carregamento
          const resumo = await getResumoData(selectedClientNumber, selectedYear);
          setEnergiaData(resumo);
          setTotalEnergiaConsumida(resumo.totalEnergiaConsumida);
          setTotalEnergiaCompensada(resumo.totalEnergiaCompensada);
          setTotalValorSemGDR(resumo.totalValorSemGDR);
          setTotalEconomiaGDR(resumo.totalEconomiaGDR);
          setLoading(false); // Terminar o carregamento
        } catch (error) {
          console.error("Error fetching resumo data:", error);
          setErrorMessage("Erro ao carregar resumo.");
          setLoading(false);
        }
      }
    }
    fetchResumo();
  }, [selectedClientId, selectedYear]);

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
        const energia = await getResumoData(selectedClientNumber, selectedYear);
        if (energia.faturas.length === 0) {
          setErrorMessage("Nenhuma fatura encontrada para este ano.");
          setEnergiaData([]);
        } else {
          setErrorMessage('');
          setEnergiaData(energia);
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
      {!loading && (
        <Cards 
          totalEnergiaConsumida={totalEnergiaConsumida}
          totalEnergiaCompensada={totalEnergiaCompensada}
          totalValorSemGDR={totalValorSemGDR}
          totalEconomiaGDR={totalEconomiaGDR}
        />
      )}

      {/* Gráfico de Linha para exibir os dados de energia */}
      {energiaData && (
        <div>
          <h2>Consumo de Energia vs Economia</h2>
          <EnergyLineChart data={energiaData} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
