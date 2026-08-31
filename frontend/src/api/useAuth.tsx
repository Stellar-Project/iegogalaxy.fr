import { createContext, useContext, type ReactNode } from "react";
import { useSession, signIn, signOut } from "@/lib/auth-client";
import Loading from "@/components/Loading";

interface AuthState {
  user: { id: string; email: string; name: string; username?: string | null } | null
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  isPending: boolean
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending, refetch } = useSession();

  const login = async (username: string, password: string) => {
    const res = await signIn.username({ username, password });
    if (res.error) throw new Error(res.error.message || "Identifiants invalides");
    await refetch();
  };

  const logout = async () => {
    await signOut();
  };

  const user = session?.user ?? null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!session, isPending }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
