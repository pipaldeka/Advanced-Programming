# List of dictionaries for products
products = [
    {'name': 'Laptop', 'stock': 15},
    {'name': 'Mouse', 'stock': 8},
    {'name': 'Keyboard', 'stock': 5},
    {'name': 'Monitor', 'stock': 12},
    {'name': 'Headphones', 'stock': 3}
]

print("Products with stock < 10:")
low_stock = False
for product in products:
    if product['stock'] < 10:
        print(f"- {product['name']}: {product['stock']}")
        low_stock = True

if not low_stock:
    print("No products with low stock.")

