import { useEffect, useState } from "react";
import { music, tracks } from "@/lib/music";

export function useMusic() {
  const [cur, setCur] = useState<string | null>(null);
  useEffect(() => music.subscribe(() => setCur(music.current)), []);
  return cur;
}

export function MusicPlayer() {
  const cur = useMusic();
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-4 left-4 z-50">
      {open && (
        <div className="paper mb-3 w-72 p-4">
          <p className="font-heading text-xs uppercase tracking-[0.3em]">Military Band</p>
          <ul className="mt-3 space-y-2">
            {tracks.filter((x) => !x.hidden).map((t) => (
              <li key={t.id}>
                <button onClick={() => (cur === t.id ? music.stop() : music.play(t.id))} className={`w-full border p-2 text-left ${cur === t.id ? "border-primary bg-primary text-primary-foreground" : "border-ink/30 hover:bg-ink/10"}`}>
                  <span className="font-heading text-sm">{cur === t.id ? "❚❚ " : "▶ "}{t.title}</span>
                  <span className="block text-xs italic opacity-80">{t.sub}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button aria-label="Music" onClick={() => setOpen(!open)} className={`flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-background text-xl text-gold ${cur ? "animate-pulse-ring" : ""}`}>♫</button>
    </div>
  );
}
