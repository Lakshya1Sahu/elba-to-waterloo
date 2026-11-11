import { useEffect, useState } from "react";
import hero from "@/assets/hero-waterloo.jpg";
import { music } from "@/lib/music";
import s1 from "@/assets/intro-1.jpg";
import s2 from "@/assets/intro-2.jpg";
import s3 from "@/assets/intro-3.jpg";
import s4 from "@/assets/intro-4.jpg";

const scenes = [s1, s2, s3, s4];

const lines = ["Europe, 1815.", "Un empereur exilé s'échappe de l'île d'Elbe…", "Deux armées attendent sous la pluie de Belgique.", "Un seul jour décidera du sort d'un continent."];

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
    return undefined;
  }, [stage]);
  useEffect(() => {
    if (stage === "hidden") return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [stage]);
  const finish = () => { sessionStorage.setItem("intro-seen", "1"); setStage("out"); };
  if (stage === "hidden") return null;
  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background transition-opacity duration-[1500ms] ${stage === "out" ? "opacity-0" : "opacity-100"}`}>
      <img src={hero} alt="" className={`absolute inset-0 h-full w-full object-cover sepia-img transition-all duration-[3000ms] ${stage === "gate" ? "opacity-70" : stage === "title" || stage === "out" ? "scale-110 opacity-95" : "opacity-0"}`} />
      {scenes.map((src, k) => (
        <img key={src} src={src} alt="" className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] ease-out ${stage === "playing" && line === k ? "scale-125 opacity-100 duration-[2600ms,9000ms]" : "scale-100 opacity-0 duration-[1500ms]"}`} />
      ))}
      {stage === "playing" && <div key={line} className="pointer-events-none absolute inset-0 animate-flash bg-gold" />}
      <div className="absolute inset-0 vignette" />
      <div className="relative z-10 px-6 text-center">
        {stage === "gate" && (
          <div className="animate-fade-up">
            <p className="font-heading text-xs uppercase tracking-[0.5em] text-gold">Un film historique en trois actes</p>
            <button onClick={() => { music.play("overture"); setStage("playing"); }} className="btn-vintage mt-8">▶ Commencer le film</button>
            <p className="mt-4 text-sm italic text-foreground/60">Activez le son pour une expérience complète</p>
          </div>
        )}
        {stage === "playing" && line < lines.length && (
          <p key={line} className="animate-fade-up font-heading text-2xl tracking-[0.15em] text-foreground md:text-4xl">{lines[line]}</p>
        )}
        {stage === "title" && (
          <div className="animate-fade-up">
            <p className="font-heading text-sm uppercase tracking-[0.5em] text-gold">Présente</p>
            <h1 className="mt-4 font-display text-5xl text-foreground md:text-8xl">Napoléon</h1>
            <div className="gold-rule mx-auto my-5 max-w-md" />
            <p className="font-heading text-xl tracking-[0.4em] md:text-3xl">LA ROUTE DE WATERLOO</p>
          </div>
        )}
      </div>
      {stage !== "gate" && <button onClick={finish} className="absolute bottom-6 right-6 z-10 font-heading text-xs uppercase tracking-widest text-foreground/70 hover:text-gold">Passer ›</button>}
    </div>
  );
}
