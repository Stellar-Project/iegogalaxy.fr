import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api/client";
import type { AnalyticsStats } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  Users,
  BookOpen,
  ImageIcon,
  Newspaper,
  Database,
  BarChart3,
  Eye,
  TrendingUp,
  ArrowUpRight,
  Globe,
  DownloadCloud,
  PlusCircle,
  Activity,
  Percent,
  Gamepad2,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Dashboard() {
  const [counts, setCounts] = useState({ patches: 0, team: 0, wiki: 0, screenshots: 0, blog: 0, games: 0 });
  const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);
  const [exporting, setExporting] = useState(false);
  const [csvExporting, setCsvExporting] = useState(false);
  const [period, setPeriod] = useState<7 | 14 | 30>(30);
  const [apiLatency, setApiLatency] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      const start = performance.now();
      const [patches, team, wiki, screenshots, blog, games, analyticsData] = await Promise.allSettled([
        api.getPatches(),
        api.getTeam(),
        api.getWikiTools(),
        api.getScreenshots(),
        api.getPosts(true),
        api.getGames(),
        api.getAnalytics(),
      ]);

      const end = performance.now();

      if (!isMounted) return;

      setApiLatency(Math.round(end - start));

      setCounts({
        patches: patches.status === "fulfilled" ? patches.value.length : 0,
        team: team.status === "fulfilled" ? team.value.length : 0,
        wiki: wiki.status === "fulfilled" ? wiki.value.length : 0,
        screenshots: screenshots.status === "fulfilled" ? screenshots.value.length : 0,
        blog: blog.status === "fulfilled" ? blog.value.length : 0,
        games: games.status === "fulfilled" ? games.value.length : 0,
      });

      if (analyticsData.status === "fulfilled") {
        setAnalytics(analyticsData.value);
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const items = [
    { label: "Patches", value: counts.patches, icon: Download, link: "/admin/patches" },
    { label: "Jeux & Mods", value: counts.games, icon: Gamepad2, link: "/admin/jeux" },
    { label: "Membres", value: counts.team, icon: Users, link: "/admin/team" },
    { label: "Wiki Outils", value: counts.wiki, icon: BookOpen, link: "/admin/wiki" },
    { label: "Screenshots", value: counts.screenshots, icon: ImageIcon, link: "/admin/screenshots" },
    { label: "Actualités", value: counts.blog, icon: Newspaper, link: "/admin/blog" },
  ];

  const conversionRate = useMemo(() => {
    if (!analytics || analytics.uniqueVisitors === 0) return 0;
    return Math.min(100, Math.round((analytics.totalDownloads / analytics.uniqueVisitors) * 100));
  }, [analytics]);

  const filteredViewsByDay = useMemo(() => {
    if (!analytics) return [];
    return analytics.viewsByDay.slice(-period);
  }, [analytics, period]);

  const filteredDownloadsByDay = useMemo(() => {
    if (!analytics) return [];
    return analytics.downloadsByDay.slice(-period);
  }, [analytics, period]);

  const maxViewDay = Math.max(...(filteredViewsByDay.map((d) => d.count) || [1]), 1);
  const maxDlDay = Math.max(...(filteredDownloadsByDay.map((d) => d.count) || [1]), 1);

  const doExport = async () => {
    setExporting(true);
    try {
      const data = await api.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `iegogalaxy-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Export échoué");
    }
    setExporting(false);
  };

  const exportCSV = () => {
    if (!analytics) return;
    setCsvExporting(true);
    const rows: string[][] = [["Métrique", "Valeur"]];
    rows.push(["Vues totales", String(analytics.totalViews)]);
    rows.push(["Vues aujourd'hui", String(analytics.todayViews)]);
    rows.push(["Visiteurs uniques", String(analytics.uniqueVisitors)]);
    rows.push(["Téléchargements totaux", String(analytics.totalDownloads)]);
    rows.push(["Taux de conversion (%)", String(conversionRate)]);
    rows.push([""]);
    rows.push(["Pages les plus vues", "Vues"]);
    analytics.viewsByPage.forEach((p) => rows.push([p.path, String(p._count)]));
    rows.push([""]);
    rows.push(["Fichiers téléchargés", "Téléchargements"]);
    analytics.downloadsByFile.forEach((d) => rows.push([d.file, String(d._count)]));
    rows.push([""]);
    rows.push(["Vues par jour", "Compte"]);
    analytics.viewsByDay.forEach((d) => rows.push([d.date, String(d.count)]));
    rows.push([""]);
    rows.push(["Téléchargements par jour", "Compte"]);
    analytics.downloadsByDay.forEach((d) => rows.push([d.date, String(d.count)]));

    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `iegogalaxy-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setCsvExporting(false);
  };

  const handleResetAnalytics = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir réinitialiser toutes les statistiques ?")) return;
    try {
      await api.resetAnalytics();
      const updated = await api.getAnalytics();
      setAnalytics(updated);
      toast.success("Statistiques réinitialisées");
    } catch {
      toast.error("Échec de la réinitialisation");
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-card/80 border border-border p-6 backdrop-blur-md shadow-xs">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
          <img src="/assets/global/bg/mainVisual_02.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-foreground tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground text-sm mt-1 font-medium">Vue d'ensemble et contrôle de Stellar Project</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-secondary/50 border border-border px-3 py-1.5 rounded-xl text-xs font-black">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--color-accent)]" />
              <span className="text-foreground">API opérationnelle</span>
              {apiLatency !== null && <span className="text-muted-foreground font-mono">({apiLatency} ms)</span>}
            </div>
            <Button size="sm" variant="outline" asChild className="border-border hover:bg-secondary text-foreground font-black cursor-pointer shadow-xs">
              <Link to="/" target="_blank">
                <ExternalLink size={14} className="mr-1.5" /> Voir le site
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button asChild variant="outline" className="justify-start h-11 bg-card/70 hover:bg-secondary border-border font-black cursor-pointer shadow-xs">
          <Link to="/admin/blog">
            <PlusCircle size={16} className="text-primary mr-2 shrink-0" /> Nouvel article
          </Link>
        </Button>
        <Button asChild variant="outline" className="justify-start h-11 bg-card/70 hover:bg-secondary border-border font-black cursor-pointer shadow-xs">
          <Link to="/admin/patches">
            <PlusCircle size={16} className="text-accent mr-2 shrink-0" /> Nouveau patch
          </Link>
        </Button>
        <Button asChild variant="outline" className="justify-start h-11 bg-card/70 hover:bg-secondary border-border font-black cursor-pointer shadow-xs">
          <Link to="/admin/jeux">
            <PlusCircle size={16} className="text-primary mr-2 shrink-0" /> Nouveau jeu/mod
          </Link>
        </Button>
        <Button asChild variant="outline" className="justify-start h-11 bg-card/70 hover:bg-secondary border-border font-black cursor-pointer shadow-xs">
          <Link to="/admin/wiki">
            <PlusCircle size={16} className="text-accent mr-2 shrink-0" /> Outil wiki
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Link to={item.link} className="block group cursor-pointer h-full">
              <Card className="hover:border-primary/50 bg-card/70 backdrop-blur-md transition-all h-full shadow-xs">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-black uppercase tracking-wider text-muted-foreground">{item.label}</CardTitle>
                  <div className="p-1.5 rounded-lg bg-secondary text-foreground group-hover:text-primary transition-colors">
                    <item.icon size={16} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-black text-foreground group-hover:text-primary transition-colors font-mono">{item.value}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-card/70 backdrop-blur-md shadow-xs">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-secondary text-primary"><Eye size={18} /></div>
              <CardTitle className="text-xs text-muted-foreground font-black uppercase tracking-wider">Vues aujourd'hui</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-black text-foreground font-mono">{analytics.todayViews}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/70 backdrop-blur-md shadow-xs">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-secondary text-accent"><TrendingUp size={18} /></div>
              <CardTitle className="text-xs text-muted-foreground font-black uppercase tracking-wider">Vues totales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-black text-foreground font-mono">{analytics.totalViews}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/70 backdrop-blur-md shadow-xs">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-secondary text-primary"><Users size={18} /></div>
              <CardTitle className="text-xs text-muted-foreground font-black uppercase tracking-wider">Visiteurs uniques</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-black text-foreground font-mono">{analytics.uniqueVisitors}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/70 backdrop-blur-md shadow-xs">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-secondary text-accent"><DownloadCloud size={18} /></div>
              <CardTitle className="text-xs text-muted-foreground font-black uppercase tracking-wider">Téléchargements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-black text-foreground font-mono">{analytics.totalDownloads}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/70 backdrop-blur-md shadow-xs">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-secondary text-foreground"><Percent size={18} /></div>
              <CardTitle className="text-xs text-muted-foreground font-black uppercase tracking-wider">Conversion DL</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-black text-foreground font-mono">{conversionRate}%</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-foreground flex items-center gap-2 tracking-tight">
            <Activity size={18} className="text-primary" /> Évolution de l'activité
          </h3>
          <div className="flex items-center bg-card/70 border border-border rounded-xl p-0.5 text-xs font-black shadow-xs">
            {([7, 14, 30] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setPeriod(d)}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  period === d ? "bg-primary text-primary-foreground font-black shadow-xs" : "text-muted-foreground hover:text-foreground font-bold"
                }`}
              >
                {d}j
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {analytics && filteredViewsByDay.length > 0 && (
            <Card className="bg-card/70 backdrop-blur-md shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-foreground font-black tracking-tight flex items-center gap-2">
                  <BarChart3 size={16} className="text-primary" /> Vues ({period} derniers jours)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart data={filteredViewsByDay} max={maxViewDay} variant="primary" />
              </CardContent>
            </Card>
          )}

          {analytics && filteredDownloadsByDay.length > 0 && (
            <Card className="bg-card/70 backdrop-blur-md shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-foreground font-black tracking-tight flex items-center gap-2">
                  <DownloadCloud size={16} className="text-accent" /> Téléchargements ({period} derniers jours)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart data={filteredDownloadsByDay} max={maxDlDay} variant="accent" />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {analytics && analytics.viewsByPage.length > 0 && (
          <Card className="bg-card/70 backdrop-blur-md shadow-xs">
            <CardHeader>
              <CardTitle className="text-base text-foreground font-black tracking-tight flex items-center gap-2">
                <ArrowUpRight size={16} className="text-primary" /> Pages les plus vues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-55 overflow-y-auto pr-1">
                {analytics.viewsByPage.map((p) => (
                  <div key={p.path} className="flex items-center justify-between text-sm py-1.5 border-b border-border last:border-0">
                    <span className="text-foreground truncate font-mono text-xs font-bold">{p.path || "/"}</span>
                    <span className="text-muted-foreground shrink-0 ml-4 text-xs font-black font-mono">{p._count} vues</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {analytics && analytics.downloadsByFile.length > 0 && (
          <Card className="bg-card/70 backdrop-blur-md shadow-xs">
            <CardHeader>
              <CardTitle className="text-base text-foreground font-black tracking-tight flex items-center gap-2">
                <Download size={16} className="text-accent" /> Fichiers les plus téléchargés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-55 overflow-y-auto pr-1">
                {analytics.downloadsByFile.map((d) => (
                  <div key={d.file} className="flex items-center justify-between text-sm py-1.5 border-b border-border last:border-0">
                    <span className="text-foreground truncate text-xs font-bold">{d.file.split("/").pop() || d.file}</span>
                    <span className="text-muted-foreground shrink-0 ml-4 text-xs font-black font-mono">{d._count} téléch.</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {analytics && analytics.topReferrers.length > 0 && (
        <Card className="bg-card/70 backdrop-blur-md shadow-xs">
          <CardHeader>
            <CardTitle className="text-base text-foreground font-black tracking-tight flex items-center gap-2">
              <Globe size={16} className="text-primary" /> Provenance du trafic (référents)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {analytics.topReferrers.map((r) => (
                <div key={r.referrer} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-secondary/50 border border-border">
                  <span className="text-foreground truncate font-medium">{r.referrer}</span>
                  <span className="text-foreground font-black font-mono ml-2">{r._count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-card/70 backdrop-blur-md shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary text-foreground"><Database size={18} /></div>
              <span className="text-sm font-bold text-foreground">Sauvegarde globale (JSON)</span>
            </div>
            <Button size="sm" onClick={doExport} disabled={exporting} className="font-black cursor-pointer shadow-xs">
              {exporting ? "Export..." : "Exporter"}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/70 backdrop-blur-md shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary text-foreground"><Database size={18} /></div>
              <span className="text-sm font-bold text-foreground">Rapport complet (CSV)</span>
            </div>
            <Button size="sm" variant="secondary" onClick={exportCSV} disabled={csvExporting || !analytics} className="font-black cursor-pointer shadow-xs">
              {csvExporting ? "Export..." : "CSV"}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-destructive/30 bg-card/70 backdrop-blur-md shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10 text-destructive"><Database size={18} /></div>
              <span className="text-sm font-bold text-foreground">Purger les statistiques</span>
            </div>
            <Button size="sm" variant="destructive" onClick={handleResetAnalytics} className="font-black cursor-pointer shadow-xs">
              Reset
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function BarChart({
  data,
  max,
  variant,
}: {
  data: { date: string; count: number }[];
  max: number;
  variant: "primary" | "accent";
}) {
  const barColor = variant === "primary" ? "bg-primary shadow-[0_0_8px_var(--color-primary)]" : "bg-accent shadow-[0_0_8px_var(--color-accent)]";

  return (
    <div className="space-y-1.5 max-h-65 overflow-y-auto pr-1">
      {data.map((d) => (
        <div key={d.date} className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground w-20 shrink-0 text-xs font-mono font-bold">{d.date.slice(5)}</span>
          <div className="flex-1 bg-secondary/60 rounded h-4 overflow-hidden border border-border/40">
            <div
              className={`${barColor} h-full rounded transition-all duration-300`}
              style={{ width: `${Math.max(4, (d.count / max) * 100)}%` }}
            />
          </div>
          <span className="text-foreground w-10 text-right text-xs font-mono font-black">{d.count}</span>
        </div>
      ))}
    </div>
  );
}