import { useState } from "react";
import { api } from "@/api/client";
import type { WikiTool } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  Check,
  X,
  Pencil,
  GripVertical,
  ExternalLink,
  Wrench,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ToolItemProps {
  tool: WikiTool;
  onEdit: (tool: WikiTool) => void;
  onDelete: (id: string) => void;
}

function ToolItem({ tool, onEdit, onDelete }: ToolItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tool.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`bg-card/70 border-border backdrop-blur-md transition-colors shadow-xs ${
        isDragging
          ? "opacity-60 ring-2 ring-primary shadow-xl z-20"
          : "hover:border-primary/40"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3.5">
          <button
            {...attributes}
            {...listeners}
            type="button"
            className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing p-1 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Glisser pour réordonner"
          >
            <GripVertical size={18} />
          </button>

          <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center shrink-0 overflow-hidden text-muted-foreground shadow-xs">
            {tool.imagePath ? (
              <img
                src={tool.imagePath}
                alt={tool.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <Wrench size={18} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-black text-foreground text-sm tracking-tight truncate">{tool.name}</span>
              {tool.published === false ? (
                <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-wider">
                  Brouillon
                </Badge>
              ) : (
                <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                  Publié
                </Badge>
              )}
              {tool.link && (
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-0.5 text-xs font-bold"
                  title="Ouvrir le lien externe"
                >
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            <p className="text-xs text-muted-foreground font-medium line-clamp-1">
              {tool.description || <span className="italic">Aucune description</span>}
            </p>

            {tool.tags && tool.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground font-mono font-bold border border-border/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
              onClick={() => onEdit(tool)}
              title="Modifier"
            >
              <Pencil size={15} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-destructive hover:bg-destructive/10 h-8 w-8 cursor-pointer"
              onClick={() => onDelete(tool.id)}
              title="Supprimer"
            >
              <Trash2 size={15} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ToolListProps {
  tools: WikiTool[];
  onRefreshTools: () => void;
  onRefreshPages: () => void;
  onSelectTool: (tool: WikiTool) => void;
}

export default function ToolList({
  tools,
  onRefreshTools,
  onRefreshPages,
  onSelectTool,
}: ToolListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    link: "",
    imagePath: "",
    tags: "",
    sortOrder: 0,
    published: true,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tools.findIndex((t) => t.id === active.id);
      const newIndex = tools.findIndex((t) => t.id === over.id);
      const newTools = arrayMove(tools, oldIndex, newIndex);

      try {
        await Promise.all(
          newTools.map((t, i) => api.updateWikiTool(t.id, { sortOrder: i }))
        );
        onRefreshTools();
      } catch {
        toast.error("Impossible d'enregistrer le nouvel ordre");
      }
    }
  };

  const resetForm = () =>
    setForm({
      name: "",
      description: "",
      link: "",
      imagePath: "",
      tags: "",
      sortOrder: 0,
      published: true,
    });

  const startEdit = (t: WikiTool) => {
    setEditingId(t.id);
    setForm({
      name: t.name,
      description: t.description || "",
      link: t.link || "",
      imagePath: t.imagePath || "",
      tags: (t.tags || []).join(", "),
      sortOrder: t.sortOrder,
      published: t.published !== false,
    });
  };

  const close = () => {
    setEditingId(null);
    resetForm();
  };

  const save = async () => {
    if (!form.name.trim()) {
      toast.error("Le nom de l'outil est requis");
      return;
    }

    setSaving(true);
    const tags = form.tags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const data = { ...form, tags, sortOrder: Number(form.sortOrder) };

    try {
      if (editingId && editingId !== "new") {
        await api.updateWikiTool(editingId, data);
        toast.success("Outil mis à jour");
      } else {
        const newTool = await api.createWikiTool(data);
        toast.success("Outil créé");
        if (newTool) onSelectTool(newTool);
      }
      close();
      onRefreshTools();
    } catch {
      toast.error("Erreur lors de l'enregistrement de l'outil");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet outil et toutes ses pages associées ?")) {
      try {
        await api.deleteWikiTool(id);
        toast.success("Outil supprimé");
        onRefreshTools();
        onRefreshPages();
      } catch {
        toast.error("Suppression échouée");
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-foreground tracking-tight">Outils Wiki</h2>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Gérez les catégories d'outils et réorganisez-les par glisser-déposer.
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setEditingId("new");
          }}
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-black cursor-pointer shadow-xs"
        >
          <Plus size={16} className="mr-1.5" /> Ajouter un outil
        </Button>
      </div>

      {editingId && (
        <Card className="bg-card/90 border-border shadow-lg backdrop-blur-md">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-lg font-black text-foreground tracking-tight">
              {editingId === "new" ? "Ajouter un outil wiki" : "Modifier l'outil"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Nom de l'outil</Label>
                <Input
                  placeholder="Ex: Kuriimu 2"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-secondary/40 border-border text-foreground font-medium"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Lien externe (Site / GitHub)</Label>
                <Input
                  placeholder="https://github.com/..."
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  className="bg-secondary/40 border-border text-foreground font-mono text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">URL de l'icône / image</Label>
                <Input
                  placeholder="/assets/wiki/kuriimu.png"
                  value={form.imagePath}
                  onChange={(e) => setForm({ ...form, imagePath: e.target.value })}
                  className="bg-secondary/40 border-border text-foreground font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Ordre d'affichage</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={form.sortOrder}
                  onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                  className="bg-secondary/40 border-border text-foreground font-mono font-bold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-bold text-muted-foreground">Description courte</Label>
              <Textarea
                placeholder="Ex: Suite logicielle pour extraire et réinsérer les textes..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-secondary/40 border-border text-foreground min-h-20 font-medium leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-bold text-muted-foreground">Tags (séparés par des virgules)</Label>
              <Input
                placeholder="texte, extraction, graphisme, 3ds"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="bg-secondary/40 border-border text-foreground font-medium"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <Label className="flex items-center gap-2.5 text-sm font-black text-foreground cursor-pointer">
                <Switch
                  checked={form.published}
                  onCheckedChange={(v) => setForm({ ...form, published: v })}
                  className="cursor-pointer"
                />
                <span>Outil visible sur le wiki</span>
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

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tools.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tools.map((t) => (
              <ToolItem
                key={t.id}
                tool={t}
                onEdit={startEdit}
                onDelete={remove}
              />
            ))}

            {tools.length === 0 && (
              <div className="text-center py-12 border border-dashed border-border rounded-xl bg-card/50">
                <p className="text-muted-foreground text-sm font-medium">
                  Aucun outil wiki configuré. Cliquez sur « Ajouter un outil » pour commencer.
                </p>
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}