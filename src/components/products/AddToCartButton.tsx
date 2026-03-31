"use client";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types/product";
import { useState } from "react";

interface Props {
  product: Product;
}

export function AddToCartButton({ product }: Props) {
  const { addItem, openCart } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      sku: product.sku,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      price: product.price,
      sizeMl: product.sizeMl,
      image: product.images[0] || undefined,
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product.available) {
    return (
      <button disabled className="w-full py-4 bg-gray-100 text-gray-400 font-semibold rounded-full cursor-not-allowed">
        Slutsåld
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-4 font-semibold rounded-full flex items-center justify-center gap-3 transition-all ${
        added
          ? "bg-green-500 text-white"
          : "bg-amber-500 text-white hover:bg-amber-600 active:scale-95"
      }`}
    >
      <ShoppingBag size={20} />
      {added ? "Tillagd i varukorgen! ✓" : "Lägg i varukorg"}
    </button>
  );
}
