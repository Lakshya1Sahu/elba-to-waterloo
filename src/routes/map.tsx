import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import battleMap from "@/assets/battle-map.jpg";
import { PageTitle } from "@/components/SiteChrome";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Interactive Battle Map — Waterloo 1815" },
      { name: "description", content: "Explore the key positions of the Battle of Waterloo on an antique campaign map." },
      { property: "og:title", content: "Interactive Battle Map — Waterloo 1815" },
      { property: "og:description", content: "Click the landmarks of Waterloo and relive each hour of the battle." },
    ],
  }),
  component: MapPage,
});

const points = [
  { id: "hougoumont", name: "Château d'Hougoumont", time: "11:30", x: 22, y: 38, text: "The battle opens with a French diversionary attack on this walled farm. The Coldstream Guards hold it all day; 'the closing of the gates' becomes legend." },
  { id: "ridge", name: "Mont-Saint-Jean Ridge", time: "All day", x: 52, y: 25, text: "Wellington's Anglo-allied army of 68,000 sheltered behind this ridge, protected from French cannon by the reverse slope." },
  { id: "lahaye", name: "La Haye Sainte", time: "18:30", x: 55, y: 34, text: "A farmhouse at the heart of the Allied line. The King's German Legion defends it until ammunition runs out; its fall nearly breaks Wellington's centre." },
  { id: "grandbattery", name: "The Grand Battery", time: "13:00", x: 45, y: 50, text: "80 French guns open a thunderous bombardment before d'Erlon's corps marches forward in massive columns." },
  { id: "belle", name: "La Belle Alliance", time: "Morning", x: 58, y: 72, text: "Napoleon's command post. After the battle, Wellington and Blücher reportedly met near this inn." },
  { id: "cavalry", name: "Ney's Cavalry Charges", time: "16:00", x: 38, y: 30, text: "Marshal Ney leads some 9,000 cavalry against Allied infantry squares — repeatedly, and without infantry support. The squares hold." },
  { id: "plancenoit", name: "Plancenoit", time: "16:30", x: 84, y: 60, text: "Blücher's Prussians strike Napoleon's right flank. The village changes hands repeatedly as the Young and Old Guard are drawn in." },
  { id: "guard", name: "Charge of the Imperial Guard", time: "19:30", x: 50, y: 42, text: "Napoleon's last throw: the undefeated Guard advances up the slope — and is repulsed. 'La Garde recule!' The French army collapses." },
];

function MapPage() {
  const [active, setActive] = useState(points[0]!);
  const [visited, setVisited] = useState<Set<string>>(new Set([points[0]!.id]));

  const pick = (p: (typeof points)[number]) => {
    setActive(p);
    setVisited((v) => new Set(v).add(p.id));
  };

  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-28">
      <PageTitle kicker="18 June 1815" title="The Field of Waterloo" sub="Click the seals on the campaign map to uncover each hour of the battle." />
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="paper relative p-3">
          <div className="relative">
            <img src={battleMap} alt="Antique map of the Waterloo battlefield" width={1600} height={1104} className="w-full" />
            {points.map((p, i) => (
              <button
                key={p.id}
                onClick={() => pick(p)}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                aria-label={p.name}
                className={`absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-gold font-heading text-sm font-bold transition-transform hover:scale-125 ${
                  active.id === p.id ? "scale-125 bg-primary text-primary-foreground animate-pulse-ring" : visited.has(p.id) ? "bg-ink text-gold" : "bg-primary text-primary-foreground"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <aside className="paper flex flex-col p-6">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-primary">{active.time}</p>
          <h2 className="mt-2 font-heading text-2xl font-bold">{active.name}</h2>
          <div className="my-4 h-px bg-ink/30" />
          <p className="italic leading-relaxed">{active.text}</p>
          <div className="mt-auto pt-6">
            <p className="font-heading text-xs uppercase tracking-widest">Explored {visited.size} / {points.length}</p>
            <div className="mt-2 h-2 bg-ink/20"><div className="h-full bg-primary transition-all" style={{ width: `${(visited.size / points.length) * 100}%` }} /></div>
            <ul className="mt-5 space-y-1 text-sm">
              {points.map((p, i) => (
                <li key={p.id}>
                  <button onClick={() => pick(p)} className={`hover:text-primary ${active.id === p.id ? "font-bold text-primary" : ""}`}>{i + 1}. {p.name}</button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-8 font-heading text-xs uppercase tracking-widest text-foreground/70">
        <span><span className="mr-2 inline-block h-3 w-6 bg-destructive align-middle" />Allied & Prussian</span>
        <span><span className="mr-2 inline-block h-3 w-6 bg-secondary align-middle" />French Army</span>
      </div>
    </main>
  );
}
