"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";

const SCENT_FAMILIES = ["Blommig", "Träig", "Frisk", "Orientalisk", "Citrus", "Aromatisk", "Gourmand", "Aquatisk"];
const CONCENTRATIONS = ["EDT", "EDP", "Parfum", "EDC"];

interface Props {
  brands: string[];
  onClose?: () => void;
}

export function ProductFilters({ brands, onClose }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`/produkter?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearFilters = () => {
    const search = searchParams.get("search");
    router.push(search ? `/produkter?search=${encodeURIComponent(search)}` : "/produkter");
  };

  const hasFilters =
    searchParams.has("brand") ||
    searchParams.has("scentFamily") ||
    searchParams.has("concentration") ||
    searchParams.has("minPrice") ||
    searchParams.has("maxPrice");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Filtrera</h3>
        <div className="flex gap-2">
          {hasFilters && (
            <button onClick={clearFilters} className="text-xs text-amber-600 hover:underline">
              Rensa allt
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="md:hidden text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sortera</label>
        <select
          value={searchParams.get("sortBy") || "newest"}
          onChange={(e) => updateFilter("sortBy", e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-400"
        >
          <option value="newest">Nyast</option>
          <option value="price_asc">Pris: Lägst till högst</option>
          <option value="price_desc">Pris: Högst till lägst</option>
          <option value="name_asc">Namn A–Ö</option>
        </select>
      </div>

      {/* Brand */}
      {brands.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Varumärke</label>
          <select
            value={searchParams.get("brand") || ""}
            onChange={(e) => updateFilter("brand", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-400"
          >
            <option value="">Alla varumärken</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      )}

      {/* Scent family */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Doftfamilj</label>
        <div className="space-y-1.5">
          {SCENT_FAMILIES.map((sf) => {
            const isActive = searchParams.get("scentFamily") === sf;
            return (
              <button
                key={sf}
                onClick={() => updateFilter("scentFamily", isActive ? "" : sf)}
                className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-amber-100 text-amber-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {sf}
              </button>
            );
          })}
        </div>
      </div>

      {/* Concentration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Koncentration</label>
        <div className="flex flex-wrap gap-2">
          {CONCENTRATIONS.map((c) => {
            const isActive = searchParams.get("concentration") === c;
            return (
              <button
                key={c}
                onClick={() => updateFilter("concentration", isActive ? "" : c)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  isActive
                    ? "bg-amber-500 text-white border-amber-500"
                    : "border-gray-200 text-gray-600 hover:border-amber-300"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Pris (SEK)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={searchParams.get("minPrice") || ""}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-400"
          />
          <input
            type="number"
            placeholder="Max"
            value={searchParams.get("maxPrice") || ""}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>
    </div>
  );
}
