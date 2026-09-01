import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api/client";
import type { WikiTool, WikiPage } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TiptapEditor from "@/components/admin/TiptapEditor";
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface PageEditorProps {
  tools: WikiTool[];
  pages: WikiPage[];
  onRefreshPages: () => void;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function PageEditor({ tools, pages, onRefreshPages }: PageEditorProps) {
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  const [form, setForm] = useState({
    slug: "",
    name: "",
    content: "",
    toolId: "",
    published: true,
  });

  const effectiveToolId = form.toolId || tools[0]?.id || "";
  const selectedTool = tools.find((t) => t.id === effectiveToolId);

  const pagesByTool = (toolId: string) =>
    pages.filter((p) => p.toolId === toolId).sort((a, b) => a.sortOrder - b.sortOrder);

  const close = () => {
    setEditingPageId(null);
    setPreview(false);
    setMode("create");
    setForm({ slug: "", name: "", content: "", toolId: effectiveToolId, published: true });
  };

  const startEdit = (page?: WikiPage) => {
    if (page) {
      setEditingPageId(page.id);
      setMode("edit");
      setAutoSlug(false);
      setForm({
        slug: page.slug,
        name: page.title,
        content: page.content || "",
        toolId: page.toolId ?? effectiveToolId,
        published: page.published,
      });
    } else {
      setEditingPageId("new");
      setMode("create");
      setAutoSlug(true);
      setForm({
        toolId: effectiveToolId,
        slug: "",
        name: "",
        content: "",
        published: true,
      });
    }
  };

  const handleTitleChange = (val: string) => {
    setForm((prev) => ({
      ...prev,
      name: val,
      slug: autoSlug ? slugify(val) : prev.slug,
    }));
  };

  const save = async () => {
    if (!form.name.trim()) {
      toast.error("Le titre de la page est requis");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("Le slug est requis");
      return;
    }

    setSaving(true);
    const data = {
      slug: form.slug,
      title: form.name,
      content: form.content,
      toolId: effectiveToolId,
      published: form.published,
    };

    try {
      if (mode === "create") {
        await api.createWikiPage(data);
        toast.success("Page wiki créée");
      } else if (editingPageId) {
        await api.updateWikiPage(editingPageId, data);
        toast.success("Page wiki mise à jour");
      }
      close();
      onRefreshPages();
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (page: WikiPage) => {
    try {
      await api.updateWikiPage(page.id, { published: !page.published });
      toast.success(page.published ? "Page passée en brouillon" : "Page publiée");
      onRefreshPages();
    } catch {
      toast.error("Action échouée");
    }
  };

  const remove = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette page wiki ?")) {
      try {
        await api.deleteWikiPage(id);
        toast.success("Page supprimée");
        onRefreshPages();
      } catch {
        toast.error("Suppression échouée");
      }
    }
  };

  const movePage = async (id: string, direction: "up" | "down") => {
    const toolPages = pagesByTool(effectiveToolId);
    const idx = toolPages.findIndex((p) => p.id === id);
    if (idx === -1) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= toolPages.length) return;

    const current = toolPages[idx];
    const other = toolPages[swapIdx];

    try {
      await Promise.all([
        api.updateWikiPage(current.id, { sortOrder: other.sortOrder }),
        api.updateWikiPage(other.id, { sortOrder: current.sortOrder }),
      ]);
      onRefreshPages();
    } catch {
      toast.error("Impossible de réordonner");
    }
  };

  if (!selectedTool) {
    return (
      <div className="text-center py-12 border border-dashed border-border rounded-xl bg-card/50">
        <p className="text-sm text-muted-foreground font-medium">
          Aucun outil wiki configuré. Veuillez créer un outil avant d'ajouter des pages.
        </p>
      </div>
    );
  }

  const toolPages = pagesByTool(selectedTool.id);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-2 border-b border-border">
        <div>
          <h3 className="text-xl font-black text-foreground tracking-tight">
            Pages associées à : <span className="text-primary">{selectedTool.name}</span>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
            Organisez et rédigez les fiches documentaires pour cet outil
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Select
            value={effectiveToolId}
            onValueChange={(v) => {
              setForm((prev) => ({ ...prev, toolId: v }));
              setEditingPageId(null);
            }}
          >
            <SelectTrigger className="w-50 bg-secondary/50 border-border text-foreground font-medium cursor-pointer shadow-xs">
              <SelectValue placeholder="Changer d'outil" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border text-foreground">
              {tools.map((t) => (
                <SelectItem key={t.id} value={t.id} className="font-medium cursor-pointer">
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={() => startEdit()}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-black cursor-pointer shadow-xs"
          >
            <Plus size={16} className="mr-1.5" /> Nouvelle page
          </Button>
        </div>
      </div>

      {editingPageId && (
        <Card className="bg-card/90 border-border shadow-lg backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border">
            <CardTitle className="text-lg font-black text-foreground tracking-tight">
              {mode === "create" ? "Nouvelle page wiki" : "Modifier la page"}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={preview ? "default" : "outline"}
                className={`font-black cursor-pointer shadow-xs ${
                  preview ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground border-border hover:bg-secondary"
                }`}
                onClick={() => setPreview(!preview)}
              >
                <Eye size={14} className="mr-1.5" /> Aperçu
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Titre de la page</Label>
                <Input
                  placeholder="Ex: Guide d'installation"
                  value={form.name}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="bg-secondary/40 border-border text-foreground font-medium"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-bold text-muted-foreground">Slug URL</Label>
                  <button
                    type="button"
                    onClick={() => setAutoSlug(!autoSlug)}
                    className="text-xs text-primary hover:underline font-bold cursor-pointer"
                  >
                    {autoSlug ? "Mode manuel" : "Auto-générer"}
                  </button>
                </div>
                <Input
                  placeholder="guide-d-installation"
                  value={form.slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setForm({ ...form, slug: e.target.value });
                  }}
                  className="bg-secondary/40 border-border text-foreground font-mono text-xs font-bold"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-bold text-muted-foreground">Contenu</Label>
              {preview ? (
                <div
                  className="bg-secondary/20 rounded-xl p-6 border border-border text-foreground wiki-content prose prose-invert max-w-none min-h-55"
                  dangerouslySetInnerHTML={{ __html: form.content || "<p class='text-muted-foreground italic font-medium'>Aucun contenu à prévisualiser.</p>" }}
                />
              ) : (
                <TiptapEditor
                  content={form.content}
                  onChange={(html) => setForm({ ...form, content: html })}
                  placeholder="Rédigez la documentation de l'outil..."
                />
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <Label className="flex items-center gap-2.5 text-sm font-black text-foreground cursor-pointer">
                <Switch
                  checked={form.published}
                  onCheckedChange={(v) => setForm({ ...form, published: v })}
                  className="cursor-pointer"
                />
                <span>Page publiée et accessible</span>
              </Label>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={close} className="font-black border-border hover:bg-secondary cursor-pointer shadow-xs">
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
        {toolPages.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-border rounded-xl bg-card/50">
            <p className="text-muted-foreground text-sm font-medium">
              Aucune page pour cet outil. Cliquez sur « Nouvelle page » pour commencer.
            </p>
          </div>
        ) : (
          toolPages.map((p, idx) => (
            <Card key={p.id} className="bg-card/70 border-border hover:border-primary/40 transition-colors backdrop-blur-md shadow-xs">
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-foreground tracking-tight truncate">{p.title}</span>
                    {!p.published ? (
                      <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-wider">
                        brouillon
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                        publiée
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-mono truncate">
                    /wiki/<span className="text-primary font-bold">{p.slug}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  {p.published && (
                    <Button size="icon" variant="ghost" asChild className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer">
                      <Link to={`/wiki/${p.slug}`} target="_blank" title="Voir la page wiki">
                        <ExternalLink size={15} />
                      </Link>
                    </Button>
                  )}

                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
                    onClick={() => togglePublish(p)}
                    title={p.published ? "Passer en brouillon" : "Publier"}
                  >
                    {p.published ? <EyeOff size={15} /> : <Eye size={15} />}
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground h-8 w-8 disabled:opacity-20 cursor-pointer"
                    disabled={idx === 0}
                    onClick={() => movePage(p.id, "up")}
                    title="Monter"
                  >
                    <ChevronUp size={16} />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground h-8 w-8 disabled:opacity-20 cursor-pointer"
                    disabled={idx === toolPages.length - 1}
                    onClick={() => movePage(p.id, "down")}
                    title="Descendre"
                  >
                    <ChevronDown size={16} />
                  </Button>

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
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}