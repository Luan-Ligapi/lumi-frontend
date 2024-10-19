import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFaturas } from '../services/api';

function FaturaList() {
    const [faturas, setFaturas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFaturas();
                setFaturas(data);
            } catch (error) {
                console.error('Erro ao carregar faturas', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Faturas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Número da Fatura</th>
                        <th>Cliente</th>
                        <th>Valor Total</th>
                        <th>Data de Emissão</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {faturas.map((fatura) => (
                        <tr key={fatura?.id}>
                            <td>{fatura?.numero_fatura}</td>
                            <td>{fatura?.clienteId}</td>
                            <td>{fatura?.valor_total}</td>
                            <td>{new Date(fatura?.data_emissao).toLocaleDateString()}</td>
                            <td>
                                <Link to={`/faturas/${fatura?.id}`}>Ver Detalhes</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FaturaList;
