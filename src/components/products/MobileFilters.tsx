"use client";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductFilters } from "./ProductFilters";
import { useSearchParams } from "next/navigation";

interface Props {
  brands: string[];
}

export function MobileFilters({ brands }: Props) {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const hasFilters =
    searchParams.has("brand") ||
    searchParams.has("scentFamily") ||
    searchParams.has("concentration") ||
    searchParams.has("minPrice") ||
    searchParams.has("maxPrice");

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-medium hover:border-amber-400 transition-colors"
      >
        <SlidersHorizontal size={16} />
        Filter &amp; sortera
        {hasFilters && <span className="bg-amber-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">!</span>}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto">
            <ProductFilters brands={brands} onClose={() => setOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}
