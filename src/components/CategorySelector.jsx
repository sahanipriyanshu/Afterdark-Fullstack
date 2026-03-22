import React from 'react';
import { motion } from 'framer-motion';

const CategorySelector = ({ categories, active, onChange }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '0.8rem',
      marginBottom: '3rem'
    }}>
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = active === cat.id;

        return (
          <motion.button
            key={cat.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(cat.id)}
            style={{
              background: isActive 
                ? `linear-gradient(135deg, var(--accent-purple), var(--accent-red))`
                : 'var(--glass-bg)',
              border: isActive ? 'none' : '1px solid var(--glass-border)',
              padding: '1rem',
              borderRadius: '16px',
              color: isActive ? 'white' : 'var(--text-dim)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              boxShadow: isActive ? '0 8px 20px rgba(255, 60, 95, 0.3)' : 'none'
            }}
          >
            <Icon size={24} color={isActive ? 'white' : cat.color} strokeWidth={isActive ? 2.5 : 2} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px' }}>
              {cat.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategorySelector;
