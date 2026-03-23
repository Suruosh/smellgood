'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';

export default function Header() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-stone-900 rounded-full flex items-center justify-center group-hover:bg-stone-700 transition-colors">
              <span className="text-white text-sm md:text-base font-light">S</span>
            </div>
            <span className="text-lg md:text-xl font-light tracking-[0.2em] text-stone-900">
              SMELLGOOD
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/products"
              className="text-sm tracking-wider text-stone-600 hover:text-stone-900 transition-colors uppercase"
            >
              Alla Parfymer
            </Link>
            <Link
              href="/products?category=women"
              className="text-sm tracking-wider text-stone-600 hover:text-stone-900 transition-colors uppercase"
            >
              Dam
            </Link>
            <Link
              href="/products?category=men"
              className="text-sm tracking-wider text-stone-600 hover:text-stone-900 transition-colors uppercase"
            >
              Herr
            </Link>
            <Link
              href="/products?category=unisex"
              className="text-sm tracking-wider text-stone-600 hover:text-stone-900 transition-colors uppercase"
            >
              Unisex
            </Link>
            <Link
              href="/about"
              className="text-sm tracking-wider text-stone-600 hover:text-stone-900 transition-colors uppercase"
            >
              Om Oss
            </Link>
          </nav>

          {/* Cart & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative text-stone-700 hover:text-stone-900 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-stone-700"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white">
          <nav className="px-4 py-4 flex flex-col gap-3">
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-wider text-stone-600 hover:text-stone-900 uppercase py-2"
            >
              Alla Parfymer
            </Link>
            <Link
              href="/products?category=women"
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-wider text-stone-600 hover:text-stone-900 uppercase py-2"
            >
              Dam
            </Link>
            <Link
              href="/products?category=men"
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-wider text-stone-600 hover:text-stone-900 uppercase py-2"
            >
              Herr
            </Link>
            <Link
              href="/products?category=unisex"
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-wider text-stone-600 hover:text-stone-900 uppercase py-2"
            >
              Unisex
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-wider text-stone-600 hover:text-stone-900 uppercase py-2"
            >
              Om Oss
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
