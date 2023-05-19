import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { config } from "@/app/config/config";
const prisma = new PrismaClient();

const createToken = (id: number) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: "3d" });
};

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, username, password } = await req.json();
  if (!email || !username || !password)
    return new NextResponse(
      JSON.stringify({ error: "All fields need to fill" })
    );
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const registeredUser = await prisma.user.create({
      data: {
        email: email,
        name: username,
        password: hashedPassword,
      },
    });
    return new NextResponse(JSON.stringify(" Account created Successful"), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
}
