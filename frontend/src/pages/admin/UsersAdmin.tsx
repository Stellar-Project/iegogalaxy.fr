import { useCallback, useEffect, useState, useMemo } from "react";
import { api } from "@/api/client";
import type { AdminUser } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pencil,
  Shield,
  Ban,
  Search,
  Check,
  X,
  Loader2,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function UsersAdmin() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "admin" | "user" | "banned">("all");

  const [form, setForm] = useState({
    role: "",
    banned: false,
    banReason: "",
    banExpires: "",
  });

  const load = useCallback(async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch {
      toast.error("Erreur lors du rechargement des utilisateurs");
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    api.getUsers()
      .then((data) => {
        if (isMounted) {
          setUsers(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          toast.error("Impossible de charger les utilisateurs");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const startEdit = (u: AdminUser) => {
    setEditing(u.id);
    setForm({
      role: u.role || "user",
      banned: Boolean(u.banned),
      banReason: u.banReason || "",
      banExpires: u.banExpires ? new Date(u.banExpires).toISOString().slice(0, 10) : "",
    });
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);

    try {
      await api.updateUser(editing, {
        role: form.role || null,
        banned: form.banned,
        banReason: form.banned ? form.banReason || null : null,
        banExpires: form.banned ? form.banExpires || null : null,
      } as Partial<AdminUser>);

      toast.success("Utilisateur mis à jour");
      setEditing(null);
      await load();
    } catch {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const nameMatch = (u.name || "").toLowerCase().includes(search.toLowerCase());
      const emailMatch = (u.email || "").toLowerCase().includes(search.toLowerCase());
      const matchesSearch = nameMatch || emailMatch;

      if (!matchesSearch) return false;

      if (filterRole === "admin") return u.role === "admin";
      if (filterRole === "user") return u.role !== "admin" && !u.banned;
      if (filterRole === "banned") return Boolean(u.banned);

      return true;
    });
  }, [users, search, filterRole]);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-foreground tracking-tight">Gestion des Utilisateurs</h2>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Administrez les rôles, permissions et statuts de modération des membres.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-secondary/40 border-border text-foreground font-medium w-full"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select
            value={filterRole}
            onValueChange={(v: "all" | "admin" | "user" | "banned") => setFilterRole(v)}
          >
            <SelectTrigger className="w-full sm:w-40 bg-secondary/40 border-border text-foreground font-medium cursor-pointer shadow-xs">
              <SelectValue placeholder="Filtrer" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border text-foreground">
              <SelectItem value="all" className="font-medium cursor-pointer">Tous ({users.length})</SelectItem>
              <SelectItem value="admin" className="font-medium cursor-pointer">Admins</SelectItem>
              <SelectItem value="user" className="font-medium cursor-pointer">Membres</SelectItem>
              <SelectItem value="banned" className="font-medium cursor-pointer">Bannis</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {editing && (
        <Card className="bg-card/90 border-border shadow-lg backdrop-blur-md">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-lg font-black text-foreground tracking-tight">
              Modifier le compte utilisateur
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Rôle utilisateur</Label>
                <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                  <SelectTrigger className="bg-secondary/40 border-border text-foreground font-medium cursor-pointer shadow-xs">
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-foreground">
                    <SelectItem value="user" className="font-medium cursor-pointer">Utilisateur standard</SelectItem>
                    <SelectItem value="admin" className="font-medium cursor-pointer">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-bold text-muted-foreground">Statut du compte</Label>
                <div className="flex items-center gap-3 h-10 px-3 rounded-xl border border-border bg-secondary/30">
                  <Switch
                    checked={form.banned}
                    onCheckedChange={(v) => setForm({ ...form, banned: v })}
                    className="cursor-pointer"
                  />
                  <span className={`text-sm font-black ${form.banned ? "text-destructive" : "text-foreground"}`}>
                    {form.banned ? "Compte banni" : "Compte actif"}
                  </span>
                </div>
              </div>
            </div>

            {form.banned && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 space-y-3 animate-in fade-in-50">
                <h4 className="text-xs font-black uppercase tracking-wider text-destructive flex items-center gap-1.5">
                  <AlertCircle size={14} /> Détails de la sanction
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-muted-foreground">Raison du bannissement</Label>
                    <Input
                      placeholder="Ex: Non-respect des règles de la communauté"
                      value={form.banReason}
                      onChange={(e) => setForm({ ...form, banReason: e.target.value })}
                      className="bg-card border-border text-foreground text-xs font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-muted-foreground">Date d'expiration (optionnel)</Label>
                    <Input
                      type="date"
                      value={form.banExpires}
                      onChange={(e) => setForm({ ...form, banExpires: e.target.value })}
                      className="bg-card border-border text-foreground text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
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

      <div className="space-y-2">
        {filteredUsers.map((u) => {
          const initial = (u.name?.trim() || u.email?.trim() || "?")[0].toUpperCase();

          return (
            <Card key={u.id} className="bg-card/70 border-border hover:border-primary/40 transition-colors backdrop-blur-md shadow-xs">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-sm font-black text-foreground shrink-0 shadow-xs">
                      {initial}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="font-black text-foreground tracking-tight truncate">{u.name || "Sans nom"}</span>
                        {u.role === "admin" && (
                          <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider gap-1">
                            <Shield size={11} /> Admin
                          </Badge>
                        )}
                        {u.banned && (
                          <Badge variant="outline" className="border-destructive/40 bg-destructive/10 text-destructive text-[10px] font-black uppercase tracking-wider gap-1">
                            <Ban size={11} /> Banni
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground font-mono truncate">{u.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
                      onClick={() => startEdit(u)}
                      title="Modifier les permissions"
                    >
                      <Pencil size={15} />
                    </Button>
                  </div>
                </div>

                {u.banned && (
                  <div className="mt-3 pt-2.5 border-t border-border/50 text-xs flex flex-wrap items-center gap-x-4 gap-y-1 text-destructive font-medium">
                    {u.banReason && (
                      <span className="truncate">
                        <strong>Motif :</strong> {u.banReason}
                      </span>
                    )}
                    {u.banExpires && (
                      <span className="flex items-center gap-1 font-mono text-[11px] font-bold">
                        <Calendar size={12} />
                        Expire le : {new Date(u.banExpires).toLocaleDateString("fr-FR")}
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 border border-dashed border-border rounded-xl bg-card/50">
            <p className="text-muted-foreground text-sm font-medium">
              Aucun utilisateur ne correspond à vos critères de recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}