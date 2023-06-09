import Navbar from "@/components/Navbar";
import { AuthContextProvider } from "@/context/AuthContext";
import { PostContextProvider } from "@/context/PostContext";

export const metadata = {
  title: "Instegram",
  description: "Generated by create next app",
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <AuthContextProvider>
      <html>
        <body>
          <Navbar />
          <PostContextProvider>{children}</PostContextProvider>
        </body>
      </html>
    </AuthContextProvider>
  );
};

export default RootLayout;
