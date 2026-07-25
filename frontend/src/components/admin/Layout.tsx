import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/api/useAuth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, Download, Users, Clock, Star, Image, BookOpen, Settings, LogOut, Menu, X, Newspaper, Database,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/patches", icon: Download, label: "Patches" },
  { to: "/admin/team", icon: Users, label: "Équipe" },
  { to: "/admin/timeline", icon: Clock, label: "Timeline" },
  { to: "/admin/credits", icon: Star, label: "Crédits" },
  { to: "/admin/screenshots", icon: Image, label: "Screenshots" },
  { to: "/admin/hero", icon: Image, label: "Hero" },
  { to: "/admin/wiki", icon: BookOpen, label: "Wiki" },
  { to: "/admin/blog", icon: Newspaper, label: "Actualités" },
  { to: "/admin/config", icon: Settings, label: "Configuration" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-white/10 transform transition-transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}>
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <Link to="/admin" className="text-lg font-bold text-white">Admin Panel</Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </Button>
        </div>
        <nav className="p-2 space-y-1">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${location.pathname === item.to ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-2 mb-2 text-sm text-slate-400">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            {user?.name}
          </div>
          <Button variant="ghost" size="sm" className="w-full text-slate-400 justify-start" onClick={logout}>
            <LogOut size={16} className="mr-2" /> Déconnexion
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur border-b border-white/10 px-4 h-14 flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </Button>
          <h1 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            {navItems.find((n) => n.to === location.pathname)?.label || "Admin"}
          </h1>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
