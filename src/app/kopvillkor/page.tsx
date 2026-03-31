export const metadata = { title: "Köpvillkor – SmellGood" };

export default function KopvillkorPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Köpvillkor</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-6">Senast uppdaterad: {new Date().toLocaleDateString("sv-SE")}</p>
        <h2 className="text-xl font-semibold mb-3">1. Betalning</h2>
        <p className="text-gray-600 mb-6">Vi accepterar kortbetalning via Stripe och Klarna. Alla priser är angivna i SEK och inkluderar moms.</p>
        <h2 className="text-xl font-semibold mb-3">2. Leverans</h2>
        <p className="text-gray-600 mb-6">Vi levererar inom Sverige. Fri frakt vid köp över 500 kr. Leveranstid är normalt 2–5 arbetsdagar.</p>
        <h2 className="text-xl font-semibold mb-3">3. Ångerrätt</h2>
        <p className="text-gray-600 mb-6">Du har 14 dagars ångerrätt enligt distansavtalslagen. Produkten ska vara obruten och i originalförpackning.</p>
        <h2 className="text-xl font-semibold mb-3">4. Reklamation</h2>
        <p className="text-gray-600 mb-6">Vid fel på produkt, kontakta oss på info@smellgood.se inom 3 år från köpdatum.</p>
      </div>
    </div>
  );
}
