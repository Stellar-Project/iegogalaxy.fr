import { Navigate } from "react-router-dom";
import { useAuth } from "@/api/useAuth";
import Loading from "@/components/Loading";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isPending } = useAuth();
  if (isPending) return <div className="min-h-screen bg-background flex items-center justify-center"><Loading /></div>;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
