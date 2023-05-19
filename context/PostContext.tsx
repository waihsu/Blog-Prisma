"use client";
import { ReactNode, createContext, useState } from "react";

interface Post {
  user: [];
  //   id: string | null;
  //   title: string | null;
  //   body: string | null;
  updatePost: () => void;
}

interface Props {
  children: ReactNode;
}

const defaultPost: Post = {
  //   id: null,
  //   title: null,
  //   body: null,
  user: [],
  updatePost: () => {},
};

export const PostContext = createContext(defaultPost);

export const PostContextProvider = ({ children }: Props) => {
  const [posts, setPost] = useState(defaultPost);
  //   console.log("post:", posts);
  const fetchPost = async () => {
    const resp = await fetch("/api/post");
    const data = await resp.json();

    setPost({ ...posts, user: data });
  };

  return (
    <PostContext.Provider value={{ ...posts, updatePost: fetchPost }}>
      {children}
    </PostContext.Provider>
  );
};
