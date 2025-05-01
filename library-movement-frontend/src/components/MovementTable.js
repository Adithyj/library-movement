// src/components/MovementTable.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';

const MovementTable = () => {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const res = await api.get('/movement');
        setMovements(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovements();
  }, []);

  return (
    <div className="overflow-x-auto mt-8 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Movement Records</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">USN / ID</th>
            <th className="py-2 px-4 border">Role</th>
            <th className="py-2 px-4 border">Purpose</th>
            <th className="py-2 px-4 border">Time In</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((entry, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">{entry.name}</td>
              <td className="py-2 px-4 border">{entry.usn}</td>
              <td className="py-2 px-4 border">{entry.role}</td>
              <td className="py-2 px-4 border">{entry.purpose}</td>
              <td className="py-2 px-4 border">
                {new Date(entry.timeIn).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovementTable;
