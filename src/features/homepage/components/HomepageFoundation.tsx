import { ArrowDown, Waves } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { HomepageFoundation as HomepageData } from "@/contracts/site";
import { GlobalCTA } from "@/components/site/GlobalCTA";

function Hero({ data }: { data: HomepageData["hero"] }) {
  return <section className="home-hero relative isolate overflow-hidden text-on-image" aria-labelledby="hero-heading">
    <img src={data.image.src} alt={data.image.alt} width={data.image.width} height={data.image.height} fetchPriority="high" loading="eager" className="hero-image absolute inset-0 -z-20 h-full w-full object-cover" />
    <div className="hero-shade absolute inset-0 -z-10" />
    <div className="site-container flex h-full flex-col justify-center pb-24 pt-16">
      <p className="eyebrow mb-6 flex items-center gap-3"><span className="h-px w-8 bg-on-image/70" />{data.eyebrow}</p>
      <h1 id="hero-heading" className="hero-title whitespace-pre-line font-display">{data.title}</h1>
      <p className="mt-5 font-display text-2xl italic md:text-3xl">{data.tagline}</p>
      <p className="mt-5 whitespace-pre-line text-sm leading-7 text-on-image/90 sm:text-base">{data.description}</p>
      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"><GlobalCTA {...data.primaryCTA} /><GlobalCTA {...data.secondaryCTA} className="text-on-image hover:bg-on-image/10 hover:text-on-image" /></div>
    </div>
    <div className="site-container absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 pb-7 text-xs text-on-image/90">
      <p>{data.caption}</p><Link to="/" hash="introduction" aria-label="Continue to introduction" className="grid size-12 shrink-0 place-items-center rounded-full border border-on-image/40 transition-colors hover:bg-on-image/10"><ArrowDown className="size-5" /></Link>
    </div>
  </section>;
}

export function HomepageFoundation({ data }: { data: HomepageData }) {
  return <>
    <Hero data={data.hero} />
    <section id="introduction" className="section-space scroll-mt-8" aria-labelledby="intro-heading">
      <div className="site-container grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <div><p className="eyebrow mb-6 text-primary">{data.introduction.eyebrow}</p><h2 id="intro-heading" className="section-title whitespace-pre-line font-display">{data.introduction.title}</h2></div>
        <div className="flex flex-col justify-end"><Waves className="mb-6 size-9 text-primary" strokeWidth={1} aria-hidden="true" /><p className="reading-width text-base leading-8 text-muted-foreground">{data.introduction.description}</p></div>
      </div>
    </section>
    <section id="island-stories" className="section-space scroll-mt-8 bg-surface" aria-labelledby="stories-heading">
      <div className="site-container">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="eyebrow mb-4 text-primary">{data.representative.eyebrow}</p><h2 id="stories-heading" className="section-title font-display">{data.representative.title}</h2></div><p className="max-w-64 text-sm leading-6 text-muted-foreground">{data.representative.description}</p></div>
        <div className="grid gap-10 md:grid-cols-2">
          {data.representative.items.map(item => <article key={item.id} className="min-w-0">
            <div className="aspect-[4/3] overflow-hidden"><img src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} loading="lazy" decoding="async" className="h-full w-full object-cover" /></div>
            <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground"><span>{item.number}</span><span className="h-px w-8 bg-border" /><p>{item.category}</p></div>
            <h3 className="mt-3 font-display text-2xl md:text-3xl">{item.title}</h3><p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">{item.description}</p>
          </article>)}
        </div>
      </div>
    </section>
    <section className="section-space bg-primary text-primary-foreground text-center" aria-labelledby="closing-heading"><div className="site-container"><p className="eyebrow mb-5">{data.closing.eyebrow}</p><h2 id="closing-heading" className="section-title font-display">{data.closing.title}</h2><GlobalCTA {...data.closing.cta} className="mt-8" /></div></section>
  </>;
}