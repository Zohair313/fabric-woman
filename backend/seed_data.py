import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fabric_backend.settings')
django.setup()

from core.models import Product, Category

def seed():
    # Clear existing
    Product.objects.all().delete()
    Category.objects.all().delete()

    # Create Categories
    cotton = Category.objects.create(name='Cotton', slug='cotton')
    linen = Category.objects.create(name='Linen', slug='linen')
    canvas = Category.objects.create(name='Canvas', slug='canvas')

    products = [
        {
            'name': 'Raw Khaddar',
            'tag': 'Handspun',
            'weight': '180 GSM',
            'category': cotton,
            'color': '#E2D9CC',
            'stock': '1,200m',
            'description': 'Traditional hand-woven cotton khaddar, perfect for autumn collections.',
            'is_upcoming': False
        },
        {
            'name': 'Linen Greige',
            'tag': 'Natural',
            'weight': '140 GSM',
            'category': linen,
            'color': '#D4C4B0',
            'stock': '850m',
            'description': 'Premium linen blend with a soft, breathable texture.',
            'is_upcoming': False
        },
        {
            'name': 'Heavy Duck Canvas',
            'tag': 'Structured',
            'weight': '320 GSM',
            'category': canvas,
            'color': '#9C8878',
            'stock': '3,500m',
            'description': 'Tough, durable canvas suitable for bags and upholstery.',
            'is_upcoming': False
        },
        {
            'name': 'Fine Muslin',
            'tag': 'Sheer',
            'weight': '80 GSM',
            'category': cotton,
            'color': '#F4EFE8',
            'stock': '2,100m',
            'description': 'Delicate, lightweight cotton muslin for summer layering.',
            'is_upcoming': False
        },
        {
            'name': 'Slub Cotton',
            'tag': 'Textured',
            'weight': '160 GSM',
            'category': cotton,
            'color': '#C8B9A8',
            'stock': '1,500m',
            'description': 'Cotton with a visible slub texture for a rustic look.',
            'is_upcoming': False
        },
        {
            'name': 'Twill Base',
            'tag': 'Woven',
            'weight': '220 GSM',
            'category': cotton,
            'color': '#B5A898',
            'stock': '900m',
            'description': 'Classic diagonal weave for durable workwear and trousers.',
            'is_upcoming': False
        },
        # Upcoming products
        {
            'name': 'Organic Hemp',
            'tag': 'Sustainable',
            'weight': '200 GSM',
            'category': linen,
            'color': '#A89F91',
            'stock': '0m',
            'description': 'Our upcoming sustainable hemp collection, arrival next month.',
            'is_upcoming': True
        },
        {
            'name': 'Recycled Cotton',
            'tag': 'Eco-Friendly',
            'weight': '150 GSM',
            'category': cotton,
            'color': '#BDB2A6',
            'stock': '0m',
            'description': 'Greige fabric made from 100% recycled pre-consumer cotton waste.',
            'is_upcoming': True
        }
    ]

    for p_data in products:
        Product.objects.create(**p_data)

    print(f"Successfully seeded {len(products)} products across 3 categories.")

if __name__ == '__main__':
    seed()
