import { Outlet } from "react-router-dom";
import { NavBar } from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="relative">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
