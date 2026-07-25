import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { SiteConfig } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Save } from "lucide-react";

const defaults: SiteConfig = { patchVersion: "", patchDate: "", patchSize: "", supernovaLink: "", bigbangLink: "", supernovaRomLink: "", bigbangRomLink: "", supernovaRomSize: "", bigbangRomSize: "", showPatch: true, showRom: false };

export default function ConfigAdmin() {
  const [config, setConfig] = useState<SiteConfig>(defaults);
  const [saved, setSaved] = useState(false);

  useEffect(() => { api.getConfig().then(setConfig).catch(() => {}); }, []);

  const save = async () => {
    await api.updateConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <h2 className="text-2xl font-bold text-white">Configuration</h2>

      <Card className="bg-slate-900 border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-white">Patchs</CardTitle>
          <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
            <span className={config.showPatch !== false ? "text-green-400" : "text-slate-500"}>Visible</span>
            <input type="checkbox" checked={config.showPatch !== false} onChange={(e) => setConfig({ ...config, showPatch: e.target.checked })} className="toggle accent-green-500" />
          </label>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Version</label>
              <Input value={config.patchVersion} onChange={(e) => setConfig({ ...config, patchVersion: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Date</label>
              <Input value={config.patchDate} onChange={(e) => setConfig({ ...config, patchDate: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Taille</label>
              <Input value={config.patchSize} onChange={(e) => setConfig({ ...config, patchSize: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Lien Supernova</label>
              <Input value={config.supernovaLink || ""} onChange={(e) => setConfig({ ...config, supernovaLink: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div className="col-span-2">
              <label className="text-sm text-slate-400 mb-1 block">Lien Big Bang</label>
              <Input value={config.bigbangLink || ""} onChange={(e) => setConfig({ ...config, bigbangLink: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
            </div>
          </div>

          <Button onClick={save} className="bg-blue-600 hover:bg-blue-500">
            {saved ? <><Check size={16} className="mr-1" /> Sauvegardé</> : <><Save size={16} className="mr-1" /> Sauvegarder</>}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-white">ROMs prêtes à patcher</CardTitle>
          <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
            <span className={config.showRom ? "text-green-400" : "text-slate-500"}>Visible</span>
            <input type="checkbox" checked={config.showRom === true} onChange={(e) => setConfig({ ...config, showRom: e.target.checked })} className="toggle accent-green-500" />
          </label>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Lien ROM Supernova</label>
              <Input value={config.supernovaRomLink || ""} onChange={(e) => setConfig({ ...config, supernovaRomLink: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Taille ROM Supernova</label>
              <Input value={config.supernovaRomSize || ""} onChange={(e) => setConfig({ ...config, supernovaRomSize: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Lien ROM Big Bang</label>
              <Input value={config.bigbangRomLink || ""} onChange={(e) => setConfig({ ...config, bigbangRomLink: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Taille ROM Big Bang</label>
              <Input value={config.bigbangRomSize || ""} onChange={(e) => setConfig({ ...config, bigbangRomSize: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
            </div>
          </div>

          <Button onClick={save} className="bg-blue-600 hover:bg-blue-500">
            {saved ? <><Check size={16} className="mr-1" /> Sauvegardé</> : <><Save size={16} className="mr-1" /> Sauvegarder</>}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
