import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { siteRepository } from "@/repositories/site";
import { destinationRepository } from "@/repositories/destinations";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { GlobalCTA } from "@/components/site/GlobalCTA";
import { DestinationCard, islandTypeLabel } from "@/features/destinations/components/DestinationCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const destination = destinationRepository.getBySlug(params.slug);
    if (!destination) throw notFound();
    return { foundation: siteRepository.getPublicFoundation(), destination, related: destinationRepository.getRelated(destination.relatedDestinationIds) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Island not found | Experience Laccadives" }, { name: "robots", content: "noindex" }] };
    const { seo, name, location } = loaderData.destination;
    return {
      meta: [
        { title: seo.title }, { name: "description", content: seo.description },
        { property: "og:title", content: seo.title }, { property: "og:description", content: seo.description },
        { property: "og:type", content: "article" }, { property: "og:url", content: seo.canonical },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: seo.canonical }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "TouristDestination", name, description: seo.description, url: seo.canonical,
        geo: { "@type": "GeoCoordinates", latitude: location.latitude, longitude: location.longitude },
      }) }],
    };
  },
  notFoundComponent: DestinationNotFound,
  component: DestinationDetail,
});

function DestinationNotFound() {
  const { settings, menu } = siteRepository.getPublicFoundation();
  return (
    <>
      <SiteHeader settings={settings} menu={menu} />
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-2xl px-6 py-40 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Lost at sea</p>
        <h1 className="mt-4 font-display text-5xl">We couldn't find that island.</h1>
        <p className="mt-4 text-muted-foreground">It may have drifted away, or the link may be incorrect.</p>
        <Link to="/destinations" className="mt-8 inline-flex min-h-11 items-center bg-primary px-6 text-sm text-primary-foreground">Explore all islands</Link>
      </main>
      <SiteFooter settings={settings} />
    </>
  );
}

function DestinationDetail() {
  const { foundation, destination: d, related } = Route.useLoaderData();
  return (
    <>
      <SiteHeader settings={foundation.settings} menu={foundation.menu} />
      <main id="main-content" tabIndex={-1}>
        <section className="relative isolate flex min-h-[80vh] items-end overflow-hidden">
          <img src={d.heroImage.src} alt={d.heroImage.alt} width={d.heroImage.width} height={d.heroImage.height} className="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-scrim/90 via-scrim/30 to-transparent" />
          <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-40 text-on-image md:px-10">
            <nav aria-label="Breadcrumb"><ol className="flex gap-2 text-xs uppercase tracking-[0.2em] opacity-90">
              <li><Link to="/" className="hover:underline">Home</Link></li><li aria-hidden>/</li>
              <li><Link to="/destinations" className="hover:underline">Destinations</Link></li><li aria-hidden>/</li>
              <li aria-current="page">{d.name}</li>
            </ol></nav>
            <p className="mt-8 text-sm italic">{d.tagline}</p>
            <h1 className="mt-2 font-display text-6xl leading-none md:text-8xl">{d.name}</h1>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] opacity-90">{islandTypeLabel[d.islandType]} · {d.location.atoll}</p>
          </div>
        </section>

        <section aria-label="Quick facts" className="border-b border-border bg-surface">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4 md:px-10">
            {d.facts.map(f => <div key={f.label}><dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{f.label}</dt><dd className="mt-2 font-display text-xl">{f.value}</dd></div>)}
          </dl>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="font-display text-4xl">About {d.name}</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{d.overview}</p>
            {d.sections.map(s => <div key={s.id} className="mt-12"><h3 className="font-display text-2xl">{s.heading}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p></div>)}
          </div>
          <aside className="h-fit border border-border p-8">
            <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Highlights</h2>
            <ul className="mt-4 space-y-3">{d.highlights.map(h => <li key={h} className="border-b border-border pb-3 font-display text-lg last:border-0">{h}</li>)}</ul>
            <div className="mt-8 border-t border-border pt-6">
              <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Location</h2>
              <p className="mt-2 text-sm">{d.location.latitude.toFixed(2)}° N, {d.location.longitude.toFixed(2)}° E</p>
              <p className="mt-1 text-xs text-muted-foreground">Interactive map coming later.</p>
            </div>
          </aside>
        </section>

        {d.gallery.length > 0 && (
          <section aria-label={`${d.name} gallery`} className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
            <ul className="grid gap-4 sm:grid-cols-2">
              {d.gallery.map(m => <li key={m.id}><figure><img src={m.src} alt={m.alt} width={m.width} height={m.height} loading="lazy" className="aspect-[4/3] w-full object-cover" /></figure></li>)}
            </ul>
          </section>
        )}

        {d.faqs.length > 0 && (
          <section className="mx-auto max-w-3xl px-6 pb-20 md:px-10">
            <h2 className="font-display text-4xl">Good to know</h2>
            <Accordion type="single" collapsible className="mt-6">
              {d.faqs.map(f => <AccordionItem key={f.id} value={f.id}><AccordionTrigger>{f.question}</AccordionTrigger><AccordionContent>{f.answer}</AccordionContent></AccordionItem>)}
            </Accordion>
          </section>
        )}

        {related.length > 0 && (
          <section className="bg-surface py-20">
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <h2 className="font-display text-4xl">Nearby islands</h2>
              <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{related.map(r => <li key={r.id}><DestinationCard destination={r} /></li>)}</ul>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-display text-4xl">Let {d.name} set the pace.</h2>
          <p className="mt-4 text-sm text-muted-foreground">Sample editorial content. Travel details should be confirmed before booking.</p>
          <GlobalCTA label="Explore all islands" destination={{ kind: "route", to: "/destinations" }} variant="primary" className="mt-8" />
        </section>
      </main>
      <SiteFooter settings={foundation.settings} />
    </>
  );
}
