import React, { useState } from 'react';
import api from '../api';

const MovementForm = ({ onEntryAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    purpose: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const getRole = (usn) => {
    if (usn.startsWith('4SF')) return 'Student';
    if (usn.startsWith('FAC') || usn.startsWith('EMP')) return 'Faculty';
    return 'Unknown';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    const role = getRole(formData.usn);

    try {
      await api.post('/movement', { ...formData, role });
      setSuccess(true);
      setFormData({ name: '', usn: '', purpose: '' });
      if (onEntryAdded) onEntryAdded();
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.response?.data?.message || 'Error submitting entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Library Entry Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="usn" className="form-label">USN / Faculty ID</label>
          <input
            type="text"
            id="usn"
            name="usn"
            placeholder="Enter your USN or Faculty ID"
            value={formData.usn}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="purpose" className="form-label">Purpose of Visit</label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            placeholder="Enter purpose (e.g., Borrow books, Research)"
            value={formData.purpose}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {error && (
          <div className="error-message" style={{ color: 'var(--error-color)', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {success && (
          <div className="success-message" style={{ color: 'var(--success-color)', marginBottom: '1rem', textAlign: 'center' }}>
            Entry logged successfully!
          </div>
        )}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Entry'}
        </button>
      </form>
    </div>
  );
};

export default MovementForm;