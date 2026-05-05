"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main p-4 font-body relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-bg-section to-transparent -z-10 opacity-50" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-primary/5 w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-heading font-black text-primary-dark tracking-tighter uppercase mb-2">
            Admin <span className="text-primary italic font-serif text-3xl">Login.</span>
          </h1>
          <p className="text-secondary font-medium text-sm">Secure access to Al Saman dashboard</p>
        </div>

        {error && (
          <div className="bg-accent/10 text-accent text-sm font-bold p-4 rounded-2xl mb-6 text-center border border-accent/20">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-bg-soft border border-primary/10 rounded-2xl p-4 text-primary-dark font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white font-black tracking-widest uppercase text-sm rounded-2xl hover:bg-primary-dark shadow-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
          >
            {loading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>}
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
