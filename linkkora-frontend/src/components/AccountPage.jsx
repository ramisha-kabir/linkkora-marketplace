import React, { useState } from 'react';
import { User, Palette, Sparkles, ArrowRight, Mail } from 'lucide-react';

const AccountPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5050/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
      } else {
        throw new Error('Failed to join waitlist');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="account-page">
      <div className="account-hero">
        <div className="account-background">
          {/* Animated background elements */}
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
          <div className="floating-element element-4"></div>
        </div>
        
        <div className="container">
          <div className="account-content">
            <div className="account-icon">
              <div className="icon-wrapper">
                <Palette size={48} />
                <Sparkles className="sparkle-1" size={20} />
                <Sparkles className="sparkle-2" size={16} />
                <Sparkles className="sparkle-3" size={18} />
              </div>
            </div>
            
            <div className="account-text">
              <h1 className="account-title">
                Personalized Moodboard
                <span className="title-accent">Coming Soon</span>
              </h1>
              
              <p className="account-description">
                We're crafting something extraordinary for you. Your personal style sanctuary 
                where luxury meets individuality - a curated space that understands your unique aesthetic.
              </p>
              
              <div className="features-preview">
                <div className="feature-item">
                  <div className="feature-icon">
                    <User size={20} />
                  </div>
                  <span>Personalized Style Profile</span>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <Palette size={20} />
                  </div>
                  <span>Custom Moodboards</span>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <Sparkles size={20} />
                  </div>
                  <span>AI-Curated Collections</span>
                </div>
              </div>
              
              <div className="cta-section">
                <p className="cta-text">
                  Be the first to experience the future of personalized fashion
                </p>
                
                {isSubmitted ? (
                  <div className="success-message">
                    <div className="success-icon">
                      <Mail size={24} />
                    </div>
                    <h3>You're on the list!</h3>
                    <p>We'll notify you when your personalized moodboard is ready.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="waitlist-form">
                    <div className="email-input-container">
                      <Mail className="email-icon" size={20} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="email-input"
                        disabled={isSubmitting}
                      />
                      <button 
                        type="submit" 
                        className="btn-join-waitlist"
                        disabled={isSubmitting || !email}
                      >
                        {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                        <ArrowRight size={18} />
                      </button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom section */}
      <div className="account-footer">
        <div className="footer-pattern">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`pattern-dot dot-${i + 1}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
