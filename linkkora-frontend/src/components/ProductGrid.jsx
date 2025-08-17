import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProductCard from './ProductCard';
import LoadingSkeleton from './LoadingSkeleton';

const ProductGrid = ({ products, loading, favorites, onToggleFavorite }) => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef();
  const productsPerPage = 12;

  // Update displayed products when products change
  useEffect(() => {
    if (products && products.length > 0) {
      const initialProducts = products.slice(0, productsPerPage);
      setDisplayedProducts(initialProducts);
      setCurrentPage(1);
      setHasMore(products.length > productsPerPage);
    } else {
      setDisplayedProducts([]);
      setCurrentPage(1);
      setHasMore(false);
    }
  }, [products]);

  // Load more products function
  const loadMoreProducts = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = (nextPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const newProducts = products.slice(startIndex, endIndex);
      
      setDisplayedProducts(prev => [...prev, ...newProducts]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < products.length);
      setIsLoadingMore(false);
    }, 500);
  }, [currentPage, products, isLoadingMore, hasMore]);

  // Intersection Observer for infinite scroll
  const lastProductRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreProducts();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMoreProducts]);

  if (loading) {
    return (
      <div className="product-grid-container">
        <div className="product-grid-header">
          <h2>Loading Products...</h2>
        </div>
        <div className="product-grid">
          <LoadingSkeleton count={8} />
        </div>
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
        <button 
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="product-grid-header">
        <h2>All Products</h2>
        <div className="product-stats">
          <p>{displayedProducts.length} of {products.length} products shown</p>
          {hasMore && (
            <button 
              className="load-more-button"
              onClick={loadMoreProducts}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      </div>
      
      <div className="product-grid">
        {displayedProducts.map((product, index) => {
          const isLast = index === displayedProducts.length - 1;
          const isFavorite = favorites.some(fav => fav.product_url === product.product_url);
          
          return (
            <div 
              key={`${product.product_url}-${index}`}
              ref={isLast ? lastProductRef : null}
              className="product-card-wrapper"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <ProductCard 
                product={product}
                isFavorite={isFavorite}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          );
        })}
      </div>

      {/* Loading more indicator */}
      {isLoadingMore && (
        <div className="loading-more">
          <LoadingSkeleton count={4} />
        </div>
      )}

      {/* End of results */}
      {!hasMore && displayedProducts.length > 0 && (
        <div className="end-of-results">
          <p>You've reached the end of the results</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid; 