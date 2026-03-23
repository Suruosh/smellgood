import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts, getBestsellers, getNewArrivals, products } from '@/data/products';

export default function Home() {
  const featured = getFeaturedProducts().slice(0, 8);
  const bestsellers = getBestsellers().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-44">
          <div className="max-w-2xl">
            <p className="text-stone-400 text-sm tracking-[0.3em] uppercase mb-4">
              Sveriges Ledande Parfymbutik
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6">
              Lyx i
              <br />
              <span className="font-medium">Fickformat</span>
            </h1>
            <p className="text-stone-300 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-lg">
              Upptäck över {products.length} exklusiva parfymer från världens mest prestigefyllda parfymhus — nu i praktiskt pocketformat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-white text-stone-900 px-8 py-3 text-sm tracking-wider uppercase hover:bg-stone-100 transition-colors rounded"
              >
                Utforska Kollektionen
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center border border-stone-500 text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-stone-800 transition-colors rounded"
              >
                Om SmellGood
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-l from-stone-700/20 to-transparent rounded-full blur-3xl" />
      </section>

      {/* Trust bar */}
      <section className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-sm font-medium text-stone-900">Fri Frakt</p>
              <p className="text-xs text-stone-500 mt-0.5">Över 499 kr</p>
            </div>
            <div>
              <p className="text-sm font-medium text-stone-900">Snabb Leverans</p>
              <p className="text-xs text-stone-500 mt-0.5">1–3 arbetsdagar</p>
            </div>
            <div>
              <p className="text-sm font-medium text-stone-900">100% Äkta</p>
              <p className="text-xs text-stone-500 mt-0.5">Garanterat original</p>
            </div>
            <div>
              <p className="text-sm font-medium text-stone-900">30 Dagars Retur</p>
              <p className="text-xs text-stone-500 mt-0.5">Enkel returprocess</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-stone-900 mb-3">
              Handla Efter Kategori
            </h2>
            <p className="text-stone-500 text-sm max-w-md mx-auto">
              Hitta din perfekta doft bland våra noggrant utvalda kollektioner
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Dam', subtitle: 'Eleganta & feminina dofter', href: '/products?category=women', gradient: 'from-pink-50 to-rose-100' },
              { title: 'Herr', subtitle: 'Maskulina & sofistikerade dofter', href: '/products?category=men', gradient: 'from-blue-50 to-slate-100' },
              { title: 'Unisex', subtitle: 'Universella & moderna dofter', href: '/products?category=unisex', gradient: 'from-amber-50 to-yellow-100' },
            ].map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className={`group relative bg-gradient-to-br ${cat.gradient} rounded-xl p-8 md:p-12 text-center hover:shadow-lg transition-all duration-300`}
              >
                <div className="w-16 h-24 mx-auto mb-4 bg-gradient-to-b from-stone-200 to-stone-300 rounded-sm opacity-40 group-hover:opacity-60 transition-opacity" />
                <h3 className="text-xl font-medium text-stone-900 mb-1">{cat.title}</h3>
                <p className="text-sm text-stone-500">{cat.subtitle}</p>
                <span className="mt-4 inline-block text-xs tracking-wider uppercase text-stone-600 group-hover:text-stone-900 transition-colors">
                  Se alla →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-stone-900 mb-2">
                Utvalda Favoriter
              </h2>
              <p className="text-stone-500 text-sm">
                Handplockade dofter som vi älskar
              </p>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-flex text-sm tracking-wider text-stone-600 hover:text-stone-900 transition-colors uppercase"
            >
              Se alla →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/products"
              className="text-sm tracking-wider text-stone-600 hover:text-stone-900 transition-colors uppercase"
            >
              Se alla parfymer →
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals & Bestsellers */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-xl md:text-2xl font-light text-stone-900 mb-1">Nyheter</h2>
                  <p className="text-stone-500 text-sm">Senaste tillskotten</p>
                </div>
                <Link href="/products?sort=new" className="text-xs tracking-wider text-stone-500 hover:text-stone-900 uppercase">Se alla →</Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-xl md:text-2xl font-light text-stone-900 mb-1">Bästsäljare</h2>
                  <p className="text-stone-500 text-sm">Mest populära just nu</p>
                </div>
                <Link href="/products?sort=bestseller" className="text-xs tracking-wider text-stone-500 hover:text-stone-900 uppercase">Se alla →</Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {bestsellers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why SmellGood */}
      <section className="py-16 md:py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light mb-3">Varför SmellGood?</h2>
            <p className="text-stone-400 text-sm max-w-md mx-auto">Vi gör lyxparfymer tillgängliga för alla</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Pocket-Format', desc: 'Alla våra parfymer finns i 25ml pocketformat — perfekt att ha i väskan eller fickan. Lyx var du än befinner dig.', icon: '✦' },
              { title: 'Oslagbara Priser', desc: 'Vi samarbetar direkt med parfymhusen för att erbjuda äkta lyxdofter till en bråkdel av ordinarie butikspris.', icon: '◇' },
              { title: '100% Autentiskt', desc: 'Varje parfym är garanterat äkta och original. Vi är auktoriserad återförsäljare av alla våra märken.', icon: '○' },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-medium mb-3">{item.title}</h3>
                <p className="text-sm text-stone-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light text-stone-900 mb-3">Håll Dig Uppdaterad</h2>
            <p className="text-stone-500 text-sm mb-8">Prenumerera på vårt nyhetsbrev för exklusiva erbjudanden och nyheter</p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="din@email.se"
                className="flex-1 px-4 py-3 border border-stone-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
              />
              <button
                type="button"
                className="bg-stone-900 text-white px-6 py-3 text-sm tracking-wider uppercase hover:bg-stone-800 transition-colors rounded whitespace-nowrap"
              >
                Prenumerera
              </button>
            </div>
            <p className="text-xs text-stone-400 mt-3">Vi skickar aldrig spam. Avregistrera dig när som helst.</p>
          </div>
        </div>
      </section>
    </>
  );
}
