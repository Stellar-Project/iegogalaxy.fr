import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api/client";
import type { Post, PostInput } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import TiptapEditor from "@/components/admin/TiptapEditor";
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Search,
  ExternalLink,
  Eye,
  EyeOff,
  Filter,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const DEFAULT_CATEGORIES = ["annonce", "technique", "mise-a-jour", "communaute", "non-classé"];

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function BlogAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  // Recherche & Filtres
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const [form, setForm] = useState<PostInput>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "non-classé",
    published: false,
  });

  const load = useCallback(async () => {
    try {
      const data = await api.getPosts(true);
      setPosts(data);
    } catch {
      toast.error("Erreur lors du rechargement des articles");
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    api.getPosts(true)
      .then((data) => {
        if (isMounted) {
          setPosts(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          toast.error("Impossible de charger les articles");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const availableCategories = useMemo(() => {
    const set = new Set<string>(DEFAULT_CATEGORIES);
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase()) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && p.published) ||
        (statusFilter === "draft" && !p.published);

      const matchesCategory =
        categoryFilter === "all" || p.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [posts, search, statusFilter, categoryFilter]);

  const startEdit = (p?: Post) => {
    if (p) {
      setEditing(p.id);
      setAutoSlug(false);
      setForm({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt || "",
        content: p.content,
        category: p.category,
        published: p.published,
      });
    } else {
      setEditing("new");
      setAutoSlug(true);
      setForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "non-classé",
        published: false,
      });
    }
  };

  const handleTitleChange = (val: string) => {
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: autoSlug ? slugify(val) : prev.slug,
    }));
  };

  const save = async () => {
    if (!form.title.trim()) {
      toast.error("Le titre est requis");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("Le slug est requis");
      return;
    }

    setSaving(true);
    try {
      if (editing === "new") {
        await api.createPost(form);
        toast.success("Article créé");
      } else if (editing) {
        await api.updatePost(editing, form);
        toast.success("Article mis à jour");
      }
      setEditing(null);
      await load();
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (post: Post) => {
    try {
      await api.updatePost(post.id, { published: !post.published });
      toast.success(post.published ? "Article passé en brouillon" : "Article publié");
      await load();
    } catch {
      toast.error("Action échouée");
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;
    try {
      await api.deletePost(id);
      toast.success("Article supprimé");
      await load();
    } catch {
      toast.error("Suppression échouée");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-foreground tracking-tight">Actualités</h2>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Gérez les articles, devlogs et annonces du projet
          </p>
        </div>
        <Button
          onClick={() => startEdit()}
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-black cursor-pointer shadow-xs"
        >
          <Plus size={16} className="mr-1.5" /> Nouvel article
        </Button>
      </div>

      {editing && (
        <Card className="bg-card/90 border-border shadow-lg backdrop-blur-md">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-black text-foreground tracking-tight">
              {editing === "new" ? "Créer un article" : "Modifier l'article"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Titre</Label>
                <Input
                  placeholder="Ex: Sortie de la version 1.2"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="bg-secondary/40 border-border text-foreground font-medium"
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
                  placeholder="sortie-version-1-2"
                  value={form.slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setForm({ ...form, slug: e.target.value });
                  }}
                  className="bg-secondary/40 border-border text-foreground font-mono text-xs font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Catégorie</Label>
                <Input
                  list="category-suggestions"
                  placeholder="annonce, technique..."
                  value={form.category || ""}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="bg-secondary/40 border-border text-foreground font-medium"
                />
                <datalist id="category-suggestions">
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Extrait (optionnel)</Label>
                <Input
                  placeholder="Brève description affichée dans la liste..."
                  value={form.excerpt || ""}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="bg-secondary/40 border-border text-foreground font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-bold text-muted-foreground">Contenu</Label>
              <TiptapEditor
                content={form.content}
                onChange={(html) => setForm({ ...form, content: html })}
                placeholder="Rédigez votre article..."
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Label className="flex items-center gap-2.5 text-sm font-black text-foreground cursor-pointer">
                <Switch
                  checked={form.published}
                  onCheckedChange={(v) => setForm({ ...form, published: v })}
                  className="cursor-pointer"
                />
                <span>Publier immédiatement cet article</span>
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

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher par titre ou slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card/70 border-border text-foreground font-medium"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-card/70 border border-border rounded-xl p-0.5 text-xs font-black shadow-xs">
            {(["all", "published", "draft"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === st
                    ? "bg-primary text-primary-foreground font-black shadow-xs"
                    : "text-muted-foreground hover:text-foreground font-bold"
                }`}
              >
                {st === "all" ? "Tous" : st === "published" ? "Publiés" : "Brouillons"}
              </button>
            ))}
          </div>

          <div className="relative flex items-center">
            <Filter size={14} className="absolute left-3 text-muted-foreground pointer-events-none" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-9 pl-8 pr-3 rounded-xl bg-card/70 border border-border text-xs text-foreground font-bold focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer shadow-xs"
            >
              <option value="all">Toutes catégories</option>
              {availableCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {filteredPosts.map((p) => (
          <Card key={p.id} className="bg-card/70 border-border hover:border-primary/40 transition-colors backdrop-blur-md shadow-xs">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-black text-foreground tracking-tight truncate">{p.title}</span>
                  {!p.published ? (
                    <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent text-[11px] font-black uppercase tracking-wider">
                      brouillon
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary text-[11px] font-black uppercase tracking-wider">
                      publié
                    </Badge>
                  )}
                  <span className="text-[11px] text-muted-foreground font-bold px-2 py-0.5 rounded-md bg-secondary border border-border/60">
                    {p.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                  <span className="text-primary font-bold">/{p.slug}</span>
                  <span>·</span>
                  <span>{new Date(p.createdAt).toLocaleDateString("fr-FR")}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                {p.published && (
                  <Button size="icon" variant="ghost" asChild className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer">
                    <Link to={`/blog/${p.slug}`} target="_blank" title="Voir l'article">
                      <ExternalLink size={16} />
                    </Link>
                  </Button>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => togglePublish(p)}
                  className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
                  title={p.published ? "Passer en brouillon" : "Publier"}
                >
                  {p.published ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
                  onClick={() => startEdit(p)}
                  title="Modifier"
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10 h-8 w-8 cursor-pointer"
                  onClick={() => remove(p.id)}
                  title="Supprimer"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 border border-dashed border-border rounded-xl bg-card/50">
            <p className="text-muted-foreground text-sm font-medium">
              {posts.length === 0
                ? "Aucun article pour le moment. Cliquez sur « Nouvel article » pour commencer."
                : "Aucun article ne correspond à votre recherche."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}