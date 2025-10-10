import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Download from "./pages/Download";
// import Wiki from "./pages/Wiki";
import Kuriimu1 from "./pages/wiki/Kuriimu1";
import Tutorial from "./pages/Tutorial";
import Unavailable from "./components/Unavailable";

export default function App() {
  return (
    <Routes>
      {/* Routes avec Layout (Navbar + Footer) */}
      <Route element={<Layout />}>
        {/* Routes publiques */}
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/wiki" element={<Wiki />} /> */}
        <Route path="/wiki" element={<Unavailable/>} />
        <Route path="/tutoriel" element={<Tutorial />} />
        <Route path="/telechargement" element={<Download />} />

        {/* Routes des différents tutos */}
        <Route path="/wiki/Kuriimu1" element={<Kuriimu1 />} />

        {/* Routes légales */}
        {/* <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/dmca" element={<DMCA />} /> */}
      </Route>

      {/* Route 404 hors Layout */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
