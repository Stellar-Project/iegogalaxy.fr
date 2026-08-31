import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { AnalyticsStats } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Users, BookOpen, Image, Newspaper, Database, BarChart3, Eye, TrendingUp, ArrowUpRight, Globe, DownloadCloud } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Dashboard() {
  const [counts, setCounts] = useState({ patches: 0, team: 0, wiki: 0, screenshots: 0, blog: 0 });
  const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);

  useEffect(() => {
    Promise.all([
      api.getPatches().then((r) => setCounts((s) => ({ ...s, patches: r.length }))).catch(() => {}),
      api.getTeam().then((r) => setCounts((s) => ({ ...s, team: r.length }))).catch(() => {}),
      api.getWikiTools().then((r) => setCounts((s) => ({ ...s, wiki: r.length }))).catch(() => {}),
      api.getScreenshots().then((r) => setCounts((s) => ({ ...s, screenshots: r.length }))).catch(() => {}),
      api.getPosts(true).then((r) => setCounts((s) => ({ ...s, blog: r.length }))).catch(() => {}),
      api.getAnalytics().then(setAnalytics).catch(() => {}),
    ]);
  }, []);

  const items = [
    { label: "Patches", value: counts.patches, icon: Download, color: "text-yellow-400 bg-yellow-400/10" },
    { label: "Membres", value: counts.team, icon: Users, color: "text-blue-400 bg-blue-400/10" },
    { label: "Wiki Pages", value: counts.wiki, icon: BookOpen, color: "text-green-400 bg-green-400/10" },
    { label: "Screenshots", value: counts.screenshots, icon: Image, color: "text-purple-400 bg-purple-400/10" },
    { label: "Actualités", value: counts.blog, icon: Newspaper, color: "text-orange-400 bg-orange-400/10" },
  ];

  const [exporting, setExporting] = useState(false);
  const [csvExporting, setCsvExporting] = useState(false);

  const doExport = async () => {
    setExporting(true);
    try {
      const data = await api.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `iegogalaxy-export-${new Date().toISOString().slice(0, 10)}.json`; a.click();
      URL.revokeObjectURL(url);
    } catch { toast.error("Export échoué"); }
    setExporting(false);
  };

  const exportCSV = () => {
    if (!analytics) return;
    setCsvExporting(true);
    const rows = [["Métrique", "Valeur"]];
    rows.push(["Vues totales", String(analytics.totalViews)]);
    rows.push(["Vues aujourd'hui", String(analytics.todayViews)]);
    rows.push(["Visiteurs uniques", String(analytics.uniqueVisitors)]);
    rows.push(["Téléchargements totaux", String(analytics.totalDownloads)]);
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
    a.href = url; a.download = `iegogalaxy-analytics-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
    setCsvExporting(false);
  };

  const maxViewDay = Math.max(...(analytics?.viewsByDay.map((d) => d.count) || [1]), 1);
  const maxDlDay = Math.max(...(analytics?.downloadsByDay.map((d) => d.count) || [1]), 1);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-slate-900 to-slate-950 border border-white/10 p-6 mb-2">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <img src="/assets/global/bg/mainVisual_02.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-slate-400 text-sm mt-1">Vue d'ensemble du site Stellar Project</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {items.map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="bg-slate-900/80 border-white/10 hover:border-white/20 transition-all">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className={`p-2 rounded-lg ${item.color}`}>
                  <item.icon size={20} />
                </div>
                <CardTitle className="text-sm text-slate-400">{item.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white">{item.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {analytics && (
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="bg-slate-900/80 border-white/10">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-blue-400/10"><Eye size={20} className="text-blue-400" /></div>
              <CardTitle className="text-sm text-slate-400">Vues ajd</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{analytics.todayViews}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/80 border-white/10">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-green-400/10"><TrendingUp size={20} className="text-green-400" /></div>
              <CardTitle className="text-sm text-slate-400">Vues totales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{analytics.totalViews}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/80 border-white/10">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-purple-400/10"><Users size={20} className="text-purple-400" /></div>
              <CardTitle className="text-sm text-slate-400">Visiteurs uniques</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{analytics.uniqueVisitors}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/80 border-white/10">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-orange-400/10"><DownloadCloud size={20} className="text-orange-400" /></div>
              <CardTitle className="text-sm text-slate-400">Téléchargements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{analytics.totalDownloads}</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {analytics && analytics.viewsByDay.length > 0 && (
          <Card className="bg-slate-900/80 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2"><BarChart3 size={18} className="text-blue-400" /> Vues 30 derniers jours</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart data={analytics.viewsByDay} max={maxViewDay} color="blue" />
            </CardContent>
          </Card>
        )}

        {analytics && analytics.downloadsByDay.length > 0 && (
          <Card className="bg-slate-900/80 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2"><DownloadCloud size={18} className="text-orange-400" /> Téléchargements 30 jours</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart data={analytics.downloadsByDay} max={maxDlDay} color="orange" />
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {analytics && analytics.viewsByPage.length > 0 && (
          <Card className="bg-slate-900/80 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2"><ArrowUpRight size={18} className="text-purple-400" /> Pages les plus vues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analytics.viewsByPage.map((p) => (
                  <div key={p.path} className="flex items-center justify-between text-sm py-1 border-b border-white/5 last:border-0">
                    <span className="text-slate-300 truncate">{p.path || "/"}</span>
                    <span className="text-slate-500 shrink-0 ml-4">{p._count} vues</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {analytics && analytics.downloadsByFile.length > 0 && (
          <Card className="bg-slate-900/80 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2"><Download size={18} className="text-orange-400" /> Fichiers téléchargés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analytics.downloadsByFile.map((d) => (
                  <div key={d.file} className="flex items-center justify-between text-sm py-1 border-b border-white/5 last:border-0">
                    <span className="text-slate-300 truncate">{d.file.split("/").pop() || d.file}</span>
                    <span className="text-slate-500 shrink-0 ml-4">{d._count} téléch.</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {analytics && analytics.topReferrers.length > 0 && (
        <Card className="bg-slate-900/80 border-white/10">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2"><Globe size={18} className="text-green-400" /> Provenance (référents)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics.topReferrers.map((r) => (
                <div key={r.referrer} className="flex items-center justify-between text-sm py-1 border-b border-white/5 last:border-0">
                  <span className="text-slate-300 truncate">{r.referrer}</span>
                  <span className="text-slate-500 shrink-0 ml-4">{r._count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-slate-900/80 border-white/10 hover:border-green-500/30 transition-all">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-400/10"><Database size={20} className="text-green-400" /></div>
              <span className="text-sm text-slate-300">Exporter toutes les données (JSON)</span>
            </div>
            <Button size="sm" onClick={doExport} disabled={exporting} className="bg-green-600 hover:bg-green-500">
              {exporting ? "Export..." : "Exporter"}
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border-white/10 hover:border-blue-500/30 transition-all">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-400/10"><Database size={20} className="text-blue-400" /></div>
              <span className="text-sm text-slate-300">Exporter les statistiques (CSV)</span>
            </div>
            <Button size="sm" onClick={exportCSV} disabled={csvExporting || !analytics} className="bg-blue-600 hover:bg-blue-500">
              {csvExporting ? "Export..." : "CSV"}
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border-white/10">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-400/10"><BarChart3 size={20} className="text-blue-400" /></div>
            <div>
              <p className="text-sm text-slate-300">Tracking actif</p>
              <p className="text-xs text-slate-500">Pages + téléchargements trackés (hors admin)</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border-white/10 hover:border-red-500/30 transition-all">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-400/10"><Database size={20} className="text-red-400" /></div>
              <span className="text-sm text-slate-300">Réinitialiser les stats</span>
            </div>
            <Button size="sm" onClick={() => { api.resetAnalytics().then(() => { api.getAnalytics().then(setAnalytics).catch(() => {}); toast.success("Stats réinitialisées"); }); }} className="bg-red-600 hover:bg-red-500">
              Reset
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function BarChart({ data, max, color }: { data: { date: string; count: number }[]; max: number; color: "blue" | "orange" }) {
  const bgGrad = color === "blue" ? "from-blue-600 to-blue-500" : "from-orange-600 to-orange-500";
  return (
    <div className="space-y-1 max-h-[300px] overflow-y-auto">
      {data.map((d) => (
        <div key={d.date} className="flex items-center gap-3 text-sm">
          <span className="text-slate-400 w-24 shrink-0 text-xs">{d.date.slice(5)}</span>
          <div className="flex-1 bg-slate-800 rounded h-5 overflow-hidden">
            <div className={`bg-linear-to-r ${bgGrad} h-full rounded transition-all`} style={{ width: `${(d.count / max) * 100}%` }} />
          </div>
          <span className="text-slate-300 w-8 text-right text-xs">{d.count}</span>
        </div>
      ))}
    </div>
  );
}
