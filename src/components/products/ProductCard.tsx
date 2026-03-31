"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { addItem, openCart } = useCartStore();
  const images = Array.isArray(product.images) ? product.images : [];
  const firstImage = images[0] || null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      sku: product.sku,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      price: product.price,
      sizeMl: product.sizeMl,
      image: firstImage || undefined,
    });
    openCart();
  };

  return (
    <Link href={`/produkter/${product.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative aspect-square bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
          {firstImage ? (
            <img
              src={firstImage}
              alt={product.name}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">
              🌸
            </div>
          )}
          {!product.available && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full">Slutsåld</span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span className="bg-white/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full text-gray-600 font-medium">
              {product.sizeMl} ml
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-amber-600 font-medium uppercase tracking-wide mb-1">{product.brand}</p>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 mb-1">{product.name}</h3>
          {product.scentFamily && (
            <p className="text-xs text-gray-400 mb-3">{product.scentFamily}</p>
          )}
          <div className="flex items-center justify-between mt-auto">
            <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
            <button
              onClick={handleAddToCart}
              disabled={!product.available}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white text-xs font-medium rounded-full hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ShoppingBag size={14} />
              Köp
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
