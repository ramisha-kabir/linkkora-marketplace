# Flask API for LinkKora: serves product search results using PostgreSQL database

from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DatabaseManager:
    def __init__(self):
        self.connection = None
        self.connect_to_database()
    
    def connect_to_database(self):
        """Connect to PostgreSQL database"""
        try:
            # Get database connection details from environment variables
            db_url = os.getenv('DATABASE_URL')
            
            if db_url:
                # For Render/Heroku deployment
                self.connection = psycopg2.connect(db_url)
            else:
                # For local development
                self.connection = psycopg2.connect(
                    host=os.getenv('DB_HOST', 'localhost'),
                    database=os.getenv('DB_NAME', 'linkkora'),
                    user=os.getenv('DB_USER', 'postgres'),
                    password=os.getenv('DB_PASSWORD', ''),
                    port=os.getenv('DB_PORT', '5432')
                )
            
            logger.info("Connected to PostgreSQL database successfully!")
            
        except Exception as e:
            logger.error(f"Error connecting to database: {e}")
            raise
    
    def get_connection(self):
        """Get database connection"""
        if not self.connection or self.connection.closed:
            self.connect_to_database()
        return self.connection

# Initialize database manager
db_manager = DatabaseManager()

def search_products_postgres(query="", brand_filter="", category_filter="", min_price=None, max_price=None):
    """
    Search products in PostgreSQL database with filters
    """
    try:
        conn = db_manager.get_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        # Build the SQL query
        sql = """
            SELECT 
                p.product_name,
                p.product_url,
                p.category,
                p.brand,
                p.price,
                p.image_url,
                p.description,
                b.website_link as brand_website,
                b.description as brand_description
            FROM products p
            LEFT JOIN brands b ON p.brand = b.brand
            WHERE 1=1
        """
        
        params = []
        
        # Add search query filter
        if query:
            sql += " AND (LOWER(p.product_name) LIKE LOWER(%s) OR LOWER(p.category) LIKE LOWER(%s))"
            search_term = f"%{query}%"
            params.extend([search_term, search_term])
        
        # Add brand filter
        if brand_filter:
            sql += " AND LOWER(p.brand) = LOWER(%s)"
            params.append(brand_filter)
        
        # Add category filter
        if category_filter:
            sql += " AND LOWER(p.category) = LOWER(%s)"
            params.append(category_filter)
        
        # Add price filters
        if min_price is not None:
            sql += " AND p.price >= %s"
            params.append(float(min_price))
        
        if max_price is not None:
            sql += " AND p.price <= %s"
            params.append(float(max_price))
        
        # Add ordering
        sql += " ORDER BY p.product_name"
        
        # Execute query
        cursor.execute(sql, params)
        results = cursor.fetchall()
        
        # Convert to list of dictionaries
        products = []
        for row in results:
            product = {
                "product_name": row['product_name'] or "",
                "product_url": row['product_url'] or "",
                "category": row['category'] or "",
                "brand": row['brand'] or "",
                "price": str(row['price']) if row['price'] else "",
                "image_url": row['image_url'] or "",
                "description": row['description'] or "",
                "brand_website": row['brand_website'] or "",
                "brand_description": row['brand_description'] or ""
            }
            products.append(product)
        
        cursor.close()
        return products
        
    except Exception as e:
        logger.error(f"Error searching products: {e}")
        return []

def get_all_brands():
    """Get all unique brands from the database"""
    try:
        conn = db_manager.get_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT DISTINCT brand FROM brands ORDER BY brand")
        brands = [row[0] for row in cursor.fetchall()]
        
        cursor.close()
        return brands
        
    except Exception as e:
        logger.error(f"Error getting brands: {e}")
        return []

def get_all_categories():
    """Get all unique categories from the database"""
    try:
        conn = db_manager.get_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT DISTINCT category FROM products WHERE category IS NOT NULL AND category != '' ORDER BY category")
        categories = [row[0] for row in cursor.fetchall()]
        
        cursor.close()
        return categories
        
    except Exception as e:
        logger.error(f"Error getting categories: {e}")
        return []

@app.route("/search", methods=["GET"])
def search():
    """Search products endpoint"""
    try:
        query = request.args.get("q", "").lower()
        brand_filter = request.args.get("brand", "").lower()
        category_filter = request.args.get("category", "").lower()
        min_price = request.args.get("min_price")
        max_price = request.args.get("max_price")
        
        # Convert price strings to numbers
        min_price_val = float(min_price) if min_price else None
        max_price_val = float(max_price) if max_price else None
        
        results = search_products_postgres(
            query=query,
            brand_filter=brand_filter,
            category_filter=category_filter,
            min_price=min_price_val,
            max_price=max_price_val
        )
        
        return jsonify(results)
        
    except Exception as e:
        logger.error(f"Error in search endpoint: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/brands", methods=["GET"])
def get_brands():
    """Get all brands endpoint"""
    try:
        brands = get_all_brands()
        return jsonify(brands)
    except Exception as e:
        logger.error(f"Error in brands endpoint: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/categories", methods=["GET"])
def get_categories():
    """Get all categories endpoint"""
    try:
        categories = get_all_categories()
        return jsonify(categories)
    except Exception as e:
        logger.error(f"Error in categories endpoint: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    try:
        conn = db_manager.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        cursor.fetchone()
        cursor.close()
        
        return jsonify({
            "status": "healthy",
            "database": "connected",
            "message": "LinkKora API is running"
        })
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return jsonify({
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5050))
    app.run(debug=True, host="0.0.0.0", port=port)
