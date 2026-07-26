import { createContext, useContext, type ReactNode } from "react";
import { useSession, signIn, signOut } from "@/lib/auth-client";
import Loading from "@/components/Loading";

interface AuthState {
  token: string | null
  user: { id: string; email: string; name: string; username?: string | null } | null
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();

  if (isPending) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><Loading /></div>;

  const login = async (username: string, password: string) => {
    const res = await signIn.username({ username, password });
    if (res.error) throw new Error(res.error.message || "Identifiants invalides");
  };

  const logout = async () => {
    await signOut();
  };

  const user = session?.user ?? null;
  const token = null;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!session }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
