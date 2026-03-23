'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();

  const shippingCost = total >= 499 ? 0 : 49;
  const grandTotal = total + shippingCost;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-md mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-16 h-16 text-stone-300 mx-auto mb-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <h1 className="text-2xl font-light text-stone-900 mb-3">Din varukorg är tom</h1>
          <p className="text-stone-500 text-sm mb-8">
            Upptäck våra exklusiva parfymer och hitta din nya favoritdoft.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-stone-900 text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-stone-800 transition-colors rounded"
          >
            Utforska Parfymer
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl font-light text-stone-900 mb-2">Varukorg</h1>
      <p className="text-stone-500 text-sm mb-8">{itemCount} artikel{itemCount !== 1 ? 'ar' : ''}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-4 bg-stone-50 rounded-lg"
              >
                {/* Product image placeholder */}
                <Link
                  href={`/products/${item.product.id}`}
                  className="w-20 h-24 bg-stone-200 rounded flex-shrink-0 flex items-center justify-center"
                >
                  <div className="w-6 h-10 bg-stone-300 rounded-sm" />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-stone-400 tracking-wider uppercase">
                        {item.product.brand}
                      </p>
                      <Link
                        href={`/products/${item.product.id}`}
                        className="text-sm font-medium text-stone-900 hover:text-stone-600 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-stone-400 mt-0.5">{item.product.size}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-stone-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Ta bort"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-3">
                    <div className="flex items-center border border-stone-300 rounded bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-1 text-xs text-stone-600 hover:bg-stone-100 transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-xs font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-1 text-xs text-stone-600 hover:bg-stone-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-medium text-stone-900">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <Link
              href="/products"
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              ← Fortsätt handla
            </Link>
            <button
              onClick={clearCart}
              className="text-sm text-stone-400 hover:text-red-500 transition-colors"
            >
              Töm varukorgen
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-stone-50 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-medium text-stone-900 mb-6">Ordersammanfattning</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Delsumma</span>
                <span className="text-stone-900">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Frakt</span>
                <span className="text-stone-900">
                  {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
                </span>
              </div>
              {shippingCost > 0 && (
                <p className="text-xs text-stone-400">
                  Fri frakt vid köp över {formatPrice(499)}
                </p>
              )}
              <div className="border-t border-stone-200 pt-3 flex justify-between">
                <span className="font-medium text-stone-900">Totalt</span>
                <span className="font-medium text-stone-900 text-lg">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <button className="w-full bg-stone-900 text-white py-3 text-sm tracking-wider uppercase hover:bg-stone-800 transition-colors rounded mb-3">
              Till Kassan
            </button>

            <div className="text-center space-y-1">
              <p className="text-xs text-stone-400">Säker betalning med</p>
              <div className="flex justify-center gap-3">
                <span className="text-xs text-stone-500 font-medium">Klarna</span>
                <span className="text-xs text-stone-500 font-medium">Swish</span>
                <span className="text-xs text-stone-500 font-medium">Visa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
