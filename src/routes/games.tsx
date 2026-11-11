import { translate, useLang, usePageLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageTitle } from "@/components/SiteChrome";
import { BattleSim } from "@/components/BattleSim";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Games & Quiz — Napoleon: The Road to Waterloo" },
      { name: "description", content: "Test your knowledge of Napoleon and Waterloo with a quiz, a chronology challenge and a commanders game." },
      { property: "og:title", content: "Games & Quiz — The Road to Waterloo" },
      { property: "og:description", content: "Quiz, chronology and commander challenges about Napoleon and Waterloo." },
    ],
  }),
  component: GamesPage,
});

const quiz = [
  { q: "On what date was the Battle of Waterloo fought?", a: ["14 July 1789", "18 June 1815", "2 December 1805", "5 May 1821"], c: 1 },
  { q: "In which modern country is Waterloo located?", a: ["France", "Netherlands", "Belgium", "Germany"], c: 2 },
  { q: "Who commanded the Anglo-allied army?", a: ["Duke of Wellington", "Lord Nelson", "Marshal Ney", "Gebhard von Blücher"], c: 0 },
  { q: "Which Prussian field marshal arrived to support the Allies?", a: ["Clausewitz", "Blücher", "Moltke", "Frederick"], c: 1 },
  { q: "Where was Napoleon first exiled in 1814?", a: ["Corsica", "St Helena", "Sardinia", "Elba"], c: 3 },
  { q: "What is Napoleon's return from exile called?", a: ["The Hundred Days", "The Long March", "The Restoration", "The Terror"], c: 0 },
  { q: "Which farmhouse at the Allied centre fell to the French in the evening?", a: ["Hougoumont", "La Haye Sainte", "Papelotte", "La Belle Alliance"], c: 1 },
  { q: "Which marshal led the massed French cavalry charges?", a: ["Davout", "Murat", "Ney", "Soult"], c: 2 },
  { q: "Where did Napoleon die in 1821?", a: ["Paris", "St Helena", "Elba", "Vienna"], c: 1 },
  { q: "What delayed the start of the battle on the morning of 18 June?", a: ["Fog", "Snow", "Heavy rain-soaked ground", "A ceasefire"], c: 2 },
];

function Quiz() {
  const lang = useLang();
  const L = (text: string) => translate(lang, text);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= quiz.length;

  if (done) {
    const rank = score >= 9 ? "Marshal of the Empire" : score >= 7 ? "General of the Guard" : score >= 4 ? "Captain of Grenadiers" : "Raw Conscript";
    return (
      <div className="text-center">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-primary">{L('Campaign concluded')}</p>
        <p className="mt-4 font-display text-5xl">{score} / {quiz.length}</p>
        <p className="mt-3 text-xl italic">{L('Your rank:')} <strong>{L(rank)}</strong></p>
        <Button variant="ghost" className="mt-6 border border-ink px-6 py-2 font-heading text-sm uppercase tracking-widest hover:bg-ink hover:text-parchment" onClick={() => { setI(0); setScore(0); setPicked(null); }}>{L('Fight again')}</Button>
      </div>
    );
  }
  const item = quiz[i];
  if (!item) return null;
  return (
    <div>
      <div className="flex justify-between font-heading text-xs uppercase tracking-widest"><span>{L("Question")} {i + 1} / {quiz.length}</span><span>{L("Score")} {score}</span></div>
      <h3 className="mt-4 font-heading text-xl font-bold">{L(item.q)}</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {item.a.map((opt, k) => {
          const state = picked === null ? "border-ink/40 hover:bg-ink/10" : k === item.c ? "border-success bg-success text-primary-foreground" : k === picked ? "border-destructive bg-destructive text-primary-foreground" : "border-ink/20 opacity-60";
          return (
            <Button variant="ghost" key={opt} disabled={picked !== null} onClick={() => { setPicked(k); if (k === item.c) setScore((s) => s + 1); }} className={`h-auto min-h-12 justify-start whitespace-normal border-2 p-3 text-left transition ${state}`}>{L(opt)}</Button>
          );
        })}
      </div>
      {picked !== null && (
        <Button variant="ghost" className="mt-5 border border-ink px-6 py-2 font-heading text-sm uppercase tracking-widest hover:bg-ink hover:text-parchment" onClick={() => { setPicked(null); setI(i + 1); }}>
          {L(i + 1 === quiz.length ? "See result" : "Next")} →
        </Button>
      )}
    </div>
  );
}

const events = [
  { y: 1796, t: "Italian Campaign" },
  { y: 1804, t: "Crowned Emperor" },
  { y: 1805, t: "Victory at Austerlitz" },
  { y: 1812, t: "Invasion of Russia" },
  { y: 1814, t: "Exile to Elba" },
  { y: 1815, t: "Battle of Waterloo" },
];

