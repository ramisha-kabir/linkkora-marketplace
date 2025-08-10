# LinkKora Frontend

This is the React frontend for the LinkKora marketplace application.

## 📖 Documentation

For complete setup instructions, features, and documentation, please see the main project README:

**👉 [../README.md](../README.md)**

## 🚀 Quick Start

From the project root:

```bash
cd linkkora-frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000` (or next available port).

Make sure the Flask backend is running on `http://localhost:5050` first.

## 📁 Frontend Structure

```
src/
├── components/          # React components
│   ├── Header.jsx           # Navigation and search
│   ├── FilterSidebar.jsx    # Product filtering
│   ├── ProductGrid.jsx      # Main product display
│   ├── ProductCard.jsx      # Individual product cards
│   ├── FavouritesPage.jsx   # Favorites page
│   └── LoadingSkeleton.jsx  # Loading states
├── services/
│   └── api.js              # API integration
├── App.jsx                 # Main app component
└── index.css               # Global styles
```

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build 