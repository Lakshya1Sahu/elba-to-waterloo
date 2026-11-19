import { createFileRoute } from "@tanstack/react-router";
import { useLang, t, usePageLanguage } from "@/lib/i18n";
import { PageTitle } from "@/components/SiteChrome";

/** YouTube video ID extracted from https://youtu.be/us6-712HwM0 */
const VIDEO_ID = "us6-712HwM0";

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
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`}
              title="Waterloo : La bataille qui a détruit l'Empire de Napoléon — Les Chapitres Oubliés"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-sm italic">
            <span>« Waterloo : La bataille qui a détruit l'Empire de Napoléon » — Les Chapitres Oubliés (11:26)</span>
            <a href={`https://www.youtube.com/watch?v=${VIDEO_ID}`} target="_blank" rel="noopener noreferrer" className="font-heading text-xs uppercase tracking-widest text-primary not-italic hover:underline">{T("Watch on YouTube", "Voir sur YouTube")}</a>
          </figcaption>
        </figure>
      </div>
    </main>
  );
}
