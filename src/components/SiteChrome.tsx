import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Chronicle" },
  { to: "/map", label: "Battle Map" },
  { to: "/games", label: "Games & Quiz" },
] as const;

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/30 bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3">
        <Link to="/" className="font-display text-lg text-gold">N · 1815</Link>
        <div className="flex gap-5 font-heading text-xs uppercase tracking-[0.2em]">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-foreground/70 hover:text-gold" activeProps={{ className: "text-gold" }} activeOptions={{ exact: true }}>
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/30 px-5 py-10 text-center text-sm italic text-foreground/60">
      <div className="gold-rule mx-auto mb-6 max-w-md" />
      “Glory is fleeting, but obscurity is forever.” — Napoleon Bonaparte
      <p className="mt-6 text-xs not-italic text-foreground/50">Created by Lakshya, Atiff, Pranav &amp; Suryansh</p>
      <p className="mt-1 text-xs not-italic text-foreground/50">Designed &amp; Developed with passion. © 2026 The Fall of Napoleon. All Rights Reserved.</p>
    </footer>
  );
}

export function PageTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-12 text-center animate-fade-up">
      <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold">{kicker}</p>
      <h1 className="mt-3 font-display text-4xl text-foreground md:text-6xl">{title}</h1>
      <div className="gold-rule mx-auto mt-5 max-w-sm" />
      {sub && <p className="mx-auto mt-5 max-w-2xl text-lg italic text-foreground/75">{sub}</p>}
    </div>
  );
}
