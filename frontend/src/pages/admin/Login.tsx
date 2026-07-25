import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/api/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "Identifiants invalides");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <div className="hidden lg:flex relative w-1/2 items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/bg/mainVisual_01.png" alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent" />
          <div className="absolute inset-0" style={{ backgroundImage: "url('/assets/bg/bg_repeat.png')", backgroundRepeat: "repeat", opacity: 0.1 }} />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center px-12">
          <img src="/assets/logo/logo.png" alt="Inazuma Eleven GO Galaxy" className="h-16 mx-auto mb-6" />
          <h1 className="text-4xl font-extrabold text-white mb-2">Administration</h1>
          <p className="text-slate-400 text-lg">Stellar Project</p>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 lg:hidden">
          <img src="/assets/bg/mainVisual_01.png" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ backgroundImage: "url('/assets/bg/bg_repeat.png')", backgroundRepeat: "repeat", opacity: 0.05 }} />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <img src="/assets/logo/logo.png" alt="" className="h-12 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white">Administration</h1>
          </div>
          <div className="bg-slate-900/80 backdrop-blur border border-white/10 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-white mb-1">Connexion</h2>
            <p className="text-sm text-slate-400 mb-6">Connectez-vous pour gérer le site</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</p>}
              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">Identifiant</label>
                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-slate-800 border-white/10 text-white" placeholder="admin" required />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">Mot de passe</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-slate-800 border-white/10 text-white" placeholder="••••••••" required />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 h-10">Se connecter</Button>
            </form>
          </div>
          <p className="text-center text-xs text-slate-600 mt-6">Stellar Project &copy; {new Date().getFullYear()}</p>
        </motion.div>
      </div>
    </div>
  );
}
