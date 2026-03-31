export const metadata = { title: "Integritetspolicy – SmellGood" };

export default function IntegritetspolicyPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Integritetspolicy</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-6">Senast uppdaterad: {new Date().toLocaleDateString("sv-SE")}</p>
        <h2 className="text-xl font-semibold mb-3">1. Personuppgiftsansvarig</h2>
        <p className="text-gray-600 mb-6">SmellGood är personuppgiftsansvarig för behandlingen av dina personuppgifter.</p>
        <h2 className="text-xl font-semibold mb-3">2. Vilka uppgifter vi samlar in</h2>
        <p className="text-gray-600 mb-6">Vi samlar in namn, e-postadress, leveransadress och telefonnummer när du gör en beställning.</p>
        <h2 className="text-xl font-semibold mb-3">3. Hur vi använder dina uppgifter</h2>
        <p className="text-gray-600 mb-6">Dina uppgifter används för att behandla din beställning, skicka orderbekräftelse och leverera produkter.</p>
        <h2 className="text-xl font-semibold mb-3">4. Dina rättigheter</h2>
        <p className="text-gray-600 mb-6">Du har rätt att begära tillgång till, rättelse eller radering av dina personuppgifter. Kontakta oss på info@smellgood.se.</p>
      </div>
    </div>
  );
}
