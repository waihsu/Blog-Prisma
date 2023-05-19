"use client";
import BlogPost from "@/components/BlogPost";
import Post from "./posts/page";
import { useRouter } from "next/navigation";

export default function App() {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    useRouter().push("/login");
  }
  return (
    <div>
      <BlogPost />
      <Post />
    </div>
  );
}
