import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecpHome.css';

const ViewDoctor = () => {
  const [searchText, setSearchText] = useState('');
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/staff/doctors');
        setDoctorData(res.data);
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
        alert('Error loading doctors');
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctorData.filter((doctor) => {
    const search = searchText.toLowerCase().trim();
    const matchesStatus = ['available', 'not available'].includes(search)
      ? doctor.availability?.toLowerCase().trim() === search
      : doctor.availability?.toLowerCase().includes(search);

    return (
      doctor.doctorId?.toLowerCase().includes(search) ||
      doctor.name?.toLowerCase().includes(search) ||
      doctor.specialist?.toLowerCase().includes(search) ||
      matchesStatus
    );
  });

  return (
    <div className="recp-home">
      <div className="recp-header" />
      <div className="recp-background" />
      <h1 className="recp-title">View Doctors</h1>

      <div style={{ position: 'absolute', top: '240px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, width: '80%', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by ID, Name, Specialization or Availabilty"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      <div className="patient-table-container" style={{ top: '300px', maxHeight: '400px', overflowY: 'auto' }}>
        <table className="patient-table">
          <thead>
            <tr>
              <th>Doctor ID</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor, index) => (
                <tr key={index}>
                  <td>{doctor.doctorId}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialist}</td>
                  <td>{doctor.availability}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No doctors found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDoctor;
