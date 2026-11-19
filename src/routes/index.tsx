import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-waterloo.jpg";
import img_napoleon from "@/assets/char-napoleon.jpg";
import img_wellington from "@/assets/char-wellington.jpg";
import img_blucher from "@/assets/char-blucher.jpg";
import img_ney from "@/assets/char-ney.jpg";
import img_grouchy from "@/assets/char-grouchy.jpg";
import img_alexander from "@/assets/char-alexander.jpg";
import img_nelson from "@/assets/char-nelson.jpg";
import img_josephine from "@/assets/char-josephine.jpg";
import { useLang, t, translate, usePageLanguage } from "@/lib/i18n";
import { CinematicIntro } from "@/components/CinematicIntro";
import portrait from "@/assets/napoleon-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Napoleon: The Road to Waterloo" },
      { name: "description", content: "From Corsica to Waterloo: the rise, exile and final defeat of Napoleon Bonaparte." },
      { property: "og:title", content: "Napoleon: The Road to Waterloo" },
      { property: "og:description", content: "An immersive vintage chronicle of Napoleon and the Battle of Waterloo." },
    ],
  }),
  component: Index,
});

const timeline = [
  { year: "1769", title: "Born in Corsica", place: "Ajaccio, Corsica", text: "Napoleone di Buonaparte is born in Ajaccio, one year after France acquires the island.", more: "The second of eight surviving children of Carlo and Letizia Buonaparte, minor Corsican nobles. At nine he is sent to France and later trains at the military school of Brienne, mocked for his accent.", fr: { title: "Naissance en Corse", place: "Ajaccio, Corse", text: "Napoleone di Buonaparte naît à Ajaccio, un an après que la France a acquis l'île.", more: "Deuxième des huit enfants survivants de Carlo et Letizia Buonaparte, petite noblesse corse. À neuf ans, il est envoyé en France et étudie à l'école militaire de Brienne, où l'on se moque de son accent." } },
  { year: "1785", title: "Artillery Officer", place: "École Militaire, Paris", text: "At 16 he graduates as a second lieutenant of artillery.", more: "He completes the course in one year instead of two. Artillery, the 'scientific' arm, teaches him the mathematics of firepower he will use for twenty years.", fr: { title: "Officier d'artillerie", place: "École Militaire, Paris", text: "À 16 ans, il est reçu sous-lieutenant d'artillerie.", more: "Il achève le cursus en un an au lieu de deux. L'artillerie, l'arme « savante », lui enseigne les mathématiques de la puissance de feu dont il se servira pendant vingt ans." } },
  { year: "1793", title: "Siege of Toulon", place: "Toulon, France", text: "His cannon drive the British fleet from the port; he is made brigadier general at 24.", more: "Wounded by a bayonet in the thigh, he earns the notice of Robespierre's brother. Two years later, in Paris, his 'whiff of grapeshot' crushes a royalist uprising.", fr: { title: "Siège de Toulon", place: "Toulon, France", text: "Ses canons chassent la flotte britannique du port ; il est nommé général de brigade à 24 ans.", more: "Blessé d'un coup de baïonnette à la cuisse, il se fait remarquer par le frère de Robespierre. Deux ans plus tard, à Paris, son « coup de mitraille » écrase une insurrection royaliste." } },
  { year: "1796", title: "The Italian Campaign", place: "Lodi, Arcole, Rivoli", text: "A young general of 26 shatters Austrian armies and becomes the hero of the Republic.", more: "Taking a ragged, unpaid army, he wins a dozen battles in a year. At the bridge of Arcole he seizes a flag and leads the charge himself.", quote: "From that moment I foresaw what I might be.", fr: { title: "La campagne d'Italie", place: "Lodi, Arcole, Rivoli", text: "Un jeune général de 26 ans brise les armées autrichiennes et devient le héros de la République.", more: "À la tête d'une armée en haillons et sans solde, il gagne une douzaine de batailles en un an. Au pont d'Arcole, il saisit un drapeau et mène lui-même la charge.", quote: "Dès cet instant, je pressentis ce que je pourrais devenir." } },
  { year: "1798", title: "Egypt", place: "Cairo & the Pyramids", text: "He invades Egypt; Nelson destroys his fleet at the Nile.", more: "His scholars discover the Rosetta Stone. Stranded, he slips back to France alone and seizes power in the coup of 18 Brumaire (1799) as First Consul.", fr: { title: "L'Égypte", place: "Le Caire et les Pyramides", text: "Il envahit l'Égypte ; Nelson détruit sa flotte à Aboukir.", more: "Ses savants découvrent la pierre de Rosette. Bloqué, il regagne seul la France et s'empare du pouvoir lors du coup d'État du 18 Brumaire (1799) comme Premier consul." } },
  { year: "1804", title: "Emperor of the French", place: "Notre-Dame, Paris", text: "At Notre-Dame he crowns himself Emperor, taking the crown from the Pope's hands.", more: "The same year he issues the Civil Code — the Napoleonic Code — which abolishes feudal privilege and still underlies law in dozens of countries.", fr: { title: "Empereur des Français", place: "Notre-Dame, Paris", text: "À Notre-Dame, il se couronne lui-même Empereur, prenant la couronne des mains du Pape.", more: "La même année, il promulgue le Code civil — le Code Napoléon — qui abolit les privilèges féodaux et inspire encore le droit de dizaines de pays." } },
  { year: "1805", title: "Austerlitz", place: "Moravia (Czech Republic)", text: "His masterpiece: the Battle of the Three Emperors, destroying the Russo-Austrian army.", more: "He deliberately weakens his right to lure the Allies off the Pratzen Heights, then smashes their centre as 'the sun of Austerlitz' breaks through the fog.", quote: "Soldiers, I am pleased with you.", fr: { title: "Austerlitz", place: "Moravie (République tchèque)", text: "Son chef-d'œuvre : la bataille des Trois Empereurs, qui anéantit l'armée austro-russe.", more: "Il affaiblit volontairement sa droite pour attirer les Alliés hors du plateau de Pratzen, puis brise leur centre tandis que « le soleil d'Austerlitz » perce le brouillard.", quote: "Soldats, je suis content de vous." } },
  { year: "1807", title: "Master of Europe", place: "Tilsit, on the Niemen", text: "After Jena and Friedland, he makes peace with the Tsar on a raft in the river.", more: "His brothers sit on thrones in Spain, Holland, Naples and Westphalia. But the Spanish war becomes an endless 'ulcer' draining his armies.", fr: { title: "Maître de l'Europe", place: "Tilsit, sur le Niémen", text: "Après Iéna et Friedland, il fait la paix avec le Tsar sur un radeau au milieu du fleuve.", more: "Ses frères règnent en Espagne, en Hollande, à Naples et en Westphalie. Mais la guerre d'Espagne devient un « ulcère » sans fin qui épuise ses armées." } },
  { year: "1812", title: "Retreat from Moscow", place: "Borodino & the Berezina", text: "The Grande Armée of 600,000 marches into Russia. Fewer than 100,000 return.", more: "He takes a burning, empty Moscow, waits five weeks for a peace that never comes, then retreats into the winter. Hunger, cold and Cossacks destroy the army.", fr: { title: "Retraite de Russie", place: "Borodino et la Bérézina", text: "La Grande Armée de 600 000 hommes marche sur la Russie. Moins de 100 000 en reviendront.", more: "Il prend une Moscou vide et en flammes, attend cinq semaines une paix qui ne vient jamais, puis recule dans l'hiver. La faim, le froid et les Cosaques anéantissent l'armée." } },
  { year: "1813", title: "Battle of the Nations", place: "Leipzig, Saxony", text: "Half a million men fight for three days; Napoleon is beaten by the coalition.", more: "Prussia, Russia, Austria and Sweden unite against him. The largest battle in Europe before WWI ends his control of Germany.", fr: { title: "La bataille des Nations", place: "Leipzig, Saxe", text: "Un demi-million d'hommes s'affrontent pendant trois jours ; Napoléon est battu par la coalition.", more: "La Prusse, la Russie, l'Autriche et la Suède s'unissent contre lui. La plus grande bataille d'Europe avant 1914 met fin à sa domination sur l'Allemagne." } },
  { year: "1814", title: "Exile to Elba", place: "Fontainebleau → Elba", text: "After the fall of Paris, he abdicates and is exiled to Elba.", more: "He is allowed to keep the title of Emperor and rule a tiny Mediterranean island of 12,000 people, with a guard of 600 men.", fr: { title: "L'exil à l'île d'Elbe", place: "Fontainebleau → île d'Elbe", text: "Après la chute de Paris, il abdique et est exilé à l'île d'Elbe.", more: "On lui laisse le titre d'Empereur et le gouvernement d'une minuscule île méditerranéenne de 12 000 habitants, avec une garde de 600 hommes." } },
  { year: "1815", title: "The Hundred Days", place: "Golfe-Juan → Paris", text: "He escapes, lands in France, and marches on Paris without firing a shot.", more: "At Laffrey the 5th Regiment is sent to stop him. He opens his coat: 'If any of you wishes to kill his Emperor, here I am.' They join him.", quote: "Here I am.", fr: { title: "Les Cent-Jours", place: "Golfe-Juan → Paris", text: "Il s'évade, débarque en France et marche sur Paris sans tirer un coup de fusil.", more: "À Laffrey, le 5e régiment est envoyé pour l'arrêter. Il ouvre son manteau : « S'il en est parmi vous qui veuille tuer son Empereur, me voilà. » Ils le rejoignent.", quote: "Me voilà." } },
  { year: "16 June 1815", title: "Ligny & Quatre Bras", place: "Belgium", text: "He beats the Prussians at Ligny while Ney fights Wellington at Quatre Bras.", more: "His last victory. He sends Grouchy with 33,000 men to chase the Prussians — a fateful detachment that never returns in time.", fr: { title: "Ligny et Quatre Bras", place: "Belgique", text: "Il bat les Prussiens à Ligny pendant que Ney affronte Wellington à Quatre Bras.", more: "Sa dernière victoire. Il envoie Grouchy avec 33 000 hommes poursuivre les Prussiens — un détachement fatidique qui ne reviendra jamais à temps.", year: "16 juin 1815" } },
  { year: "18 June 1815", title: "Waterloo", place: "South of Brussels, Belgium", text: "Wellington and Blücher defeat him in Belgium. The Empire ends in a single day.", more: "Attacks at Hougoumont, d'Erlon's infantry, Ney's great cavalry charges and finally the Imperial Guard all fail. As Prussians pour into Plancenoit, the cry rings out: 'La Garde recule!'", quote: "It has been a damned nice thing — the nearest run thing you ever saw. — Wellington", fr: { title: "Waterloo", place: "Au sud de Bruxelles, Belgique", text: "Wellington et Blücher le battent en Belgique. L'Empire s'achève en un seul jour.", more: "Les assauts de Hougoumont, l'infanterie de d'Erlon, les grandes charges de cavalerie de Ney et enfin la Garde impériale échouent. Tandis que les Prussiens déferlent sur Plancenoit, le cri retentit : « La Garde recule ! »", quote: "Ce fut une sacrée belle affaire — le plus beau coup de dés que j'aie jamais vu. — Wellington", year: "18 juin 1815" } },
  { year: "1821", title: "Death on St Helena", place: "Longwood, St Helena", text: "He dies in exile on a remote Atlantic island, aged 51.", more: "He dictates his memoirs and shapes his own legend. In 1840 his body returns to Paris and lies today beneath the dome of Les Invalides.", quote: "What a novel my life has been!", fr: { title: "La mort à Sainte-Hélène", place: "Longwood, Sainte-Hélène", text: "Il meurt en exil sur une île perdue de l'Atlantique, à 51 ans.", more: "Il dicte ses mémoires et façonne sa propre légende. En 1840, sa dépouille revient à Paris et repose aujourd'hui sous le dôme des Invalides.", quote: "Quel roman que ma vie !" } },
];

