import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppGame from './AppGame'; // Renamed existing App content
import AgeGate from './pages/AgeGate';
import Auth from './pages/Auth';
import Payment from './pages/Payment';

const App = () => {
  const [ageVerified, setAgeVerified] = useState(() => localStorage.getItem('ageVerified') === 'true');
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [hasPaid, setHasPaid] = useState(() => (localStorage.getItem('hasPaid') === 'true'));

  const handleAgeConfirm = () => {
    setAgeVerified(true);
    localStorage.setItem('ageVerified', 'true');
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Sync payment status from backend on load
  useEffect(() => {
    const syncPaymentStatus = async () => {
      const token = localStorage.getItem('token');
      if (token && user) {
        try {
          // I'll need to add a /me route to the backend for this
          const res = await fetch(`${API_URL}/api/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (res.ok) {
            setHasPaid(data.hasPaid);
            localStorage.setItem('hasPaid', data.hasPaid.toString());
          }
        } catch (err) {
          console.error("Session sync failed:", err);
        }
      }
    };
    syncPaymentStatus();
  }, [user]);

  const handleAuthSuccess = (userData) => {
    // userData format from backend: { token, user: { id, email, hasPaid } }
    setUser(userData.user);
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', userData.token);
    if (userData.user.hasPaid) {
      setHasPaid(true);
      localStorage.setItem('hasPaid', 'true');
    }
  };

  const handlePaymentSuccess = () => {
    setHasPaid(true);
    localStorage.setItem('hasPaid', 'true');
    // Also update user object in state/storage
    const updatedUser = { ...user, hasPaid: true };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    setUser(null);
    setHasPaid(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('hasPaid');
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
            hasPaid ? <Navigate to="/game" /> : <Payment user={user} onPaymentComplete={handlePaymentSuccess} />
          } />

          {/* Special Game Route */}
          <Route path="/game" element={
            !hasPaid ? <Navigate to="/payment" /> : <AppGame onLogout={handleLogout} />
          } />

          {/* Default Redirection */}
          <Route path="/" element={
            !ageVerified ? <Navigate to="/age-gate" /> :
            !user ? <Navigate to="/auth" /> :
            !hasPaid ? <Navigate to="/payment" /> : <Navigate to="/game" />
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
