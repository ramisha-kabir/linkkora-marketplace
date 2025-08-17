import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { formatPrice } from '../services/api';

const ProductCard = ({ product, isFavorite, onToggleFavorite }) => {
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(product);
  };

  const handleViewProduct = (e) => {
    e.stopPropagation();
    if (product.product_url) {
      window.open(product.product_url, '_blank');
    }
  };

  const handleCardClick = () => {
    if (product.product_url) {
      window.open(product.product_url, '_blank');
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-container">
        {product.product_image ? (
          <>
            <img 
              src={product.product_image} 
              alt={product.product_name}
              className="product-image"
              onError={handleImageError}
            />
            <div className="product-image-placeholder" style={{ display: 'none' }}>
              <span>No Image</span>
            </div>
          </>
        ) : (
          <div className="product-image-placeholder">
            <span>No Image Available</span>
          </div>
        )}
        
        <button 
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart 
            size={18} 
            fill={isFavorite ? '#000' : 'none'} 
            stroke={isFavorite ? '#000' : '#666'} 
          />
        </button>
      </div>

      <div className="product-info">
        <div className="product-brand">
          {product.brand || 'Unknown Brand'}
        </div>
        
        <h3 className="product-name" title={product.product_name}>
          {product.product_name || 'Unnamed Product'}
        </h3>

        {product.category && (
          <div className="product-category">
            {product.category}
          </div>
        )}

        <div className="product-price">
          {formatPrice(product.price) || 'Price not available'}
        </div>

        <div className="product-actions">
          <button 
            className="btn btn-sm view-product-btn"
            onClick={handleViewProduct}
            disabled={!product.product_url}
          >
            <ExternalLink size={14} />
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 