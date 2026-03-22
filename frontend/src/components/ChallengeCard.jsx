import React from 'react';
import { motion } from 'framer-motion';

const ChallengeCard = ({ isFlipped, challenge, category, onToggle }) => {
  return (
    <div 
      className="challenge-card-wrapper" 
      style={{ 
        width: '100%', 
        height: '340px', 
        perspective: '1000px',
        cursor: 'pointer'
      }}
      onClick={onToggle}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front of Card */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, #1a1a1e, #0a0a0c)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, var(--accent-red), transparent)',
            filter: 'blur(30px)',
            opacity: 0.3,
            zIndex: 0
          }} />
          <p style={{ color: 'var(--text-dim)', fontSize: '1rem', fontWeight: 300, letterSpacing: '2px', textTransform: 'uppercase', zIndex: 1 }}>
            Tap to Reveal
          </p>
        </div>

        {/* Back of Card */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #2a1122, #151518)',
            borderRadius: '24px',
            border: `1px solid var(--accent-${category === 'surprise' ? 'red' : category})`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2.5rem',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}
        >
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '3px',
            color: 'var(--accent-red)',
            marginBottom: '1.5rem',
            textTransform: 'uppercase'
          }}>
            {category}
          </div>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            lineHeight: 1.4,
            color: '#eee'
          }}>
            {challenge}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ChallengeCard;
