#!/usr/bin/env python3
"""
LinkKora Excel to PostgreSQL Migration Script
This script migrates data from Excel files to PostgreSQL database
"""

import pandas as pd
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv
import sys

# Load environment variables
load_dotenv()

class DatabaseMigrator:
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
            
            print("✅ Connected to PostgreSQL database successfully!")
            
        except Exception as e:
            print(f"❌ Error connecting to database: {e}")
            sys.exit(1)
    
    def create_tables(self):
        """Create database tables from schema"""
        try:
            with open('database_schema.sql', 'r') as file:
                schema = file.read()
            
            cursor = self.connection.cursor()
            cursor.execute(schema)
            self.connection.commit()
            cursor.close()
            
            print("✅ Database tables created successfully!")
            
        except Exception as e:
            print(f"❌ Error creating tables: {e}")
            sys.exit(1)
    
    def migrate_brands(self):
        """Migrate brands data from Excel to PostgreSQL"""
        try:
            print("📊 Loading brands from Excel...")
            
            # Load brands from Excel
            brands_df = pd.read_excel('NNRZ Database.xlsx')
            
            # Clean and prepare data
            brands_df = brands_df.fillna('')
            
            cursor = self.connection.cursor()
            
            # Clear existing brands data
            cursor.execute("DELETE FROM brands")
            
            # Insert brands data
            for _, row in brands_df.iterrows():
                cursor.execute("""
                    INSERT INTO brands (brand, brand_clean, description, website_link, social_media)
                    VALUES (%s, %s, %s, %s, %s)
                """, (
                    row.get('brand', ''),
                    row.get('brand_clean', ''),
                    row.get('description', ''),
                    row.get('website link', ''),
                    row.get('social media', '')
                ))
            
            self.connection.commit()
            cursor.close()
            
            print(f"✅ Migrated {len(brands_df)} brands to PostgreSQL!")
            
        except Exception as e:
            print(f"❌ Error migrating brands: {e}")
            sys.exit(1)
    
    def migrate_products(self):
        """Migrate products data from Excel to PostgreSQL"""
        try:
            print("📊 Loading products from Excel...")
            
            # Load products from Excel
            products_df = pd.read_excel('NNRZ Products.xlsx')
            
            # Clean and prepare data
            products_df = products_df.fillna('')
            
            cursor = self.connection.cursor()
            
            # Clear existing products data
            cursor.execute("DELETE FROM products")
            
            # Insert products data
            for _, row in products_df.iterrows():
                # Extract price and convert to decimal
                price_str = str(row.get('Price', '0')).replace(',', '').replace('Tk', '').strip()
                try:
                    price = float(price_str) if price_str else 0.0
                except:
                    price = 0.0
                
                cursor.execute("""
                    INSERT INTO products (product_name, product_url, category, brand, brand_clean, price, image_url, description)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    row.get('Product Name', ''),
                    row.get('Product URL', ''),
                    row.get('Category', ''),
                    row.get('brand', ''),
                    row.get('brand_clean', ''),
                    price,
                    row.get('Image URL', ''),
                    row.get('Description', '')
                ))
            
            self.connection.commit()
            cursor.close()
            
            print(f"✅ Migrated {len(products_df)} products to PostgreSQL!")
            
        except Exception as e:
            print(f"❌ Error migrating products: {e}")
            sys.exit(1)
    
    def verify_migration(self):
        """Verify that data was migrated correctly"""
        try:
            cursor = self.connection.cursor()
            
            # Check brands count
            cursor.execute("SELECT COUNT(*) FROM brands")
            brands_count = cursor.fetchone()[0]
            
            # Check products count
            cursor.execute("SELECT COUNT(*) FROM products")
            products_count = cursor.fetchone()[0]
            
            cursor.close()
            
            print(f"📊 Migration Verification:")
            print(f"   Brands: {brands_count}")
            print(f"   Products: {products_count}")
            
            if brands_count > 0 and products_count > 0:
                print("✅ Migration completed successfully!")
            else:
                print("❌ Migration may have failed - no data found")
                
        except Exception as e:
            print(f"❌ Error verifying migration: {e}")
    
    def close_connection(self):
        """Close database connection"""
        if self.connection:
            self.connection.close()
            print("🔌 Database connection closed")

def main():
    print("🚀 Starting LinkKora Excel to PostgreSQL Migration")
    print("=" * 50)
    
    migrator = DatabaseMigrator()
    
    try:
        # Create tables
        migrator.create_tables()
        
        # Migrate data
        migrator.migrate_brands()
        migrator.migrate_products()
        
        # Verify migration
        migrator.verify_migration()
        
    finally:
        migrator.close_connection()
    
    print("🎉 Migration completed!")

if __name__ == "__main__":
    main()
