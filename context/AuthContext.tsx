"use client";

import { createContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface User {
  id: string | null;
  email: string | null;
  name: string | null;
  token: string | null;
  updateData: (value: any) => void;
}

const defaultUser: User = {
  id: null,
  email: null,
  name: null,
  token: null,
  updateData: () => {},
};

export const AuthContext = createContext(defaultUser);

export const AuthContextProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState(defaultUser);
  //   console.log("context: ", userData);
  useEffect(() => {
    const email = localStorage.getItem("email");
    const id = localStorage.getItem("id");
    const name = localStorage.getItem("name");
    const token = localStorage.getItem("token");

    if (token) {
      setUserData({
        ...userData,
        token: token,
        email: email,
        id: id,
        name: name,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...userData, updateData: setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
