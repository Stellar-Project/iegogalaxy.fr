import { useCallback, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api/client";
import type { Game } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Gamepad2,
  Upload,
  ExternalLink,
  Download,
  Eye,
  EyeOff,
  Loader2,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";

export default function GameAdmin() {
  const [games, setGames] = useState<Game[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    slug: "",
    name: "",
    description: "",
    imageUrl: "",
    status: "0%",
    releaseDate: "",
    downloadUrl: "",
    fileSize: "",
    sortOrder: 0,
    published: false,
    filePath: "",
  });

  const load = useCallback(async () => {
    try {
      const data = await api.getGames();
      setGames(data);
    } catch {
      toast.error("Erreur lors du rechargement des jeux");
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    api.getGames()
      .then((data) => {
        if (isMounted) {
          setGames(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          toast.error("Impossible de charger les jeux");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const startEdit = (g?: Game) => {
    if (g) {
      setEditing(g.id);
      setForm({
        slug: g.slug,
        name: g.name,
        description: g.description,
        imageUrl: g.imageUrl || "",
        status: g.status,
        releaseDate: g.releaseDate || "",
        downloadUrl: g.downloadUrl || "",
        fileSize: g.fileSize || "",
        sortOrder: g.sortOrder,
        published: g.published,
        filePath: g.filePath || "",
      });
    } else {
      setEditing("new");
      setForm({
        slug: "",
        name: "",
        description: "",
        imageUrl: "",
        status: "0%",
        releaseDate: "",
        downloadUrl: "",
        fileSize: "",
        sortOrder: games.length,
        published: false,
        filePath: "",
      });
    }
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      const { url } = await api.uploadFile(file);
      setForm((prev) => ({
        ...prev,
        filePath: url.replace("/uploads/", ""),
        fileSize: (file.size / 1024 / 1024).toFixed(1) + " Mo",
      }));
      toast.success("Fichier téléversé avec succès");
    } catch {
      toast.error("Échec de l'upload du fichier");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const save = async () => {
    if (!form.name.trim()) {
      toast.error("Le nom du jeu/mod est requis");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("Le slug est requis");
      return;
    }

    setSaving(true);
    const data: Partial<Game> = {
      slug: form.slug,
      name: form.name,
      description: form.description,
      imageUrl: form.imageUrl || null,
      status: form.status,
      releaseDate: form.releaseDate || null,
      downloadUrl: form.downloadUrl || null,
      filePath: form.filePath || null,
      fileSize: form.fileSize || null,
      sortOrder: form.sortOrder,
      published: form.published,
    };

    try {
      if (editing === "new") {
        await api.createGame(data);
        toast.success("Jeu ajouté avec succès");
      } else if (editing) {
        await api.updateGame(editing, data);
        toast.success("Jeu mis à jour avec succès");
      }
      setEditing(null);
      await load();
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (g: Game) => {
    try {
      await api.updateGame(g.id, { published: !g.published });
      toast.success(g.published ? "Jeu passé en brouillon" : "Jeu publié");
      await load();
    } catch {
      toast.error("Action échouée");
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce jeu/mod ?")) return;
    try {
      await api.deleteGame(id);
      toast.success("Jeu supprimé");
      await load();
    } catch {
      toast.error("Suppression échouée");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-foreground tracking-tight">Jeux & Mods</h2>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Gérez les fiches de jeux, projets de traduction et leurs fichiers associés.
          </p>
        </div>
        <Button
          onClick={() => startEdit()}
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-black cursor-pointer shadow-xs"
        >
          <Plus size={16} className="mr-1.5" /> Ajouter un jeu/mod
        </Button>
      </div>

      {editing && (
        <Card className="bg-card border-border">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-black text-foreground tracking-tight">
              {editing === "new" ? "Ajouter un jeu ou mod" : "Modifier le jeu ou mod"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Nom</Label>
                <Input
                  placeholder="Ex: Inazuma Eleven GO Galaxy"
                  value={form.name}
                  onChange={(e) => {
                    const n = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      name: n,
                      slug:
                        prev.slug === prev.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || !prev.slug
                          ? n
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-")
                              .replace(/(^-|-$)/g, "")
                          : prev.slug,
                    }));
                  }}
                  className="bg-secondary/40 border-border text-foreground font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Slug URL</Label>
                <Input
                  placeholder="inazuma-eleven-go-galaxy"
                  value={form.slug}
                  onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                  className="bg-secondary/40 border-border text-foreground font-mono text-xs font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Statut d'avancement</Label>
                <Input
                  placeholder="Ex: 100% ou En cours (75%)"
                  value={form.status}
                  onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                  className="bg-secondary/40 border-border text-foreground font-mono font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Date de sortie</Label>
                <Input
                  placeholder="Ex: 28 Juin 2024"
                  value={form.releaseDate}
                  onChange={(e) => setForm((prev) => ({ ...prev, releaseDate: e.target.value }))}
                  className="bg-secondary/40 border-border text-foreground font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Ordre d'affichage</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={form.sortOrder}
                  onChange={(e) => setForm((prev) => ({ ...prev, sortOrder: parseInt(e.target.value, 10) || 0 }))}
                  className="bg-secondary/40 border-border text-foreground font-mono font-bold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-bold text-muted-foreground">URL de la jaquette / image</Label>
              <div className="flex gap-3 items-center">
                <Input
                  placeholder="https://... ou /assets/..."
                  value={form.imageUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                  className="bg-secondary/40 border-border text-foreground flex-1 font-mono text-xs"
                />
                {form.imageUrl && (
                  <div className="h-10 w-10 rounded-lg overflow-hidden border border-border shrink-0 bg-secondary flex items-center justify-center shadow-inner">
                    <img
                      src={form.imageUrl}
                      alt="Aperçu"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-bold text-muted-foreground">Description</Label>
              <Textarea
                placeholder="Présentation générale du jeu ou du mod..."
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                className="bg-secondary/40 border-border text-foreground min-h-22.5 font-medium leading-relaxed"
              />
            </div>

            <div className="border border-border rounded-xl p-4 space-y-3 bg-secondary/30">
              <Label className="text-xs text-muted-foreground font-black uppercase tracking-wider">
                Fichier et Liens de Téléchargement
              </Label>

              <div className="space-y-1.5">
                <Input
                  placeholder="Lien externe (Google Drive, Mega, Mediafire, etc.)"
                  value={form.downloadUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, downloadUrl: e.target.value }))}
                  className="bg-secondary/40 border-border text-foreground font-mono text-xs"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[11px] text-muted-foreground font-black uppercase tracking-wider">OU FICHIER LOCAL</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadFile(f);
                  }}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="text-foreground border-border hover:bg-secondary font-black cursor-pointer shadow-xs"
                >
                  {uploading ? <Loader2 size={14} className="mr-1.5 animate-spin" /> : <Upload size={14} className="mr-1.5" />}
                  {uploading ? "Téléversement..." : "Uploader un fichier"}
                </Button>

                {form.filePath && (
                  <div className="flex items-center gap-2 bg-secondary/70 border border-border px-2.5 py-1 rounded-lg text-xs">
                    <span className="text-foreground font-mono font-bold truncate max-w-50">{form.filePath}</span>
                    <span className="text-muted-foreground font-black font-mono">({form.fileSize || "Taille inconnue"})</span>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => setForm((prev) => ({ ...prev, filePath: "", fileSize: "" }))}
                      className="text-muted-foreground hover:text-destructive h-5 w-5 ml-1 cursor-pointer"
                      title="Retirer le fichier"
                    >
                      <X size={12} />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Label className="flex items-center gap-2.5 text-sm font-black text-foreground cursor-pointer">
                <Switch
                  checked={form.published}
                  onCheckedChange={(v) => setForm((prev) => ({ ...prev, published: v }))}
                  className="cursor-pointer"
                />
                <span>Publier immédiatement sur le site</span>
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

      <div className="space-y-2">
        {games.map((g) => (
          <Card key={g.id} className="bg-card border-border hover:border-primary/40 transition-colors">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                {g.imageUrl ? (
                  <img src={g.imageUrl} alt="" className="w-12 h-12 object-cover rounded-xl border border-border shrink-0 shadow-xs" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 text-muted-foreground border border-border shadow-xs">
                    <Gamepad2 size={22} />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-black text-foreground tracking-tight truncate">{g.name}</span>
                    {!g.published ? (
                      <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent text-[11px] font-black uppercase tracking-wider">
                        brouillon
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary text-[11px] font-black uppercase tracking-wider">
                        publié
                      </Badge>
                    )}
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-mono font-black border border-border/60">
                      {g.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-medium">
                    <span className="font-mono text-primary font-bold">/{g.slug}</span>
                    {g.releaseDate && (
                      <>
                        <span>·</span>
                        <span>{g.releaseDate}</span>
                      </>
                    )}
                    {g.downloadUrl && (
                      <span className="flex items-center gap-1 text-primary font-bold">
                        <LinkIcon size={11} /> Lien externe
                      </span>
                    )}
                    {g.filePath && (
                      <span className="flex items-center gap-1 text-accent font-bold">
                        <Download size={11} /> Fichier {g.fileSize || ""}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                {g.published && (
                  <Button size="icon" variant="ghost" asChild className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer">
                    <Link to={`/jeux/${g.slug}`} target="_blank" title="Voir la page publique">
                      <ExternalLink size={16} />
                    </Link>
                  </Button>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => togglePublish(g)}
                  className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
                  title={g.published ? "Passer en brouillon" : "Publier"}
                >
                  {g.published ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
                  onClick={() => startEdit(g)}
                  title="Modifier"
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10 h-8 w-8 cursor-pointer"
                  onClick={() => remove(g.id)}
                  title="Supprimer"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {games.length === 0 && (
          <div className="text-center py-12 border border-dashed border-border rounded-xl bg-card/50">
            <p className="text-muted-foreground text-sm font-medium">
              Aucun jeu ou mod pour le moment. Cliquez sur « Ajouter un jeu/mod » pour commencer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}