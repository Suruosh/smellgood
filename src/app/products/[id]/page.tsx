'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import { formatPrice, getDiscountPercent } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductById(params.id as string);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-2xl font-light text-stone-900 mb-4">Produkten hittades inte</h1>
        <Link href="/products" className="text-sm text-stone-600 hover:text-stone-900 underline">
          ← Tillbaka till alla parfymer
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Related products (same category, different product)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const categoryLabel = { men: 'Herr', women: 'Dam', unisex: 'Unisex' }[product.category];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-stone-400 mb-8">
        <Link href="/" className="hover:text-stone-900 transition-colors">Hem</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-stone-900 transition-colors">Parfymer</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-stone-900 transition-colors">
          {categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-stone-600">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Product Image */}
        <div className="bg-stone-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-48 mx-auto mb-4 bg-gradient-to-b from-stone-200 to-stone-300 rounded-sm opacity-60" />
            <p className="text-xs text-stone-400 tracking-wider uppercase">{product.size}</p>
            <p className="text-xs text-stone-400 mt-1">{product.brand}</p>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            {product.new && (
              <span className="bg-stone-900 text-white text-[10px] tracking-wider uppercase px-2 py-1 rounded">Nyhet</span>
            )}
            {product.bestseller && (
              <span className="bg-amber-600 text-white text-[10px] tracking-wider uppercase px-2 py-1 rounded">Bästsäljare</span>
            )}
          </div>

          <p className="text-sm text-stone-400 tracking-wider uppercase mb-1">{product.brand}</p>
          <h1 className="text-2xl md:text-3xl font-light text-stone-900 mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${star <= Math.round(product.rating) ? 'text-amber-400' : 'text-stone-200'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-stone-500">{product.rating} / 5</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-medium text-stone-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-stone-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded">
                  -{getDiscountPercent(product.price, product.originalPrice)}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-stone-600 text-sm leading-relaxed mb-6">{product.description}</p>

          {/* Size */}
          <div className="mb-6">
            <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">Storlek</p>
            <div className="inline-flex items-center border border-stone-900 rounded px-4 py-2 text-sm">
              {product.size}
            </div>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">Doftnoter</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-medium text-stone-900 mb-1">Toppnoter</p>
                {product.notes.top.map((note) => (
                  <p key={note} className="text-xs text-stone-500 capitalize">{note}</p>
                ))}
              </div>
              <div>
                <p className="text-xs font-medium text-stone-900 mb-1">Hjärtnoter</p>
                {product.notes.middle.map((note) => (
                  <p key={note} className="text-xs text-stone-500 capitalize">{note}</p>
                ))}
              </div>
              <div>
                <p className="text-xs font-medium text-stone-900 mb-1">Basnoter</p>
                {product.notes.base.map((note) => (
                  <p key={note} className="text-xs text-stone-500 capitalize">{note}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Add to cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-stone-300 rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-stone-600 hover:bg-stone-100 transition-colors"
              >
                −
              </button>
              <span className="px-4 py-2 text-sm font-medium min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-stone-600 hover:bg-stone-100 transition-colors"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className={`flex-1 py-3 text-sm tracking-wider uppercase rounded transition-colors ${
                added
                  ? 'bg-green-600 text-white'
                  : product.inStock
                    ? 'bg-stone-900 text-white hover:bg-stone-800'
                    : 'bg-stone-300 text-stone-500 cursor-not-allowed'
              }`}
            >
              {added
                ? '✓ Tillagd i varukorgen'
                : product.inStock
                  ? `Lägg i varukorgen — ${formatPrice(product.price * quantity)}`
                  : 'Slutsåld'}
            </button>
          </div>

          {/* Delivery info */}
          <div className="mt-8 space-y-2 border-t border-stone-200 pt-6">
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <span>🚚</span>
              <span>Fri frakt över 499 kr</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <span>📦</span>
              <span>Leverans 1–3 arbetsdagar</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <span>↩️</span>
              <span>30 dagars öppet köp</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16 md:mt-24">
          <h2 className="text-xl md:text-2xl font-light text-stone-900 mb-8">
            Du kanske också gillar
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
