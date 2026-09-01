import { useCallback, useEffect, useState } from "react";
import { api } from "@/api/client";
import type { PatchVersion } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Star,
  Download,
  FileCode,
  Layers,
  ChevronDown,
  ChevronUp,
  Loader2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export default function PatchesAdmin() {
  const [patches, setPatches] = useState<PatchVersion[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedPatchId, setExpandedPatchId] = useState<string | null>(null);

  const [form, setForm] = useState({
    version: "",
    date: "",
    size: "",
    supernovaLink: "",
    bigbangLink: "",
    supernovaRomLink: "",
    bigbangRomLink: "",
    supernovaRomSize: "",
    bigbangRomSize: "",
    changelog: "",
    isLatest: false,
  });

  const load = useCallback(async () => {
    try {
      const data = await api.getPatches();
      setPatches(data);
    } catch {
      toast.error("Erreur lors du rechargement des patchs");
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    api.getPatches()
      .then((data) => {
        if (isMounted) {
          setPatches(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          toast.error("Impossible de charger les patchs");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const resetForm = () =>
    setForm({
      version: "",
      date: "",
      size: "",
      supernovaLink: "",
      bigbangLink: "",
      supernovaRomLink: "",
      bigbangRomLink: "",
      supernovaRomSize: "",
      bigbangRomSize: "",
      changelog: "",
      isLatest: false,
    });

  const startEdit = (p?: PatchVersion) => {
    if (p) {
      setEditing(p.id);
      setForm({
        version: p.version,
        date: p.date,
        size: p.size,
        supernovaLink: p.supernovaLink || "",
        bigbangLink: p.bigbangLink || "",
        supernovaRomLink: p.supernovaRomLink || "",
        bigbangRomLink: p.bigbangRomLink || "",
        supernovaRomSize: p.supernovaRomSize || "",
        bigbangRomSize: p.bigbangRomSize || "",
        changelog: (p.changelog || []).join("\n"),
        isLatest: p.isLatest,
      });
    } else {
      setEditing("new");
      resetForm();
    }
  };

  const save = async () => {
    if (!form.version.trim()) {
      toast.error("Le numéro de version est requis");
      return;
    }

    setSaving(true);
    const data = {
      ...form,
      changelog: form.changelog
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (editing === "new") {
        await api.createPatch(data);
        toast.success("Version de patch ajoutée");
      } else if (editing) {
        await api.updatePatch(editing, data);
        toast.success("Version de patch mise à jour");
      }
      setEditing(null);
      await load();
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const setLatest = async (id: string) => {
    try {
      await api.setLatestPatch(id);
      toast.success("Version définie comme principale");
      await load();
    } catch {
      toast.error("Action échouée");
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette version du patch ?")) return;
    try {
      await api.deletePatch(id);
      toast.success("Patch supprimé");
      await load();
    } catch {
      toast.error("Suppression échouée");
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedPatchId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-foreground tracking-tight">Gestion des Patchs</h2>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Configurez les versions publiées, les liens de téléchargement et les changelogs.
          </p>
        </div>
        <Button
          onClick={() => startEdit()}
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-black cursor-pointer shadow-xs"
        >
          <Plus size={16} className="mr-1.5" /> Nouvelle version
        </Button>
      </div>

      {editing && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-lg font-black text-foreground tracking-tight">
              {editing === "new" ? "Ajouter une version de patch" : `Modifier la version v${form.version}`}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Layers size={14} className="text-primary" /> Informations générales
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-bold text-muted-foreground">Numéro de version</Label>
                  <Input
                    placeholder="Ex: 1.2.0"
                    value={form.version}
                    onChange={(e) => setForm({ ...form, version: e.target.value })}
                    className="bg-secondary/40 border-border text-foreground font-mono font-bold"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-bold text-muted-foreground">Date de sortie</Label>
                  <Input
                    placeholder="Ex: 15 Mars 2024"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="bg-secondary/40 border-border text-foreground font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-bold text-muted-foreground">Taille du patch</Label>
                  <Input
                    placeholder="Ex: 45 Mo"
                    value={form.size}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                    className="bg-secondary/40 border-border text-foreground font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-border">
              <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <FileCode size={14} className="text-primary" /> Liens des Patchs (Luma / Citra)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-bold text-supernova">Lien Patch Supernova</Label>
                  <Input
                    placeholder="https://mega.nz/... ou https://drive.google.com/..."
                    value={form.supernovaLink}
                    onChange={(e) => setForm({ ...form, supernovaLink: e.target.value })}
                    className="bg-secondary/40 border-border text-foreground text-xs font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-bold text-bigbang">Lien Patch Big Bang</Label>
                  <Input
                    placeholder="https://mega.nz/... ou https://drive.google.com/..."
                    value={form.bigbangLink}
                    onChange={(e) => setForm({ ...form, bigbangLink: e.target.value })}
                    className="bg-secondary/40 border-border text-foreground text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-border">
              <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Download size={14} className="text-accent" /> Liens des ROMs pré-patchées (Optionnel)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3 p-3.5 rounded-xl bg-secondary/30 border border-border">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-black text-supernova">Lien ROM Supernova (.3ds/.cia)</Label>
                    <Input
                      placeholder="https://..."
                      value={form.supernovaRomLink}
                      onChange={(e) => setForm({ ...form, supernovaRomLink: e.target.value })}
                      className="bg-secondary/40 border-border text-foreground text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-muted-foreground">Taille ROM Supernova</Label>
                    <Input
                      placeholder="Ex: 3.4 Go"
                      value={form.supernovaRomSize}
                      onChange={(e) => setForm({ ...form, supernovaRomSize: e.target.value })}
                      className="bg-secondary/40 border-border text-foreground text-xs font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-3 p-3.5 rounded-xl bg-secondary/30 border border-border">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-black text-bigbang">Lien ROM Big Bang (.3ds/.cia)</Label>
                    <Input
                      placeholder="https://..."
                      value={form.bigbangRomLink}
                      onChange={(e) => setForm({ ...form, bigbangRomLink: e.target.value })}
                      className="bg-secondary/40 border-border text-foreground text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-muted-foreground">Taille ROM Big Bang</Label>
                    <Input
                      placeholder="Ex: 3.4 Go"
                      value={form.bigbangRomSize}
                      onChange={(e) => setForm({ ...form, bigbangRomSize: e.target.value })}
                      className="bg-secondary/40 border-border text-foreground text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-border">
              <Label className="text-sm font-bold text-muted-foreground flex items-center justify-between">
                <span>Changelog (notes de mise à jour)</span>
                <span className="text-xs text-muted-foreground font-normal">Une ligne par modification</span>
              </Label>
              <Textarea
                placeholder="Traduction complète du Chapitre 8&#10;Correction des noms de techniques spéciales&#10;Amélioration de la stabilité des cinématiques"
                value={form.changelog}
                onChange={(e) => setForm({ ...form, changelog: e.target.value })}
                className="bg-secondary/40 border-border text-foreground font-medium text-xs min-h-25 leading-relaxed"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-border">
              <Label className="flex items-center gap-2.5 text-sm font-black text-foreground cursor-pointer">
                <Switch checked={form.isLatest} onCheckedChange={(v) => setForm({ ...form, isLatest: v })} />
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-primary" /> Marquer comme version principale actuelle
                </span>
              </Label>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditing(null)} className="font-black border-border hover:bg-secondary cursor-pointer shadow-xs">
                  <X size={16} className="mr-1" /> Annuler
                </Button>
                <Button size="sm" onClick={save} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90 font-black cursor-pointer shadow-xs">
                  {saving ? <Loader2 size={16} className="mr-1 animate-spin" /> : <Check size={16} className="mr-1" />}
                  Sauvegarder
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {patches.map((p) => {
          const isExpanded = expandedPatchId === p.id;
          const changelogLines = p.changelog || [];

          return (
            <Card key={p.id} className="bg-card border-border hover:border-primary/40 transition-colors">
              <CardContent className="p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-black text-foreground text-base font-mono">v{p.version}</span>
                      {p.isLatest && (
                        <Badge variant="outline" className="border-primary bg-primary/10 text-primary text-[11px] font-black gap-1">
                          <Star size={10} className="fill-primary" /> Version Actuelle
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground font-medium">
                        {p.date} {p.size && `— ${p.size}`}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {p.supernovaLink && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-supernova/15 text-supernova font-mono font-black border border-supernova/30">
                          Patch SN
                        </span>
                      )}
                      {p.bigbangLink && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-bigbang/15 text-bigbang font-mono font-black border border-bigbang/30">
                          Patch BB
                        </span>
                      )}
                      {p.supernovaRomLink && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-supernova/10 text-supernova font-mono font-black border border-supernova/20">
                          ROM SN ({p.supernovaRomSize || "Taille N/A"})
                        </span>
                      )}
                      {p.bigbangRomLink && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-bigbang/10 text-bigbang font-mono font-black border border-bigbang/20">
                          ROM BB ({p.bigbangRomSize || "Taille N/A"})
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    {!p.isLatest && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-8 text-foreground hover:text-primary font-black border-border hover:bg-secondary cursor-pointer shadow-xs"
                        onClick={() => setLatest(p.id)}
                      >
                        <Star size={13} className="mr-1" /> Définir actuel
                      </Button>
                    )}

                    {changelogLines.length > 0 && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
                        onClick={() => toggleExpand(p.id)}
                        title={isExpanded ? "Masquer le changelog" : "Voir le changelog"}
                      >
                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </Button>
                    )}

                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
                      onClick={() => startEdit(p)}
                      title="Modifier"
                    >
                      <Pencil size={15} />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:bg-destructive/10 h-8 w-8 cursor-pointer"
                      onClick={() => remove(p.id)}
                      title="Supprimer"
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                </div>

                {isExpanded && changelogLines.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/60 bg-secondary/30 p-3 rounded-xl">
                    <p className="text-xs font-black text-muted-foreground mb-1.5">Changelog :</p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-foreground/90 font-medium">
                      {changelogLines.map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {patches.length === 0 && (
          <div className="text-center py-12 border border-dashed border-border rounded-xl bg-card/50">
            <p className="text-muted-foreground text-sm font-medium">
              Aucun patch répertorié. Cliquez sur « Nouvelle version » pour en ajouter un.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}