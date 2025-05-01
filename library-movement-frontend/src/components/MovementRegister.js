import React, { useState } from 'react';
import axios from 'axios';

const MovementRegister = () => {
  const [usn, setUsn] = useState('');
  const [studentExists, setStudentExists] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    branch: '',
    joiningYear: ''
  });

  const handleCheck = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/students/${usn}`);
      if (res.data) {
        alert("✅ Student exists. Entry recorded!");
        setStudentExists(true);
      }
    } catch (err) {
      console.log("Student not found. Show registration form.");
      setStudentExists(false);
    }
  };

  const handleRegister = async () => {
    console.log({ usn, ...newStudent });
    try {
      const res = await axios.post('http://localhost:5000/api/students', {
        usn,
        ...newStudent
      });
      alert("🎉 Student registered successfully!");
      setStudentExists(true);
    } catch (err) {
      alert("❌ Registration failed. Maybe USN already exists.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📘 Library Movement Register</h2>

      <input
        type="text"
        placeholder="Enter USN"
        value={usn}
        onChange={(e) => setUsn(e.target.value)}
        style={{ padding: '10px', margin: '10px 0', width: '250px' }}
      />
      <br />
      <button onClick={handleCheck}>Check Student</button>

      {!studentExists && studentExists !== null && (
        <div style={{ marginTop: '20px' }}>
          <h3>New Student Registration</h3>
          <input
            type="text"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
          />
          <input
            type="text"
            placeholder="Branch"
            value={newStudent.branch}
            onChange={(e) => setNewStudent({ ...newStudent, branch: e.target.value })}
            style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
          />
          <input
            type="text"
            placeholder="Joining Year"
            value={newStudent.joiningYear}
            onChange={(e) => setNewStudent({ ...newStudent, joiningYear: e.target.value })}
            style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
          />
          <button onClick={handleRegister}>Register Student</button>
        </div>
      )}
    </div>
  );
};

export default MovementRegister;
