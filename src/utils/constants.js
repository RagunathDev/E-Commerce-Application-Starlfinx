// /src/utils/constants.js
export const API_BASE_URL = 'https://api.starlfinx.dev';
export const TAX_RATE = 0.18;

export const PRODUCTS = [
  {
    id: 'p1',
    name: 'Luna Leather Tote',
    price: 2499,
    category: 'Bags',
    description: 'Premium vegan leather tote with spacious interior, padded straps, and a polished finish for everyday city styling.',
    imageUrl: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
    stock: 16
  },
  {
    id: 'p2',
    name: 'Nova Running Shoes',
    price: 3999,
    category: 'Footwear',
    description: 'Lightweight running shoes engineered for comfort, grip, and responsive cushioning in every stride.',
    imageUrl: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    stock: 24
  },
  {
    id: 'p3',
    name: 'Orion Denim Jacket',
    price: 3299,
    category: 'Apparel',
    description: 'Classic denim jacket with tailored fit, soft inner lining, and modern hardware for a timeless wardrobe staple.',
    imageUrl: 'https://images.pexels.com/photos/1036620/pexels-photo-1036620.jpeg',
    stock: 12
  },
  {
    id: 'p4',
    name: 'Eclipse Wireless Earbuds',
    price: 4499,
    category: 'Electronics',
    description: 'True wireless earbuds with active noise cancellation, 24-hour battery life, and premium sound tuning.',
    imageUrl: 'https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg',
    stock: 34
  },
  {
    id: 'p5',
    name: 'Astra Smartwatch',
    price: 5299,
    category: 'Electronics',
    description: 'Fitness smartwatch with heart rate monitoring, sleep tracking, and water resistance for an active lifestyle.',
    imageUrl: 'https://images.pexels.com/photos/277244/pexels-photo-277244.jpeg',
    stock: 18
  },
  {
    id: 'p6',
    name: 'Celeste Silk Scarf',
    price: 1299,
    category: 'Accessories',
    description: 'Soft silk scarf with elegant print and versatile styling for both formal and casual ensembles.',
    imageUrl: 'https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg',
    stock: 40
  },
  {
    id: 'p7',
    name: 'Solace Sleep Mask',
    price: 799,
    category: 'Wellness',
    description: 'Contour sleep mask with memory foam support and blackout fabric designed for restful travel and nightly comfort.',
    imageUrl: 'https://images.pexels.com/photos/4039406/pexels-photo-4039406.jpeg',
    stock: 60
  },
  {
    id: 'p8',
    name: 'Verve Yoga Mat',
    price: 1899,
    category: 'Wellness',
    description: 'Eco-friendly yoga mat with anti-slip texture, cushioning support, and durable surface for home and studio practice.',
    imageUrl: 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg',
    stock: 22
  }
];

export const COUPON_CODES = [
  {
    code: 'SAVE10',
    discountType: 'percent',
    value: 10,
    minCartValue: 500,
    expiry: '2025-12-31'
  },
  {
    code: 'FLAT100',
    discountType: 'flat',
    value: 100,
    minCartValue: 1000,
    expiry: '2025-06-30'
  },
  {
    code: 'NEWUSER',
    discountType: 'percent',
    value: 15,
    minCartValue: 200,
    expiry: '2025-12-31'
  }
];
