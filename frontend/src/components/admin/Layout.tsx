import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/api/useAuth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Download,
  Users,
  Clock,
  Star,
  Image,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
  Newspaper,
  PanelLeftClose,
  PanelLeftOpen,
  Gamepad2,
  HelpCircle,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/jeux", icon: Gamepad2, label: "Jeux & Mods" },
  { to: "/admin/patches", icon: Download, label: "Patches" },
  { to: "/admin/blog", icon: Newspaper, label: "Actualités" },
  { to: "/admin/wiki", icon: BookOpen, label: "Wiki" },
  { to: "/admin/team", icon: Users, label: "Équipe" },
  { to: "/admin/timeline", icon: Clock, label: "Timeline" },
  { to: "/admin/credits", icon: Star, label: "Crédits" },
  { to: "/admin/screenshots", icon: Image, label: "Screenshots" },
  { to: "/admin/hero", icon: Image, label: "Fonds Hero" },
  { to: "/admin/faq", icon: HelpCircle, label: "FAQ" },
  { to: "/admin/users", icon: Shield, label: "Utilisateurs" },
  { to: "/admin/config", icon: Settings, label: "Configuration" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const activeNavItem = navItems.find((n) => n.to === location.pathname);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col ${
          collapsed ? "w-16" : "w-64"
        } bg-card border-r border-border transition-all duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        <div
          className={`border-b border-border flex items-center shrink-0 ${
            collapsed ? "justify-center px-2 h-14" : "justify-between px-4 h-14"
          }`}
        >
          {!collapsed && (
            <Link to="/admin" className="flex items-center gap-2 text-foreground truncate cursor-pointer">
              <span className="text-primary font-mono text-base font-black tracking-tight">STELLAR</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-black">• Admin</span>
            </Link>
          )}

          {collapsed && (
            <Link to="/admin" className="text-primary font-mono text-base font-black cursor-pointer">
              ST
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
            onClick={() => setMobileOpen(false)}
          >
            <X size={18} />
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                title={collapsed ? item.label : undefined}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg text-sm transition-colors cursor-pointer ${
                  collapsed ? "justify-center p-2 h-10 w-full" : "px-3 py-2"
                } ${
                  active
                    ? "bg-primary/15 text-primary font-black shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60 font-medium"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className={`border-t border-border bg-secondary/20 shrink-0 ${collapsed ? "p-2 flex flex-col items-center" : "p-3"}`}>
          {!collapsed && (
            <div className="flex items-center justify-between gap-2 mb-2 px-1">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                <span className="text-xs font-black text-foreground truncate">{user?.name || "Administrateur"}</span>
              </div>
            </div>
          )}

          <div className={`flex ${collapsed ? "flex-col gap-1.5" : "flex-col gap-1"}`}>
            <Button
              variant="ghost"
              size={collapsed ? "icon" : "sm"}
              asChild
              className={`text-muted-foreground hover:text-foreground cursor-pointer ${collapsed ? "h-9 w-9" : "w-full justify-start text-xs font-black"}`}
              title={collapsed ? "Retour au site public" : undefined}
            >
              <Link to="/">
                <ArrowLeft size={15} />
                {!collapsed && <span className="ml-2">Retour au site</span>}
              </Link>
            </Button>

            <Button
              variant="ghost"
              size={collapsed ? "icon" : "sm"}
              className={`text-destructive hover:bg-destructive/10 cursor-pointer ${collapsed ? "h-9 w-9" : "w-full justify-start text-xs font-black"}`}
              onClick={logout}
              title={collapsed ? "Déconnexion" : undefined}
            >
              <LogOut size={15} />
              {!collapsed && <span className="ml-2">Déconnexion</span>}
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <header className="sticky top-0 z-30 bg-background border-b border-border px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-muted-foreground hover:text-foreground h-9 w-9 cursor-pointer"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={19} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex text-muted-foreground hover:text-foreground h-9 w-9 cursor-pointer"
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? "Développer le menu" : "Réduire le menu"}
            >
              {collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
            </Button>

            <h1 className="text-sm font-black text-foreground tracking-tight uppercase truncate">
              {activeNavItem?.label || "Administration"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex text-xs h-8 text-foreground border-border hover:bg-secondary font-black cursor-pointer shadow-xs">
              <Link to="/" target="_blank">
                Voir le site
              </Link>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}