import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import type { Product } from "@/types/product";
import { MobileFilters } from "@/components/products/MobileFilters";

function deserializeProduct(p: any): Product {
  return {
    ...p,
    images: JSON.parse(p.images || "[]"),
    categories: JSON.parse(p.categories || "[]"),
    tags: JSON.parse(p.tags || "[]"),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

const PAGE_SIZE = 24;

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const {
    brand,
    scentFamily,
    concentration,
    minPrice,
    maxPrice,
    search,
    sortBy = "newest",
    page = "1",
  } = searchParams;

  const pageNum = parseInt(page, 10) || 1;

  const where: any = { available: true };
  if (brand) where.brand = brand;
  if (scentFamily) where.scentFamily = { contains: scentFamily };
  if (concentration) where.concentration = { contains: concentration };
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { brand: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const orderBy: any =
    sortBy === "price_asc" ? { price: "asc" } :
    sortBy === "price_desc" ? { price: "desc" } :
    sortBy === "name_asc" ? { name: "asc" } :
    { createdAt: "desc" };

  const [products, total, brands] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: (pageNum - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.product.count({ where }),
    prisma.product.findMany({
      select: { brand: true },
      distinct: ["brand"],
      orderBy: { brand: "asc" },
    }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const brandList = brands.map((b) => b.brand);
  const productsSerialized = products.map(deserializeProduct);

  const buildPageUrl = (p: number) => {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (scentFamily) params.set("scentFamily", scentFamily);
    if (concentration) params.set("concentration", concentration);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (search) params.set("search", search);
    if (sortBy !== "newest") params.set("sortBy", sortBy);
    params.set("page", p.toString());
    return `/produkter?${params.toString()}`;
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {search ? `Sökresultat: "${search}"` : "Alla Parfymer"}
        </h1>
        <p className="text-gray-500 mt-1">{total} parfymer</p>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-60 flex-shrink-0">
          <Suspense>
            <ProductFilters brands={brandList} />
          </Suspense>
        </aside>

        <div className="flex-1 min-w-0">
          {/* Mobile filter button */}
          <div className="md:hidden mb-4">
            <Suspense>
              <MobileFilters brands={brandList} />
            </Suspense>
          </div>

          {productsSerialized.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-4">🔍</p>
              <p className="font-medium">Inga parfymer hittades</p>
              <p className="text-sm mt-2">Prova att ändra dina filter</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {productsSerialized.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <a
                      key={p}
                      href={buildPageUrl(p)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        p === pageNum
                          ? "bg-amber-500 text-white"
                          : "bg-white border border-gray-200 text-gray-600 hover:border-amber-300"
                      }`}
                    >
                      {p}
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
