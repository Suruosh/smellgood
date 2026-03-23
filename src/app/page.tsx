import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Star, Truck, Shield, RefreshCw } from "lucide-react";
import type { Product } from "@/types/product";

function deserializeProduct(p: any): Product {
  return {
    ...p,
    images: JSON.parse(p.images || "[]"),
    categories: JSON.parse(p.categories || "[]"),
    tags: JSON.parse(p.tags || "[]"),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

const SCENT_CATEGORIES = [
  { name: "Blommig", emoji: "��", query: "Floral", color: "from-pink-50 to-rose-50" },
  { name: "Träig", emoji: "🌿", query: "Woody", color: "from-green-50 to-emerald-50" },
  { name: "Orientalisk", emoji: "✨", query: "Oriental", color: "from-amber-50 to-yellow-50" },
  { name: "Frisk", emoji: "💧", query: "Fresh", color: "from-blue-50 to-cyan-50" },
  { name: "Citrus", emoji: "🍋", query: "Citrus", color: "from-yellow-50 to-lime-50" },
  { name: "Gourmand", emoji: "🍫", query: "Gourmand", color: "from-orange-50 to-amber-50" },
];

export default async function HomePage() {
  const [newProducts, featuredProducts, total] = await Promise.all([
    prisma.product.findMany({
      where: { available: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    prisma.product.findMany({
      where: { available: true },
      orderBy: { price: "desc" },
      take: 8,
    }),
    prisma.product.count(),
  ]);

  const newProductsSerialized = newProducts.map(deserializeProduct);
  const featuredProductsSerialized = featuredProducts.map(deserializeProduct);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-20 md:py-32">
        <div className="container text-center">
          <p className="text-amber-600 font-medium text-sm uppercase tracking-widest mb-4">
            Pocket-Parfymer · Lyxiga Dofter
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Din doft,<br />
            <span className="text-amber-500">alltid med dig</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Upptäck vårt handplockade urval av {total > 0 ? `${total}+` : "250+"} lyxiga parfymer
            i fickformat. Perfekta för att ta med överallt – utan att kompromissa med kvaliteten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/produkter"
              className="px-8 py-3.5 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors inline-flex items-center gap-2"
            >
              Shoppa nu
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/produkter?sortBy=newest"
              className="px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Se nyheter
            </Link>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-y border-gray-100 bg-white py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: <Truck size={24} />, title: "Fri frakt", desc: "Vid köp över 500 kr" },
              { icon: <Shield size={24} />, title: "Säker betalning", desc: "Krypterad transaktion" },
              { icon: <RefreshCw size={24} />, title: "14 dagars retur", desc: "Enkel returprocess" },
              { icon: <Star size={24} />, title: "Äkta produkter", desc: "100% genuina parfymer" },
            ].map((badge) => (
              <div key={badge.title} className="flex flex-col items-center gap-2">
                <div className="text-amber-500">{badge.icon}</div>
                <p className="font-semibold text-sm text-gray-900">{badge.title}</p>
                <p className="text-xs text-gray-500">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scent categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Utforska doftfamiljer</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {SCENT_CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/produkter?scentFamily=${encodeURIComponent(cat.query)}`}
                className={`bg-gradient-to-br ${cat.color} rounded-2xl p-6 text-center hover:shadow-md transition-shadow group`}
              >
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-amber-700 transition-colors">
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New arrivals */}
      {newProductsSerialized.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Nyheter</h2>
              <Link
                href="/produkter?sortBy=newest"
                className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                Se alla <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newProductsSerialized.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured */}
      {featuredProductsSerialized.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Populära parfymer</h2>
              <Link
                href="/produkter"
                className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                Se alla <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {featuredProductsSerialized.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500 py-16">
        <div className="container text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Hitta din perfekta doft</h2>
          <p className="text-amber-100 mb-8 max-w-xl mx-auto">
            Bläddra bland {total > 0 ? total : "250"}+ lyxiga pocket-parfymer och hitta den doft som passar just dig.
          </p>
          <Link
            href="/produkter"
            className="px-8 py-3 bg-white text-amber-600 font-semibold rounded-full hover:bg-amber-50 transition-colors inline-flex items-center gap-2"
          >
            Utforska kollektionen <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
