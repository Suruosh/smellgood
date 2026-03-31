"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, CreditCard, Truck } from "lucide-react";

type Step = "shipping" | "payment" | "confirm";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [step, setStep] = useState<Step>("shipping");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "SE",
  });

  const total = totalPrice();
  const shipping = total >= 500 ? 0 : 49;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({
            productId: i.id,
            sku: i.sku,
            name: i.name,
            brand: i.brand,
            price: i.price,
            quantity: i.quantity,
            sizeMl: i.sizeMl,
          })),
          totalAmount: total + shipping,
        }),
      });
      if (res.ok) {
        clearCart();
        setStep("confirm");
      }
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && step !== "confirm") {
    return (
      <div className="container py-20 text-center">
        <p className="text-gray-400 mb-4">Din varukorg är tom</p>
        <Link href="/produkter" className="px-6 py-2.5 bg-amber-500 text-white rounded-full hover:bg-amber-600">
          Shoppa nu
        </Link>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="container py-20 max-w-lg mx-auto text-center">
        <div className="text-5xl mb-6">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Tack för din beställning!</h1>
        <p className="text-gray-500 mb-8">
          En orderbekräftelse har skickats till {form.email}. Vi behandlar din beställning och
          skickar den snarast möjligt.
        </p>
        <Link
          href="/produkter"
          className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors"
        >
          Fortsätt shoppa
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <Link href="/varukorg" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ChevronLeft size={16} />
        Tillbaka till varukorgen
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Kassa</h1>

      {/* Steps */}
      <div className="flex items-center gap-3 mb-8">
        {[
          { id: "shipping", label: "Leverans", icon: <Truck size={16} /> },
          { id: "payment", label: "Betalning", icon: <CreditCard size={16} /> },
        ].map((s, i) => (
          <div key={s.id} className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              step === s.id ? "bg-amber-500 text-white" :
              (step === "payment" && i === 0) ? "bg-green-100 text-green-700" :
              "bg-gray-100 text-gray-400"
            }`}>
              {s.icon}
              {s.label}
            </div>
            {i < 1 && <div className="h-px w-8 bg-gray-200" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === "shipping" && (
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <h2 className="font-semibold text-gray-900 mb-4">Leveransuppgifter</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Förnamn *</label>
                  <input required name="firstName" value={form.firstName} onChange={handleFormChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Efternamn *</label>
                  <input required name="lastName" value={form.lastName} onChange={handleFormChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">E-post *</label>
                <input required type="email" name="email" value={form.email} onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 text-sm" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Telefon</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 text-sm" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Adress *</label>
                <input required name="address" value={form.address} onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Postnummer *</label>
                  <input required name="postalCode" value={form.postalCode} onChange={handleFormChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Stad *</label>
                  <input required name="city" value={form.city} onChange={handleFormChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 text-sm" />
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors mt-2">
                Fortsätt till betalning
              </button>
            </form>
          )}

          {step === "payment" && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <h2 className="font-semibold text-gray-900 mb-4">Betalning</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-700">
                <p className="font-medium mb-1">🔒 Säker betalning</p>
                <p>Betalningsintegration (Stripe/Klarna) konfigureras vid driftsättning.</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Kortnummer</label>
                <input placeholder="4242 4242 4242 4242" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Giltighetstid</label>
                  <input placeholder="MM/ÅÅ" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">CVV</label>
                  <input placeholder="123" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 text-sm" />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors disabled:opacity-50"
              >
                {loading ? "Bearbetar..." : `Betala ${formatPrice(total + shipping)}`}
              </button>
            </form>
          )}
        </div>

        {/* Order summary */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Din beställning</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.sku} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate mr-2">{item.name} ×{item.quantity}</span>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Frakt</span>
                <span>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900">
                <span>Totalt</span>
                <span>{formatPrice(total + shipping)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
