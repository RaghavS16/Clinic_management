import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecpHome.css';

const DeletePatient = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`🗑️ Patient with token "${token}" deleted.`);
    navigate('/view-patients');
  };

  return (
    <div className="recp-home">
      <div className="recp-header" />
      <div className="recp-background" />
      <h1 className="recp-title">Delete Patient</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="form-group">
            <label>Token:</label>
            <input
              type="text"
              name="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="login-btn add-btn">Delete</button>
      </form>
    </div>
  );
};

export default DeletePatient;
