import { useEffect, useState } from "react";
import { french } from "./french";
export type Lang = "en" | "fr";
let lang: Lang = "en";
const subs = new Set<() => void>();
export function setLang(l: Lang) { lang = l; document.documentElement.lang = l; try { localStorage.setItem("lang", l); } catch { /* ignore */ } subs.forEach((f) => f()); }
export function useLang() {
  const [l, set] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if ((saved === "fr" || saved === "en") && saved !== lang) lang = saved;
    document.documentElement.lang = lang;
    set(lang);
    const f = () => set(lang); subs.add(f); return () => { subs.delete(f); };
  }, []);
  return l;
}
/** Pick text for current language: t(lang, "English", "Français") */
export const t = (l: Lang, en: string, fr: string) => (l === "fr" ? fr : en);

/** Translate shared content; names and numerals retain their original spelling. */
export const translate = (l: Lang, text: string) => l === "fr" ? french[text] ?? text : text;

/** Keep the browser tab and sharing descriptions in the selected language. */
export function usePageLanguage(enTitle: string, frTitle: string, enDescription: string, frDescription: string) {
  const selected = useLang();
  useEffect(() => {
    const title = t(selected, enTitle, frTitle);
    const description = t(selected, enDescription, frDescription);
    document.title = title;
    const metadata: [string, string][] = [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
    ];
    for (const [selector, value] of metadata) {
      document.querySelectorAll(selector).forEach((element) => element.setAttribute("content", value));
    }
  }, [selected, enTitle, frTitle, enDescription, frDescription]);
}
