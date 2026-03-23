'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice, getDiscountPercent } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative bg-stone-50 rounded-lg overflow-hidden aspect-[4/5] mb-3">
        {/* Product image placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 group-hover:from-stone-200 group-hover:to-stone-300 transition-all duration-500">
          <div className="text-center">
            <div className="w-16 h-24 mx-auto mb-2 bg-gradient-to-b from-stone-300 to-stone-400 rounded-sm opacity-60 group-hover:opacity-80 transition-opacity" />
            <span className="text-xs text-stone-400 tracking-wider uppercase">
              {product.size}
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.new && (
            <span className="bg-stone-900 text-white text-[10px] tracking-wider uppercase px-2 py-1 rounded">
              Nyhet
            </span>
          )}
          {product.bestseller && !product.new && (
            <span className="bg-amber-600 text-white text-[10px] tracking-wider uppercase px-2 py-1 rounded">
              Bästsäljare
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-600 text-white text-[10px] tracking-wider uppercase px-2 py-1 rounded">
              -{getDiscountPercent(product.price, product.originalPrice)}%
            </span>
          )}
        </div>

        {/* Quick add button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`w-full py-2.5 text-xs tracking-wider uppercase rounded transition-colors ${
              added
                ? 'bg-green-600 text-white'
                : product.inStock
                  ? 'bg-stone-900 text-white hover:bg-stone-800'
                  : 'bg-stone-400 text-stone-200 cursor-not-allowed'
            }`}
          >
            {added ? '✓ Tillagd' : product.inStock ? 'Lägg i varukorg' : 'Slutsåld'}
          </button>
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
            <span className="bg-white/90 text-stone-500 text-xs tracking-wider uppercase px-3 py-1 rounded">
              Slutsåld
            </span>
          </div>
        )}
      </div>

      <div className="px-1">
        <p className="text-xs text-stone-400 tracking-wider uppercase mb-0.5">
          {product.brand}
        </p>
        <h3 className="text-sm font-medium text-stone-900 mb-1 group-hover:text-stone-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-stone-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-stone-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-3 h-3 ${
                  star <= Math.round(product.rating)
                    ? 'text-amber-400'
                    : 'text-stone-200'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-stone-400">{product.rating}</span>
        </div>
      </div>
    </Link>
  );
}
