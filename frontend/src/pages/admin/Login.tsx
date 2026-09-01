import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/api/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, ArrowLeft, Lock } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      navigate("/admin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Identifiants invalides");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex relative w-1/2 items-center justify-center overflow-hidden border-r border-border">
        <div className="absolute inset-0">
          <img src="/assets/global/bg/mainVisual_01.png" alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-transparent" />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "url('/assets/global/bg/bg_repeat.png')", backgroundRepeat: "repeat", opacity: 0.1 }}
          />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center px-12">
          <img src="/assets/global/logo.png" alt="Inazuma Eleven GO Galaxy" className="h-16 mx-auto mb-6 drop-shadow-md" />
          <h1 className="text-4xl font-black text-foreground mb-2 tracking-tight">Espace Administration</h1>
          <p className="text-muted-foreground text-lg font-bold">Stellar Project</p>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        <div className="absolute inset-0 lg:hidden">
          <img src="/assets/global/bg/mainVisual_01.png" alt="" className="w-full h-full object-cover opacity-15" />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "url('/assets/global/bg/bg_repeat.png')", backgroundRepeat: "repeat", opacity: 0.05 }}
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xs" />
        </div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative z-10 w-full max-w-md space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground font-black cursor-pointer -ml-2">
              <Link to="/">
                <ArrowLeft size={16} className="mr-1.5" /> Retour au site
              </Link>
            </Button>
          </div>

          <div className="text-center lg:hidden">
            <img src="/assets/global/logo.png" alt="" className="h-12 mx-auto mb-3" />
            <h1 className="text-2xl font-black text-foreground tracking-tight">Administration</h1>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Lock size={18} />
              </div>
              <h2 className="text-xl font-black text-foreground tracking-tight">Connexion</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Connectez-vous pour gérer le site et les données</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-3.5 py-2.5 font-bold">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-sm text-muted-foreground font-bold">
                  Identifiant
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-secondary/40 border-border text-foreground font-medium"
                  placeholder="admin"
                  autoComplete="username"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm text-muted-foreground font-bold">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-secondary/40 border-border text-foreground pr-10 font-medium"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 font-black mt-2 cursor-pointer shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" /> Connexion en cours...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>
          </div>

          <p className="text-center text-xs text-muted-foreground font-medium">
            Stellar Project &copy; {new Date().getFullYear()} — Tous droits réservés
          </p>
        </motion.div>
      </div>
    </div>
  );
}