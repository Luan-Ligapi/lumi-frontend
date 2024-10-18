import React, { useState, useEffect } from 'react';
import { getFaturas } from '../services/api';

function FaturaDetail({ match }) {
  const [fatura, setFatura] = useState(null);
  const { id } = match.params;

  useEffect(() => {
    async function fetchFatura() {
      const data = await getFaturas(id);
      setFatura(data);
    }
    fetchFatura();
  }, [id]);

  if (!fatura) return <div>Loading...</div>;

  return (
    <div>
      <h1>Detalhes da Fatura {fatura.numero_fatura}</h1>
      <p>Data de Emissão: {fatura.data_emissao}</p>
      <p>Valor Total: R${fatura.valor_total}</p>
      {/* Adicione outros detalhes relevantes */}
    </div>
  );
}

export default FaturaDetail;
