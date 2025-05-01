import React, { useState } from 'react';
import MovementForm from './components/MovementForm';
import MovementTable from './components/MovementTable';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEntryAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Library Movement Registry</h1>
        <p>Track and manage library entries efficiently</p>
      </header>

      <MovementForm onEntryAdded={handleEntryAdded} />
      <MovementTable key={refreshKey} />
    </div>
  );
}

export default App;