import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/send-otp', { email });
      alert('OTP sent to your email');
      setStep(2);
    } catch (err) {
      alert('Error sending OTP: ' + (err.response?.data || 'Server error'));
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/verify-otp', { email, otp });
      alert('OTP verified successfully');
      setStep(3);
    } catch (err) {
      alert('Invalid OTP: ' + (err.response?.data || 'Server error'));
    }
  };

  const handleSavePassword = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/reset-password', { email, password });
      alert('Password updated successfully');
      navigate('/');
    } catch (err) {
      alert('Error resetting password: ' + (err.response?.data || 'Server error'));
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <h1>Welcome to medical portal</h1>
      </div>
      <div className="right-panel">
        <h2>FORGET PASSWORD</h2>
        {step >= 1 && (
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        )}
        {step === 1 && <button className="login-btn" onClick={handleSendOtp}>Send OTP</button>}
        {step >= 2 && (
          <div className="form-group">
            <label>OTP:</label>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          </div>
        )}
        {step === 2 && <button className="login-btn" onClick={handleVerifyOtp}>Verify</button>}
        {step >= 3 && (
          <>
            <div className="form-group">
              <label>New Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="login-btn" onClick={handleSavePassword}>Save</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