const characters = [
  { n: "Napoleon Bonaparte", r: "Emperor of the French", s: "French", d: "Military genius who rose from Corsican officer to master of Europe, defeated at last at Waterloo.", img: img_napoleon, fr: { r: "Empereur des Français", d: "Génie militaire passé d'officier corse à maître de l'Europe, vaincu enfin à Waterloo." } },
  { n: "Duke of Wellington", r: "Commander, Anglo-Allied Army", s: "Allied", d: "Arthur Wellesley, victor of the Peninsular War; held the ridge of Mont-Saint-Jean all day.", img: img_wellington, fr: { r: "Commandant de l'armée anglo-alliée", d: "Arthur Wellesley, vainqueur de la guerre d'Espagne ; il tint la crête du Mont-Saint-Jean toute la journée." } },
  { n: "Gebhard von Blücher", r: "Prussian Field Marshal", s: "Allied", d: "Aged 72, beaten at Ligny, he still marched to Waterloo and struck the decisive blow at Plancenoit.", img: img_blucher, fr: { r: "Maréchal prussien", d: "À 72 ans, battu à Ligny, il marcha pourtant sur Waterloo et porta le coup décisif à Plancenoit." } },
  { n: "Marshal Michel Ney", r: "'Bravest of the Brave'", s: "French", d: "Led the great cavalry charges and the Guard's attack; executed for treason later in 1815.", img: img_ney, fr: { r: "« Le Brave des Braves »", d: "Il mena les grandes charges de cavalerie et l'attaque de la Garde ; fusillé pour trahison fin 1815." } },
  { n: "Marshal Grouchy", r: "Commander of the Right Wing", s: "French", d: "Sent to chase the Prussians with 33,000 men, he never reached the battlefield in time.", img: img_grouchy, fr: { r: "Commandant de l'aile droite", d: "Envoyé poursuivre les Prussiens avec 33 000 hommes, il n'atteignit jamais le champ de bataille à temps." } },
  { n: "Tsar Alexander I", r: "Emperor of Russia", s: "Allied", d: "Napoleon's ally at Tilsit turned enemy; his armies destroyed the Grande Armée in 1812.", img: img_alexander, fr: { r: "Empereur de Russie", d: "Allié de Napoléon à Tilsit devenu ennemi ; ses armées détruisirent la Grande Armée en 1812." } },
  { n: "Horatio Nelson", r: "British Admiral", s: "Allied", d: "Won Trafalgar in 1805, ending Napoleon's hopes of invading Britain. Killed in the battle.", img: img_nelson, fr: { r: "Amiral britannique", d: "Vainqueur à Trafalgar en 1805, il mit fin au rêve d'invasion de l'Angleterre. Tué au combat." } },
  { n: "Josephine & Marie-Louise", r: "Empresses of France", s: "French", d: "His first love Josephine, divorced in 1810; then Marie-Louise of Austria, mother of his heir.", img: img_josephine, fr: { r: "Impératrices des Français", d: "Joséphine, son premier amour, répudiée en 1810 ; puis Marie-Louise d'Autriche, mère de son héritier." } },
];

