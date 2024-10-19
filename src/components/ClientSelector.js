import React, { useState, useRef, useEffect } from 'react';

/**
 * ClientSelector
 * @description Componente que exibe uma lista suspensa para selecionar um cliente, funcionando de forma semelhante ao filtro de colunas do Excel.
 * @param {Array} clientes - Lista de clientes para exibição.
 * @param {Function} handleClientSelection - Função para lidar com a seleção do cliente.
 * @param {string} selectedClientId - ID do cliente atualmente selecionado.
 */
function ClientSelector({ clientes, handleClientSelection, selectedClientId }) {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca
  const [showDropdown, setShowDropdown] = useState(false); // Estado para controlar a exibição do dropdown
  const dropdownRef = useRef(null); // Referência para o dropdown
  const searchInputRef = useRef(null); // Referência para o campo de input

  // Filtra e ordena a lista de clientes com base no termo de busca
  const filteredClientes = clientes
    .filter((cliente) => cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.nome.localeCompare(b.nome));

  // Função para alternar a exibição do dropdown
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Função para fechar o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focar no campo de input quando o dropdown for exibido
  useEffect(() => {
    if (showDropdown && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showDropdown]);

  return (
    <div className="filter" ref={dropdownRef}>
      {/* Botão para alternar a exibição da lista suspensa */}
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {selectedClientId
          ? clientes.find((cliente) => cliente.id === selectedClientId)?.nome || 'Selecione o Cliente'
          : 'Selecione o Cliente'}
      </button>

      {/* Dropdown com input de busca e lista de clientes */}
      {showDropdown && (
        <div className="dropdown-content">
          <input
            type="text"
            ref={searchInputRef} // Referência para focar o input
            placeholder="Digite o nome do cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <ul className="client-list">
            {filteredClientes.length > 0 ? (
              filteredClientes.map((cliente) => (
                <li
                  key={cliente.id}
                  onClick={() => {
                    handleClientSelection({ target: { value: cliente.id } });
                    setShowDropdown(false); // Fechar dropdown após selecionar
                    setSearchTerm(''); // Limpar a busca ao selecionar o cliente
                  }}
                  className={cliente.id === selectedClientId ? 'selected' : ''}
                >
                  {cliente.nome}
                </li>
              ))
            ) : (
              <li>Nenhum cliente encontrado</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ClientSelector;
