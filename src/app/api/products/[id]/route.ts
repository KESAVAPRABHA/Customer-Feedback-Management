import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  // Unwrap the params properly
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}