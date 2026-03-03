// Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState('');
  const [specialist, setSpecialist] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !mobile || !role) {
      alert('Please fill in all required fields.');
      return;
    }

    if (role === 'doctor' && (!doctorId || !specialist)) {
      alert('Doctor ID and Specialist are required for doctors.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        name,
        email,
        password,
        mobile,
        role,
        doctorId: role === 'doctor' ? doctorId : null,
        specialist: role === 'doctor' ? specialist : null,
      });

      alert('Account created successfully!');
      navigate('/');
    } catch (err) {
      alert('Signup failed: ' + (err.response?.data || 'Server error'));
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <h1>Welcome to medical portal</h1>
      </div>
      <div className="right-panel">
        <h2>SIGN IN</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Mobile:</label>
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          </div>
          <div className="roles">
            <label>
              <input type="radio" name="role" value="receptionist" checked={role === 'receptionist'} onChange={() => setRole('receptionist')} /> Receptionist
            </label>
            <label>
              <input type="radio" name="role" value="doctor" checked={role === 'doctor'} onChange={() => setRole('doctor')} /> Doctor
            </label>
          </div>
          {role === 'doctor' && (
            <>
              <div className="form-group">
                <label>Specialist:</label>
                <input type="text" value={specialist} onChange={(e) => setSpecialist(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Doctor ID:</label>
                <input type="text" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required />
              </div>
            </>
          )}
          <button type="submit" className="login-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;