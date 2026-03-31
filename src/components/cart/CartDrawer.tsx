"use client";
import { useCartStore } from "@/store/cartStore";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (!isOpen) return null;

  const total = totalPrice();

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        onClick={closeCart}
      />
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag size={20} />
            Varukorg {items.length > 0 && `(${items.length})`}
          </h2>
          <button onClick={closeCart} className="p-1 hover:text-gray-600">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400">
            <ShoppingBag size={48} strokeWidth={1} />
            <p className="text-sm">Din varukorg är tom</p>
            <Link
              href="/produkter"
              onClick={closeCart}
              className="px-5 py-2.5 bg-amber-500 text-white rounded-full text-sm font-medium hover:bg-amber-600 transition-colors"
            >
              Shoppa nu
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div key={item.sku} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">🌸</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 truncate">{item.brand}</p>
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.sizeMl} ml</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-white border flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-white border flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.sku)}
                    className="text-gray-300 hover:text-red-400 self-start mt-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t p-4 space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Frakt</span>
                <span>{total >= 500 ? "Gratis" : "49 kr"}</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <span>Totalt</span>
                <span className="text-lg">{formatPrice(total >= 500 ? total : total + 49)}</span>
              </div>
              {total < 500 && (
                <p className="text-xs text-amber-600 text-center">
                  {formatPrice(500 - total)} kvar till fri frakt!
                </p>
              )}
              <Link
                href="/kassa"
                onClick={closeCart}
                className="block w-full py-3 bg-amber-500 text-white text-center font-semibold rounded-full hover:bg-amber-600 transition-colors"
              >
                Till kassan
              </Link>
              <button
                onClick={closeCart}
                className="block w-full py-2 text-sm text-gray-500 hover:text-gray-700 text-center"
              >
                Fortsätt handla
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
