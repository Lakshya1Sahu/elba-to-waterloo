import { createFileRoute } from "@tanstack/react-router";
import { useLang, t, usePageLanguage } from "@/lib/i18n";
import { PageTitle } from "@/components/SiteChrome";
import { useEffect, useRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import film from "@/assets/waterloo-film.mp4.asset.json";
import frenchSubtitles from "@/assets/waterloo-fr.vtt.asset.json";
import englishSubtitles from "@/assets/waterloo-en.vtt.asset.json";


export const Route = createFileRoute("/film")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Watch: Waterloo in Detail — Napoleon" },
      { name: "description", content: "An eleven-minute film explaining the Battle of Waterloo: the mud, the mistakes, and the Prussians arriving too late." },
      { property: "og:title", content: "Watch: Waterloo in Detail" },
      { property: "og:description", content: "The full story of 18 June 1815, explained on film." },
    ],
  }),
  component: FilmPage,
});

function FilmPage() {
  usePageLanguage(
    "Watch: Waterloo in Detail — Napoleon",
    "Regarder : Waterloo en détail — Napoléon",
    "An eleven-minute film explaining the Battle of Waterloo.",
    "Un film de onze minutes expliquant la bataille de Waterloo."
  );
  const lang = useLang();
  const T = (en: string, fr: string) => t(lang, en, fr);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [subtitle, setSubtitle] = useState<string>(lang);
  const [playbackError, setPlaybackError] = useState(false);

  useEffect(() => { setSubtitle(lang); }, [lang]);
  const applySubtitles = () => {
    const video = videoRef.current;
    if (!video) return;
    for (const track of Array.from(video.textTracks)) {
      track.mode = track.language === subtitle ? "showing" : "disabled";
    }
  };
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    for (const track of Array.from(video.textTracks)) {
      track.mode = track.language === subtitle ? "showing" : "disabled";
    }
  }, [subtitle]);

  return (
    <main className="px-5 pb-24 pt-28">
      <PageTitle
        kicker={T("The Full Story", "L'histoire complète")}
        title={T("Watch: Waterloo in Detail", "Regarder : Waterloo en détail")}
        sub={T(
          "An eleven-minute film on the battle of 18 June 1815: the mud, the mistakes, and the Prussians arriving too late.",
          "Un film de onze minutes sur la bataille du 18 juin 1815 : la boue, les erreurs, et les Prussiens qui arrivent trop tard."
        )}
      />
      <div className="mx-auto max-w-4xl">
        <figure className="paper rotate-[-0.6deg] p-4">
          <div className="relative aspect-video w-full overflow-hidden border border-ink/40 bg-ink">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full"
              src={film.url}
              aria-label={T("Waterloo film", "Film sur Waterloo")}
              controls
              playsInline
              preload="metadata"
              onLoadedMetadata={applySubtitles}
              onError={() => setPlaybackError(true)}
            >
              <track kind="subtitles" src={frenchSubtitles.url} srcLang="fr" label={T("French", "Français")} onLoad={applySubtitles} />
              <track kind="subtitles" src={englishSubtitles.url} srcLang="en" label={T("English", "Anglais")} onLoad={applySubtitles} />
            </video>
          </div>
          {playbackError && <p role="alert" className="mt-3 text-destructive">{T("The video could not load. Please reload the page.", "Le film n’a pas pu se charger. Rechargez la page.")}</p>}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span id="subtitle-label" className="text-sm">{T("Subtitles", "Sous-titres")}</span>
            <Select value={subtitle} onValueChange={setSubtitle}>
              <SelectTrigger aria-labelledby="subtitle-label" className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">{T("French", "Français")}</SelectItem>
                <SelectItem value="en">{T("English", "Anglais")}</SelectItem>
                <SelectItem value="off">{T("Off", "Désactivés")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-sm italic">
            <span>« {T("Waterloo: The battle that destroyed Napoleon’s Empire", "Waterloo : La bataille qui a détruit l'Empire de Napoléon")} » — Les Chapitres Oubliés (11:26)</span>
          </figcaption>
        </figure>
      </div>
    </main>
  );
}
