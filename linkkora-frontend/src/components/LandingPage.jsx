import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const LandingPage = ({ onEnterShop }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Dynamic hero images - minimalist background rotation
  const heroImages = [
    'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2005&q=80'
  ];

  // Auto-change images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleEnterShop = () => {
    const landingElement = document.querySelector('.landing-page');
    
    if (!landingElement) {
      onEnterShop();
      return;
    }

    // Add elegant luxury fade effect
    landingElement.classList.add('luxury-exit');
    
    // Complete transition after animation
    setTimeout(() => {
      onEnterShop();
    }, 1200);
  };

  const currentImage = heroImages[currentImageIndex];

  return (
    <div className="landing-page">
      <div className="landing-hero">
        <div 
          className={`hero-background ${isTransitioning ? 'transitioning' : ''}`}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        
        {/* Overlay */}
        <div className="hero-overlay" />
        
        {/* Minimal Content - Dior Style */}
        <div className="hero-content">
          <div className="hero-brand">
            <h1>LINCCORA</h1>
          </div>
          
          <button className="enter-shop-btn" onClick={handleEnterShop}>
            <span>Enter</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 