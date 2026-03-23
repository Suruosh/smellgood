export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-light text-stone-900 mb-3">Kontakta Oss</h1>
        <p className="text-stone-500 text-sm mb-10">
          Har du frågor om en beställning, våra produkter eller något annat? Vi hjälper dig gärna.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-stone-50 rounded-xl p-6 text-center">
            <p className="text-2xl mb-2">📧</p>
            <p className="text-sm font-medium text-stone-900">E-post</p>
            <p className="text-sm text-stone-500 mt-1">info@smellgood.se</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-6 text-center">
            <p className="text-2xl mb-2">📞</p>
            <p className="text-sm font-medium text-stone-900">Telefon</p>
            <p className="text-sm text-stone-500 mt-1">08-123 456 78</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-6 text-center">
            <p className="text-2xl mb-2">📍</p>
            <p className="text-sm font-medium text-stone-900">Besök</p>
            <p className="text-sm text-stone-500 mt-1">Stockholm, Sverige</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-stone-50 rounded-xl p-8">
          <h2 className="text-xl font-light text-stone-900 mb-6">Skicka ett meddelande</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs text-stone-500 uppercase tracking-wider mb-1.5">
                  Namn
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-2.5 border border-stone-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
                  placeholder="Ditt namn"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs text-stone-500 uppercase tracking-wider mb-1.5">
                  E-post
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2.5 border border-stone-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
                  placeholder="din@email.se"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-xs text-stone-500 uppercase tracking-wider mb-1.5">
                Ämne
              </label>
              <select
                id="subject"
                className="w-full px-4 py-2.5 border border-stone-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-stone-400"
              >
                <option>Generell fråga</option>
                <option>Beställning & Leverans</option>
                <option>Retur & Reklamation</option>
                <option>Produktfråga</option>
                <option>Samarbete</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-xs text-stone-500 uppercase tracking-wider mb-1.5">
                Meddelande
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2.5 border border-stone-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent resize-none"
                placeholder="Skriv ditt meddelande här..."
              />
            </div>
            <button
              type="button"
              className="w-full bg-stone-900 text-white py-3 text-sm tracking-wider uppercase hover:bg-stone-800 transition-colors rounded"
            >
              Skicka Meddelande
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-xl font-light text-stone-900 mb-6">Vanliga Frågor</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Hur lång tid tar leveransen?',
                a: 'Vi skickar alla beställningar inom 24 timmar. Normal leveranstid är 1–3 arbetsdagar inom Sverige.',
              },
              {
                q: 'Är parfymerna äkta?',
                a: 'Ja, alla våra parfymer är 100% äkta och original. Vi samarbetar endast med auktoriserade distributörer.',
              },
              {
                q: 'Kan jag returnera en parfym?',
                a: 'Ja, vi erbjuder 30 dagars öppet köp på oöppnade produkter. Kontakta oss för att starta en retur.',
              },
              {
                q: 'Vad är pocket-format?',
                a: 'Våra parfymer säljs i 25ml flaskor — perfekt storlek att ha med sig i fickan eller väskan.',
              },
            ].map((faq) => (
              <div key={faq.q} className="border border-stone-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-stone-900 mb-1">{faq.q}</h3>
                <p className="text-sm text-stone-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
