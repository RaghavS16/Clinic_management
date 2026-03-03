// src/RecpHome.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecpHome.css';

const RecpHome = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleGo = () => {
    if (selectedOption) {
      navigate(`/${selectedOption}`);
    } else {
      alert('Please select an option.');
    }
  };

  return (
    <div className="recp-home">
      <div className="recp-header" />
      <div className="recp-background" />
      <h1 className="recp-title">Welcome back, Receptionist</h1>

      <div className="recp-options">
        <label>
          <input
            type="radio"
            name="action"
            value="view-patients"
            checked={selectedOption === 'view-patients'}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          View Patients
        </label>
        <label>
          <input
            type="radio"
            name="action"
            value="add-patients"
            checked={selectedOption === 'add-patients'}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          Add Patients
        </label>
        <label>
          <input
            type="radio"
            name="action"
            value="view-doctor"
            checked={selectedOption === 'view-doctor'}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          View Doctor
        </label>
      </div>

      <button className="recp-go-btn" onClick={handleGo}>Go</button>
    </div>
  );
};

export default RecpHome;
