import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Download from "./pages/Download";

export default function App() {
  return (
    <Routes>
      {/* Routes avec Layout (Navbar + Footer) */}
      <Route element={<Layout />}>
        {/* Routes publiques */}
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/telechargement" element={<Download />} />

        {/* Routes légales */}
        {/* <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/dmca" element={<DMCA />} /> */}
      </Route>

      {/* Route 404 hors Layout */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
