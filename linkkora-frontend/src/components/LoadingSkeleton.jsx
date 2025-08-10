import React from 'react';

const LoadingSkeleton = ({ count = 8 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="product-card skeleton">
          <div className="skeleton-image"></div>
          <div className="product-info">
            <div className="skeleton-text skeleton-title"></div>
            <div className="skeleton-text skeleton-brand"></div>
            <div className="skeleton-text skeleton-price"></div>
            <div className="skeleton-actions">
              <div className="skeleton-button"></div>
              <div className="skeleton-button skeleton-button-primary"></div>
            </div>
          </div>
        </div>
      ))}
      
      <style jsx>{`
        .skeleton {
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        .skeleton-image {
          width: 100%;
          height: 200px;
          background: #e2e8f0;
          border-radius: 8px 8px 0 0;
        }
        
        .skeleton-text {
          height: 16px;
          background: #e2e8f0;
          border-radius: 4px;
          margin-bottom: 8px;
        }
        
        .skeleton-title {
          height: 20px;
          width: 80%;
        }
        
        .skeleton-brand {
          width: 60%;
        }
        
        .skeleton-price {
          width: 40%;
          height: 18px;
        }
        
        .skeleton-actions {
          display: flex;
          gap: 8px;
          margin-top: 12px;
        }
        
        .skeleton-button {
          height: 32px;
          background: #e2e8f0;
          border-radius: 6px;
          flex: 1;
        }
        
        .skeleton-button-primary {
          flex: 2;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </>
  );
};

export default LoadingSkeleton; 