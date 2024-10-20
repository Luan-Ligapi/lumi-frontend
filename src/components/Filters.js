import { useState } from 'react';

const Filters = ({ onFilterChange }) => {
  const [clientId, setClientId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    onFilterChange({ clientId, startDate, endDate });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Número do Cliente"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  );
};

export default Filters;