const wars = [
  { y: "1803–1805", t: "War of the Third Coalition", w: "Britain, Austria, Russia", o: "French victory at Ulm and Austerlitz; British victory at sea at Trafalgar." },
  { y: "1806–1807", t: "War of the Fourth Coalition", w: "Prussia, Russia", o: "Prussia crushed at Jena–Auerstedt; peace of Tilsit makes Napoleon master of the continent." },
  { y: "1807–1814", t: "Peninsular War", w: "Spain, Portugal, Britain", o: "Guerrilla war and Wellington's army bleed France for seven years — the 'Spanish ulcer'." },
  { y: "1809", t: "War of the Fifth Coalition", w: "Austria", o: "Defeat at Aspern-Essling, then victory at Wagram; Napoleon marries an Austrian princess." },
  { y: "1812", t: "Invasion of Russia", w: "Russia", o: "Borodino, burning Moscow and the winter retreat: over 400,000 men lost." },
  { y: "1813–1814", t: "War of the Sixth Coalition", w: "All of Europe", o: "Defeat at Leipzig; the Allies take Paris and Napoleon abdicates to Elba." },
  { y: "1815", t: "War of the Seventh Coalition", w: "Britain, Prussia, Netherlands", o: "The Hundred Days end at Waterloo; final exile to St Helena." },
];

