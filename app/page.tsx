"use client";
import BlogPost from "@/components/BlogPost";
import Post from "./posts/page";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function App() {
  const { token } = useContext(AuthContext);
  // console.log(token);
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
