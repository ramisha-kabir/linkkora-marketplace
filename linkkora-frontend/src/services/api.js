// API configuration for LinkKora backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

export const api = {
  // Search products with optional filters
  searchProducts: async (query = '', filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (query) params.append('q', query);
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.category) params.append('category', filters.category);
      if (filters.min_price) params.append('min_price', filters.min_price);
      if (filters.max_price) params.append('max_price', filters.max_price);

      const response = await fetch(`${API_BASE_URL}/search?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Get all products (for initial load)
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/search`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching all products:', error);
      return [];
    }
  }
};

/**
 * Get unique brands from products
 * @param {Array} products - Array of products
 * @returns {Array} Array of unique brands
 */
export const getUniqueBrands = (products) => {
  const brands = products.map(product => product.brand).filter(Boolean);
  return [...new Set(brands)].sort();
};

/**
 * Get unique categories from products
 * @param {Array} products - Array of products
 * @returns {Array} Array of unique categories
 */
export const getUniqueCategories = (products) => {
  const categories = products.map(product => product.category).filter(Boolean);
  return [...new Set(categories)].sort();
};

/**
 * Format price string for display
 * @param {string} price - Price string
 * @returns {string} Formatted price
 */
export const formatPrice = (price) => {
  if (!price) return '';
  
  // Handle different price formats
  if (typeof price === 'string') {
    // Remove any existing currency symbols and clean
    const cleanPrice = price.replace(/[^\d.,]/g, '');
    if (cleanPrice) {
      return `৳${cleanPrice}`;
    }
  }
  
  return price;
};

/**
 * Extract numeric value from price string
 * @param {string} price - Price string
 * @returns {number} Numeric price value
 */
export const getPriceValue = (price) => {
  if (!price) return 0;
  
  const cleanPrice = price.replace(/[^\d.,]/g, '');
  const numericValue = parseFloat(cleanPrice.replace(',', ''));
  
  return isNaN(numericValue) ? 0 : numericValue;
};

/**
 * Filter products by price range
 * @param {Array} products - Array of products
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {Array} Filtered products
 */
export const filterProductsByPrice = (products, minPrice, maxPrice) => {
  return products.filter(product => {
    const price = getPriceValue(product.price);
    if (minPrice && price < minPrice) return false;
    if (maxPrice && price > maxPrice) return false;
    return true;
  });
}; 