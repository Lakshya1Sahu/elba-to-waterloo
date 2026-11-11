import { useEffect, useState } from "react";
import hero from "@/assets/hero-waterloo.jpg";
import { music } from "@/lib/music";

const lines = ["Europe, 1815.", "An exiled emperor escapes from Elba…", "Two armies wait in the rain of Belgium.", "One day will decide the fate of a continent."];

export function CinematicIntro() {
  const [stage, setStage] = useState<"hidden" | "gate" | "playing" | "title" | "out">("hidden");
  const [line, setLine] = useState(0);
  useEffect(() => { if (!sessionStorage.getItem("intro-seen")) setStage("gate"); }, []);
  useEffect(() => {
    if (stage !== "playing") return;
    if (line >= lines.length) { setStage("title"); return; }
    const t = setTimeout(() => setLine((l) => l + 1), 2600);
    return () => clearTimeout(t);
  }, [stage, line]);
  useEffect(() => {
    if (stage === "title") { const t = setTimeout(() => finish(), 4500); return () => clearTimeout(t); }
    if (stage === "out") { const t = setTimeout(() => setStage("hidden"), 1500); return () => clearTimeout(t); }
  }, [stage]);
  const finish = () => { sessionStorage.setItem("intro-seen", "1"); setStage("out"); };
  if (stage === "hidden") return null;
  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background transition-opacity duration-[1500ms] ${stage === "out" ? "opacity-0" : "opacity-100"}`}>
      <img src={hero} alt="" className={`absolute inset-0 h-full w-full object-cover sepia-img transition-all duration-[12000ms] ${stage === "gate" ? "scale-100 opacity-20" : "scale-125 opacity-50"}`} />
      <div className="absolute inset-0 vignette" />
      <div className="absolute inset-x-0 top-0 h-[12vh] bg-background" />
      <div className="absolute inset-x-0 bottom-0 h-[12vh] bg-background" />
      <div className="relative px-6 text-center">
        {stage === "gate" && (
          <div className="animate-fade-up">
            <p className="font-heading text-xs uppercase tracking-[0.5em] text-gold">A Historical Picture in Three Acts</p>
            <button onClick={() => { music.play("guard"); setStage("playing"); }} className="btn-vintage mt-8">▶ Begin the Film</button>
            <p className="mt-4 text-sm italic text-foreground/60">Sound on for the full experience</p>
          </div>
        )}
        {stage === "playing" && line < lines.length && (
          <p key={line} className="animate-fade-up font-heading text-2xl tracking-[0.15em] text-foreground md:text-4xl">{lines[line]}</p>
        )}
        {stage === "title" && (
          <div className="animate-fade-up">
            <p className="font-heading text-sm uppercase tracking-[0.5em] text-gold">Presenting</p>
            <h1 className="mt-4 font-display text-5xl text-foreground md:text-8xl">Napoleon</h1>
            <div className="gold-rule mx-auto my-5 max-w-md" />
            <p className="font-heading text-xl tracking-[0.4em] md:text-3xl">THE ROAD TO WATERLOO</p>
          </div>
        )}
      </div>
      {stage !== "gate" && <button onClick={finish} className="absolute bottom-[14vh] right-6 font-heading text-xs uppercase tracking-widest text-foreground/60 hover:text-gold">Skip ›</button>}
    </div>
  );
}
