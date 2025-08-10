import pandas as pd
from pprint import pprint
from linkkora_backend import load_nnrz_data, search_products

# Load your CSVs
brands_df, products_df = load_nnrz_data(
    "NNRZ Database.xlsx",
    "NNRZ Products.xlsx"
)

# Search test: change "shirt" to "pant", "top", etc. to test different queries
results = search_products("shirt", brands_df, products_df)

# Pretty-print first 5 results
pprint(results[:5])
