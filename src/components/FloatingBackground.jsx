import { useEffect, useRef } from 'react';
import './FloatingBackground.css';

const FloatingBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    const particleCount = 50;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      
      // Random properties
      const size = Math.random() * 20 + 5;
      const x = Math.random() * 100;
      const delay = Math.random() * 20;
      const duration = Math.random() * 20 + 15;
      const type = Math.random();
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        animation-delay: -${delay}s;
        animation-duration: ${duration}s;
      `;

      // Different particle types
      if (type < 0.3) {
        particle.classList.add('particle-heart');
      } else if (type < 0.6) {
        particle.classList.add('particle-ring');
      } else {
        particle.classList.add('particle-dot');
      }

      container.appendChild(particle);
      particles.push(particle);
    }

    // Cleanup
    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <div className="floating-background" ref={containerRef}>
      {/* Gradient orbs for 3D depth effect */}
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>
      <div className="gradient-orb orb-4"></div>
      
      {/* Light rays */}
      <div className="light-rays"></div>
      
      {/* Bokeh effect */}
      <div className="bokeh bokeh-1"></div>
      <div className="bokeh bokeh-2"></div>
      <div className="bokeh bokeh-3"></div>
      <div className="bokeh bokeh-4"></div>
      <div className="bokeh bokeh-5"></div>
      <div className="bokeh bokeh-6"></div>
    </div>
  );
};

export default FloatingBackground;

