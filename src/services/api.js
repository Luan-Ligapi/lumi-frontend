import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Porta onde seu backend está rodando
});

export const getClientes = async () => {
  const response = await api.get('/clientes');
  return response.data;
};

export const getFaturas = async () => {
  const response = await api.get('/faturas');
  return response.data;
};

export const getFaturaById = async (id) => {
  const response = await api.get(`/faturas/${id}`);
  return response.data;
};

// Aqui está a função que você precisa exportar corretamente
export const getFaturasByClientAndYear = async (numeroCliente, year) => {
  const response = await api.get(`/faturas?numeroCliente=${numeroCliente}&ano=${year}`);
  return response.data;
};




export default api;
