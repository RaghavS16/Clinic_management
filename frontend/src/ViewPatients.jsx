import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecpHome.css';

const ViewPatients = () => {
  const [searchText, setSearchText] = useState('');
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/patients/all');
        setPatientData(res.data);
      } catch (err) {
        console.error('Failed to fetch patients:', err);
        alert('Error loading patients: ' + (err.response?.data || 'Server error'));
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patientData.filter((patient) => {
    const search = searchText.toLowerCase();
    return (
      patient.token?.toLowerCase().includes(search) ||
      patient.name?.toLowerCase().includes(search) ||
      patient.date?.includes(search)
    );
  });

  return (
    <div className="recp-home">
      <div className="recp-header" />
      <div className="recp-background" />
      <h1 className="recp-title">View Patients</h1>

      <div style={{ position: 'absolute', top: '240px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, width: '80%', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by Token, Name, or Date"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '100%', padding: '12px 16px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
      </div>

      <div className="patient-table-container" style={{ top: '300px', maxHeight: '400px', overflowY: 'auto' }}>
        <table className="patient-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Name</th>
              <th>Age</th>
              <th>Issue</th>
              <th>Gender</th>
              <th>Date</th>
              <th>Status</th>
              <th>Doctor Id</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.token}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.issue}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.date}</td>
                  <td>{patient.status}</td>
                  <td>{patient.doctorId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No patients found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewPatients;
