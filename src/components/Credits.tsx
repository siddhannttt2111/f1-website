import { commonsUrl, LICENSE_URLS, PHOTOS } from "@/lib/photos";

export default function Credits() {
  return (
    <footer className="border-t border-white/10 bg-background px-6 py-12 text-sm text-muted">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-xl font-extrabold uppercase tracking-[0.2em] text-foreground">
          Slip<span className="text-accent">stream</span>
        </p>
        <p className="mt-2 max-w-2xl">
          An unofficial fan tribute to Formula 1. Not affiliated with Formula 1, the FIA, Red Bull
          Racing or McLaren. Team names and liveries belong to their respective owners.
        </p>

        <h2 className="mt-8 font-display text-sm font-semibold uppercase tracking-[0.3em] text-foreground">
          Photo credits
        </h2>
        <ul className="mt-3 grid gap-1 text-xs text-muted/80 md:grid-cols-2">
          {Object.values(PHOTOS).map((p) => (
            <li key={p.src}>
              <a href={commonsUrl(p.file)} target="_blank" rel="noreferrer" className="hover:text-foreground">
                {p.alt}
              </a>{" "}
              by {p.author},{" "}
              <a href={LICENSE_URLS[p.license]} target="_blank" rel="noreferrer" className="underline hover:text-foreground">
                {p.license}
              </a>
              , via Wikimedia Commons{"edit" in p && p.edit ? ` (${p.edit})` : ""}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
