import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "@/api/client";
import type { Credit } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Check, X, ExternalLink, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { toast } from "sonner";

const DEFAULT_CATEGORIES = [
  "Graphismes & Visuels",
  "Anciens Traducteurs",
  "Remerciements Spéciaux",
];

export default function CreditsAdmin() {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    category: "Graphismes & Visuels",
    personName: "",
    task: "",
    socialLink: "",
    sortOrder: 0,
  });

  const load = useCallback(async () => {
    try {
      const data = await api.getCredits();
      setCredits(data);
    } catch {
      toast.error("Erreur lors du rechargement des crédits");
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    api.getCredits()
      .then((data) => {
        if (isMounted) {
          setCredits(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          toast.error("Impossible de charger les crédits");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(DEFAULT_CATEGORIES);
    credits.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [credits]);

  const startEdit = (c?: Credit, defaultCategory?: string) => {
    if (c) {
      setEditing(c.id);
      setForm({
        category: c.category,
        personName: c.personName,
        task: c.task || "",
        socialLink: c.socialLink || "",
        sortOrder: c.sortOrder,
      });
    } else {
      setEditing("new");
      const targetCat = defaultCategory || "Graphismes & Visuels";
      const catCount = credits.filter((item) => item.category === targetCat).length;
      setForm({
        category: targetCat,
        personName: "",
        task: "",
        socialLink: "",
        sortOrder: catCount,
      });
    }
  };

  const save = async () => {
    if (!form.personName.trim()) {
      toast.error("Le nom du contributeur est requis");
      return;
    }

    setSaving(true);
    try {
      if (editing === "new") {
        await api.createCredit(form);
        toast.success("Crédit ajouté");
      } else if (editing) {
        await api.updateCredit(editing, form);
        toast.success("Crédit mis à jour");
      }
      setEditing(null);
      await load();
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce crédit ?")) return;
    try {
      await api.deleteCredit(id);
      toast.success("Crédit supprimé");
      await load();
    } catch {
      toast.error("Suppression échouée");
    }
  };

  const moveItem = async (credit: Credit, direction: "up" | "down", itemsInCat: Credit[]) => {
    const currentIndex = itemsInCat.findIndex((i) => i.id === credit.id);
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= itemsInCat.length) return;

    const targetCredit = itemsInCat[targetIndex];

    try {
      await Promise.all([
        api.updateCredit(credit.id, { sortOrder: targetCredit.sortOrder }),
        api.updateCredit(targetCredit.id, { sortOrder: credit.sortOrder }),
      ]);
      await load();
    } catch {
      toast.error("Impossible de réordonner");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-foreground tracking-tight">Crédits & Remerciements</h2>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Gérez les contributeurs, traducteurs et personnes remerciées sur le projet.
          </p>
        </div>
        <Button
          onClick={() => startEdit()}
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-black cursor-pointer shadow-xs"
        >
          <Plus size={16} className="mr-1.5" /> Ajouter un contributeur
        </Button>
      </div>

      {editing && (
        <Card className="bg-card border-border">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-black text-foreground tracking-tight">
              {editing === "new" ? "Ajouter un crédit" : "Modifier le crédit"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Catégorie</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="w-full bg-secondary/40 border-border text-foreground font-medium cursor-pointer shadow-xs">
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-foreground">
                    {categories.map((c) => (
                      <SelectItem key={c} value={c} className="font-medium cursor-pointer">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Nom / Pseudo</Label>
                <Input
                  placeholder="Ex: Rinzler"
                  value={form.personName}
                  onChange={(e) => setForm({ ...form, personName: e.target.value })}
                  className="bg-secondary/40 border-border text-foreground font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Rôle ou Tâche</Label>
                <Input
                  placeholder="Ex: Traduction des techniques"
                  value={form.task}
                  onChange={(e) => setForm({ ...form, task: e.target.value })}
                  className="bg-secondary/40 border-border text-foreground font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Lien social (URL optionnelle)</Label>
                <Input
                  placeholder="https://x.com/..."
                  value={form.socialLink}
                  onChange={(e) => setForm({ ...form, socialLink: e.target.value })}
                  className="bg-secondary/40 border-border text-foreground font-mono text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button size="sm" variant="outline" onClick={() => setEditing(null)} className="font-black border-border hover:bg-secondary cursor-pointer shadow-xs">
                <X size={16} className="mr-1" /> Annuler
              </Button>
              <Button size="sm" onClick={save} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90 font-black cursor-pointer shadow-xs">
                {saving ? <Loader2 size={16} className="mr-1 animate-spin" /> : <Check size={16} className="mr-1" />}
                Sauvegarder
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {categories.map((cat) => {
          const items = credits
            .filter((c) => c.category === cat)
            .sort((a, b) => a.sortOrder - b.sortOrder);

          return (
            <div key={cat} className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-border">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-foreground tracking-tight">{cat}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-mono font-bold">
                    {items.length}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => startEdit(undefined, cat)}
                  className="text-xs text-muted-foreground hover:text-foreground font-black h-7 cursor-pointer"
                >
                  <Plus size={13} className="mr-1" /> Ajouter ici
                </Button>
              </div>

              {items.length === 0 ? (
                <p className="text-xs text-muted-foreground italic py-2 font-medium">Aucun contributeur dans cette catégorie.</p>
              ) : (
                <div className="space-y-2">
                  {items.map((c, idx) => (
                    <Card key={c.id} className="bg-card border-border hover:border-border/80 transition-colors">
                      <CardContent className="p-3.5 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex flex-col gap-0.5">
                            <button
                              type="button"
                              onClick={() => moveItem(c, "up", items)}
                              disabled={idx === 0}
                              className="text-muted-foreground hover:text-foreground disabled:opacity-20 transition-opacity cursor-pointer"
                              title="Monter"
                            >
                              <ArrowUp size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveItem(c, "down", items)}
                              disabled={idx === items.length - 1}
                              className="text-muted-foreground hover:text-foreground disabled:opacity-20 transition-opacity cursor-pointer"
                              title="Descendre"
                            >
                              <ArrowDown size={13} />
                            </button>
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-black text-foreground text-sm tracking-tight truncate">{c.personName}</span>
                              {c.socialLink && (
                                <a
                                  href={c.socialLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground hover:text-primary transition-colors inline-flex cursor-pointer"
                                  title="Ouvrir le lien"
                                >
                                  <ExternalLink size={12} />
                                </a>
                              )}
                            </div>
                            {c.task && <p className="text-xs text-muted-foreground font-medium truncate mt-0.5">{c.task}</p>}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
                            onClick={() => startEdit(c)}
                            title="Modifier"
                          >
                            <Pencil size={15} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:bg-destructive/10 h-8 w-8 cursor-pointer"
                            onClick={() => remove(c.id)}
                            title="Supprimer"
                          >
                            <Trash2 size={15} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}