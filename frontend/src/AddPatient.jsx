import React, { useState } from 'react';
import axios from 'axios';
import './RecpHome.css';

const AddPatient = () => {
  const [formData, setFormData] = useState({
    name: '',
    token: '',
    age: '',
    address: '',
    gender: '',
    issue: '',
    doctorId: '',
    date: '',
    marks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 👇 Convert age to number for backend (to avoid 403)
    const updatedValue = name === 'age' ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("📤 Submitting:", formData); // Debug output

    try {
      await axios.post('http://localhost:8080/api/patients/add', formData);
      alert('✅ Patient added successfully!');
      setFormData({
        name: '',
        token: '',
        age: '',
        address: '',
        gender: '',
        issue: '',
        doctorId: '',
        date: '',
        marks: '',
      });
    } catch (err) {
      console.error('❌ Error adding patient:', err.response?.data || err.message);
      alert('❌ Error: ' + (err.response?.data || 'Something went wrong'));
    }
  };

  return (
    <div className="recp-home">
      <div className="recp-header" />
      <div className="recp-background" />
      <h1 className="recp-title">Add Patient</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Token:</label>
            <input type="text" name="token" value={formData.token} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Issue:</label>
            <input type="text" name="issue" value={formData.issue} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Doctor ID:</label>
            <input type="text" name="doctorId" value={formData.doctorId} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Marks:</label>
            <input type="text" name="marks" value={formData.marks} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="login-btn add-btn">Add</button>
      </form>
    </div>
  );
};

export default AddPatient;
