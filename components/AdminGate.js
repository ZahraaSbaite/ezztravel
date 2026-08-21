"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminGate({ children }) {
  const [session, setSession] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setError(signInError.message);
    setSubmitting(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (session === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface text-fg">
        <p className="text-sm text-fg/50">Loading…</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-6 text-fg">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-5 rounded-lg border border-gold/20 bg-panel p-8 shadow-luxe"
        >
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-gold">ADMIN</p>
            <p className="mt-1 font-display text-xl text-fg">Sign in</p>
          </div>
          <div>
            <label className="mb-1 block text-sm text-fg/70" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-edge/20 bg-transparent px-3 py-2 text-sm text-fg outline-none transition-colors focus:border-gold"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-fg/70" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-edge/20 bg-transparent px-3 py-2 text-sm text-fg outline-none transition-colors focus:border-gold"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-sm bg-gold px-6 py-2.5 text-sm font-medium text-night transition-all hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-gold-glow disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-fg">
      <header className="border-b border-edge/10 bg-panel px-6 py-4">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a href="/admin/posts" className="font-display text-lg text-fg">
              Ezz Travel Admin
            </a>
            <nav className="flex flex-wrap gap-4 text-sm text-fg/70">
              <a href="/admin/posts" className="transition-colors hover:text-gold">
                Posts
              </a>
              <a href="/admin/categories" className="transition-colors hover:text-gold">
                Categories
              </a>
              <a href="/admin/about" className="transition-colors hover:text-gold">
                About
              </a>
              <a href="/admin/services" className="transition-colors hover:text-gold">
                Services
              </a>
              <a href="/admin/specialties" className="transition-colors hover:text-gold">
                Specialties
              </a>
              <a href="/admin/reviews" className="transition-colors hover:text-gold">
                Reviews
              </a>
              <a href="/admin/contact" className="transition-colors hover:text-gold">
                Contact
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-fg/50 transition-colors hover:text-gold"
            >
              View blog ↗
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm text-fg/70 transition-colors hover:text-gold"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
    </div>
  );
}
