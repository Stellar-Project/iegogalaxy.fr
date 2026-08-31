import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { SiteConfig } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
          <CardTitle className="text-lg text-white">Visibilité des patchs</CardTitle>
          <Label className="flex items-center gap-2 text-sm cursor-pointer">
            <span className={config.showPatch !== false ? "text-green-400" : "text-slate-500"}>Visible</span>
            <Switch checked={config.showPatch !== false} onCheckedChange={(v) => setConfig({ ...config, showPatch: v })} />
          </Label>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={save} className="bg-blue-600 hover:bg-blue-500">
            {saved ? <><Check size={16} className="mr-1" /> Sauvegardé</> : <><Save size={16} className="mr-1" /> Sauvegarder</>}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-white">ROMs prêtes à patcher</CardTitle>
          <Label className="flex items-center gap-2 text-sm cursor-pointer">
            <span className={config.showRom ? "text-green-400" : "text-slate-500"}>Visible</span>
            <Switch checked={config.showRom === true} onCheckedChange={(v) => setConfig({ ...config, showRom: v })} />
          </Label>
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
