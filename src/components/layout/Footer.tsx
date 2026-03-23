import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-white font-bold text-lg mb-3">
              Smell<span className="text-amber-400">Good</span>
            </h3>
            <p className="text-sm text-gray-400 max-w-sm">
              Lyxiga pocket-parfymer för dig som värdesätter kvalitet och elegans.
              Över 250 handplockade dofter direkt till din dörr.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Butiken</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/produkter" className="hover:text-white transition-colors">Alla parfymer</Link></li>
              <li><Link href="/produkter?sortBy=newest" className="hover:text-white transition-colors">Nyheter</Link></li>
              <li><Link href="/varukorg" className="hover:text-white transition-colors">Varukorg</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Information</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/integritetspolicy" className="hover:text-white transition-colors">Integritetspolicy</Link></li>
              <li><Link href="/kopvillkor" className="hover:text-white transition-colors">Köpvillkor</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie-policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} SmellGood. Alla rättigheter förbehållna. Priser inkl. moms.
        </div>
      </div>
    </footer>
  );
}
