import { createFileRoute, Link } from "@tanstack/react-router";
import { siteRepository } from "@/repositories/site";
import { destinationRepository } from "@/repositories/destinations";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DestinationCard, islandTypeLabel } from "@/features/destinations/components/DestinationCard";
import type { IslandType } from "@/contracts/destinations";

const types = Object.keys(islandTypeLabel) as IslandType[];

interface Search { type?: IslandType; interest?: string }

export const Route = createFileRoute("/destinations/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ...(types.includes(s.type as IslandType) ? { type: s.type as IslandType } : {}),
    ...(typeof s.interest === "string" && s.interest ? { interest: s.interest } : {}),
  }),
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => ({
    foundation: siteRepository.getPublicFoundation(),
    content: destinationRepository.getIndexContent(),
    interests: destinationRepository.listInterests(),
    destinations: destinationRepository.list(deps),
  }),
  head: () => {
    const seo = destinationRepository.getIndexContent().seo;
    return {
      meta: [
        { title: seo.title }, { name: "description", content: seo.description },
        { property: "og:title", content: seo.title }, { property: "og:description", content: seo.description },
        { property: "og:type", content: "website" }, { property: "og:url", content: seo.canonical },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: seo.canonical }],
    };
  },
  component: DestinationsIndex,
});

function Chip({ active, children, search }: { active: boolean; children: string; search: Search }) {
  return (
    <Link to="/destinations" search={search} replace resetScroll={false} aria-current={active ? "true" : undefined}
      className={`inline-flex min-h-11 items-center border px-4 text-sm transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary"}`}>
      {children}
    </Link>
  );
}

function DestinationsIndex() {
  const { foundation, content, interests, destinations } = Route.useLoaderData();
  const search = Route.useSearch();
  return (
    <>
      <SiteHeader settings={foundation.settings} menu={foundation.menu} />
      <main id="main-content" tabIndex={-1}>
        <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden">
          <img src={content.heroImage.src} alt={content.heroImage.alt} width={content.heroImage.width} height={content.heroImage.height} className="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-scrim/85 via-scrim/30 to-transparent" />
          <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-40 text-on-image md:px-10">
            <p className="text-xs uppercase tracking-[0.3em]">{content.eyebrow}</p>
            <h1 className="mt-4 whitespace-pre-line font-display text-5xl leading-[1.05] md:text-7xl">{content.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed opacity-90">{content.description}</p>
          </div>
        </section>

        <section aria-labelledby="filters-heading" className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          <h2 id="filters-heading" className="sr-only">Filter islands</h2>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Island type">
            <Chip active={!search.type} search={{ ...search, type: undefined }}>All islands</Chip>
            {types.map(t => <Chip key={t} active={search.type === t} search={{ ...search, type: t }}>{islandTypeLabel[t]}</Chip>)}
          </div>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Interest">
            <Chip active={!search.interest} search={{ ...search, interest: undefined }}>Any interest</Chip>
            {interests.map(i => <Chip key={i} active={search.interest === i} search={{ ...search, interest: i }}>{i}</Chip>)}
          </div>
        </section>

        <section aria-label="Islands" className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
          <p className="mb-8 text-sm text-muted-foreground" aria-live="polite">{destinations.length} {destinations.length === 1 ? "island" : "islands"}</p>
          {destinations.length === 0 ? (
            <div className="border border-dashed border-border px-6 py-16 text-center">
              <p className="font-display text-2xl">No islands match these filters.</p>
              <Link to="/destinations" className="mt-4 inline-block text-sm text-primary underline underline-offset-4">Clear filters</Link>
            </div>
          ) : (
            <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map(d => <li key={d.id}><DestinationCard destination={d} /></li>)}
            </ul>
          )}
        </section>
      </main>
      <SiteFooter settings={foundation.settings} />
    </>
  );
}
