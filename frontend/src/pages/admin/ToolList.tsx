import { useState } from "react";
import { api } from "@/api/client";
import type { WikiTool, WikiPage } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TiptapEditor from "@/components/admin/TiptapEditor";
import { Plus, Pencil, Trash2, Check, X, FileText, Eye, Edit3, ChevronUp, ChevronDown, GripVertical } from "lucide-react";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
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
  onMove: (id: string, direction: "up" | "down") => void;
  isDragging: boolean;
}

function ToolItem({ tool, onEdit, onDelete, isDragging }: ToolItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: localIsDragging,
  } = useSortable({ id: tool.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`bg-slate-900/50 border-white/10 cursor-grab active:cursor-grabbing ${isDragging ? "ring-2 ring-blue-500/50" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="text-slate-400 hover:text-white p-1"
            aria-label="Glisser pour réordonner"
          >
            <GripVertical size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white truncate">{tool.name}</span>
              {tool.published === false && <Badge variant="secondary" className="text-xs">Brouillon</Badge>}
            </div>
            <p className="text-sm text-slate-400 truncate mt-1">{tool.description || "Pas de description"}</p>
          </div>
          <div className="flex items-center gap-1">
            <Button size="icon" variant="ghost" className="text-slate-300" onClick={() => onEdit(tool)}><Edit3 size={16} /></Button>
            <Button size="icon" variant="ghost" className="text-red-400" onClick={() => onDelete(tool.id)}><Trash2 size={16} /></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ToolListProps {
  tools: WikiTool[];
  pages: WikiPage[];
  onRefreshTools: () => void;
  onRefreshPages: () => void;
  onSelectTool: (tool: WikiTool) => void;
  onCreatePage: (tool: WikiTool) => void;
}

export default function ToolList({ tools, pages, onRefreshTools, onRefreshPages, onSelectTool, onCreatePage }: ToolListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", description: "", link: "", imagePath: "", tags: "", sortOrder: 0, published: true,
    supernovaRomLink: "", bigbangRomLink: "", supernovaRomSize: "", bigbangRomSize: "",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tools.findIndex(t => t.id === active.id);
      const newIndex = tools.findIndex(t => t.id === over.id);
      const newTools = arrayMove(tools, oldIndex, newIndex);
      newTools.forEach((t, i) => api.updateWikiTool(t.id, { sortOrder: i }));
      onRefreshTools();
    }
  };

  const resetForm = () => setForm({ name: "", description: "", link: "", imagePath: "", tags: "", sortOrder: 0, published: true, supernovaRomLink: "", bigbangRomLink: "", supernovaRomSize: "", bigbangRomSize: "" });

  const startEdit = (t: WikiTool) => {
    setEditingId(t.id);
    setForm({
      name: t.name, description: t.description || "", link: t.link || "", imagePath: t.imagePath || "",
      tags: (t.tags || []).join(", "), sortOrder: t.sortOrder, published: t.published !== false,
      supernovaRomLink: t.supernovaRomLink || "", bigbangRomLink: t.bigbangRomLink || "",
      supernovaRomSize: t.supernovaRomSize || "", bigbangRomSize: t.bigbangRomSize || "",
    });
  };

  const close = () => { setEditingId(null); resetForm(); };

  const save = async () => {
    const tags = form.tags.split(",").map(s => s.trim()).filter(Boolean);
    const data = { ...form, tags, sortOrder: Number(form.sortOrder) };
    if (editingId) await api.updateWikiTool(editingId, data);
    else {
      const newTool = await api.createWikiTool(data);
      if (newTool) onSelectTool(newTool);
    }
    close(); onRefreshTools();
  };

  const remove = async (id: string) => {
    if (confirm("Supprimer cet outil et toutes ses pages ?")) {
      await api.deleteWikiTool(id);
      toast.success("Outil supprimé");
      onRefreshTools(); onRefreshPages();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Outils Wiki</h2>
        <Button onClick={() => { resetForm(); setEditingId("new"); }} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white"><Plus size={16} className="mr-1" /> Ajouter</Button>
      </div>

      {editingId && (
        <Card className="bg-slate-900 border-white/10">
          <CardHeader><CardTitle className="text-lg text-white">{editingId === "new" ? "Nouvel outil" : "Modifier l'outil"}</CardTitle></CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Nom" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bg-slate-800 border-white/10 text-white" required />
              <Input placeholder="Lien (optionnel)" value={form.link} onChange={e => setForm({...form, link: e.target.value})} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Image (optionnel)" value={form.imagePath} onChange={e => setForm({...form, imagePath: e.target.value})} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Ordre (0, 1, 2...)" type="number" value={form.sortOrder} onChange={e => setForm({...form, sortOrder: e.target.value})} className="bg-slate-800 border-white/10 text-white" />
              <Label className="flex items-center gap-2 text-sm text-slate-300"><Switch checked={form.published} onCheckedChange={v => setForm({...form, published: v})} /> Publié</Label>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Description</label>
              <Textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="bg-slate-800 border-white/10 text-white" rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Tags (séparés par des virgules)" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <hr className="border-white/10 my-2" />
            <h4 className="text-sm font-semibold text-white">ROMs Supernova</h4>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Lien ROM" value={form.supernovaRomLink} onChange={e => setForm({...form, supernovaRomLink: e.target.value})} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Taille ROM" value={form.supernovaRomSize} onChange={e => setForm({...form, supernovaRomSize: e.target.value})} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <h4 className="text-sm font-semibold text-white">ROMs Big Bang</h4>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Lien ROM" value={form.bigbangRomLink} onChange={e => setForm({...form, bigbangRomLink: e.target.value})} className="bg-slate-800 border-white/10 text-white" />
              <Input placeholder="Taille ROM" value={form.bigbangRomSize} onChange={e => setForm({...form, bigbangRomSize: e.target.value})} className="bg-slate-800 border-white/10 text-white" />
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={save} className="bg-blue-600 hover:bg-blue-500 text-white"><Check size={16} className="mr-1" /> Sauvegarder</Button>
              <Button variant="outline" onClick={close}><X size={16} className="mr-1" /> Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tools.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tools.map((t) => (
              <ToolItem
                key={t.id}
                tool={t}
                onEdit={startEdit}
                onDelete={remove}
                isDragging={editingId !== null}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}