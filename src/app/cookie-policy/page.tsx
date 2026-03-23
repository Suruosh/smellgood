export const metadata = { title: "Cookie-policy – SmellGood" };

export default function CookiePolicyPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie-policy</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-6">Senast uppdaterad: {new Date().toLocaleDateString("sv-SE")}</p>
        <h2 className="text-xl font-semibold mb-3">Vad är cookies?</h2>
        <p className="text-gray-600 mb-6">Cookies är små textfiler som lagras på din enhet när du besöker vår webbplats.</p>
        <h2 className="text-xl font-semibold mb-3">Vilka cookies använder vi?</h2>
        <ul className="text-gray-600 mb-6 space-y-2">
          <li><strong>Nödvändiga cookies:</strong> Krävs för att webbplatsen ska fungera, t.ex. för varukorgen.</li>
          <li><strong>Analyticscookies:</strong> Hjälper oss förstå hur besökare använder webbplatsen.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-3">Hantera cookies</h2>
        <p className="text-gray-600 mb-6">Du kan hantera och ta bort cookies i din webbläsares inställningar.</p>
      </div>
    </div>
  );
}
