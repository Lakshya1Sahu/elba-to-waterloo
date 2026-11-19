import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { setLang, t, useLang } from "@/lib/i18n";

const links = [
  { to: "/", label: "Chronicle", fr: "Chronique" },
  { to: "/map", label: "Battle Map", fr: "Carte" },
  { to: "/games", label: "Games & Quiz", fr: "Jeux & Quiz" },
] as const;

export function SiteNav() {
  const lang = useLang();
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/30 bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3">
        <Link to="/" className="font-display text-lg text-gold">N · 1815</Link>
        <div className="flex max-w-full flex-wrap items-center gap-x-4 gap-y-3 font-heading text-xs uppercase tracking-[0.2em]">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-foreground/70 hover:text-gold" activeProps={{ className: "text-gold" }} activeOptions={{ exact: true }}>
              {t(lang, l.label, l.to === "/games" ? "Jeux et questionnaires" : l.fr)}
            </Link>
          ))}
          <span className="flex border border-gold/60">
            {(["en", "fr"] as const).map((x) => (
              <Button variant="ghost" key={x} aria-label={t(lang, x === "en" ? "English" : "French", x === "en" ? "Anglais" : "Français")} aria-pressed={lang === x} onClick={() => setLang(x)} className={`px-2 ${lang === x ? "bg-gold text-accent-foreground" : "text-gold"}`}>{lang === "fr" ? (x === "en" ? "ANG" : "FR") : x.toUpperCase()}</Button>
            ))}
          </span>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const lang = useLang();
  return (
    <footer className="border-t border-gold/30 px-5 pt-10 pb-24 text-center text-sm italic text-foreground/60 md:pb-10">
      <div className="gold-rule mx-auto mb-6 max-w-md" />
      {t(lang, "“Glory is fleeting, but obscurity is forever.”", "« La gloire est éphémère, mais l'oubli est éternel. »")} — Napoléon Bonaparte
      <p className="mt-6 text-xs not-italic text-foreground/50">{t(lang, "Created by", "Créé par")} Lakshya, Atiff, Pranav {t(lang, "&", "et")} Suryansh</p>
      <p className="mt-1 text-xs not-italic text-foreground/50">{t(lang, "Designed & Developed with passion. © 2026 The Fall of Napoleon. All Rights Reserved.", "Conçu et développé avec passion. © 2026 La Chute de Napoléon. Tous droits réservés.")}</p>
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
