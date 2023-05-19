import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: "hsuwai@gmai.com",
      },
    });
    return new NextResponse(JSON.stringify({ user }));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }));
  }
}
