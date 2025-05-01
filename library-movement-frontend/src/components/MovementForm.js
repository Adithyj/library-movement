// src/components/MovementForm.jsx
import React, { useState } from 'react';
import api from '../api';

const MovementForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    purpose: '',
  });

  const getRole = (usn) => {
    if (usn.startsWith('4SF')) return 'Student';
    if (usn.startsWith('FAC') || usn.startsWith('EMP')) return 'Faculty';
    return 'Unknown';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = getRole(formData.usn);

    try {
      await api.post('/movement', { ...formData, role });
      alert('Entry logged!');
      setFormData({ name: '', usn: '', purpose: '' });
    } catch (err) {
      console.error(err);
      alert('Error submitting entry');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-md rounded bg-white">
      <h2 className="text-xl font-semibold mb-4">Library Entry</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="USN / Faculty ID"
        value={formData.usn}
        onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Purpose"
        value={formData.purpose}
        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};

export default MovementForm;
