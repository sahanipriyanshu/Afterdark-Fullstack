import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppGame from './AppGame'; // Renamed existing App content
import AgeGate from './pages/AgeGate';
import Auth from './pages/Auth';
import Payment from './pages/Payment';

const App = () => {
  const [ageVerified, setAgeVerified] = useState(() => localStorage.getItem('ageVerified') === 'true');
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [hasPaid, setHasPaid] = useState(() => localStorage.getItem('hasPaid') === 'true');

  const handleAgeConfirm = () => {
    setAgeVerified(true);
    localStorage.setItem('ageVerified', 'true');
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handlePaymentSuccess = () => {
    setHasPaid(true);
    localStorage.setItem('hasPaid', 'true');
  };

  return (
    <Router>
      <div className="app-root">
        <Routes>
          {/* Age Gate Route */}
          <Route path="/age-gate" element={
            !ageVerified ? <AgeGate onConfirm={handleAgeConfirm} /> : <Navigate to="/auth" />
          } />

          {/* Auth Route */}
          <Route path="/auth" element={
            !ageVerified ? <Navigate to="/age-gate" /> : 
            !user ? <Auth onAuthSuccess={handleAuthSuccess} /> : <Navigate to="/payment" />
          } />

          {/* Payment Route */}
          <Route path="/payment" element={
            !user ? <Navigate to="/auth" /> :
            hasPaid ? <Navigate to="/game" /> : <Payment upiId="sahanipriyanshu@upi" onPaymentComplete={handlePaymentSuccess} />
          } />

          {/* Special Game Route */}
          <Route path="/game" element={
            !hasPaid ? <Navigate to="/payment" /> : <AppGame />
          } />

          {/* Default Redirection */}
          <Route path="/" element={<Navigate to="/age-gate" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
