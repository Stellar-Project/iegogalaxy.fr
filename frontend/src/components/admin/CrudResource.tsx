import { type ReactNode, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Check, X, Upload, Loader2, Save } from "lucide-react";
import { api } from "@/api/client";
import { toast } from "sonner";

export type FieldType = "text" | "number" | "textarea" | "select" | "switch" | "image";

export interface FieldDef<T> {
  key: keyof T;
  label?: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  span?: 1 | 2;
}

interface CrudResourceProps<T extends { id: string }> {
  title: string;
  fields: FieldDef<T>[];
  makeDefault: () => T;
  load: () => Promise<T[]>;
  create: (data: Record<string, unknown>) => Promise<unknown>;
  update: (id: string, data: Record<string, unknown>) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
  renderItem: (item: T, ctx: { edit: (item: T) => void; remove: (id: string) => void }) => ReactNode;
  listEmpty?: string;
}

export default function CrudResource<T extends { id: string }>({
  title,
  fields,
  makeDefault,
  load,
  create,
  update,
  remove,
  renderItem,
  listEmpty,
}: CrudResourceProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<T>(makeDefault);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<keyof T | null>(null);

  const refresh = useCallback(async () => {
    try {
      const data = await load();
      setItems(data);
    } catch {
      toast.error("Erreur lors du chargement des données");
    }
  }, [load]);

  useEffect(() => {
    let isMounted = true;

    load()
      .then((data) => {
        if (isMounted) {
          setItems(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          toast.error("Erreur lors du chargement des données");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [load]);

  const startCreate = () => {
    setEditing("new");
    setForm(makeDefault());
  };

  const startEdit = (item: T) => {
    setEditing(item.id);
    setForm({ ...item });
  };

  const close = () => {
    setEditing(null);
  };

  const setField = (data: Partial<T>) => setForm((f) => ({ ...f, ...data }));

  const save = async () => {
    setSaving(true);
    try {
      if (editing === "new") {
        await create({ ...form } as Record<string, unknown>);
        toast.success("Élément créé avec succès");
      } else if (editing) {
        await update(editing, { ...form } as Record<string, unknown>);
        toast.success("Élément mis à jour");
      }
      close();
      await refresh();
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await remove(id);
      toast.success("Élément supprimé");
      await refresh();
    } catch {
      toast.error("Échec de la suppression");
    }
  };

  const handleFileUpload = async (fieldKey: keyof T, file: File) => {
    setUploadingKey(fieldKey);
    try {
      const { url } = await api.uploadFile(file);
      setField({ [fieldKey]: url } as Partial<T>);
      toast.success("Image téléversée");
    } catch {
      toast.error("Échec de l'upload de l'image");
    } finally {
      setUploadingKey(null);
    }
  };

  const renderField = (field: FieldDef<T>) => {
    const value = form[field.key] as unknown;

    switch (field.type) {
      case "text":
      case "number":
        return (
          <div className="space-y-1.5">
            {field.label && <Label className="text-sm text-muted-foreground font-bold">{field.label}</Label>}
            <Input
              type={field.type}
              placeholder={field.placeholder}
              value={(value ?? "") as string}
              onChange={(e) => {
                const val = field.type === "number" ? (e.target.value === "" ? 0 : parseInt(e.target.value, 10)) : e.target.value;
                setField({ [field.key]: val } as Partial<T>);
              }}
              className="bg-secondary/40 border-border text-foreground font-medium"
            />
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-1.5">
            {field.label && <Label className="text-sm text-muted-foreground font-bold">{field.label}</Label>}
            <Textarea
              placeholder={field.placeholder}
              value={(value ?? "") as string}
              onChange={(e) => setField({ [field.key]: e.target.value } as Partial<T>)}
              className="bg-secondary/40 border-border text-foreground min-h-22.5 font-medium"
            />
          </div>
        );

      case "select":
        return (
          <div className="space-y-1.5">
            {field.label && <Label className="text-sm text-muted-foreground font-bold">{field.label}</Label>}
            <Select
              value={(value ?? "") as string}
              onValueChange={(v) => setField({ [field.key]: v } as Partial<T>)}
            >
              <SelectTrigger className="w-full bg-secondary/40 border-border text-foreground font-medium cursor-pointer">
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-border text-foreground">
                {field.options?.map((o) => (
                  <SelectItem key={o.value} value={o.value} className="cursor-pointer font-medium">
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "switch":
        return (
          <div className="flex items-center gap-2.5 pt-2">
            <Switch
              checked={Boolean(value)}
              onCheckedChange={(v) => setField({ [field.key]: v } as Partial<T>)}
            />
            {field.label && <span className="text-sm text-foreground font-bold">{field.label}</span>}
          </div>
        );

      case "image": {
        const isUploading = uploadingKey === field.key;
        return (
          <div className="space-y-2">
            {field.label && <Label className="text-sm text-muted-foreground font-bold">{field.label}</Label>}
            <div className="flex gap-2">
              <Input
                placeholder={field.placeholder || "URL de l'image..."}
                value={(value ?? "") as string}
                onChange={(e) => setField({ [field.key]: e.target.value } as Partial<T>)}
                className="bg-secondary/40 border-border text-foreground flex-1 font-mono text-xs"
              />
              <label className="shrink-0 cursor-pointer">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isUploading}
                  asChild
                  className="text-foreground border-border hover:bg-secondary font-black cursor-pointer shadow-xs"
                >
                  <span>
                    {isUploading ? <Loader2 size={14} className="mr-1.5 animate-spin" /> : <Upload size={14} className="mr-1.5" />}
                    {isUploading ? "Upload..." : "Uploader"}
                  </span>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(field.key, file);
                  }}
                />
              </label>
            </div>
            {Boolean(value) && (
              <div className="h-32 rounded-lg border border-border bg-secondary/30 overflow-hidden flex items-center justify-center p-2 relative shadow-inner">
                <img
                  src={value as string}
                  alt="Aperçu"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-foreground tracking-tight">{title}</h2>
        </div>
        <Button
          onClick={startCreate}
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-black cursor-pointer shadow-xs"
        >
          <Plus size={16} className="mr-1.5" /> Ajouter
        </Button>
      </div>

      {editing && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-lg text-foreground font-black tracking-tight">
              {editing === "new" ? `Ajouter : ${title}` : `Modifier : ${title}`}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div
                  key={String(field.key)}
                  className={field.span === 2 || field.type === "textarea" || field.type === "image" ? "col-span-1 md:col-span-2" : "col-span-1"}
                >
                  {renderField(field)}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
              <Button size="sm" variant="outline" onClick={close} className="font-black border-border hover:bg-secondary cursor-pointer shadow-xs">
                <X size={16} className="mr-1" /> Annuler
              </Button>
              <Button
                size="sm"
                onClick={save}
                disabled={saving || uploadingKey !== null}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-black cursor-pointer shadow-xs"
              >
                {saving ? <Loader2 size={16} className="mr-1 animate-spin" /> : <Check size={16} className="mr-1" />}
                Sauvegarder
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {items.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-xl bg-card/40">
          <p className="text-muted-foreground text-sm font-medium">{listEmpty || "Aucun élément pour le moment."}</p>
        </div>
      ) : (
        <div
          className={
            title === "Screenshots" || title === "Fonds d'écran Hero"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-2.5"
          }
        >
          {items.map((item) => renderItem(item, { edit: startEdit, remove: handleRemove }))}
        </div>
      )}
    </div>
  );
}

export { Save };