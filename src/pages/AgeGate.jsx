import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

const AgeGate = ({ onConfirm }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'var(--bg-dark)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '2rem',
      textAlign: 'center'
    }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          background: 'var(--glass-bg)',
          padding: '3rem 2rem',
          borderRadius: '24px',
          border: '1px solid var(--glass-border)',
          maxWidth: '400px',
          backdropFilter: 'blur(20px)'
        }}
      >
        <ShieldAlert size={64} color="var(--accent-red)" style={{ marginBottom: '1.5rem' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Adults Only</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          AfterDark contains intimate content. You must be at least 18 years old to proceed.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onConfirm}
            style={{
              padding: '1.2rem',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-red))',
              color: 'white',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}
          >
            I am 18+
          </motion.button>
          
          <button
            onClick={() => window.location.href = "https://www.google.com"}
            style={{
              padding: '1rem',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-dim)',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Exit Site
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AgeGate;
