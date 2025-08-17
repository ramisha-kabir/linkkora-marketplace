import React, { useState, useEffect, useCallback } from 'react';
import { Search, Heart, Home, Menu, X } from 'lucide-react';

const Header = ({ searchQuery, onSearchChange, onSearch, onNavigate, favoritesCount }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchQuery !== searchQuery) {
        onSearchChange(localSearchQuery);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [localSearchQuery, searchQuery, onSearchChange]);

  // Update local query when prop changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const clearSearch = () => {
    setLocalSearchQuery('');
    onSearchChange('');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo and Navigation */}
        <div className="header-left">
          <div className="logo" onClick={() => onNavigate('home')}>
            <span className="logo-text">LinkKora</span>
            <span className="logo-subtitle">Fashion Marketplace</span>
          </div>
          
          <nav className="desktop-nav">
            <button 
              className="nav-button" 
              onClick={() => onNavigate('home')}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            <button 
              className="nav-button favorites-button" 
              onClick={() => onNavigate('favorites')}
            >
              <Heart size={20} />
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className="favorites-badge">{favoritesCount}</span>
              )}
            </button>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className={`search-input-container ${isSearchFocused ? 'focused' : ''}`}>
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search for products, brands, or categories..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onKeyPress={handleKeyPress}
                className="search-input"
              />
              {localSearchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="clear-search-button"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>

        {/* Mobile Menu Button */}
        <div className="header-right">
          <button 
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-nav">
          <button 
            className="mobile-nav-button" 
            onClick={() => {
              onNavigate('home');
              setIsMobileMenuOpen(false);
            }}
          >
            <Home size={20} />
            <span>Home</span>
          </button>
          <button 
            className="mobile-nav-button favorites-button" 
            onClick={() => {
              onNavigate('favorites');
              setIsMobileMenuOpen(false);
            }}
          >
            <Heart size={20} />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="favorites-badge">{favoritesCount}</span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header; 