# Flask API for LinkKora: serves product search results using your existing engine

from flask import Flask, request, jsonify
from flask_cors import CORS
from multi_sheet_loader import load_brands, load_products_from_multisheet, search_products
import pandas as pd

app = Flask(__name__)
CORS(app)



# Load brand and product data once at startup
brands_df = load_brands("NNRZ Database.xlsx")
products_df = load_products_from_multisheet("NNRZ Products.xlsx")

@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("q", "").lower()
    brand_filter = request.args.get("brand", "").lower()
    category_filter = request.args.get("category", "").lower()
    min_price = request.args.get("min_price")
    max_price = request.args.get("max_price")

    results = search_products(query, brands_df, products_df)

    # Convert to DataFrame for easier filtering
    df = pd.DataFrame(results)

    if brand_filter:
        df = df[df['brand'].str.lower() == brand_filter]

    if category_filter:
        df = df[df['category'].str.lower() == category_filter]

    if min_price:
        try:
            min_price_val = float(min_price.replace(",", "").replace("Tk", "").strip())
            df = df[df['price'].str.replace(",", "").replace("Tk", "", regex=True).astype(float) >= min_price_val]
        except:
            pass

    if max_price:
        try:
            max_price_val = float(max_price.replace(",", "").replace("Tk", "").strip())
            df = df[df['price'].str.replace(",", "").replace("Tk", "", regex=True).astype(float) <= max_price_val]
        except:
            pass

    # Replace NaN with empty strings before converting to JSON
    df = df.fillna("")

    return jsonify(df.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5050)
