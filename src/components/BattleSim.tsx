import { useState } from "react";

type Opt = { label: string; desc: string; fr: [number, number]; al: [number, number]; pr: number; log: string };
const turns: { time: string; title: string; brief: string; opts: Opt[] }[] = [
  { time: "11:30", title: "Opening Moves", brief: "The ground is soaked. Wellington holds the ridge of Mont-Saint-Jean. Grouchy is far to the east.", opts: [
    { label: "Feint at Hougoumont", desc: "A small attack to draw Wellington's reserves.", fr: [3, 6], al: [6, 10], pr: 0, log: "Wellington sends Guards to Hougoumont — his centre thins." },
    { label: "Recall Grouchy", desc: "Order 33,000 men back to the field. Slow, but vital.", fr: [0, 0], al: [0, 0], pr: 1, log: "Couriers gallop east. Grouchy may block the Prussians." },
    { label: "Attack at dawn anyway", desc: "Do not wait for the ground to dry.", fr: [8, 12], al: [8, 12], pr: -1, log: "Guns sink in the mud, but the fight starts early." },
  ]},
  { time: "13:30", title: "The Grand Battery", brief: "80 guns stand ready. D'Erlon's corps awaits orders.", opts: [
    { label: "Massed column assault", desc: "D'Erlon's 16,000 in dense columns.", fr: [10, 16], al: [10, 15], pr: 0, log: "The columns reach the ridge — then the Scots Greys crash into them." },
    { label: "Bombard first", desc: "Hours of cannon fire before advancing.", fr: [2, 4], al: [8, 13], pr: -1, log: "Allied lines shelter behind the crest, but suffer." },
    { label: "Storm La Haye Sainte", desc: "Take the farmhouse at the Allied centre.", fr: [7, 11], al: [9, 14], pr: 0, log: "The King's German Legion fights to the last cartridge." },
  ]},
  { time: "16:00", title: "Ney's Cavalry", brief: "Smoke hides the ridge. Ney believes Wellington is retreating.", opts: [
    { label: "Unleash the cavalry", desc: "9,000 horsemen against Allied squares.", fr: [12, 18], al: [8, 12], pr: 0, log: "Wave after wave breaks on the squares. Brave — and costly." },
    { label: "Combined arms attack", desc: "Cavalry, horse artillery and infantry together.", fr: [6, 10], al: [12, 18], pr: 0, log: "Guns blast the squares as the horsemen circle. The line wavers!" },
    { label: "Hold Plancenoit", desc: "Send the Young Guard against the Prussians.", fr: [5, 8], al: [2, 4], pr: 1, log: "The Prussian advance is held in the burning village." },
  ]},
  { time: "19:30", title: "The Imperial Guard", brief: "This is the final throw. The Guard has never been beaten.", opts: [
    { label: "Guard to the centre", desc: "Strike the weakest point of the Allied line.", fr: [8, 14], al: [14, 22], pr: 0, log: "The bearskins climb the slope into a storm of musketry…" },
    { label: "Guard covers the retreat", desc: "Save the army to fight another day.", fr: [0, 2], al: [0, 0], pr: 0, log: "You withdraw in good order towards France." },
    { label: "Everything, everywhere", desc: "Every man forward along the whole line.", fr: [14, 20], al: [16, 24], pr: -1, log: "The whole army surges forward in one last desperate attack." },
  ]},
];
const r = ([a, b]: [number, number]) => a + Math.floor(Math.random() * (b - a + 1));

export function BattleSim() {
  const [turn, setTurn] = useState(0);
  const [fr, setFr] = useState(100);
  const [al, setAl] = useState(100);
  const [pr, setPr] = useState(0); // >0 delays Prussians
  const [log, setLog] = useState<string[]>(["You are Napoleon. 72,000 French face 68,000 Allies — and 50,000 Prussians are coming."]);
  const [retreat, setRetreat] = useState(false);
  const reset = () => { setTurn(0); setFr(100); setAl(100); setPr(0); setRetreat(false); setLog(["The dawn of 18 June breaks again…"]); };

  const choose = (o: Opt) => {
    const prussianHit = turn >= 2 && pr <= 0 ? 8 + Math.floor(Math.random() * 6) : 0;
    const nf = Math.max(0, fr - r(o.fr) - prussianHit), na = Math.max(0, al - r(o.al));
    setFr(nf); setAl(na); setPr(pr + o.pr);
    setLog([`${turns[turn]!.time} — ${o.log}${prussianHit ? ` Prussians strike your flank (−${prussianHit}).` : ""}`, ...log]);
    if (o.label.includes("retreat")) setRetreat(true);
    setTurn(turn + 1);
  };

  const over = turn >= turns.length || fr <= 0 || al <= 0;
  const margin = al - fr;
  const result = retreat ? ["A Strategic Withdrawal", "The Empire lives to fight another day — history takes a different road."]
    : margin <= -25 ? ["Glorious Victory!", "Wellington's line breaks. Brussels lies open. Vive l'Empereur!"]
    : margin <= 0 ? ["A Bloody Draw", "Both armies are spent. Neither can claim the field."]
    : ["Defeat at Waterloo", "'La Garde recule!' — as in history, your army flees towards France."];
  const cur = turns[turn];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[["French Army", fr, "bg-secondary"], ["Allied Army", al, "bg-primary"]].map(([n, v, c]) => (
          <div key={n as string}>
            <div className="flex justify-between font-heading text-xs uppercase tracking-widest"><span>{n}</span><span>{v}%</span></div>
            <div className="mt-1 h-3 border border-ink/40"><div className={`h-full ${c} transition-all duration-700`} style={{ width: `${v}%` }} /></div>
          </div>
        ))}
        <div className="font-heading text-xs uppercase tracking-widest">
          Prussians<div className="mt-1 text-sm normal-case italic">{pr > 0 ? "Held back by Grouchy" : turn >= 2 ? "Attacking your flank!" : "Marching from Wavre"}</div>
        </div>
      </div>

      {over ? (
        <div className="mt-8 text-center">
          <p className="font-display text-4xl">{result[0]}</p>
          <p className="mt-3 italic">{result[1]}</p>
          <button onClick={reset} className="mt-6 border border-ink px-6 py-2 font-heading text-sm uppercase tracking-widest hover:bg-ink hover:text-parchment">Replay the battle</button>
        </div>
      ) : cur && (
        <div className="mt-8">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-primary">Turn {turn + 1} / {turns.length} · {cur.time}</p>
          <h3 className="mt-2 font-heading text-2xl font-bold">{cur.title}</h3>
          <p className="mt-2 italic">{cur.brief}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {cur.opts.map((o) => (
              <button key={o.label} onClick={() => choose(o)} className="border-2 border-ink/40 p-4 text-left transition hover:bg-ink hover:text-parchment">
                <span className="font-heading font-bold">{o.label}</span>
                <span className="mt-1 block text-sm italic">{o.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 border-t border-ink/30 pt-4">
        <p className="font-heading text-xs uppercase tracking-widest">Dispatches</p>
        <ul className="mt-2 max-h-40 space-y-1 overflow-auto text-sm italic">{log.map((l, i) => <li key={i}>{l}</li>)}</ul>
      </div>
    </div>
  );
}
