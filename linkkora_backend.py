# Clean Python function to integrate into your Flask / Next.js backend
# for unified product search across your NNRZ brands and products dataset

import pandas as pd
from typing import List, Dict

from multi_sheet_loader import load_brands, load_products_from_multisheet, search_products
from pprint import pprint

# Load your updated, unified data using your new pipeline
brands_df = load_brands("NNRZ Database.xlsx")
products_df = load_products_from_multisheet("NNRZ Products.xlsx")

# Test search
results = search_products("shirt", brands_df, products_df)
pprint(results[:5])

print(brands_df[['brand', 'brand_clean']].head())
print(products_df[['brand_clean']].drop_duplicates())


def search_products(keyword: str, brands_df: pd.DataFrame, products_df: pd.DataFrame) -> List[Dict]:
    """
    Searches for products matching the keyword in Product Name or Category,
    and returns a list of dictionaries containing relevant fields for display.
    """
    keyword_lower = keyword.lower()

    # Filter products containing the keyword in Product Name or Category
    filtered_products = products_df[products_df['Product Name'].str.lower().str.contains(keyword_lower, na=False) |
                                    products_df['Category'].str.lower().str.contains(keyword_lower, na=False)]

    # If 'brand' column exists in products_df, use it for direct matching.
    # Else, infer brand from product URLs or set to "Unknown" for now.
    if 'brand' in products_df.columns:
        merged_df = pd.merge(filtered_products, brands_df, left_on='brand', right_on='brand', how='left')
    else:
        filtered_products['brand'] = 'Unknown'
        merged_df = pd.merge(filtered_products, brands_df, on='brand', how='left')

    # Construct clean output for frontend display
    results = []
    for _, row in merged_df.iterrows():
        result_entry = {
            "product_name": row.get("Product Name", ""),
            "product_url": row.get("Product URL", ""),
            "category": row.get("Category", ""),
            "brand": row.get("brand", "Unknown"),
            "brand_website": row.get("website link", row.get("social media", "")),
            "brand_description": row.get("description", ""),
        }
        results.append(result_entry)

    return results

# Example usage for your backend:
# brands_df, products_df = load_nnrz_data("NNRZ Database - Clothing.csv", "NNRZ Products - wrclo.csv")
# search_results = search_products("shirt", brands_df, products_df)
# return jsonify(search_results)  # For Flask route
# or send as API response for Next.js frontend consumption.
