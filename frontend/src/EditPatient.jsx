import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecpHome.css';
import axios from 'axios';

const EditPatient = () => {
  const [formData, setFormData] = useState({
    token: '',
    name: '',
    age: '',
    address: '',
    gender: '',
    issue: '',
    marks: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.put(`http://localhost:8080/api/patients/edit/${formData.token}`, formData);
    alert('✅ Patient details updated!');
    navigate('/view-patients');
  } catch (err) {
    console.error('Error updating patient:', err);
    alert('Error: ' + (err.response?.data || 'Something went wrong'));
  }
};

  return (
    <div className="recp-home">
      <div className="recp-header" />
      <div className="recp-background" />
      <h1 className="recp-title">Edit Patient</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-grid">
          {['token', 'name', 'age', 'address', 'issue', 'marks'].map((field) => (
            <div className="form-group" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type={field === 'age' ? 'number' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required={field !== 'marks'}
              />
            </div>
          ))}
          <div className="form-group">
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <button type="submit" className="login-btn add-btn">Save</button>
      </form>
    </div>
  );
};

export default EditPatient;
