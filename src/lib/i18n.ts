import { useEffect, useState } from "react";
export type Lang = "en" | "fr";
let lang: Lang = "en";
const subs = new Set<() => void>();
export function setLang(l: Lang) { lang = l; try { localStorage.setItem("lang", l); } catch { /* ignore */ } subs.forEach((f) => f()); }
export function useLang() {
  const [l, set] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if ((saved === "fr" || saved === "en") && saved !== lang) lang = saved;
    set(lang);
    const f = () => set(lang); subs.add(f); return () => { subs.delete(f); };
  }, []);
  return l;
}
/** Pick text for current language: t(lang, "English", "Français") */
export const t = (l: Lang, en: string, fr: string) => (l === "fr" ? fr : en);
