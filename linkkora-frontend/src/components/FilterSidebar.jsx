import React, { useState, useEffect } from 'react';
import { getUniqueBrands, getUniqueCategories } from '../services/api';

const FilterSidebar = ({ filters, onFilterChange, products }) => {
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setAvailableBrands(getUniqueBrands(products));
      setAvailableCategories(getUniqueCategories(products));
    }
  }, [products]);

  const handlePriceChange = (field, value) => {
    onFilterChange({
      [field]: value
    });
  };

  const handleBrandToggle = (brand) => {
    const currentBrands = filters.selectedBrands || [];
    const updatedBrands = currentBrands.includes(brand)
      ? currentBrands.filter(b => b !== brand)
      : [...currentBrands, brand];
    
    onFilterChange({
      selectedBrands: updatedBrands,
      brand: updatedBrands.length === 1 ? updatedBrands[0] : ''
    });
  };

  const clearFilters = () => {
    onFilterChange({
      brand: '',
      minPrice: '',
      maxPrice: '',
      selectedBrands: []
    });
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h3>Filter</h3>
        <button 
          onClick={clearFilters}
          className="btn btn-secondary btn-sm"
          style={{ marginLeft: 'auto' }}
        >
          Clear All
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="filter-group">
        <h3>Price</h3>
        <div className="price-range">
          <div className="price-range-row">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handlePriceChange('minPrice', e.target.value)}
              className="price-input"
            />
            <span className="price-separator">–</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
              className="price-input"
            />
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      {availableBrands.length > 0 && (
        <div className="filter-group">
          <h3>Designer</h3>
          <div className="filter-options">
            {availableBrands.slice(0, 10).map((brand) => (
              <label key={brand} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.selectedBrands?.includes(brand) || false}
                  onChange={() => handleBrandToggle(brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
            {availableBrands.length > 10 && (
              <button className="btn btn-secondary btn-sm">
                Show More
              </button>
            )}
          </div>
        </div>
      )}

      {/* Category Filter */}
      {availableCategories.length > 0 && (
        <div className="filter-group">
          <h3>Category</h3>
          <div className="filter-options">
            {availableCategories.slice(0, 8).map((category) => (
              <div key={category} className="filter-option">
                <span>{category}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Summary */}
      <div className="filter-summary">
        <small>
          {products.length} item{products.length !== 1 ? 's' : ''}
        </small>
      </div>
    </div>
  );
};

export default FilterSidebar; 