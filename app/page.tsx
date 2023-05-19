"use client";
import BlogPost from "@/components/BlogPost";
import Post from "./posts/page";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  const { token } = useContext(AuthContext);
  if (!token) {
    router.push("/login");
  }
  return (
    <div>
      <BlogPost />
      <Post />
    </div>
  );
}
