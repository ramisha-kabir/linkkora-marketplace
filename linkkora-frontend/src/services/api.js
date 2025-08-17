import axios from 'axios';

// Base URL from environment (Render sets VITE_API_URL)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to log requests
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.params);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Search products using the Flask backend
 * @param {Object} params - Search parameters
 * @param {string} params.q - Search query
 * @param {string} params.brand - Brand filter
 * @param {string} params.category - Category filter
 * @param {string} params.min_price - Minimum price filter
 * @param {string} params.max_price - Maximum price filter
 * @returns {Promise<Array>} Array of products
 */
export const searchProducts = async (params = {}) => {
  try {
    const response = await api.get('/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    // Return empty array on error to prevent UI breaks
    return [];
  }
};

/**
 * Get all products (search with empty query)
 * @returns {Promise<Array>} Array of all products
 */
export const getAllProducts = async () => {
  return searchProducts({ q: '' });
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

export default api; 