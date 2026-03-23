'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products, getBrands } from '@/data/products';
import { Product } from '@/lib/types';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name' | 'rating' | 'new' | 'bestseller';

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as 'men' | 'women' | 'unisex' | null;
  const initialSort = searchParams.get('sort') as SortOption | null;

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | 'men' | 'women' | 'unisex'>(
    initialCategory ?? 'all',
  );
  const [sort, setSort] = useState<SortOption>(initialSort ?? 'featured');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const brands = useMemo(() => getBrands(), []);

  const filtered = useMemo(() => {
    let result: Product[] = [...products];

    // Category filter
    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Price filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    // Sort
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name, 'sv'));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'new':
        result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      case 'bestseller':
        result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [category, selectedBrand, priceRange, search, sort]);

  const categoryLabels: Record<string, string> = {
    all: 'Alla',
    women: 'Dam',
    men: 'Herr',
    unisex: 'Unisex',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-light text-stone-900 mb-2">
          {category !== 'all' ? categoryLabels[category] + 'parfymer' : 'Alla Parfymer'}
        </h1>
        <p className="text-stone-500 text-sm">
          {filtered.length} dofter{search && ` för "${search}"`}
        </p>
      </div>

      {/* Search & Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="flex-1 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            placeholder="Sök parfym, märke..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="px-4 py-2.5 border border-stone-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-stone-400"
        >
          <option value="featured">Utvalda</option>
          <option value="price-asc">Pris: Lågt → Högt</option>
          <option value="price-desc">Pris: Högt → Lågt</option>
          <option value="name">Namn A–Ö</option>
          <option value="rating">Betyg</option>
          <option value="new">Nyheter</option>
          <option value="bestseller">Bästsäljare</option>
        </select>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 border border-stone-300 rounded text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
          Filter
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-56 shrink-0`}>
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-stone-900 mb-3 uppercase tracking-wider">
                Kategori
              </h3>
              <div className="space-y-2">
                {(['all', 'women', 'men', 'unisex'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`block w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                      category === cat
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h3 className="text-sm font-medium text-stone-900 mb-3 uppercase tracking-wider">
                Märke
              </h3>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded text-sm bg-white"
              >
                <option value="all">Alla märken</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-sm font-medium text-stone-900 mb-3 uppercase tracking-wider">
                Pris
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'Alla priser', range: [0, 1000] as [number, number] },
                  { label: 'Under 200 kr', range: [0, 199] as [number, number] },
                  { label: '200–299 kr', range: [200, 299] as [number, number] },
                  { label: '300–399 kr', range: [300, 399] as [number, number] },
                  { label: '400–499 kr', range: [400, 499] as [number, number] },
                  { label: 'Över 500 kr', range: [500, 1000] as [number, number] },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setPriceRange(item.range)}
                    className={`block w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                      priceRange[0] === item.range[0] && priceRange[1] === item.range[1]
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setCategory('all');
                setSelectedBrand('all');
                setPriceRange([0, 1000]);
                setSearch('');
                setSort('featured');
              }}
              className="text-xs text-stone-500 hover:text-stone-900 underline"
            >
              Återställ alla filter
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-stone-400 text-lg mb-2">Inga parfymer hittades</p>
              <p className="text-stone-400 text-sm">
                Prova att ändra dina filter eller sökord
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
