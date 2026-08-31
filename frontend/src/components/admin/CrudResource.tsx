import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Check, X, Upload, Save } from "lucide-react";
import { api } from "@/api/client";

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
  title, fields, makeDefault, load, create, update, remove, renderItem, listEmpty,
}: CrudResourceProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<T>(makeDefault);
  const [saving, setSaving] = useState(false);

  const refresh = async () => setItems(await load());

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCreate = () => { setEditing("new"); setForm(makeDefault()); };
  const startEdit = (item: T) => { setEditing(item.id); setForm({ ...item } as T); };
  const close = () => { setEditing(null); };
  const setField = (data: Partial<T>) => setForm((f) => ({ ...f, ...data }));

  const save = async () => {
    setSaving(true);
    try {
      if (editing === "new") await create({ ...form } as Record<string, unknown>);
      else if (editing) await update(editing, { ...form } as Record<string, unknown>);
      close();
      await refresh();
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (id: string) => {
    await remove(id);
    await refresh();
  };

  const renderField = (field: FieldDef<T>) => {
    const value = form[field.key] as unknown;
    const cls = `bg-slate-800 border-white/10 text-white ${field.type === "switch" ? "" : ""}`;

    switch (field.type) {
      case "text": case "number":
        return <Input type={field.type} placeholder={field.placeholder} value={(value ?? "") as string} onChange={(e) => setField({ [field.key]: field.type === "number" ? (parseInt(e.target.value) || 0) : e.target.value } as Partial<T>)} className={cls} />;
      case "textarea":
        return <Textarea placeholder={field.placeholder} value={(value ?? "") as string} onChange={(e) => setField({ [field.key]: e.target.value } as Partial<T>)} className="bg-slate-800 border-white/10 text-white" />;
      case "select":
        return (
          <Select value={(value ?? "") as string} onValueChange={(v) => setField({ [field.key]: v } as Partial<T>)}>
            <SelectTrigger className="w-full bg-slate-800 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10 text-white">
              {field.options?.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        );
      case "switch":
        return (
          <div className="flex items-center gap-2">
            <Switch checked={Boolean(value)} onCheckedChange={(v) => setField({ [field.key]: v } as Partial<T>)} />
            <span className="text-sm text-slate-300">{field.label}</span>
          </div>
        );
      case "image":
        return (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input placeholder={field.placeholder} value={(value ?? "") as string} onChange={(e) => setField({ [field.key]: e.target.value } as Partial<T>)} className="bg-slate-800 border-white/10 text-white flex-1" />
              <label className="shrink-0 cursor-pointer">
                <span className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg"><Upload size={14} /> Uploader</span>
                <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const { url } = await api.uploadFile(file);
                    setField({ [field.key]: url } as Partial<T>);
                  } catch { /* ponytail: upload failure, UI shows nothing */ }
                }} />
              </label>
            </div>
            {value && <img src={value as string} alt="preview" className="h-32 object-contain rounded bg-slate-800" />}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <Button onClick={startCreate} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white"><Plus size={16} className="mr-1" /> Ajouter</Button>
      </div>

      {editing && (
        <Card className="bg-slate-900 border-white/10">
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {fields.map((field, i) => {
                if (field.type === "switch" || field.type === "image" || field.type === "textarea") return null;
                return <div key={String(field.key)} className={field.span === 2 ? "col-span-2" : ""}>{renderField(field)}</div>;
              })}
              {fields.filter((f) => f.type === "textarea").map((field) => (
                <div key={String(field.key)} className="col-span-2">{renderField(field)}</div>
              ))}
              {fields.filter((f) => f.type === "image").map((field) => (
                <div key={String(field.key)} className="col-span-2">{renderField(field)}</div>
              ))}
              {fields.filter((f) => f.type === "switch").map((field) => (
                <div key={String(field.key)}>{renderField(field)}</div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={save} disabled={saving} className="bg-blue-600 hover:bg-blue-500 text-white"><Check size={16} className="mr-1" /> {saving ? "Enregistrement..." : "Sauvegarder"}</Button>
              <Button size="sm" variant="outline" onClick={close}><X size={16} className="mr-1" /> Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {items.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-8">{listEmpty || "Aucun élément."}</p>
      ) : (
        <div className={title === "Screenshots" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-2"}>
          {items.map((item) => renderItem(item, { edit: startEdit, remove: handleRemove }))}
        </div>
      )}
    </div>
  );
}

export { Save };
