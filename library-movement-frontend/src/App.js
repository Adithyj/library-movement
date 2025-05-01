import React, { useState } from 'react';
import MovementForm from './components/MovementForm';
import MovementTable from './components/MovementTable';
import MovementRegister from './components/MovementRegister';

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

      {/* Either use MovementForm + MovementTable OR MovementRegister - not both */}
      <MovementForm onEntryAdded={handleEntryAdded} />
      <MovementTable key={refreshKey} />
      
      {/* If you want to use MovementRegister instead, comment out the above two components */}
      {/* <MovementRegister /> */}
    </div>
  );
}

export default App;