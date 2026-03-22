import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Heart, Eye, Sparkles, RefreshCcw } from 'lucide-react';
import { challenges } from './data/challenges';
import ChallengeCard from './components/ChallengeCard';
import CategorySelector from './components/CategorySelector';

const App = () => {
  const [category, setCategory] = useState('tease');
  const [currentChallenge, setCurrentChallenge] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  const categories = [
    { id: 'tease', label: 'Tease', icon: Eye, color: 'var(--accent-purple)' },
    { id: 'intimate', label: 'Intimate', icon: Heart, color: 'var(--accent-red)' },
    { id: 'bold', label: 'Bold', icon: Flame, color: 'var(--accent-gold)' },
    { id: 'surprise', label: 'Surprise', icon: Sparkles, color: '#fff' },
  ];

  const getNewChallenge = () => {
    const pool = challenges[category];
    let next;
    do {
      next = pool[Math.floor(Math.random() * pool.length)];
    } while (next === currentChallenge && pool.length > 1);
    
    setCurrentChallenge(next);
  };

  const handleReveal = () => {
    if (!isFlipped) {
      getNewChallenge();
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
  };

  useEffect(() => {
    setIsFlipped(false);
  }, [category]);

  return (
    <div className="app-container">
      <header className="text-center mb-10 fade-in" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 800, 
          letterSpacing: '-2px',
          background: 'linear-gradient(to right, #fff, var(--accent-red), var(--accent-purple))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          filter: 'drop-shadow(0 0 10px rgba(255, 60, 95, 0.3))'
        }}>
          After<span style={{ fontWeight: 300, fontStyle: 'italic', opacity: 0.9 }}>Dark</span>
        </h1>
        <p style={{ 
          fontSize: '0.9rem', 
          color: 'var(--text-dim)', 
          letterSpacing: '4px', 
          textTransform: 'uppercase',
          marginTop: '-5px'
        }}>
          Ignite the Spark
        </p>
      </header>

      <CategorySelector 
        categories={categories} 
        active={category} 
        onChange={setCategory} 
      />

      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <ChallengeCard 
          isFlipped={isFlipped} 
          challenge={currentChallenge} 
          category={category} 
          onToggle={handleReveal}
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleReveal}
          style={{
            width: '100%',
            padding: '1.2rem',
            borderRadius: '16px',
            border: 'none',
            background: 'white',
            color: '#000',
            fontWeight: 800,
            fontSize: '1.1rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            marginTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          {isFlipped ? <RefreshCcw size={20} /> : null}
          {isFlipped ? "Next Challenge" : "Reveal Challenge"}
        </motion.button>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '3rem', opacity: 0.4 }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '1px', color: 'var(--text-dim)' }}>
          PRIVATE & DISCREET • CONSENTING ADULTS ONLY
        </p>
      </footer>
    </div>
  );
};

export default App;
