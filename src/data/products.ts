export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  occasion: string[];
  isEggless: boolean;
  isVegan?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  rating: number;
  reviews: number;
  weights: string[];
  flavors: string[];
  description: string;
  deliveryIn24h?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Alpine Choco Exotic',
    price: 899,
    originalPrice: 1099,
    image: '/AlpineCake.jpg',
    category: 'cakes',
    occasion: ['birthday', 'anniversary'],
    isEggless: true,
    isBestSeller: true,
    rating: 4.8,
    reviews: 234,
    weights: ['500g', '1kg', '1.5kg', '2kg'],
    flavors: ['Chocolate', 'Dark Chocolate'],
    description: 'Indulge in layers of rich chocolate sponge, velvety truffle cream, and a glossy chocolate ganache. Perfect for chocolate lovers.',
    deliveryIn24h: true
  },
  {
    id: '2',
    name: 'Pink Velvet Dream',
    price: 1299,
    image: '/Valentine.jpg',
    category: 'cakes',
    occasion: ['birthday', 'valentine'],
    isEggless: true,
    isBestSeller: true,
    rating: 4.9,
    reviews: 189,
    weights: ['500g', '1kg', '1.5kg'],
    flavors: ['Vanilla', 'Strawberry'],
    description: 'A stunning pink velvet cake with cream cheese frosting, adorned with rose petals and edible pearls.'
  },
  {
    id: '3',
    name: 'Blackforest Veg Pastry',
    price: 749,
    originalPrice: 899,
    image: '/BlackForestPastry.jpg',
    category: 'cakes',
    occasion: ['birthday', 'corporate'],
    isEggless: false,
    isBestSeller: true,
    rating: 4.7,
    reviews: 456,
    weights: ['500g', '1kg', '1.5kg', '2kg'],
    flavors: ['Chocolate Cherry'],
    description: 'Timeless classic with chocolate sponge, whipped cream, cherries, and chocolate shavings.',
    deliveryIn24h: true
  },
  {
    id: '4',
    name: 'Heart-Shaped Love Cake',
    price: 1499,
    image: '/Second.png',
    category: 'cakes',
    occasion: ['valentine', 'anniversary'],
    isEggless: true,
    rating: 4.9,
    reviews: 123,
    weights: ['1kg', '1.5kg'],
    flavors: ['Red Velvet', 'Strawberry'],
    description: 'Express your love with this heart-shaped masterpiece, decorated with roses and romantic touches.'
  },
  {
    id: '5',
    name: 'Butterscotch Crunch',
    price: 699,
    image: '/ButterScotch.jpg',
    category: 'cakes',
    occasion: ['birthday', 'corporate'],
    isEggless: true,
    rating: 4.6,
    reviews: 312,
    weights: ['500g', '1kg', '1.5kg'],
    flavors: ['Butterscotch'],
    description: 'Creamy butterscotch cake topped with caramelized praline and crunchy butterscotch chips.',
    deliveryIn24h: true
  },
  {
    id: '6',
    name: 'Exotic Hazelnut',
    price: 999,
    image: '/HazelnutCake.jpg',
    category: 'cakes',
    occasion: ['birthday', 'summer'],
    isEggless: true,
    isNew: true,
    rating: 4.8,
    reviews: 87,
    weights: ['500g', '1kg', '1.5kg'],
    flavors: ['Mango'],
    description: 'Fresh Alphonso mango cake with layers of mango mousse and real mango chunks.'
  },
  {
    id: '7',
    name: 'Wedding Elegance Tier',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600',
    category: 'cakes',
    occasion: ['wedding'],
    isEggless: true,
    rating: 5.0,
    reviews: 45,
    weights: ['3kg', '5kg', '7kg'],
    flavors: ['Vanilla', 'Chocolate', 'Red Velvet'],
    description: 'Magnificent three-tier wedding cake with fondant flowers and elegant decorations.'
  },
  {
    id: '8',
    name: 'Rainbow Surprise',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600',
    category: 'cakes',
    occasion: ['birthday', 'kids'],
    isEggless: true,
    rating: 4.9,
    reviews: 178,
    weights: ['1kg', '1.5kg', '2kg'],
    flavors: ['Vanilla'],
    description: 'Colorful rainbow layers inside with fluffy vanilla frosting. Kids absolute favorite!'
  },
  {
    id: '9',
    name: 'Chocolate Truffle Pastry',
    price: 85,
    image: '/Chocolicious.jpg',
    category: 'pastries',
    occasion: ['everyday'],
    isEggless: true,
    isBestSeller: true,
    rating: 4.7,
    reviews: 890,
    weights: ['Single'],
    flavors: ['Chocolate'],
    description: 'Rich chocolate pastry with truffle cream and chocolate ganache topping.',
    deliveryIn24h: true
  },
  {
    id: '10',
    name: 'Fresh Fruit Pastry',
    price: 95,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600',
    category: 'pastries',
    occasion: ['everyday'],
    isEggless: true,
    rating: 4.6,
    reviews: 567,
    weights: ['Single'],
    flavors: ['Vanilla'],
    description: 'Light sponge topped with fresh seasonal fruits and whipped cream.',
    deliveryIn24h: true
  },
  {
    id: '11',
    name: 'Belgian Dark Chocolate Box',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600',
    category: 'chocolates',
    occasion: ['valentine', 'anniversary', 'gifting'],
    isEggless: true,
    isBestSeller: true,
    rating: 4.9,
    reviews: 234,
    weights: ['250g', '500g'],
    flavors: ['Dark Chocolate', 'Assorted'],
    description: 'Premium Belgian dark chocolates in an elegant gift box. Perfect for gifting.'
  },
  {
    id: '12',
    name: 'Heart Chocolate Box',
    price: 899,
    image: 'https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?w=600',
    category: 'chocolates',
    occasion: ['valentine'],
    isEggless: true,
    rating: 4.8,
    reviews: 156,
    weights: ['500g'],
    flavors: ['Assorted'],
    description: 'Heart-shaped box filled with assorted premium chocolates. Ultimate romantic gift.'
  },
  {
    id: '13',
    name: 'Artisan Sourdough Bread',
    price: 149,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600',
    category: 'breads',
    occasion: ['everyday'],
    isEggless: true,
    isVegan: true,
    rating: 4.5,
    reviews: 234,
    weights: ['400g'],
    flavors: ['Plain'],
    description: 'Freshly baked artisan sourdough with crispy crust and soft interior.',
    deliveryIn24h: true
  },
  {
    id: '14',
    name: 'Glazed Donuts Box',
    price: 299,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600',
    category: 'donuts',
    occasion: ['everyday', 'party'],
    isEggless: false,
    isBestSeller: true,
    rating: 4.7,
    reviews: 445,
    weights: ['Box of 6'],
    flavors: ['Assorted'],
    description: 'Assorted glazed donuts including chocolate, strawberry, and vanilla.',
    deliveryIn24h: true
  },
  {
    id: '15',
    name: 'Premium Gift Hamper',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600',
    category: 'hampers',
    occasion: ['gifting', 'corporate', 'festival'],
    isEggless: true,
    rating: 4.9,
    reviews: 89,
    weights: ['Hamper'],
    flavors: ['Assorted'],
    description: 'Luxurious gift hamper with chocolates, cookies, dry cakes, and premium treats.'
  },
  {
    id: '16',
    name: 'Chocolate Cupcakes Box',
    price: 399,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600',
    category: 'pastries',
    occasion: ['birthday', 'party'],
    isEggless: true,
    rating: 4.6,
    reviews: 234,
    weights: ['Box of 6'],
    flavors: ['Chocolate'],
    description: 'Delicious chocolate cupcakes with swirled frosting and chocolate chips.',
    deliveryIn24h: true
  },
  {
    id: '17',
    name: 'Valentine Rose Cake',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600',
    category: 'cakes',
    occasion: ['valentine'],
    isEggless: true,
    isNew: true,
    rating: 5.0,
    reviews: 67,
    weights: ['1kg', '1.5kg'],
    flavors: ['Rose', 'Strawberry'],
    description: 'Romantic rose-flavored cake decorated with edible roses and pink buttercream.'
  },
  {
    id: '18',
    name: 'Corporate Logo Cake',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600',
    category: 'cakes',
    occasion: ['corporate'],
    isEggless: true,
    rating: 4.8,
    reviews: 123,
    weights: ['2kg', '3kg', '5kg'],
    flavors: ['Vanilla', 'Chocolate'],
    description: 'Custom cake with your company logo printed on edible paper. Perfect for corporate events.'
  }
];

export const categories = [
  { id: 'cakes', name: 'Cakes', icon: '🎂', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' },
  { id: 'pastries', name: 'Pastries', icon: '🥐', image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400' },
  { id: 'chocolates', name: 'Chocolates', icon: '🍫', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400' },
  { id: 'breads', name: 'Breads', icon: '🍞', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { id: 'donuts', name: 'Donuts', icon: '🍩', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400' },
  { id: 'hampers', name: 'Gift Hampers', icon: '🎁', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400' }
];

export const occasions = [
  { id: 'birthday', name: 'Birthday', icon: '🎉', image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400' },
  { id: 'wedding', name: 'Wedding', icon: '💒', image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400' },
  { id: 'anniversary', name: 'Anniversary', icon: '💕', image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=400' },
  { id: 'valentine', name: 'Valentine', icon: '❤️', image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400' },
  { id: 'corporate', name: 'Corporate', icon: '💼', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400' },
  { id: 'festival', name: 'Festivals', icon: '🪔', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400' }
];
