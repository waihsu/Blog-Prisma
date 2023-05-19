import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { NextRequest, NextResponse } from "next/server";
import next from "next";

export const requireAuth = async (req: NextRequest) => {
  const headers = await req.json();
  const authorization = headers.authorization;
  if (!authorization)
    return new NextResponse(JSON.stringify({ error: "Need Auth" }), {
      status: 401,
    });
  try {
    const token = authorization.split(" ")[1];
    jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), { status: 401 });
  }
};
