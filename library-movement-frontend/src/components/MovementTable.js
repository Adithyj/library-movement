import React, { useEffect, useState } from 'react';
import api from '../api';

const MovementTable = () => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const res = await api.get('/movement');
        setMovements(res.data);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load movement records. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovements();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchMovements, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredMovements = movements.filter(movement =>
    movement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (role) => {
    return role === 'Student' ? 'status-student' : 
           role === 'Faculty' ? 'status-faculty' : '';
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Movement Records</h2>
      
      <div className="form-group" style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Search records..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
        />
      </div>

      {error && (
        <div className="error-message" style={{ color: 'var(--error-color)', marginBottom: '1rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading records...</div>
      ) : filteredMovements.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          {searchTerm ? 'No matching records found' : 'No movement records available'}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>USN/ID</th>
                <th>Role</th>
                <th>Purpose</th>
                <th>Time In</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovements.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.usn}</td>
                  <td className={getStatusClass(entry.role)}>{entry.role}</td>
                  <td>{entry.purpose}</td>
                  <td>{new Date(entry.timeIn).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MovementTable;