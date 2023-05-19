import { config } from "@/app/config/config";
import jwt from "jsonwebtoken";
import { requireAuth } from "@/app/middleware/requireAuth";
import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  // const { id } = await req.json();
  try {
    const post = await prisma.post.findMany();

    return new NextResponse(JSON.stringify({ post }));
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
  //   const authorization = req.headers.get("authorization");
  //   //   console.log(authorization);

  //   if (!authorization)
  //     return new NextResponse(JSON.stringify({ error: "Need Auth" }), {
  //       status: 401,
  //     });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { title, authorId, body } = await req.json();
  console.log(title, authorId, body);
  const createPost = { title, authorId, body };
  // const authorization = req.headers.get("authorization");
  // //   console.log(authorization);

  // if (!authorization)
  //   return new NextResponse(JSON.stringify({ error: "Need Auth" }), {
  //     status: 401,
  //   });
  // try {
  //   const token = authorization.split(" ")[1];
  //   jwt.verify(token, config.jwtSecret);
  try {
    const post = await prisma.post.create({
      data: {
        author: {
          connect: {
            id: authorId,
          },
        },
        title: title,
        body: body,
        published: true,
      },
    });
    return new NextResponse(JSON.stringify({ success: "successful" }));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), { status: 401 });
  }
}
