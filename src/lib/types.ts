export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'men' | 'women' | 'unisex';
  size: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  rating: number;
  inStock: boolean;
  featured?: boolean;
  bestseller?: boolean;
  new?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
