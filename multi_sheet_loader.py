# Multi-sheet loader integrated with your search engine for live deployment
# Skips irrelevant sheets, cleans brand names, merges with brands_df for seamless LinkKora deployment

import pandas as pd
from typing import List, Dict

def load_brands(brands_excel_path: str) -> pd.DataFrame:
    """Load the NNRZ Database with brand details."""
    brands_df = pd.read_excel(brands_excel_path)
    brands_df['brand_clean'] = brands_df['brand'].str.strip().str.lower().str.replace('+', 'plus').str.replace(' ', '')
    return brands_df

def load_products_from_multisheet(products_excel_path: str) -> pd.DataFrame:
    """
    Load all product sheets from the multi-sheet Excel, skipping irrelevant sheets,
    cleaning and tagging with brand names automatically.
    """
    xls = pd.ExcelFile(products_excel_path)
    clean_products_list = []

    skip_sheets = {'brand name', 'brand name 2', 'Sheet7'}

    for sheet in xls.sheet_names:
        if sheet.strip() in skip_sheets:
            continue
        try:
            df = pd.read_excel(products_excel_path, sheet_name=sheet)
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
            print(f"Error loading sheet {sheet}: {e}")

    if clean_products_list:
        products_df = pd.concat(clean_products_list, ignore_index=True)
    else:
        products_df = pd.DataFrame()

    return products_df

def search_products(keyword: str, brands_df: pd.DataFrame, products_df: pd.DataFrame) -> List[Dict]:
    """
    Unified search engine across brands and products.
    """
    keyword_lower = keyword.lower()
    filtered_products = products_df[
        products_df['Product Name'].str.lower().str.contains(keyword_lower, na=False) |
        products_df['Category'].str.lower().str.contains(keyword_lower, na=False)
    ].copy()

    merged_df = pd.merge(
        filtered_products,
        brands_df,
        on='brand_clean',
        how='left'
    )

    results = []
    for _, row in merged_df.iterrows():
       

        result_entry = {
            "product_name": row.get("Product Name", ""),
            "product_url": row.get("Product URL", ""),
            "product_image": row.get("Image URL", ""),
            "price": row.get("Price", ""),
            "category": row.get("Category", ""),
            "brand": row.get("brand", "Unknown"),
            "brand_website": row.get("website link", row.get("social media", "")),
            "brand_description": row.get("description", "")
        }
        results.append(result_entry)

    return results

# Example usage for your LinkKora backend:
# brands_df = load_brands("NNRZ Database.xlsx")
# products_df = load_products_from_multisheet("NNRZ Products.xlsx")
# search_results = search_products("shirt", brands_df, products_df)
# return jsonify(search_results)  # Flask or Next.js API response ready