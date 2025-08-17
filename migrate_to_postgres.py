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
            # Execute the full schema in a single call to preserve PL/pgSQL blocks
            cursor.execute(schema)
            self.connection.commit()
            cursor.close()
            
            print("✅ Database tables created/verified successfully!")
            
        except Exception as e:
            print(f"❌ Error creating tables: {e}")
            sys.exit(1)
    
    def migrate_brands(self):
        """Migrate brands data from Excel to PostgreSQL"""
        try:
            print("📊 Loading brands from Excel...")
            
            # Load brands from Excel
            brands_df = pd.read_excel('NNRZ Database.xlsx')
            # Ensure brand_clean exists (match logic used elsewhere)
            if 'brand_clean' not in brands_df.columns:
                brands_df['brand_clean'] = (
                    brands_df['brand']
                    .astype(str)
                    .str.strip()
                    .str.lower()
                    .str.replace('+', 'plus')
                    .str.replace(' ', '')
                )
            
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
            
            # Load products from multi-sheet Excel using the same logic as multi_sheet_loader
            xls = pd.ExcelFile('NNRZ Products.xlsx')
            clean_products_list = []
            
            skip_sheets = {'brand name', 'brand name 2', 'Sheet7'}
            
            for sheet in xls.sheet_names:
                if sheet.strip() in skip_sheets:
                    continue
                try:
                    df = pd.read_excel('NNRZ Products.xlsx', sheet_name=sheet)
                    if df.empty:
                        continue
                    
                    # Standardize column names across all sheets
                    df.rename(columns={
                        'product_name': 'Product Name',
                        'category': 'Category',
                        'product_link': 'Product URL',
                        'product_image': 'Image URL',
                        'product_price': 'Price'
                    }, inplace=True)
                    
                    # Clean brand name from sheet name
                    brand_clean = sheet.strip().lower().replace('+', 'plus').replace(' ', '')
                    df['brand_clean'] = brand_clean
                    
                    clean_products_list.append(df)
                except Exception as e:
                    print(f"Warning: Error loading sheet {sheet}: {e}")
            
            if clean_products_list:
                products_df = pd.concat(clean_products_list, ignore_index=True)
            else:
                products_df = pd.DataFrame()

            # Map display brand names from brands workbook using brand_clean
            try:
                brands_df = pd.read_excel('NNRZ Database.xlsx')
                if 'brand_clean' not in brands_df.columns:
                    brands_df['brand_clean'] = (
                        brands_df['brand']
                        .astype(str)
                        .str.strip()
                        .str.lower()
                        .str.replace('+', 'plus')
                        .str.replace(' ', '')
                    )
                brand_map = dict(zip(brands_df['brand_clean'], brands_df['brand']))
                products_df['brand'] = products_df.get('brand', '')
                products_df['brand'] = products_df['brand_clean'].map(brand_map).fillna('')
            except Exception as e:
                print(f"Warning: could not map brand names from brands Excel: {e}")
                if 'brand' not in products_df.columns:
                    products_df['brand'] = ''

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