const defeat = [
  { t: "Overreach in Russia", d: "The 1812 invasion destroyed his best veterans and horses — losses he could never replace.", fr: ["L'excès en Russie", "L'invasion de 1812 détruisit ses meilleurs vétérans et chevaux — des pertes irremplaçables."] },
  { t: "The Spanish Ulcer", d: "Hundreds of thousands of troops were tied down in Spain, fighting guerrillas and Wellington.", fr: ["L'ulcère espagnol", "Des centaines de milliers de soldats furent immobilisés en Espagne face aux guérilleros et à Wellington."] },
  { t: "Europe United", d: "The coalitions learned to fight together and copied his methods; Britain's money paid for their armies.", fr: ["L'Europe unie", "Les coalitions apprirent à combattre ensemble et copièrent ses méthodes ; l'or britannique paya leurs armées."] },
  { t: "Britain Ruled the Seas", d: "After Trafalgar the Royal Navy blockaded France, and the Continental System hurt France's own allies.", fr: ["La Grande-Bretagne maîtresse des mers", "Après Trafalgar, la marine royale britannique bloqua la France, et le Blocus continental nuisit à ses propres alliés."] },
  { t: "Mistakes at Waterloo", d: "He waited for the ground to dry, sent Grouchy away, and Ney's cavalry charged without infantry support.", fr: ["Les erreurs de Waterloo", "Il attendit que le sol sèche, éloigna Grouchy, et la cavalerie de Ney chargea sans soutien d'infanterie."] },
  { t: "The Prussians Arrived", d: "Blücher's 50,000 men struck the French flank in the evening; the Guard broke and the army fled.", fr: ["L'arrivée des Prussiens", "Les 50 000 hommes de Blücher frappèrent le flanc français le soir ; la Garde plia et l'armée s'enfuit."] },
];

