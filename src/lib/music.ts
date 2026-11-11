// Synthesized period music (Web Audio) — no audio files needed.
type Note = [number, number]; // midi (0 = rest), beats
export type Track = { id: string; title: string; sub: string; bpm: number; melody: Note[]; drum: number[]; chords?: number[][]; hidden?: boolean };

export const tracks: Track[] = [
  { id: "overture", title: "Overture of Waterloo", sub: "Epic score of the opening film", bpm: 60, hidden: false,
    chords: [[38,50,53,57],[34,46,50,53],[31,43,46,50],[33,45,49,52]],
    melody: [[62,2],[65,1],[69,1],[70,3],[69,1],[67,2],[65,1],[67,1],[69,4],[74,2],[72,1],[70,1],[69,3],[67,1],[65,2],[64,2],[62,4]],
    drum: [1,0,0,0,.6,0,.3,.6] },
  { id: "marseillaise", title: "La Marseillaise", sub: "Anthem of the Revolution, 1792", bpm: 100,
    melody: [[62,.75],[62,.25],[67,1],[67,1],[69,1],[69,1],[74,1.5],[71,.5],[67,.75],[67,.25],[71,.75],[67,.25],[64,1],[72,2],[69,.75],[66,.25],[67,2],[0,1],
      [67,.75],[69,.25],[71,1],[71,1],[71,1],[72,.75],[71,.25],[71,1],[69,1],[0,1],[69,.75],[71,.25],[72,1],[72,1],[72,1],[74,.75],[72,.25],[71,2],[0,2]],
    drum: [1,0,.5,.5,1,0,.5,0] },
  { id: "grenadiers", title: "The British Grenadiers", sub: "March of Wellington's Guards", bpm: 112,
    melody: [[67,.5],[67,.5],[69,.5],[71,.5],[72,1],[71,.5],[69,.5],[67,1],[62,1],[67,.5],[67,.5],[69,.5],[71,.5],[72,.5],[74,.5],[71,.5],[69,.5],[67,2],
      [74,.5],[74,.5],[76,.5],[74,.5],[72,1],[71,.5],[69,.5],[71,1],[67,1],[72,.5],[71,.5],[69,.5],[67,.5],[69,1],[66,1],[67,2]],
    drum: [1,.5,.5,.5,1,.5,1,.5] },
  { id: "guard", title: "Drums of the Old Guard", sub: "Pas de charge, 19:30, 18 June 1815", bpm: 96,
    melody: [[50,2],[0,1],[53,1],[55,2],[50,2],[57,2],[55,1],[53,1],[50,4],[0,2],[45,2],[50,2],[53,2],[52,4]],
    drum: [1,.5,.5,1,.5,.5,1,1] },
];

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let timer: number | null = null;
let current: string | null = null;
const subs = new Set<() => void>();
export const music = {
  get current() { return current; },
  subscribe(f: () => void) { subs.add(f); return () => { subs.delete(f); }; },
  play(id: string) {
    this.stop();
    const t = tracks.find((x) => x.id === id); if (!t) return;
    ctx ??= new AudioContext();
    void ctx.resume();
    master = ctx.createGain(); master.gain.value = 0.18; master.connect(ctx.destination);
    current = id; subs.forEach((f) => f());
    const beat = 60 / t.bpm;
    const loopBeats = t.melody.reduce((s, n) => s + n[1], 0);
    let start = ctx.currentTime + 0.1;
    const schedule = () => {
      if (!ctx || !master) return;
      let time = start;
      for (const [m, b] of t.melody) { if (m) tone(m, time, b * beat * 0.95); time += b * beat; }
      if (t.chords) {
        const len = loopBeats / t.chords.length;
        t.chords.forEach((c, k) => { const ct = start + k * len * beat; c.forEach((m) => pad(m, ct, len * beat)); boom(ct, 1); boom(ct + len * beat * 0.75, 0.5); });
      }
      for (let i = 0; i < loopBeats * 2; i++) { const v = t.drum[i % t.drum.length]!; if (v) (t.chords ? boom(start + i * beat / 2, v * 0.5) : drum(start + i * beat / 2, v)); }
      start += loopBeats * beat;
    };
    schedule();
    timer = window.setInterval(() => { if (ctx && start - ctx.currentTime < 2) schedule(); }, 500);
  },
  stop() {
    if (timer) clearInterval(timer); timer = null;
    if (master && ctx) { const m = master; m.gain.setTargetAtTime(0, ctx.currentTime, 0.2); setTimeout(() => m.disconnect(), 800); }
    master = null; current = null; subs.forEach((f) => f());
  },
};

function tone(midi: number, t: number, d: number) {
  if (!ctx || !master) return;
  const f = 440 * 2 ** ((midi - 69) / 12);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.5, t + 0.03); g.gain.exponentialRampToValueAtTime(0.01, t + d);
  for (const [type, mul, vol] of [["sawtooth", 1, 0.25], ["triangle", 0.5, 0.6]] as const) {
    const o = ctx.createOscillator(); const og = ctx.createGain(); const lp = ctx.createBiquadFilter();
    o.type = type; o.frequency.value = f * mul; og.gain.value = vol; lp.frequency.value = 1800;
    o.connect(lp).connect(og).connect(g); o.start(t); o.stop(t + d + 0.05);
  }
  g.connect(master);
}
function drum(t: number, v: number) {
  if (!ctx || !master) return;
  const len = 0.15, buf = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate), data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) ** 3;
  const s = ctx.createBufferSource(); s.buffer = buf;
  const hp = ctx.createBiquadFilter(); hp.type = "bandpass"; hp.frequency.value = 1500;
  const g = ctx.createGain(); g.gain.value = 0.6 * v;
  s.connect(hp).connect(g).connect(master); s.start(t);
}

function pad(midi: number, t: number, d: number) {
  if (!ctx || !master) return;
  const f = 440 * 2 ** ((midi - 69) / 12);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.18, t + d * 0.4); g.gain.linearRampToValueAtTime(0, t + d + 0.5);
  for (const det of [-6, 0, 7]) {
    const o = ctx.createOscillator(); const lp = ctx.createBiquadFilter();
    o.type = "sawtooth"; o.frequency.value = f; o.detune.value = det; lp.frequency.value = 900;
    o.connect(lp).connect(g); o.start(t); o.stop(t + d + 0.6);
  }
  g.connect(master);
}
function boom(t: number, v: number) {
  if (!ctx || !master) return;
  const o = ctx.createOscillator(); const g = ctx.createGain();
  o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(38, t + 0.6);
  g.gain.setValueAtTime(1.6 * v, t); g.gain.exponentialRampToValueAtTime(0.001, t + 1.4);
  o.connect(g).connect(master); o.start(t); o.stop(t + 1.5);
}
