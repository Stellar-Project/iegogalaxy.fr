import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/client";
import { useAuth } from "@/api/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.login(email, password);
      login(res.token, res.user);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900 border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
          <CardDescription>Connectez-vous pour gérer le site</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-800 border-white/10 text-white" required />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Mot de passe</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-slate-800 border-white/10 text-white" required />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">Se connecter</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
