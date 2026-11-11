import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageTitle } from "@/components/SiteChrome";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
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
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= quiz.length;

  if (done) {
    const rank = score >= 9 ? "Marshal of the Empire" : score >= 7 ? "General of the Guard" : score >= 4 ? "Captain of Grenadiers" : "Raw Conscript";
    return (
      <div className="text-center">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-primary">Campaign concluded</p>
        <p className="mt-4 font-display text-5xl">{score} / {quiz.length}</p>
        <p className="mt-3 text-xl italic">Your rank: <strong>{rank}</strong></p>
        <button className="mt-6 border border-ink px-6 py-2 font-heading text-sm uppercase tracking-widest hover:bg-ink hover:text-parchment" onClick={() => { setI(0); setScore(0); setPicked(null); }}>Fight again</button>
      </div>
    );
  }
  const item = quiz[i]!;
  return (
    <div>
      <div className="flex justify-between font-heading text-xs uppercase tracking-widest"><span>Question {i + 1} / {quiz.length}</span><span>Score {score}</span></div>
      <h3 className="mt-4 font-heading text-xl font-bold">{item.q}</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {item.a.map((opt, k) => {
          const state = picked === null ? "border-ink/40 hover:bg-ink/10" : k === item.c ? "border-success bg-success text-primary-foreground" : k === picked ? "border-destructive bg-destructive text-primary-foreground" : "border-ink/20 opacity-60";
          return (
            <button key={opt} disabled={picked !== null} onClick={() => { setPicked(k); if (k === item.c) setScore((s) => s + 1); }} className={`border-2 p-3 text-left transition ${state}`}>{opt}</button>
          );
        })}
      </div>
      {picked !== null && (
        <button className="mt-5 border border-ink px-6 py-2 font-heading text-sm uppercase tracking-widest hover:bg-ink hover:text-parchment" onClick={() => { setPicked(null); setI(i + 1); }}>
          {i + 1 === quiz.length ? "See result" : "Next"} →
        </button>
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
  const shuffle = () => [...events].sort(() => Math.random() - 0.5);
  const [order, setOrder] = useState(shuffle);
  const [checked, setChecked] = useState(false);
  const move = (idx: number, d: number) => {
    const j = idx + d;
    if (j < 0 || j >= order.length) return;
    const n = [...order];
    [n[idx], n[j]] = [n[j], n[idx]];
    setOrder(n);
    setChecked(false);
  };
  const correct = order.every((e, k) => e.y === events[k]?.y);
  return (
    <div>
      <p className="italic">Arrange these events from earliest to latest.</p>
      <ol className="mt-4 space-y-2">
        {order.map((e, k) => (
          <li key={e.t} className={`flex items-center justify-between border-2 p-3 ${checked ? (e.y === events[k]?.y ? "border-success" : "border-destructive") : "border-ink/30"}`}>
            <span className="font-heading">{k + 1}. {e.t} {checked && <span className="text-sm text-muted-foreground">({e.y})</span>}</span>
            <span className="flex gap-1">
              <button aria-label="Move up" onClick={() => move(k, -1)} className="border border-ink/40 px-2 hover:bg-ink/10">▲</button>
              <button aria-label="Move down" onClick={() => move(k, 1)} className="border border-ink/40 px-2 hover:bg-ink/10">▼</button>
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button onClick={() => setChecked(true)} className="border border-ink px-6 py-2 font-heading text-sm uppercase tracking-widest hover:bg-ink hover:text-parchment">Seal the order</button>
        <button onClick={() => { setOrder(shuffle()); setChecked(false); }} className="font-heading text-sm uppercase tracking-widest underline">Shuffle</button>
        {checked && <span className={`font-heading ${correct ? "text-success" : "text-destructive"}`}>{correct ? "Vive l'Empereur! Perfect." : "Not quite — try again."}</span>}
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
  const deck = useMemo(() => [...figures].sort(() => Math.random() - 0.5), []);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState("");
  const cur = deck[idx];
  const answer = (side: string) => {
    const ok = side === cur.side;
    if (ok) setScore((s) => s + 1);
    setMsg(ok ? "Correct!" : `No — ${cur.n} fought for the ${cur.side} side.`);
    setIdx(idx + 1);
  };
  if (!cur)
    return (
      <div className="text-center">
        <p className="font-display text-4xl">{score} / {deck.length}</p>
        <p className="mt-2 italic">{msg}</p>
        <button onClick={() => { setIdx(0); setScore(0); setMsg(""); }} className="mt-5 border border-ink px-6 py-2 font-heading text-sm uppercase tracking-widest hover:bg-ink hover:text-parchment">Muster again</button>
      </div>
    );
  return (
    <div className="text-center">
      <p className="font-heading text-xs uppercase tracking-widest">Commander {idx + 1} / {deck.length} · Score {score}</p>
      <p className="mt-6 font-display text-3xl">{cur.n}</p>
      <p className="mt-2 italic">Which army did they serve at Waterloo?</p>
      <div className="mt-6 flex justify-center gap-4">
        <button onClick={() => answer("French")} className="bg-secondary px-6 py-3 font-heading uppercase tracking-widest text-secondary-foreground hover:opacity-90">French</button>
        <button onClick={() => answer("Allied")} className="bg-primary px-6 py-3 font-heading uppercase tracking-widest text-primary-foreground hover:opacity-90">Allied</button>
      </div>
      <p className="mt-4 h-6 italic">{msg}</p>
    </div>
  );
}

const tabs = [
  { id: "quiz", label: "The Grand Quiz", el: <Quiz /> },
  { id: "chrono", label: "Chronology", el: <Chronology /> },
  { id: "cmd", label: "Choose Your Side", el: <Commanders /> },
];

function GamesPage() {
  const [tab, setTab] = useState("quiz");
  return (
    <main className="mx-auto max-w-4xl px-5 pb-20 pt-28">
      <PageTitle kicker="Le Jeu de Guerre" title="Games & Quizzes" sub="Prove yourself worthy of a marshal's baton." />
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`btn-vintage ${tab === t.id ? "bg-gold text-accent-foreground" : ""}`}>{t.label}</button>
        ))}
      </div>
      <div className="paper p-8 md:p-10">{tabs.find((t) => t.id === tab)!.el}</div>
    </main>
  );
}
