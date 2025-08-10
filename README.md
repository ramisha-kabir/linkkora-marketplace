# LinkKora - Beautiful Marketplace

A modern, full-stack marketplace application with a Flask backend and React frontend, featuring an elegant cream and navy blue theme.

## 🌟 What is LinkKora?

LinkKora is a sophisticated marketplace for fashion products that provides a seamless shopping experience. It features real-time search, advanced filtering, a favorites system, and a beautiful responsive design.

## 🚀 Quick Start (10-Minute Setup)

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.7 or higher) - [Download here](https://python.org/)
- **npm** (comes with Node.js)

### Step 1: Set Up the Backend
```bash
# Install Python dependencies
pip install flask flask-cors pandas openpyxl

# Start the Flask backend
python linkkora_backend.py
```
The backend will be available at `http://localhost:5050`

### Step 2: Set Up the Frontend
```bash
# Navigate to frontend directory
cd linkkora-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
The frontend will be available at `http://localhost:3000` (or next available port)

### Step 3: Verify Setup
- **Backend Test**: Visit `http://localhost:5050/search?q=shirt` (should return JSON data)
- **Frontend**: Visit `http://localhost:3000` (should display the marketplace)

## 🎯 Key Features

### 🛍️ **Marketplace Functions**
- **Product Browsing**: Clean grid layout with all products
- **Real-time Search**: Instant search across product names and categories
- **Advanced Filtering**: Filter by multiple brands and price range
- **Favorites System**: Save products with persistent storage
- **External Links**: Direct "View Product" buttons to product pages

### 🎨 **Design & Experience**
- **Elegant Theme**: Cream backgrounds with super dark navy accents
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Modern UI**: Clean interface with smooth animations
- **Loading States**: Beautiful skeleton loading animations
- **Intuitive Navigation**: Simple home/favorites structure

### ⚡ **Technical Features**
- **Full-stack Application**: Flask backend + React frontend
- **Excel Data Integration**: Products and brands loaded from Excel files
- **CORS Support**: Proper cross-origin request handling
- **Error Handling**: Graceful error states and fallbacks
- **Performance Optimized**: Fast loading and smooth interactions

## 🛠️ Technology Stack

### Backend (Flask)
- **Flask**: Web framework
- **Flask-CORS**: Cross-origin resource sharing
- **Pandas**: Data manipulation
- **OpenPyXL**: Excel file processing

### Frontend (React)
- **React 18**: Modern frontend framework
- **Vite**: Fast build tool and development server
- **Axios**: HTTP client for API requests
- **Lucide React**: Icon library
- **CSS3**: Modern styling with CSS variables

## 📁 Project Structure

```
linkorra-main/
├── Backend Files
│   ├── linkkora_backend.py       # Main Flask server
│   ├── multi_sheet_loader.py     # Excel data loading utilities
│   ├── NNRZ Database.xlsx        # Brand database
│   └── NNRZ Products.xlsx        # Product database
├── Frontend Application
│   └── linkkora-frontend/
│       ├── src/
│       │   ├── components/       # React components
│       │   │   ├── Header.jsx           # Navigation and search
│       │   │   ├── FilterSidebar.jsx    # Product filtering
│       │   │   ├── ProductGrid.jsx      # Main product display
│       │   │   ├── ProductCard.jsx      # Individual product cards
│       │   │   ├── FavouritesPage.jsx   # Favorites page
│       │   │   └── LoadingSkeleton.jsx  # Loading states
│       │   ├── services/
│       │   │   └── api.js               # API integration
│       │   ├── App.jsx                  # Main app component
│       │   └── index.css                # Global styles
│       ├── package.json                 # Dependencies
│       └── vite.config.js               # Vite configuration
└── Documentation
    └── README.md                        # This file
```

## 🎮 Usage

### Basic Navigation
1. **Browse Products**: View all products in the main grid
2. **Search**: Use the search bar to find specific products
3. **Filter**: Use the sidebar to filter by brand or price range
4. **Favorites**: Click the heart icon to save products
5. **View Products**: Click "View Product" to open external links

### Filtering Features
- **Brand Selection**: Select multiple brands to filter products
- **Price Range**: Set minimum and maximum price limits
- **Clear Filters**: Reset all filters with the "Clear All" button
- **Real-time Updates**: Filters apply instantly as you make selections

### Pages
- **Home**: Main marketplace with all products and filters
- **Favorites**: View all your saved products

## 🔧 Development

### Available Scripts (Frontend)
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### API Endpoints
- `GET /search` - Search products with optional filters
- Query parameters: `q` (search), `brand`, `min_price`, `max_price`

### Customization
- **Styling**: Edit `src/index.css` for theme customization
- **API Config**: Update `src/services/api.js` for backend changes
- **Components**: Modify individual components for feature changes

## 🌈 Color Scheme
- **Primary**: Super Dark Navy (#0f172a)
- **Secondary**: Slate (#1e293b)
- **Background**: Cream (#fefbf3)
- **Cards**: Light Cream (#faf7f0)
- **Accent**: Amber (#f59e0b)

## 📊 Data Sources
- **NNRZ Database.xlsx**: Brand information and websites
- **NNRZ Products.xlsx**: Complete product catalog with images and pricing

## 🚀 Production Deployment

### Frontend Build
```bash
cd linkkora-frontend
npm run build
npm run preview
```

### Backend Configuration
Ensure your production environment has:
- Python 3.7+ with required packages
- Excel files in the correct location
- Proper CORS configuration for your domain

## 🎉 Features in Detail

### Smart Search
- Searches product names, categories, and brands
- Real-time results as you type
- Handles multiple search terms

### Advanced Filtering
- **Multi-brand Selection**: Choose multiple brands simultaneously
- **Price Range**: Set both minimum and maximum prices
- **Client-side Optimization**: Fast filtering with smart API calls
- **Filter Persistence**: Maintains filters across page interactions

### Favorites System
- **Persistent Storage**: Saves favorites in browser localStorage
- **Visual Feedback**: Heart icons show favorite status
- **Dedicated Page**: View all favorites in one place
- **Easy Management**: Add/remove with single click

## 📱 Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablets
- **Desktop Enhanced**: Rich experience on larger screens
- **Touch Friendly**: Large touch targets for mobile users

## 🔒 Error Handling
- **Graceful Degradation**: App works even with network issues
- **Image Fallbacks**: Handles missing product images
- **API Error Recovery**: Continues working if backend is temporarily unavailable
- **User Feedback**: Clear messages for loading and error states

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License
This project is licensed under the MIT License.

---

**🌟 Ready to start? Run the Quick Start commands above and you'll have LinkKora running in under 10 minutes!** 