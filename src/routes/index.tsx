import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-waterloo.jpg";
import { CinematicIntro } from "@/components/CinematicIntro";
import portrait from "@/assets/napoleon-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Napoleon: The Road to Waterloo" },
      { name: "description", content: "From Corsica to Waterloo: the rise, exile and final defeat of Napoleon Bonaparte." },
      { property: "og:title", content: "Napoleon: The Road to Waterloo" },
      { property: "og:description", content: "An immersive vintage chronicle of Napoleon and the Battle of Waterloo." },
    ],
  }),
  component: Index,
});

const timeline = [
  { year: "1769", title: "Born in Corsica", place: "Ajaccio, Corsica", text: "Napoleone di Buonaparte is born in Ajaccio, one year after France acquires the island.", more: "The second of eight surviving children of Carlo and Letizia Buonaparte, minor Corsican nobles. At nine he is sent to France and later trains at the military school of Brienne, mocked for his accent." },
  { year: "1785", title: "Artillery Officer", place: "École Militaire, Paris", text: "At 16 he graduates as a second lieutenant of artillery.", more: "He completes the course in one year instead of two. Artillery, the 'scientific' arm, teaches him the mathematics of firepower he will use for twenty years." },
  { year: "1793", title: "Siege of Toulon", place: "Toulon, France", text: "His cannon drive the British fleet from the port; he is made brigadier general at 24.", more: "Wounded by a bayonet in the thigh, he earns the notice of Robespierre's brother. Two years later, in Paris, his 'whiff of grapeshot' crushes a royalist uprising." },
  { year: "1796", title: "The Italian Campaign", place: "Lodi, Arcole, Rivoli", text: "A young general of 26 shatters Austrian armies and becomes the hero of the Republic.", more: "Taking a ragged, unpaid army, he wins a dozen battles in a year. At the bridge of Arcole he seizes a flag and leads the charge himself.", quote: "From that moment I foresaw what I might be." },
  { year: "1798", title: "Egypt", place: "Cairo & the Pyramids", text: "He invades Egypt; Nelson destroys his fleet at the Nile.", more: "His scholars discover the Rosetta Stone. Stranded, he slips back to France alone and seizes power in the coup of 18 Brumaire (1799) as First Consul." },
  { year: "1804", title: "Emperor of the French", place: "Notre-Dame, Paris", text: "At Notre-Dame he crowns himself Emperor, taking the crown from the Pope's hands.", more: "The same year he issues the Civil Code — the Napoleonic Code — which abolishes feudal privilege and still underlies law in dozens of countries." },
  { year: "1805", title: "Austerlitz", place: "Moravia (Czech Republic)", text: "His masterpiece: the Battle of the Three Emperors, destroying the Russo-Austrian army.", more: "He deliberately weakens his right to lure the Allies off the Pratzen Heights, then smashes their centre as 'the sun of Austerlitz' breaks through the fog.", quote: "Soldiers, I am pleased with you." },
  { year: "1807", title: "Master of Europe", place: "Tilsit, on the Niemen", text: "After Jena and Friedland, he makes peace with the Tsar on a raft in the river.", more: "His brothers sit on thrones in Spain, Holland, Naples and Westphalia. But the Spanish war becomes an endless 'ulcer' draining his armies." },
  { year: "1812", title: "Retreat from Moscow", place: "Borodino & the Berezina", text: "The Grande Armée of 600,000 marches into Russia. Fewer than 100,000 return.", more: "He takes a burning, empty Moscow, waits five weeks for a peace that never comes, then retreats into the winter. Hunger, cold and Cossacks destroy the army." },
  { year: "1813", title: "Battle of the Nations", place: "Leipzig, Saxony", text: "Half a million men fight for three days; Napoleon is beaten by the coalition.", more: "Prussia, Russia, Austria and Sweden unite against him. The largest battle in Europe before WWI ends his control of Germany." },
  { year: "1814", title: "Exile to Elba", place: "Fontainebleau → Elba", text: "After the fall of Paris, he abdicates and is exiled to Elba.", more: "He is allowed to keep the title of Emperor and rule a tiny Mediterranean island of 12,000 people, with a guard of 600 men." },
  { year: "1815", title: "The Hundred Days", place: "Golfe-Juan → Paris", text: "He escapes, lands in France, and marches on Paris without firing a shot.", more: "At Laffrey the 5th Regiment is sent to stop him. He opens his coat: 'If any of you wishes to kill his Emperor, here I am.' They join him.", quote: "Here I am." },
  { year: "16 June 1815", title: "Ligny & Quatre Bras", place: "Belgium", text: "He beats the Prussians at Ligny while Ney fights Wellington at Quatre Bras.", more: "His last victory. He sends Grouchy with 33,000 men to chase the Prussians — a fateful detachment that never returns in time." },
  { year: "18 June 1815", title: "Waterloo", place: "South of Brussels, Belgium", text: "Wellington and Blücher defeat him in Belgium. The Empire ends in a single day.", more: "Attacks at Hougoumont, d'Erlon's infantry, Ney's great cavalry charges and finally the Imperial Guard all fail. As Prussians pour into Plancenoit, the cry rings out: 'La Garde recule!'", quote: "It has been a damned nice thing — the nearest run thing you ever saw. — Wellington" },
  { year: "1821", title: "Death on St Helena", place: "Longwood, St Helena", text: "He dies in exile on a remote Atlantic island, aged 51.", more: "He dictates his memoirs and shapes his own legend. In 1840 his body returns to Paris and lies today beneath the dome of Les Invalides.", quote: "What a novel my life has been!" },
];

