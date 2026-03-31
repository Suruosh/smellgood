"use client";
import Link from "next/link";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const { totalItems, openCart } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produkter?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const count = totalItems();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Smell<span className="text-amber-500">Good</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/produkter" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Parfymer
            </Link>
            <Link href="/produkter?scentFamily=Floral" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Blommig
            </Link>
            <Link href="/produkter?scentFamily=Woody" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Träig
            </Link>
            <Link href="/produkter?scentFamily=Fresh" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Frisk
            </Link>
            <Link href="/produkter?scentFamily=Oriental" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Orientalisk
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search desktop */}
            <div className="hidden md:block relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Sök parfym..."
                    className="w-48 px-3 py-1.5 text-sm border border-gray-200 rounded-l-md focus:outline-none focus:border-amber-400"
                  />
                  <button type="submit" className="px-3 py-1.5 bg-amber-500 text-white rounded-r-md hover:bg-amber-600">
                    <Search size={16} />
                  </button>
                  <button type="button" onClick={() => setSearchOpen(false)} className="ml-2 text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                </form>
              ) : (
                <button onClick={() => setSearchOpen(true)} className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Öppna varukorg"
            >
              <ShoppingBag size={22} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {count}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Meny"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <form onSubmit={handleSearch} className="flex mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Sök parfym..."
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-l-md focus:outline-none focus:border-amber-400"
              />
              <button type="submit" className="px-3 py-2 bg-amber-500 text-white rounded-r-md">
                <Search size={16} />
              </button>
            </form>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/produkter", label: "Alla Parfymer" },
                { href: "/produkter?scentFamily=Floral", label: "Blommig" },
                { href: "/produkter?scentFamily=Woody", label: "Träig" },
                { href: "/produkter?scentFamily=Fresh", label: "Frisk" },
                { href: "/produkter?scentFamily=Oriental", label: "Orientalisk" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-amber-600 py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
