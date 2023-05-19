import dotenv from "dotenv";
export const config = {
  jwtSecret: process.env.JWT_SECRET || "",
};
