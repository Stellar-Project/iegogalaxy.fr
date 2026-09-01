import { createContext, useContext, type ReactNode } from "react";
import { useSession, signIn, signOut } from "@/lib/auth-client";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  username?: string | null;
  role?: string | null;
}

interface AuthState {
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isPending: boolean;
}

const AuthContext = createContext<AuthState | null>(null);

interface SignInWithUsername {
  username: (creds: {
    username: string;
    password: string;
  }) => Promise<{ error?: { message?: string } }>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending, refetch } = useSession();

  const login = async (username: string, password: string) => {
    const authClient = signIn as unknown as SignInWithUsername;
    const res = await authClient.username({ username, password });

    if (res?.error) {
      throw new Error(res.error.message || "Identifiants invalides");
    }

    await refetch();
  };

  const logout = async () => {
    await signOut();
    await refetch();
  };

  const user = (session?.user as AuthUser | undefined) ?? null;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!session?.user,
        isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un <AuthProvider />");
  }
  return ctx;
}