import { Link } from "@tanstack/react-router";
import type { DestinationSummary } from "@/contracts/destinations";

export const islandTypeLabel = { inhabited: "Inhabited island", resort: "Resort island", uninhabited: "Uninhabited island" } as const;

export function DestinationCard({ destination }: { destination: DestinationSummary }) {
  const { slug, name, tagline, shortDescription, heroImage, islandType } = destination;
  return (
    <Link to="/destinations/$slug" params={{ slug }} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <article>
        <div className="aspect-[4/5] overflow-hidden bg-muted">
          <img src={heroImage.src} alt={heroImage.alt} width={heroImage.width} height={heroImage.height} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">{islandTypeLabel[islandType]}</p>
        <h3 className="mt-2 font-display text-3xl text-foreground group-hover:text-primary">{name}</h3>
        <p className="mt-1 text-sm italic text-primary">{tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{shortDescription}</p>
      </article>
    </Link>
  );
}
