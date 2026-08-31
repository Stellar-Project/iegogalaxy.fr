import { useCallback, useEffect, useState } from "react";
import { api } from "@/api/client";
import type { AdminUser } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Shield, Ban } from "lucide-react";
import { toast } from "sonner";

export default function UsersAdmin() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ role: "", banned: false, banReason: "", banExpires: "" });

  const load = useCallback(async () => {
    const data = await api.getUsers();
    setUsers(data);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      const data = await api.getUsers();
      if (isMounted) {
        setUsers(data);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const startEdit = (u: AdminUser) => {
    setEditing(u.id);
    setForm({
      role: u.role || "",
      banned: Boolean(u.banned),
      banReason: u.banReason || "",
      banExpires: u.banExpires ? new Date(u.banExpires).toISOString().slice(0, 10) : "",
    });
  };

  const save = async () => {
    if (!editing) return;
    await api.updateUser(editing, {
      role: form.role || null,
      banned: form.banned,
      banReason: form.banReason || null,
      banExpires: form.banExpires || null,
    } as Partial<AdminUser>);
    toast.success("Utilisateur mis à jour");
    setEditing(null);
    load();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Utilisateurs</h2>

      {editing && (
        <Card className="bg-slate-900 border-white/10">
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm text-slate-400 mb-1.5 block">Rôle</Label>
                <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                  <SelectTrigger className="w-full bg-slate-800 border-white/10 text-white">
                    <SelectValue placeholder="Utilisateur" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10 text-white">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">Utilisateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-slate-400 block">Bannir</Label>
                <div className="flex items-center gap-2">
                  <Switch checked={form.banned} onCheckedChange={(v) => setForm({ ...form, banned: v })} />
                  <span className="text-sm text-slate-300">{form.banned ? "Banni" : "Actif"}</span>
                </div>
              </div>
              {form.banned && (
                <>
                  <Input placeholder="Raison du ban" value={form.banReason} onChange={(e) => setForm({ ...form, banReason: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
                  <Input type="date" placeholder="Expire le" value={form.banExpires} onChange={(e) => setForm({ ...form, banExpires: e.target.value })} className="bg-slate-800 border-white/10 text-white" />
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={save} className="bg-blue-600 hover:bg-blue-500 text-white">Sauvegarder</Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(null)}>Annuler</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {users.map((u) => (
          <Card key={u.id} className="bg-slate-900/50 border-white/10">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {u.name[0]?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white truncate">{u.name}</span>
                    {u.role === "admin" && <Badge variant="outline" className="border-blue-500/30 text-blue-400 shrink-0"><Shield size={10} className="mr-1" />admin</Badge>}
                    {u.banned && <Badge variant="outline" className="border-red-500/30 text-red-400 shrink-0"><Ban size={10} className="mr-1" />banni</Badge>}
                  </div>
                  <p className="text-xs text-slate-500 truncate">{u.email}</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="text-slate-300 shrink-0" onClick={() => startEdit(u)}><Pencil size={16} /></Button>
            </CardContent>
          </Card>
        ))}
        {users.length === 0 && <p className="text-slate-500 text-sm text-center py-8">Aucun utilisateur.</p>}
      </div>
    </div>
  );
}