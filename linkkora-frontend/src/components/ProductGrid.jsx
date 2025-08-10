import React from 'react';
import ProductCard from './ProductCard';
import LoadingSkeleton from './LoadingSkeleton';

const ProductGrid = ({ products, loading, favorites, onToggleFavorite }) => {
  if (loading) {
    return (
      <div className="product-grid">
        <LoadingSkeleton count={8} />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          🔍
        </div>
        <h3>No products found</h3>
        <p>Try adjusting your search criteria or filters</p>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="product-grid-header">
        <h2>All Products</h2>
        <p>{products.length} products found</p>
      </div>
      
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard 
            key={`${product.product_url}-${index}`} 
            product={product}
            isFavorite={favorites.some(fav => fav.product_url === product.product_url)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid; 