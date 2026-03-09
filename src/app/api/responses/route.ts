import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const body = await req.json()

  const response = await prisma.response.create({
    data: {
      reviewId: body.reviewId,
      adminId: "114553dd-4c66-4d62-ac13-24ad41ddfa0d",
      message: body.message
    }
  })

  return NextResponse.json(response)
}