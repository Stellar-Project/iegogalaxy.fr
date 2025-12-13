import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
// import Wiki from "./pages/Wiki";
import Tutorial from "./pages/Tutorial";
import About from "./pages/About";
import Download from "./pages/Download";
import MentionsLegales from "./pages/MentionsLegales";
import Kuriimu1 from "./pages/wiki/Kuriimu1";
import NotFound from "./pages/NotFound";
import Unavailable from "./pages/Unavailable";

export default function App() {
  return (
    <Routes>
      {/* Routes avec Layout */}
      <Route element={<Layout />}>
        {/* Routes publiques */}
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/apropos" element={<About />} />
        {/* <Route path="/wiki" element={<Wiki />} /> */}
        <Route path="/tutoriel" element={<Tutorial />} />
        <Route path="/telechargement" element={<Download />} />
        {/* Routes des différents tutos */}
        <Route path="/wiki/Kuriimu1" element={<Kuriimu1 />} />
        {/* Routes légales */}
        <Route path="/mentions-legales" element={<MentionsLegales />} />
      </Route>

      {/* Route 404 hors Layout */}
      <Route path="*" element={<NotFound />} />
      <Route path="/wiki" element={<Unavailable />} />
    </Routes>
  );
}
