import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-stone-900 text-sm font-light">S</span>
              </div>
              <span className="text-lg font-light tracking-[0.2em] text-white">
                SMELLGOOD
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Sveriges ledande butik för lyxparfymer i fickformat. Över 250 exklusiva dofter till oslagbara priser.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white text-sm tracking-wider uppercase mb-4">Handla</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-stone-400 hover:text-white transition-colors">
                  Alla Parfymer
                </Link>
              </li>
              <li>
                <Link href="/products?category=women" className="text-sm text-stone-400 hover:text-white transition-colors">
                  Dam
                </Link>
              </li>
              <li>
                <Link href="/products?category=men" className="text-sm text-stone-400 hover:text-white transition-colors">
                  Herr
                </Link>
              </li>
              <li>
                <Link href="/products?category=unisex" className="text-sm text-stone-400 hover:text-white transition-colors">
                  Unisex
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm tracking-wider uppercase mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-stone-400 hover:text-white transition-colors">
                  Om Oss
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-stone-400 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <span className="text-sm text-stone-400">Leveransvillkor</span>
              </li>
              <li>
                <span className="text-sm text-stone-400">Returpolicy</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm tracking-wider uppercase mb-4">Kontakt</h3>
            <ul className="space-y-2">
              <li className="text-sm text-stone-400">info@smellgood.se</li>
              <li className="text-sm text-stone-400">08-123 456 78</li>
              <li className="text-sm text-stone-400">Stockholm, Sverige</li>
            </ul>
            <div className="flex gap-4 mt-4">
              <span className="text-stone-500 hover:text-white cursor-pointer transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </span>
              <span className="text-stone-500 hover:text-white cursor-pointer transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/></svg>
              </span>
              <span className="text-stone-500 hover:text-white cursor-pointer transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-500">
            © 2026 SmellGood. Alla rättigheter förbehållna.
          </p>
          <div className="flex gap-6 items-center">
            <span className="text-xs text-stone-500">Swish</span>
            <span className="text-xs text-stone-500">Klarna</span>
            <span className="text-xs text-stone-500">Visa</span>
            <span className="text-xs text-stone-500">Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
