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

export const postUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post(`/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

export const getEnergiaData = async (cliente, year) => {
  const url = cliente && year 
    ? `/energia?cliente=${cliente}&year=${year}`
    : '/energia'; // Return all data if no filters

  const response = await api.get(url);
  return response.data; // Assuming the response is in JSON format
};

export const getFinanceiroData = async (cliente, year) => {
  const url = cliente && year 
    ? `/financeiro?cliente=${cliente}&year=${year}`
    : '/financeiro'; // Return all data if no filters

  const response = await api.get(url);
  return response.data;
};

export const getResumoData = async () => {
  const response = await api.get('/resumo');
  return response.data;
};



export default api;
