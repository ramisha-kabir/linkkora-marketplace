import React from 'react';
import { Search, Heart, User, Home } from 'lucide-react';

const Header = ({ searchQuery, onSearchChange, onSearch, onNavigate, favoritesCount }) => {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <button 
            className="logo" 
            onClick={() => onNavigate('home')}
          >
            LINCCORA
          </button>

          <form onSubmit={handleSearchSubmit} className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search designers, products, collections..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
          </form>

          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => onNavigate('home')}>
              <Home size={16} />
              Home
            </button>
            
            <button className="btn btn-secondary favorites-btn" onClick={() => onNavigate('favorites')}>
              <Heart size={16} />
              Wishlist
              {favoritesCount > 0 && (
                <span className="favorites-count">{favoritesCount}</span>
              )}
            </button>
            
            <button className="btn btn-primary">
              <User size={16} />
              Account
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 