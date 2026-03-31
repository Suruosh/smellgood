import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

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

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) return { title: "Produkt hittades inte" };
  return {
    title: `${product.name} – ${product.brand} | SmellGood`,
    description: product.description || `Köp ${product.name} från ${product.brand} hos SmellGood.`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const raw = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!raw) notFound();
  const product = deserializeProduct(raw);

  const related = await prisma.product.findMany({
    where: {
      brand: product.brand,
      slug: { not: product.slug },
      available: true,
    },
    take: 4,
  });
  const relatedSerialized = related.map(deserializeProduct);

  const notes = [
    { label: "Toppnoter", value: product.topNotes },
    { label: "Hjärtnoter", value: product.middleNotes },
    { label: "Basnoter", value: product.baseNotes },
  ].filter((n) => n.value);

  return (
    <div className="container py-8">
      <Link href="/produkter" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ChevronLeft size={16} />
        Tillbaka till parfymer
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl overflow-hidden">
            {product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">🌸</div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <div key={i} className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-amber-50 border-2 border-transparent hover:border-amber-400 cursor-pointer">
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-contain p-2" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-wide mb-2">{product.brand}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

          {product.scentFamily && (
            <span className="inline-block bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full mb-4">
              {product.scentFamily}
            </span>
          )}

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            <span className="text-sm text-gray-400">{product.sizeMl} ml · {product.concentration || "Parfym"}</span>
          </div>

          {product.description && (
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          )}

          {notes.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-5 mb-6 space-y-3">
              <h3 className="font-semibold text-gray-800 text-sm">Doftpyramid</h3>
              {notes.map((note) => (
                <div key={note.label} className="flex gap-3 text-sm">
                  <span className="text-gray-500 w-24 flex-shrink-0">{note.label}</span>
                  <span className="text-gray-700">{note.value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mb-6">
            {product.available ? (
              <span className="inline-flex items-center gap-1.5 text-green-600 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                I lager
                {product.stock > 0 && product.stock <= 10 && ` (${product.stock} kvar)`}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-gray-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-gray-400" />
                Slutsåld
              </span>
            )}
          </div>

          <AddToCartButton product={product} />

          <div className="mt-6 pt-6 border-t space-y-2">
            {[
              "🚚 Fri frakt över 500 kr",
              "↩️ 14 dagars öppet köp",
              "🔒 Säker betalning",
            ].map((badge) => (
              <p key={badge} className="text-sm text-gray-500">{badge}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedSerialized.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Fler från {product.brand}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedSerialized.map((p) => {
              const imgs = p.images;
              return (
                <Link key={p.id} href={`/produkter/${p.slug}`} className="group block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
                      {imgs[0] ? (
                        <img src={imgs[0]} alt={p.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">🌸</div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-500 truncate">{p.brand}</p>
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-sm font-bold mt-1">{formatPrice(p.price)}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
