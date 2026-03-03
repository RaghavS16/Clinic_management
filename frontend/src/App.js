import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import ForgetPassword from './ForgetPassword';
import RecpHome from './RecpHome';
import DocHome from './DocHome';
import ViewPatients from './ViewPatients';
import ViewDoctor from './ViewDoctor';
import AddPatient from './AddPatient';
import DeletePatient from './DeletePatient';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/recp_home" element={<RecpHome />} />
        <Route path="/doc_home" element={<DocHome />} />
        <Route path="/view-patients" element={<ViewPatients />} />
        <Route path="/add-patients" element={<AddPatient />} />
        <Route path="/delete-patients" element={<DeletePatient />} />
        <Route path="/view-doctor" element={<ViewDoctor />} />
      </Routes>
    </Router>
  );
}

export default App;
