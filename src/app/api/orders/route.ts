import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, totalAmount, ...customerData } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        ...customerData,
        totalAmount,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            sku: item.sku,
            name: item.name,
            brand: item.brand,
            price: item.price,
            quantity: item.quantity,
            sizeMl: item.sizeMl,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
