// src/App.jsx
import React from 'react';
import MovementForm from './components/MovementForm';
import MovementTable from './components/MovementTable';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Library Movement Registry</h1>
      <MovementForm />
      <MovementTable />
    </div>
  );
}

export default App;
