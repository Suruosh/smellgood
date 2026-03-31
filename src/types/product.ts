export interface Product {
  id: number;
  sku: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  currency: string;
  sizeMl: number;
  concentration: string;
  scentFamily: string;
  topNotes: string;
  middleNotes: string;
  baseNotes: string;
  images: string[];
  stock: number;
  available: boolean;
  categories: string[];
  tags: string[];
  sourceUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  brand?: string;
  scentFamily?: string;
  concentration?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "price_asc" | "price_desc" | "name_asc" | "newest";
  page?: number;
  limit?: number;
}
