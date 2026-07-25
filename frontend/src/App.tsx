import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/api/useAuth";
import Layout from "./components/Layout";
import AdminLayout from "./components/admin/Layout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Tracker from "./components/Tracker";
import Home from "./pages/Home";
import Tutorial from "./pages/Tutorial";
import About from "./pages/About";
import Download from "./pages/Download";
import MentionsLegales from "./pages/MentionsLegales";
import WikiPageView from "./pages/wiki/WikiPageView";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Wiki from "./pages/Wiki";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import PatchesAdmin from "./pages/admin/PatchesAdmin";
import TeamAdmin from "./pages/admin/TeamAdmin";
import TimelineAdmin from "./pages/admin/TimelineAdmin";
import CreditsAdmin from "./pages/admin/CreditsAdmin";
import ScreenshotsAdmin from "./pages/admin/ScreenshotsAdmin";
import HeroAdmin from "./pages/admin/HeroAdmin";
import WikiAdmin from "./pages/admin/WikiAdmin";
import BlogAdmin from "./pages/admin/BlogAdmin";
import ConfigAdmin from "./pages/admin/ConfigAdmin";

export default function App() {
  return (
    <AuthProvider>
      <Tracker />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/apropos" element={<About />} />
          <Route path="/tutoriel" element={<Tutorial />} />
          <Route path="/telechargement" element={<Download />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/wiki/:slug" element={<WikiPageView />} />
          <Route path="/actualites/:slug" element={<BlogPost />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="patches" element={<PatchesAdmin />} />
          <Route path="team" element={<TeamAdmin />} />
          <Route path="timeline" element={<TimelineAdmin />} />
          <Route path="credits" element={<CreditsAdmin />} />
          <Route path="screenshots" element={<ScreenshotsAdmin />} />
          <Route path="hero" element={<HeroAdmin />} />
          <Route path="wiki" element={<WikiAdmin />} />
          <Route path="blog" element={<BlogAdmin />} />
          <Route path="config" element={<ConfigAdmin />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
