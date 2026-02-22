"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Credenciales inválidas. Intenta de nuevo.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-semibold text-primary mb-2">
            Dos<span className="text-accent">Arroyos</span>
          </h1>
          <p className="text-[var(--text-muted)] text-sm">Panel de Administración</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-border rounded-xl p-8">
          <h2 className="font-serif text-2xl mb-6">Iniciar Sesión</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-5 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Usuario</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-primary transition-colors"
              placeholder=""
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3.5 border border-border rounded-lg text-sm bg-white focus:outline-none focus:border-primary transition-colors"
              placeholder=""
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white rounded-lg text-sm font-semibold tracking-wider hover:bg-primary-light transition-all disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

          <p className="text-xs text-[var(--text-muted)] text-center mt-4">
            Panel de administración de Dos Arroyos
          </p>
        </form>
      </div>
    </div>
  );
}
