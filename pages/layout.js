import Navbar from "./components/navbar";
import { useSession } from "next-auth/react";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
