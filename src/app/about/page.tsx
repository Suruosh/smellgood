import Link from 'next/link';
import { products } from '@/data/products';

export default function AboutPage() {
  const brandCount = new Set(products.map((p) => p.brand)).size;

  return (
    <div>
      {/* Hero */}
      <section className="bg-stone-900 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-stone-400 text-sm tracking-[0.3em] uppercase mb-4">Om Oss</p>
            <h1 className="text-3xl md:text-5xl font-light leading-tight mb-6">
              Vi gör lyxparfymer
              <br />
              <span className="font-medium">tillgängliga för alla</span>
            </h1>
            <p className="text-stone-300 text-lg font-light leading-relaxed">
              SmellGood grundades med en enkel vision: att göra världens bästa parfymer tillgängliga
              i ett praktiskt och prisvärt format.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-light text-stone-900">{products.length}+</p>
              <p className="text-sm text-stone-500 mt-1">Parfymer</p>
            </div>
            <div>
              <p className="text-3xl font-light text-stone-900">{brandCount}+</p>
              <p className="text-sm text-stone-500 mt-1">Varumärken</p>
            </div>
            <div>
              <p className="text-3xl font-light text-stone-900">25ml</p>
              <p className="text-sm text-stone-500 mt-1">Pocketformat</p>
            </div>
            <div>
              <p className="text-3xl font-light text-stone-900">100%</p>
              <p className="text-sm text-stone-500 mt-1">Äkta & Original</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-stone-900 mb-6">Vår Historia</h2>
              <div className="space-y-4 text-sm text-stone-600 leading-relaxed">
                <p>
                  SmellGood startades i Stockholm med övertygelsen att alla förtjänar att lukta fantastiskt
                  — utan att behöva betala tusentals kronor för en fullstor parfymflaska.
                </p>
                <p>
                  Vi insåg att många människor vill prova och bära lyxdofter men avskräcks av de höga priserna.
                  Lösningen? Pocket-format. Samma exklusiva dofter, i en elegant 25ml-flaska som får plats
                  överallt.
                </p>
                <p>
                  Idag erbjuder vi över {products.length} parfymer från {brandCount}+ av världens mest
                  eftertraktade parfymhus — från klassiker som Chanel N°5 och Dior Sauvage till
                  nischfavoriter som Le Labo och Byredo.
                </p>
                <p>
                  Varje parfym i vårt sortiment är garanterat äkta och original. Vi samarbetar med
                  auktoriserade distributörer för att säkerställa högsta kvalitet.
                </p>
              </div>
            </div>
            <div className="bg-stone-100 rounded-xl aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-36 mx-auto mb-4 bg-gradient-to-b from-stone-200 to-stone-300 rounded-sm opacity-50" />
                <p className="text-xs text-stone-400 tracking-wider uppercase">25ml Pocket Lyx</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-stone-900 mb-3">Våra Värderingar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Kvalitet Först',
                desc: 'Vi kompromissar aldrig med kvaliteten. Varje parfym genomgår noggranna kontroller innan den når våra kunder.',
              },
              {
                title: 'Hållbarhet',
                desc: 'Vårt pocketformat minskar materialåtgång och transportutsläpp jämfört med fullstora flaskor.',
              },
              {
                title: 'Tillgänglighet',
                desc: 'Lyx ska inte vara exklusivt. Vi arbetar ständigt för att erbjuda de bästa priserna på marknaden.',
              },
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-8">
                <h3 className="text-lg font-medium text-stone-900 mb-3">{value.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-stone-900 mb-4">
            Redo att hitta din doft?
          </h2>
          <p className="text-stone-500 text-sm mb-8 max-w-md mx-auto">
            Utforska vårt sortiment av över {products.length} lyxparfymer i fickformat.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-stone-900 text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-stone-800 transition-colors rounded"
          >
            Utforska Kollektionen
          </Link>
        </div>
      </section>
    </div>
  );
}