function Chronology() {
  const lang = useLang();
  const L = (text: string) => translate(lang, text);
  const shuffle = () => [...events].sort(() => Math.random() - 0.5);
  const [order, setOrder] = useState(shuffle);
  const [checked, setChecked] = useState(false);
  const move = (idx: number, d: number) => {
    const j = idx + d;
    if (j < 0 || j >= order.length) return;
    const n = [...order];
    const tmp = n[idx], target = n[j];
    if (!tmp || !target) return;
    n[idx] = target; n[j] = tmp;
    setOrder(n);
    setChecked(false);
  };
  const correct = order.every((e, k) => e.y === events[k]?.y);
  return (
    <div>
      <p className="italic">{L('Arrange these events from earliest to latest.')}</p>
      <ol className="mt-4 space-y-2">
        {order.map((e, k) => (
          <li key={L(e.t)} className={`flex items-center justify-between border-2 p-3 ${checked ? (e.y === events[k]?.y ? "border-success" : "border-destructive") : "border-ink/30"}`}>
            <span className="font-heading">{k + 1}. {L(e.t)} {checked && <span className="text-sm text-muted-foreground">({e.y})</span>}</span>
            <span className="flex gap-1">
              <Button variant="ghost" aria-label={L('Move up')} onClick={() => move(k, -1)} className="border border-ink/40 px-2 hover:bg-ink/10">▲</Button>
              <Button variant="ghost" aria-label={L('Move down')} onClick={() => move(k, 1)} className="border border-ink/40 px-2 hover:bg-ink/10">▼</Button>
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Button variant="ghost" onClick={() => setChecked(true)} className="border border-ink px-6 py-2 font-heading text-sm uppercase tracking-widest hover:bg-ink hover:text-parchment">{L('Seal the order')}</Button>
        <Button variant="ghost" onClick={() => { setOrder(shuffle()); setChecked(false); }} className="font-heading text-sm uppercase tracking-widest underline">{L('Shuffle')}</Button>
        {checked && <span className={`font-heading ${correct ? "text-success" : "text-destructive"}`}>{L(correct ? "Vive l'Empereur! Perfect." : "Not quite — try again.")}</span>}
      </div>
    </div>
  );
}

const figures = [
  { n: "Duke of Wellington", side: "Allied" },
  { n: "Marshal Michel Ney", side: "French" },
  { n: "Gebhard von Blücher", side: "Allied" },
  { n: "Marshal Emmanuel de Grouchy", side: "French" },
  { n: "Prince of Orange", side: "Allied" },
  { n: "Marshal Jean-de-Dieu Soult", side: "French" },
  { n: "Lord Uxbridge", side: "Allied" },
  { n: "Count d'Erlon", side: "French" },
];

function Commanders() {
  const lang = useLang();
  const L = (text: string) => translate(lang, text);
  const deck = useMemo(() => [...figures].sort(() => Math.random() - 0.5), []);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; name: string; side: string } | null>(null);
  const msg = !feedback ? "" : feedback.ok ? L("Correct!") : lang === "fr" ? `Non : ${L(feedback.name)} combattait dans le camp ${feedback.side === "French" ? "français" : "allié"}.` : `No — ${feedback.name} fought for the ${feedback.side} side.`;
  const cur = deck[idx] as (typeof figures)[number] | undefined;
  const answer = (side: string) => {
    if (!cur) return;
    const ok = side === cur.side;
    if (ok) setScore((s) => s + 1);
    setFeedback({ ok, name: cur.n, side: cur.side });
    setIdx(idx + 1);
  };
  if (!cur)
    return (
      <div className="text-center">
        <p className="font-display text-4xl">{score} / {deck.length}</p>
        <p className="mt-2 italic">{msg}</p>
        <Button variant="ghost" onClick={() => { setIdx(0); setScore(0); setFeedback(null); }} className="mt-5 border border-ink px-6 py-2 font-heading text-sm uppercase tracking-widest hover:bg-ink hover:text-parchment">{L('Muster again')}</Button>
      </div>
    );
  return (
    <div className="text-center">
      <p className="font-heading text-xs uppercase tracking-widest">{L("Commander")} {idx + 1} / {deck.length} · {L("Score")} {score}</p>
      <p className="mt-6 font-display text-3xl">{L(cur.n)}</p>
      <p className="mt-2 italic">{L('Which army did they serve at Waterloo?')}</p>
      <div className="mt-6 flex justify-center gap-4">
        <Button variant="ghost" onClick={() => answer("French")} className="bg-secondary px-6 py-3 font-heading uppercase tracking-widest text-secondary-foreground hover:opacity-90">{L('French')}</Button>
        <Button variant="ghost" onClick={() => answer("Allied")} className="bg-primary px-6 py-3 font-heading uppercase tracking-widest text-primary-foreground hover:opacity-90">{L('Allied')}</Button>
      </div>
      <p className="mt-4 min-h-6 italic">{msg}</p>
    </div>
  );
}

const tabs = [
  { id: "sim", label: "Play as Napoleon", el: <BattleSim /> },
  { id: "quiz", label: "The Grand Quiz", el: <Quiz /> },
  { id: "chrono", label: "Chronology", el: <Chronology /> },
  { id: "cmd", label: "Choose Your Side", el: <Commanders /> },
];

function GamesPage() {
  usePageLanguage("Games & Quiz — Napoleon: The Road to Waterloo", "Jeux et questionnaires — Napoléon : La Route de Waterloo", "Test your knowledge of Napoleon and Waterloo with strategy, quiz and commander challenges.", "Testez vos connaissances sur Napoléon et Waterloo avec des défis de stratégie, de chronologie et de commandement.");
  const lang = useLang();
  const L = (text: string) => translate(lang, text);
  const [tab, setTab] = useState("sim");
  return (
    <main className="mx-auto max-w-4xl px-5 pb-20 pt-44 sm:pt-28">
      <PageTitle kicker={L('Le Jeu de Guerre')} title={L('Games & Quizzes')} sub={L("Prove yourself worthy of a marshal's baton.")} />
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {tabs.map((t) => (
          <Button variant="ghost" key={t.id} onClick={() => setTab(t.id)} className={`btn-vintage h-auto whitespace-normal ${tab === t.id ? "bg-gold text-accent-foreground" : ""}`}>{L(t.label)}</Button>
        ))}
      </div>
      <div className="paper p-8 md:p-10">{tabs.find((t) => t.id === tab)?.el}</div>
    </main>
  );
}
