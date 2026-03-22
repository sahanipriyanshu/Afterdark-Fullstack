import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Heart, Eye, Sparkles, RefreshCw } from 'lucide-react';
import CategorySelector from './components/CategorySelector';
import ChallengeCard from './components/ChallengeCard';
import { challenges } from './data/challenges';
import './index.css';

const categories = [
  { id: 'tease', name: 'Tease', icon: Eye, color: '#fcd34d' },
  { id: 'intimate', name: 'Intimate', icon: Heart, color: '#f472b6' },
  { id: 'bold', name: 'Bold', icon: Flame, color: '#ef4444' },
  { id: 'surprise', name: 'Surprise', icon: Sparkles, color: '#a855f7' }
];

function AppGame() {
  const [activeCategory, setActiveCategory] = useState('tease');
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    generateChallenge('tease');
  }, []);

  const generateChallenge = (category) => {
    const categoryChallenges = challenges[category];
    const randomIndex = Math.floor(Math.random() * categoryChallenges.length);
    const newChallenge = categoryChallenges[randomIndex];
    
    // Ensure we don't get the same challenge twice in a row if there are multiple
    if (categoryChallenges.length > 1 && newChallenge === currentChallenge) {
      generateChallenge(category);
      return;
    }

    setIsFlipped(false);
    setTimeout(() => {
      setCurrentChallenge(newChallenge);
      setActiveCategory(category);
    }, 150);
  };

  const handleNextChallenge = () => {
    generateChallenge(activeCategory);
  };

  const activeColor = categories.find(c => c.id === activeCategory)?.color || '#fff';

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
          marginTop: '0.8rem',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>Private Couples Game</p>
      </header>

      <main>
        <CategorySelector 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelect={generateChallenge} 
        />

        <div style={{ margin: '3rem 0', perspective: '1000px' }}>
          <AnimatePresence mode="wait">
            <ChallengeCard 
              key={currentChallenge}
              challenge={currentChallenge} 
              category={activeCategory}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped(!isFlipped)}
              accentColor={activeColor}
            />
          </AnimatePresence>
        </div>

        <div style={{ textAlign: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${activeColor}44` }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextChallenge}
            className="btn-primary"
            style={{
              padding: '1.2rem 2.5rem',
              borderRadius: '50px',
              border: 'none',
              background: 'white',
              color: 'black',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              margin: '0 auto',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}
          >
            <RefreshCw size={20} /> Next Challenge
          </motion.button>
        </div>
      </main>

      <footer style={{ 
        marginTop: '5rem', 
        textAlign: 'center', 
        color: 'var(--text-dim)', 
        fontSize: '0.8rem',
        padding: '2rem'
      }}>
        <p>© 2026 AfterDark | Premium Adult Game</p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <span>Privacy First</span>
          <span>•</span>
          <span>Intimate & Private</span>
        </div>
      </footer>
    </div>
  );
}

export default AppGame;