function Index() {
  return (
    <main>
      <CinematicIntro />
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <img src={hero} alt="Napoleon on a white horse overlooking the burning field of Waterloo" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover sepia-img" />
        <div className="absolute inset-0 bg-background/45 vignette" />
        <div className="relative px-5 text-center animate-fade-up">
          <p className="font-heading text-sm uppercase tracking-[0.5em] text-gold">Anno MDCCCXV</p>
          <h1 className="mt-6 font-display text-5xl leading-tight text-foreground drop-shadow-lg md:text-8xl">
            Napoleon
          </h1>
          <p className="mt-2 font-heading text-xl tracking-[0.3em] text-foreground/90 md:text-3xl">THE ROAD TO WATERLOO</p>
          <div className="gold-rule mx-auto my-8 max-w-md" />
          <p className="mx-auto max-w-xl text-xl italic text-foreground/85">
            The rise of an emperor, the conquest of a continent, and the single June day that ended it all.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/map" className="btn-vintage">Explore the Battlefield</Link>
            <Link to="/games" className="btn-vintage">Test Your Knowledge</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2">
        <div className="paper rotate-[-1.5deg] p-4">
          <img src={portrait} alt="Portrait of Napoleon in imperial uniform" width={832} height={1088} loading="lazy" className="w-full sepia-img" />
          <p className="mt-3 text-center italic">Napoléon Ier, Empereur des Français</p>
        </div>
        <div>
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold">The Man</p>
          <h2 className="mt-3 font-display text-4xl">A Corsican who conquered Europe</h2>
          <div className="gold-rule my-6 max-w-xs" />
          <p className="text-foreground/85 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:text-gold">
            Few men have bent history as Napoleon Bonaparte did. An artillery officer of minor nobility, he rose through the chaos of the Revolution to become First Consul and then Emperor, redrawing the map of Europe and leaving behind the Napoleonic Code, which still shapes law across the world.
          </p>
          <p className="mt-4 text-foreground/85">
            Yet ambition carried him to Moscow, to exile, and finally to the muddy ridges south of Brussels, where 190,000 men met to decide the fate of a continent.
          </p>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold">Chronicle</p>
            <h2 className="mt-3 font-display text-4xl">The Road, Year by Year</h2>
          </div>
          <ol className="relative border-l border-gold/50 pl-8">
            {timeline.map((t, i) => (
              <li key={t.year} className="mb-10">
                <span className="absolute -left-[9px] mt-2 h-4 w-4 rotate-45 border border-gold bg-primary" />
                <details className="paper group cursor-pointer p-6" open={i === timeline.length - 2}>
                  <summary className="flex list-none items-baseline justify-between gap-4">
                    <span className="font-heading text-xl font-bold">{t.title}</span>
                    <span className="font-heading text-sm text-primary">{t.year}</span>
                  </summary>
                  <p className="mt-1 font-heading text-xs uppercase tracking-widest text-muted-foreground">⚑ {t.place}</p>
                  <p className="mt-3 italic">{t.text}</p>
                  <p className="mt-3">{t.more}</p>
                  {t.quote && <blockquote className="mt-4 border-l-2 border-primary pl-4 italic text-primary">“{t.quote}”</blockquote>}
                </details>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="paper mx-auto grid max-w-5xl gap-8 p-10 text-center md:grid-cols-4">
          {[["190,000", "Soldiers on the field"], ["~50,000", "Casualties in one day"], ["10 hours", "Of battle"], ["3 armies", "French, Allied, Prussian"]].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl text-primary">{n}</div>
              <div className="mt-2 font-heading text-xs uppercase tracking-widest">{l}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
