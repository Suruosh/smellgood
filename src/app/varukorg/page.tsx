"use client";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();
  const total = totalPrice();
  const shipping = total >= 500 ? 0 : 49;

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Varukorg</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag size={64} className="mx-auto text-gray-200 mb-6" strokeWidth={1} />
          <p className="text-xl font-semibold text-gray-400 mb-2">Din varukorg är tom</p>
          <p className="text-gray-400 mb-8">Lägg till produkter för att fortsätta</p>
          <Link
            href="/produkter"
            className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors inline-flex items-center gap-2"
          >
            Börja shoppa <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.sku} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm">
                <div className="w-20 h-20 bg-amber-50 rounded-xl overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">🌸</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-amber-600 font-medium">{item.brand}</p>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-400">{item.sizeMl} ml</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-2 border rounded-full px-2">
                      <button onClick={() => updateQuantity(item.sku, item.quantity - 1)} className="p-1 hover:text-amber-500">
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.sku, item.quantity + 1)} className="p-1 hover:text-amber-500">
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
                <button onClick={() => removeItem(item.sku)} className="text-gray-300 hover:text-red-400 self-start">
                  <X size={20} />
                </button>
              </div>
            ))}
            <button onClick={clearCart} className="text-sm text-gray-400 hover:text-red-400 transition-colors">
              Töm varukorg
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-4">Ordersammanfattning</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Delsumma</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frakt</span>
                  <span>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-amber-600">{formatPrice(500 - total)} kvar till fri frakt</p>
                )}
                <div className="border-t pt-3 flex justify-between font-bold text-gray-900">
                  <span>Totalt</span>
                  <span className="text-lg">{formatPrice(total + shipping)}</span>
                </div>
                <p className="text-xs text-gray-400 text-center">Inkl. moms</p>
              </div>
              <Link
                href="/kassa"
                className="block w-full mt-6 py-3.5 bg-amber-500 text-white text-center font-semibold rounded-full hover:bg-amber-600 transition-colors"
              >
                Till kassan
              </Link>
              <Link
                href="/produkter"
                className="block w-full mt-3 py-2.5 text-gray-500 text-center text-sm hover:text-gray-700"
              >
                Fortsätt handla
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
