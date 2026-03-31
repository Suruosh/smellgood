import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const brand = searchParams.get("brand") || undefined;
  const scentFamily = searchParams.get("scentFamily") || undefined;
  const concentration = searchParams.get("concentration") || undefined;
  const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;
  const search = searchParams.get("search") || undefined;
  const sortBy = searchParams.get("sortBy") || "newest";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "24", 10);

  const where: any = {};
  if (brand) where.brand = brand;
  if (scentFamily) where.scentFamily = { contains: scentFamily };
  if (concentration) where.concentration = { contains: concentration };
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
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

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  const serialized = products.map((p) => ({
    ...p,
    images: JSON.parse(p.images || "[]"),
    categories: JSON.parse(p.categories || "[]"),
    tags: JSON.parse(p.tags || "[]"),
  }));

  return NextResponse.json({
    products: serialized,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}
