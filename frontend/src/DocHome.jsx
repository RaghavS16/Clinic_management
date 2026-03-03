import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecpHome.css';

const DocHome = () => {
  const [doctorId, setDoctorId] = useState('');
  const [availability, setAvailability] = useState('not-available');
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      console.warn("No email found in localStorage");
      return;
    }

    const fetchDoctorInfo = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/staff/email/${email}`);
        console.log("👨‍⚕️ doctor info:", res.data);
        setDoctorId(res.data.doctorId);
        setAvailability(res.data.availability || 'not-available');
      } catch (err) {
        console.error("❌ Error fetching doctor info:", err);
      }
    };

    fetchDoctorInfo();
  }, []);

  useEffect(() => {
    if (!doctorId) return;

    const fetchPatients = async () => {
      try {
        console.log("➡️ Fetching patients for doctorId:", doctorId);
        const res = await axios.get(`http://localhost:8080/api/staff/${doctorId}/patients`);
        setPatients(res.data);
      } catch (err) {
        console.error("❌ Error fetching patients:", err);
      }
    };

    fetchPatients();
  }, [doctorId]);

  const handleAvailabilityChange = async (value) => {
    setAvailability(value);
    if (!doctorId) return;

    try {
      await axios.put(
        `http://localhost:8080/api/staff/availability/${doctorId}`,
        value,
        { headers: { "Content-Type": "text/plain" } }
      );
    } catch (err) {
      console.error("❌ Failed to update availability:", err);
      alert("Availability update failed.");
    }
  };

  const handleStatusChange = async (token, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/patients/status/${token}`, newStatus, {
        headers: { "Content-Type": "text/plain" },
      });

      setPatients(prev =>
        prev.map(p => (p.token === token ? { ...p, status: newStatus } : p))
      );
    } catch (err) {
      alert("❌ Status update failed.");
    }
  };

  const filteredPatients = patients.filter((p) =>
    (p.token + p.name + p.status).toLowerCase().includes(searchText.toLowerCase())
  );

  if (!doctorId) {
    return <p style={{ padding: '2rem', textAlign: 'center' }}>⏳ Loading doctor info...</p>;
  }

  return (
    <div className="recp-home">
      <div className="recp-header" />
      <div className="recp-background" />
      <h1 className="recp-title">Welcome, Doctor</h1>

      <div className="recp-options" style={{ top: '200px' }}>
        <label>
          <input
            type="radio"
            name="availability"
            value="available"
            checked={availability === 'available'}
            onChange={(e) => handleAvailabilityChange(e.target.value)}
          />
          Available
        </label>
        <label>
          <input
            type="radio"
            name="availability"
            value="not-available"
            checked={availability === 'not-available'}
            onChange={(e) => handleAvailabilityChange(e.target.value)}
          />
          Not Available
        </label>
      </div>

      <div
        style={{
          top: '280px',
          position: 'absolute',
          width: '80%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <input
          type="text"
          placeholder="Search by Token, Name, or Status"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <div className="patient-table-container" style={{ top: '340px', maxHeight: '400px', overflowY: 'auto' }}>
        <table className="patient-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Date</th>
              <th>Name</th>
              <th>Issue</th>
              <th>Status</th>

            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((p) => (
                <tr key={p.token}>
                  <td>{p.token}</td>
                  <td>{p.date}</td>
                  <td>{p.name}</td>
                  <td>{p.issue}</td>
                  <td>
                    <select value={p.status || ''} onChange={(e) => handleStatusChange(p.token, e.target.value)}>
                      <option value="Under Treatment">Under Treatment</option>
                      <option value="Recovered">Recovered</option>
                      <option value="Referred">treatment not given</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocHome;
