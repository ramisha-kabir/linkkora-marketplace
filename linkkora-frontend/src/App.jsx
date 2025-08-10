import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import FavouritesPage from './components/FavouritesPage';
import LandingPage from './components/LandingPage';
import { api } from './services/api';

// Brand Slideshow Hero Section Component
const BrandSlideshow = ({ products }) => {
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  
  // Get unique brands from products
  const getBrands = () => {
    if (!products || products.length === 0) return [];
    
    const uniqueBrands = [...new Set(products.map(p => p.brand).filter(Boolean))];
    return uniqueBrands.slice(0, 12); // Limit to 12 brands for slideshow
  };

  const brands = getBrands();

  // Curated background images for Bangladeshi fashion with warm luxury theme
  const backgroundImages = [
    'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Traditional textiles
    'https://images.unsplash.com/photo-1594736797933-d0ed62cd4d18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Warm fashion portrait
    'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Elegant fabrics
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Cultural fashion
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Contemporary style
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Luxury setting
    'https://images.unsplash.com/photo-1506629905996-3d9c94a26b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Golden hour fashion
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Artistic fashion
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Classic elegance
    'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Warm tones
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Cultural heritage
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'  // Modern tradition
  ];

  // Auto-rotate brands every 4 seconds
  useEffect(() => {
    if (brands.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentBrandIndex(prev => (prev + 1) % brands.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [brands.length]);

  if (brands.length === 0) {
    return (
      <div className="brand-slideshow">
        <div className="slideshow-background" 
             style={{ backgroundImage: `url(${backgroundImages[0]})` }} />
        <div className="slideshow-overlay" />
        <div className="container">
          <div className="slideshow-content">
            <h1 className="slideshow-title">Curated Fashion Collections</h1>
            <p className="slideshow-subtitle">Discover luxury from the world's finest designers</p>
          </div>
        </div>
      </div>
    );
  }

  const currentBrand = brands[currentBrandIndex];
  const currentBackground = backgroundImages[currentBrandIndex % backgroundImages.length];

  return (
    <div className="brand-slideshow">
      <div className="slideshow-background" 
           style={{ backgroundImage: `url(${currentBackground})` }} />
      <div className="slideshow-overlay" />
      
      <div className="container">
        <div className="slideshow-content">
          <div className="brand-showcase">
            <p className="showcase-label">Featured Designer</p>
            <h1 className="brand-name">{currentBrand}</h1>
            <p className="brand-description">Explore the exclusive collection</p>
          </div>
          
          <div className="slideshow-indicators">
            {brands.map((_, index) => (
              <button
                key={index}
                className={`slide-indicator ${index === currentBrandIndex ? 'active' : ''}`}
                onClick={() => setCurrentBrandIndex(index)}
                aria-label={`View ${brands[index]}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  // Always show landing page for the full experience (like Dior.com)
  const [showLanding, setShowLanding] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState('home');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('linccora-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    selectedBrands: []
  });

  // Load initial products
  useEffect(() => {
    loadProducts();
  }, []);

  // Handle search and filter changes
  useEffect(() => {
    // Always call handleSearch when filters change, even if empty (to load all products)
    handleSearch();
  }, [searchQuery, filters]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      // For API call, don't send brand filter if multiple brands are selected
      // We'll filter client-side for multiple brands
      const apiFilters = {
        q: searchQuery,
        min_price: filters.minPrice,
        max_price: filters.maxPrice
      };
      
      // Only send single brand to API if no multiple brands selected
      if (!filters.selectedBrands || filters.selectedBrands.length <= 1) {
        apiFilters.brand = filters.brand;
      }
      
      const data = await api.searchProducts(searchQuery, apiFilters);
      
      // Client-side filtering for multiple brands
      let filteredData = data;
      if (filters.selectedBrands && filters.selectedBrands.length > 0) {
        filteredData = data.filter(product => 
          filters.selectedBrands.includes(product.brand)
        );
      }
      
      setProducts(filteredData);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleToggleFavorite = (product) => {
    const isAlreadyFavorite = favorites.some(fav => fav.product_url === product.product_url);
    
    let newFavorites;
    if (isAlreadyFavorite) {
      newFavorites = favorites.filter(fav => fav.product_url !== product.product_url);
    } else {
      newFavorites = [...favorites, product];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('linccora-favorites', JSON.stringify(newFavorites));
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleEnterShop = () => {
    setShowLanding(false);
  };

  // Show landing page first
  if (showLanding) {
    return <LandingPage onEnterShop={handleEnterShop} />;
  }

  // Main app after landing
  return (
    <div className="App">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
      />
      
      {currentPage === 'home' ? (
        <>
          {!searchQuery && !filters.selectedBrands?.length && !filters.minPrice && !filters.maxPrice && (
            <BrandSlideshow products={products} />
          )}
          
          <div className="container">
            <div className="main-content">
              <FilterSidebar 
                filters={filters}
                onFilterChange={handleFilterChange}
                products={products}
              />
              
              <ProductGrid 
                products={products}
                loading={loading}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          </div>
        </>
      ) : currentPage === 'favorites' ? (
        <FavouritesPage 
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : null}
    </div>
  );
}

export default App; 