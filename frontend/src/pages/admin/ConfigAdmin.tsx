import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { SiteConfig } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Save, RotateCcw, Loader2, ShieldAlert, Download } from "lucide-react";
import { toast } from "sonner";

const defaults: SiteConfig = {
  patchVersion: "",
  patchDate: "",
  patchSize: "",
  supernovaLink: "",
  bigbangLink: "",
  supernovaRomLink: "",
  bigbangRomLink: "",
  supernovaRomSize: "",
  bigbangRomSize: "",
  showPatch: true,
  showRom: false,
};

export default function ConfigAdmin() {
  const [config, setConfig] = useState<SiteConfig>(defaults);
  const [initialConfig, setInitialConfig] = useState<SiteConfig>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let isMounted = true;

    api.getConfig()
      .then((data) => {
        if (isMounted) {
          setConfig(data);
          setInitialConfig(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          toast.error("Impossible de charger la configuration");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await api.updateConfig(config);
      setInitialConfig(config);
      setSaved(true);
      toast.success("Configuration mise à jour avec succès");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      toast.error("Échec de l'enregistrement de la configuration");
    } finally {
      setSaving(false);
    }
  };

  const resetChanges = () => {
    setConfig(initialConfig);
    toast.info("Modifications annulées");
  };

  const hasChanges = JSON.stringify(config) !== JSON.stringify(initialConfig);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-75">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-black text-foreground tracking-tight">Configuration</h2>
        <p className="text-sm text-muted-foreground font-medium mt-1">
          Gérez les options globales d'affichage et la visibilité des contenus sur le site.
        </p>
      </div>

      <div className="space-y-4">
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Download size={20} className="text-primary" />
              <CardTitle className="text-lg text-foreground font-black tracking-tight">
                Téléchargements & Liens
              </CardTitle>
            </div>
            <CardDescription className="text-muted-foreground font-medium">
              Contrôlez quels types de fichiers sont proposés aux utilisateurs sur les pages publiques.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-secondary/40 border border-border">
              <div className="space-y-0.5">
                <Label className="text-sm font-black text-foreground">Visibilité des patchs</Label>
                <p className="text-xs text-muted-foreground font-medium">
                  Affiche les liens de téléchargement direct des patchs Supernova et Big Bang.
                </p>
              </div>
              <Switch
                checked={config.showPatch !== false}
                onCheckedChange={(v) => setConfig((prev) => ({ ...prev, showPatch: v }))}
                className="cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-secondary/40 border border-border">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Label className="text-sm font-black text-foreground">Visibilité des ROMs pré-patchées</Label>
                  <ShieldAlert size={14} className="text-accent" />
                </div>
                <p className="text-xs text-muted-foreground font-medium">
                  Active l'accès direct aux images de jeu (.3ds/.cia) prêtes à l'emploi.
                </p>
              </div>
              <Switch
                checked={config.showRom === true}
                onCheckedChange={(v) => setConfig((prev) => ({ ...prev, showRom: v }))}
                className="cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={resetChanges}
            disabled={!hasChanges || saving}
            className="text-muted-foreground hover:text-foreground font-black border-border hover:bg-secondary cursor-pointer shadow-xs"
          >
            <RotateCcw size={15} className="mr-1.5" /> Réinitialiser
          </Button>

          <Button
            onClick={save}
            disabled={saving || !hasChanges}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-black min-w-35 cursor-pointer shadow-xs"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="mr-1.5 animate-spin" /> Enregistrement...
              </>
            ) : saved ? (
              <>
                <Check size={16} className="mr-1.5" /> Sauvegardé
              </>
            ) : (
              <>
                <Save size={16} className="mr-1.5" /> Sauvegarder
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}