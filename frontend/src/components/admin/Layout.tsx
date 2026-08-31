import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/api/useAuth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, Download, Users, Clock, Star, Image, BookOpen, Settings, LogOut, Menu, X, Newspaper, ChevronLeft, PanelLeftClose, PanelLeftOpen, Gamepad2, HelpCircle, Shield,
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
  { to: "/admin/jeux", icon: Gamepad2, label: "Jeux" },
  { to: "/admin/faq", icon: HelpCircle, label: "FAQ" },
  { to: "/admin/config", icon: Settings, label: "Configuration" },
  { to: "/admin/users", icon: Shield, label: "Utilisateurs" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className={`fixed inset-y-0 left-0 z-50 ${collapsed ? "w-16" : "w-64"} bg-slate-900 border-r border-white/10 transition-all duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}>
        <div className={`border-b border-white/10 flex items-center ${collapsed ? "justify-center p-2 h-14" : "justify-between p-4"}`}>
          {!collapsed && <Link to="/admin" className="text-lg font-bold text-white truncate">Admin</Link>}
          <Button variant="ghost" size="icon" className={collapsed ? "" : "lg:hidden"} onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </Button>
        </div>
        <nav className={`p-2 space-y-1 ${collapsed ? "flex flex-col items-center" : ""}`}>
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to} title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 rounded-lg transition-colors ${collapsed ? "justify-center p-2 w-10 h-10" : "px-3 py-2"} ${active ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
                <item.icon size={18} />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>
        <div className={`absolute bottom-0 left-0 right-0 border-t border-white/10 ${collapsed ? "p-2 flex flex-col items-center" : "p-4"}`}>
          <div className={`flex items-center gap-2 text-sm text-slate-400 ${collapsed ? "justify-center mb-2" : "mb-2"}`}>
            <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
            {!collapsed && user?.name}
          </div>
          <Button variant="ghost" size={collapsed ? "icon" : "sm"} className={collapsed ? "text-slate-400" : "w-full text-slate-400 justify-start"} onClick={logout} title={collapsed ? "Déconnexion" : undefined}>
            <LogOut size={16} />
            {!collapsed && <span className="ml-2">Déconnexion</span>}
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-white/10 px-4 h-14 flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="hidden lg:flex text-slate-500 hover:text-white" onClick={() => setCollapsed(!collapsed)} title={collapsed ? "Développer" : "Réduire"}>
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
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
