import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { SiteConfig } from "@/api/types";
import { Button } from "@/components/ui/button";
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
        <CardHeader>
          <CardTitle className="text-lg text-white">Paramètres Globaux</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-slate-300">Visibilité des patchs</Label>
            <Switch checked={config.showPatch !== false} onCheckedChange={(v) => setConfig({ ...config, showPatch: v })} />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-slate-300">Visibilité des ROMs</Label>
            <Switch checked={config.showRom === true} onCheckedChange={(v) => setConfig({ ...config, showRom: v })} />
          </div>

          <Button onClick={save} className="w-full bg-blue-600 hover:bg-blue-500">
            {saved ? <><Check size={16} className="mr-1" /> Sauvegardé</> : <><Save size={16} className="mr-1" /> Sauvegarder</>}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
