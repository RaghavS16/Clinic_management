import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password || !role) {
      alert('Please fill in all fields and select a role');
      return;
    }

    try {
      await axios.post(
  'http://localhost:8080/api/auth/login',
  { email, password, role },
);


      alert('Login successful!');
      localStorage.setItem("email", email); // ✅ So DocHome can access it

      navigate(role === 'receptionist' ? '/recp_home' : '/doc_home');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data || 'Server error'));
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <h1>Welcome to medical portal</h1>
      </div>
      <div className="right-panel">
        <h2>LOGIN</h2>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="roles">
          <label>
            <input
              type="radio"
              name="role"
              value="receptionist"
              checked={role === 'receptionist'}
              onChange={() => setRole('receptionist')}
            /> Receptionist
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="doctor"
              checked={role === 'doctor'}
              onChange={() => setRole('doctor')}
            /> Doctor
          </label>
        </div>
        <Link to="/forgot-password" className="forgot-password">Forget Password?</Link>
        <button className="login-btn" onClick={handleLogin}>Login</button>
        <p className="signup-link">Don’t have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
