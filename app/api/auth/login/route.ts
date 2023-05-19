import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
import { config } from "@/app/config/config";
const prisma = new PrismaClient();

const createToken = (id: any) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: "3d" });
};

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, password } = await req.json();
  if (!email || !password)
    return new NextResponse(JSON.stringify({ error: "All fields fill" }), {
      status: 401,
    });
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!user)
    return new NextResponse(JSON.stringify({ error: "User Not Found" }));
  const hashedPassword: any = user.password;
  const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
  const token = createToken(user.id);

  // delete user?.password;
  return isCorrectPassword
    ? new NextResponse(JSON.stringify({ user, token }), {
        status: 200,
      })
    : new NextResponse(JSON.stringify({ messg: "Wrong Password" }), {
        status: 400,
      });
}
