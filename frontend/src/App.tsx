import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/api/useAuth"
import Layout from "./components/Layout"
import AdminLayout from "./components/admin/Layout"
import ProtectedRoute from "./components/admin/ProtectedRoute"
import Loading from "./components/Loading"
import { useMeta } from "@/lib/useMeta"

// Pages publiques (Lazy Loaded)
const Home = lazy(() => import("./pages/Home"))
const Tutorial = lazy(() => import("./pages/Tutorial"))
const About = lazy(() => import("./pages/About"))
const Download = lazy(() => import("./pages/Download"))
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"))
const Wiki = lazy(() => import("./pages/Wiki"))
const WikiPageView = lazy(() => import("./pages/wiki/WikiPageView"))
const GamePageView = lazy(() => import("./pages/games/GamePageView"))
const BlogPost = lazy(() => import("./pages/BlogPost"))
const Faq = lazy(() => import("./pages/Faq"))
const NotFound = lazy(() => import("./pages/NotFound"))

// Pages d'administration (Lazy Loaded)
const Login = lazy(() => import("./pages/admin/Login"))
const Dashboard = lazy(() => import("./pages/admin/Dashboard"))
const PatchesAdmin = lazy(() => import("./pages/admin/PatchesAdmin"))
const TeamAdmin = lazy(() => import("./pages/admin/TeamAdmin"))
const TimelineAdmin = lazy(() => import("./pages/admin/TimelineAdmin"))
const CreditsAdmin = lazy(() => import("./pages/admin/CreditsAdmin"))
const ScreenshotsAdmin = lazy(() => import("./pages/admin/ScreenshotsAdmin"))
const HeroAdmin = lazy(() => import("./pages/admin/HeroAdmin"))
const WikiAdmin = lazy(() => import("./pages/admin/WikiAdmin"))
const GameAdmin = lazy(() => import("./pages/admin/GameAdmin"))
const FaqAdmin = lazy(() => import("./pages/admin/FaqAdmin"))
const BlogAdmin = lazy(() => import("./pages/admin/BlogAdmin"))
const ConfigAdmin = lazy(() => import("./pages/admin/ConfigAdmin"))
const UsersAdmin = lazy(() => import("./pages/admin/UsersAdmin"))

function PageLoader() {
  return <Loading fullScreen message="Chargement de la page..." />
}

export default function App() {
  useMeta({})

  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/apropos" element={<About />} />
            <Route path="/tutoriel" element={<Tutorial />} />
            <Route path="/telechargement" element={<Download />} />
            <Route path="/wiki" element={<Wiki />} />
            <Route path="/wiki/:slug" element={<WikiPageView />} />
            <Route path="/jeux/:slug" element={<GamePageView />} />
            <Route path="/actualites/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<Faq />} />
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
            <Route path="jeux" element={<GameAdmin />} />
            <Route path="faq" element={<FaqAdmin />} />
            <Route path="blog" element={<BlogAdmin />} />
            <Route path="config" element={<ConfigAdmin />} />
            <Route path="users" element={<UsersAdmin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  )
}
