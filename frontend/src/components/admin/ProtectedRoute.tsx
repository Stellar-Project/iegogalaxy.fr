import { Navigate } from "react-router-dom"
import { useAuth } from "@/api/useAuth"
import Loading from "@/components/Loading"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isPending } = useAuth()

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loading message="Vérification de l'authentification..." />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}
