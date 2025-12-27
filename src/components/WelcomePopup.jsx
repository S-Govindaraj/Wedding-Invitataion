import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WelcomePopup.css';

const WelcomePopup = ({ isVisible, onClose }) => {
  const [confetti, setConfetti] = useState([]);

  const createConfetti = useCallback(() => {
    const colors = ['#ff69b4', '#ffd700', '#ff1493', '#fff', '#ffb6c1', '#c71585', '#ff6b6b', '#feca57'];
    const shapes = ['circle', 'square', 'star', 'heart'];
    const newConfetti = [];

    for (let i = 0; i < 100; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: Math.random() * 12 + 6,
        delay: Math.random() * 0.5,
        duration: Math.random() * 2 + 2,
        rotation: Math.random() * 360,
        swing: (Math.random() - 0.5) * 200,
      });
    }
    setConfetti(newConfetti);
  }, []);

  useEffect(() => {
    if (isVisible) {
      createConfetti();
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, createConfetti]);

  const renderShape = (item) => {
    if (item.shape === 'star') {
      return (
        <svg viewBox="0 0 24 24" width={item.size} height={item.size}>
          <path
            fill={item.color}
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      );
    }
    if (item.shape === 'heart') {
      return (
        <svg viewBox="0 0 24 24" width={item.size} height={item.size}>
          <path
            fill={item.color}
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="welcome-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Confetti */}
          <div className="confetti-container">
            {confetti.map((item) => (
              <motion.div
                key={item.id}
                className={`confetti confetti-${item.shape}`}
                style={{
                  left: `${item.x}%`,
                  width: item.shape === 'star' || item.shape === 'heart' ? 'auto' : item.size,
                  height: item.shape === 'star' || item.shape === 'heart' ? 'auto' : item.size,
                  backgroundColor: item.shape === 'circle' || item.shape === 'square' ? item.color : 'transparent',
                  borderRadius: item.shape === 'circle' ? '50%' : '0',
                }}
                initial={{ 
                  y: -20, 
                  opacity: 0, 
                  rotate: 0,
                  x: 0 
                }}
                animate={{ 
                  y: '100vh', 
                  opacity: [0, 1, 1, 0.8, 0],
                  rotate: item.rotation + 720,
                  x: item.swing
                }}
                transition={{
                  duration: item.duration,
                  delay: item.delay,
                  ease: 'linear',
                }}
              >
                {(item.shape === 'star' || item.shape === 'heart') && renderShape(item)}
              </motion.div>
            ))}
          </div>

          {/* Sparkle bursts */}
          <div className="sparkle-burst sparkle-left">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="sparkle"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1.5, 0],
                  x: Math.cos((i * 30 * Math.PI) / 180) * 150,
                  y: Math.sin((i * 30 * Math.PI) / 180) * 150,
                }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          <div className="sparkle-burst sparkle-right">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="sparkle"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1.5, 0],
                  x: Math.cos((i * 30 * Math.PI) / 180) * 150,
                  y: Math.sin((i * 30 * Math.PI) / 180) * 150,
                }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Main popup */}
          <motion.div
            className="welcome-popup"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 200,
            }}
          >
            <div className="popup-glow"></div>
            <div className="popup-content">
              <motion.div
                className="popup-icon"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              >
                🎊
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Welcome
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                to our Wedding Celebration
              </motion.p>
              <motion.div
                className="popup-hearts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                💕 G & S 💕
              </motion.div>
            </div>
            <div className="popup-decorations">
              <span className="decoration decoration-1">✨</span>
              <span className="decoration decoration-2">💫</span>
              <span className="decoration decoration-3">🌟</span>
              <span className="decoration decoration-4">✨</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;

