import React from 'react';
import { Mail, MessageCircle, Send, Instagram, Phone } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-background">
          {/* Animated background elements */}
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
          <div className="floating-element element-4"></div>
        </div>
        
        <div className="container">
          <div className="contact-content">
            <div className="contact-header">
              <div className="contact-icon">
                <div className="icon-wrapper">
                  <MessageCircle size={48} />
                  <div className="pulse-ring"></div>
                  <div className="pulse-ring-2"></div>
                </div>
              </div>
              
              <h1 className="contact-title">
                Get In Touch
                <span className="title-accent">We'd Love to Hear From You</span>
              </h1>
              
              <p className="contact-description">
                Connect with our team for collaborations, inquiries, or to learn more about 
                our curated fashion collections. We're here to help you discover your unique style.
              </p>
            </div>

            <div className="contact-details">
              <div className="contact-grid">
                <div className="contact-card primary-card">
                  <div className="card-icon">
                    <Mail size={28} />
                  </div>
                  <h3>Contact Us</h3>
                  <p>For general inquiries and collaborations</p>
                  <div className="contact-methods">
                    <a href="mailto:linccorabd@gmail.com" className="contact-link">
                      <Mail size={16} />
                      linccorabd@gmail.com
                    </a>
                    <a href="https://wa.me/19299881426" className="contact-link whatsapp-link" target="_blank" rel="noopener noreferrer">
                      <Phone size={16} />
                      +1 (929) 988-1426
                    </a>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="card-icon">
                    <Instagram size={28} />
                  </div>
                  <h3>Social Media</h3>
                  <p>Follow us for the latest updates</p>
                  <a href="https://instagram.com/linccorabd" className="contact-link" target="_blank" rel="noopener noreferrer">
                    @linccorabd
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-cta">
              <div className="cta-card">
                <h3>List Your Brand Today</h3>
                <p>
                  Are you a designer or brand looking to showcase your collections? Contact us to list 
                  your brand on our curated marketplace and reach fashion enthusiasts worldwide.
                </p>
                <div className="cta-contact-methods">
                  <a href="mailto:linccorabd@gmail.com" className="btn-contact">
                    <Mail size={18} />
                    Email Us
                  </a>
                  <a href="https://wa.me/19299881426" className="btn-contact btn-whatsapp" target="_blank" rel="noopener noreferrer">
                    <Phone size={18} />
                    WhatsApp Us
                  </a>
                </div>
                <p className="contact-number">
                  WhatsApp: +1 (929) 988-1426
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom section */}
      <div className="contact-footer">
        <div className="footer-pattern">
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`pattern-dot dot-${i + 1}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
