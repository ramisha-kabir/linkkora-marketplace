import React, { useState, useEffect } from 'react';
import { Heart, ExternalLink, ShoppingBag, Star } from 'lucide-react';

const ProductCard = ({ product, isFavorite, onToggleFavorite }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle image loading
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  // Handle favorite toggle with animation
  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAnimating(true);
    onToggleFavorite(product);
    
    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Format price
  const formatPrice = (price) => {
    if (!price) return 'Price not available';
    return typeof price === 'string' ? price : `৳${price.toLocaleString()}`;
  };

  // Get brand color based on brand name
  const getBrandColor = (brand) => {
    const colors = {
      'wrclo': '#e74c3c',
      'onepercentclub': '#3498db',
      'aarong': '#f39c12',
      'yellow': '#f1c40f',
      'default': '#95a5a6'
    };
    return colors[brand?.toLowerCase()] || colors.default;
  };

  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''} ${imageLoaded ? 'loaded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="product-image-container">
        {!imageLoaded && !imageError && (
          <div className="image-skeleton">
            <div className="skeleton-shimmer"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="image-placeholder">
            <ShoppingBag size={48} />
            <span>Image not available</span>
          </div>
        ) : (
          <img
            src={product.image_url || '/placeholder-product.jpg'}
            alt={product.product_name}
            className={`product-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}

        {/* Favorite Button */}
        <button
          className={`favorite-button ${isFavorite ? 'favorited' : ''} ${isAnimating ? 'animating' : ''}`}
          onClick={handleFavoriteToggle}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart 
            size={20} 
            fill={isFavorite ? 'currentColor' : 'none'}
          />
        </button>

        {/* Quick Actions Overlay */}
        <div className={`quick-actions ${isHovered ? 'visible' : ''}`}>
          <button 
            className="quick-action-btn view-btn"
            onClick={() => window.open(product.product_url, '_blank')}
            title="View Product"
          >
            <ExternalLink size={16} />
            <span>View</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        {/* Brand Badge */}
        {product.brand && (
          <div 
            className="brand-badge"
            style={{ backgroundColor: getBrandColor(product.brand) }}
          >
            {product.brand}
          </div>
        )}

        {/* Product Name */}
        <h3 className="product-name" title={product.product_name}>
          {product.product_name}
        </h3>

        {/* Category */}
        {product.category && (
          <p className="product-category">{product.category}</p>
        )}

        {/* Price */}
        <div className="product-price">
          <span className="price-amount">{formatPrice(product.price)}</span>
          {product.price && (
            <span className="price-currency">BDT</span>
          )}
        </div>

        {/* Rating (if available) */}
        {product.rating && (
          <div className="product-rating">
            <Star size={14} fill="#f39c12" />
            <span>{product.rating}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="product-actions">
          <button 
            className="btn btn-primary view-product-btn"
            onClick={() => window.open(product.product_url, '_blank')}
          >
            <ExternalLink size={16} />
            View Product
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {!imageLoaded && !imageError && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default ProductCard; 