function Index() {
  usePageLanguage("Napoleon: The Road to Waterloo", "Napoléon : La Route de Waterloo", "From Corsica to Waterloo: the rise, exile and final defeat of Napoleon Bonaparte.", "De la Corse à Waterloo : l'ascension, l'exil et la défaite finale de Napoléon Bonaparte.");
  const lang = useLang();
  const L = (text: string) => translate(lang, text);
  const T = (en: string, fr: string) => t(lang, en, fr);
  return (
    <main>
      <CinematicIntro />
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <img src={hero} alt={L("Napoleon on a white horse overlooking the burning field of Waterloo")} width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover sepia-img" />
        <div className="absolute inset-0 bg-background/45 vignette" />
        <div className="relative px-5 text-center animate-fade-up">
          <p className="font-heading text-sm uppercase tracking-[0.5em] text-gold">{L("Anno MDCCCXV")}</p>
          <h1 className="mt-6 font-display text-5xl leading-tight text-foreground drop-shadow-lg md:text-8xl">
            {T("Napoleon", "Napoléon")}
          </h1>
          <p className="mt-2 font-heading text-xl tracking-[0.3em] text-foreground/90 md:text-3xl">{T("THE ROAD TO WATERLOO", "LA ROUTE DE WATERLOO")}</p>
          <div className="gold-rule mx-auto my-8 max-w-md" />
          <p className="mx-auto max-w-xl text-xl italic text-foreground/85">
            {T("The rise of an emperor, the conquest of a continent, and the single June day that ended it all.", "L'ascension d'un empereur, la conquête d'un continent, et le seul jour de juin qui mit fin à tout.")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/map" className="btn-vintage">{T("Explore the Battlefield", "Explorer le champ de bataille")}</Link>
            <Link to="/games" className="btn-vintage">{T("Test Your Knowledge", "Testez vos connaissances")}</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2">
        <div className="paper rotate-[-1.5deg] p-4">
          <img src={portrait} alt={L("Portrait of Napoleon in imperial uniform")} width={832} height={1088} loading="lazy" className="w-full sepia-img" />
          <p className="mt-3 text-center italic">Napoléon Ier, Empereur des Français</p>
        </div>
        <div>
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold">{T("The Man", "L'Homme")}</p>
          <h2 className="mt-3 font-display text-4xl">{T("A Corsican who conquered Europe", "Un Corse qui conquit l'Europe")}</h2>
          <div className="gold-rule my-6 max-w-xs" />
          <p className="text-foreground/85 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:text-gold">
            {T("Few men have bent history as Napoleon Bonaparte did. An artillery officer of minor nobility, he rose through the chaos of the Revolution to become First Consul and then Emperor, redrawing the map of Europe and leaving behind the Napoleonic Code, which still shapes law across the world.", "Peu d'hommes ont plié l'histoire comme Napoléon Bonaparte. Officier d'artillerie de petite noblesse, il s'éleva dans le chaos de la Révolution pour devenir Premier consul puis Empereur, redessinant la carte de l'Europe et laissant le Code civil, qui inspire encore le droit dans le monde entier.")}
          </p>
          <p className="mt-4 text-foreground/85">
            {T("Yet ambition carried him to Moscow, to exile, and finally to the muddy ridges south of Brussels, where 190,000 men met to decide the fate of a continent.", "Mais l'ambition le mena à Moscou, à l'exil, puis enfin sur les crêtes boueuses au sud de Bruxelles, où 190 000 hommes se rencontrèrent pour décider du sort d'un continent.")}
          </p>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold">{T("Chronicle", "Chronique")}</p>
            <h2 className="mt-3 font-display text-4xl">{T("The Road, Year by Year", "La route, année par année")}</h2>
          </div>
          <ol className="relative border-l border-gold/50 pl-8">
            {timeline.map((t, i) => (
              <li key={t.year} className="mb-10">
                <span className="absolute -left-[9px] mt-2 h-4 w-4 rotate-45 border border-gold bg-primary" />
                <details className="paper group cursor-pointer p-6" open={i === timeline.length - 2}>
                  <summary className="flex list-none items-baseline justify-between gap-4">
                    <span className="font-heading text-xl font-bold">{T(t.title, t.fr.title)}</span>
                    <span className="font-heading text-sm text-primary">{T(t.year, t.fr.year ?? t.year)}</span>
                  </summary>
                  <p className="mt-1 font-heading text-xs uppercase tracking-widest text-muted-foreground">⚑ {T(t.place, t.fr.place)}</p>
                  <p className="mt-3 italic">{T(t.text, t.fr.text)}</p>
                  <p className="mt-3">{T(t.more, t.fr.more)}</p>
                  {t.quote && <blockquote className="mt-4 border-l-2 border-primary pl-4 italic text-primary">“{T(t.quote, t.fr.quote ?? t.quote)}”</blockquote>}
                </details>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold">{L("Dramatis Personae")}</p>
            <h2 className="mt-3 font-display text-4xl">{T("The Main Characters", "Les personnages principaux")}</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {characters.map((c) => (
              <div key={L(c.n)} className="paper p-4">
                <img src={c.img} alt={lang === "fr" ? `Portrait de ${L(c.n)}` : `Portrait of ${L(c.n)}`} width={736} height={912} loading="lazy" className="mb-4 aspect-[4/5] w-full object-cover sepia-img" />
                <p className={`font-heading text-xs uppercase tracking-widest ${c.s === "French" ? "text-secondary" : "text-primary"}`}>{c.s === "French" ? T("French", "Français") : T("Allied", "Alliés")}</p>
                <h3 className="mt-2 font-heading text-lg font-bold">{L(c.n)}</h3>
                <p className="text-sm italic">{T(c.r, c.fr.r)}</p>
                <p className="mt-3 text-base">{T(c.d, c.fr.d)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold">{T("Europe at War", "L'Europe en guerre")}</p>
            <h2 className="mt-3 font-display text-4xl">{T("The Napoleonic Wars & Campaigns", "Les guerres et campagnes napoléoniennes")}</h2>
            <p className="mx-auto mt-4 max-w-2xl italic text-foreground/75">{T("Twelve years of war, seven coalitions, and millions of soldiers across a continent.", "Douze ans de guerre, sept coalitions et des millions de soldats à travers un continent.")}</p>
          </div>
          <div className="paper overflow-x-auto p-6">
            <table className="w-full text-left">
              <thead className="font-heading text-xs uppercase tracking-widest">
                <tr className="border-b border-ink/40"><th className="p-3">{T("Years", "Années")}</th><th className="p-3">{T("War", "Guerre")}</th><th className="p-3">{T("Against", "Contre")}</th><th className="p-3">{T("Outcome", "Issue")}</th></tr>
              </thead>
              <tbody>
                {wars.map((w) => (
                  <tr key={L(w.t)} className="border-b border-ink/20 align-top">
                    <td className="p-3 font-heading text-sm text-primary">{w.y}</td>
                    <td className="p-3 font-heading font-bold">{L(w.t)}</td>
                    <td className="p-3 italic">{L(w.w)}</td>
                    <td className="p-3">{L(w.o)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold">{T("The Fall", "La Chute")}</p>
            <h2 className="mt-3 font-display text-4xl">{T("How Was Napoleon Defeated?", "Comment Napoléon fut-il vaincu ?")}</h2>
          </div>
          <ol className="grid gap-6 md:grid-cols-3">
            {defeat.map((d, i) => (
              <li key={d.t} className="paper p-6">
                <span className="font-display text-4xl text-primary">{["I", "II", "III", "IV", "V", "VI"][i]}</span>
                <h3 className="mt-2 font-heading text-lg font-bold">{T(d.t, d.fr[0] ?? "")}</h3>
                <p className="mt-2">{T(d.d, d.fr[1] ?? "")}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="paper mx-auto grid max-w-5xl gap-8 p-10 text-center md:grid-cols-4">
          {[["190,000", "Soldiers on the field"], ["~50,000", "Casualties in one day"], ["10 hours", "Of battle"], ["3 armies", "French, Allied, Prussian"]].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl text-primary">{L(n ?? "")}</div>
              <div className="mt-2 font-heading text-xs uppercase tracking-widest">{L(l ?? "")}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
