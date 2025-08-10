import React from 'react';
import ProductCard from './ProductCard';
import { Heart } from 'lucide-react';

const FavouritesPage = ({ favorites, onToggleFavorite }) => {
  if (favorites.length === 0) {
    return (
      <div className="container">
        <div className="favorites-page">
          <div className="page-header">
            <h1>
              <Heart size={24} />
              Wishlist
            </h1>
            <p>Your curated selection</p>
          </div>
          
          <div className="empty-state">
            <div className="empty-icon" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              ♡
            </div>
            <h3>Your wishlist is empty</h3>
            <p>Start exploring and save items you love for later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="favorites-page">
        <div className="page-header">
          <h1>
            <Heart size={24} />
            Wishlist
          </h1>
          <p>{favorites.length} saved item{favorites.length !== 1 ? 's' : ''}</p>
        </div>
        
        <div className="product-grid">
          {favorites.map((product, index) => (
            <ProductCard 
              key={`${product.product_url}-${index}`} 
              product={product}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage; 