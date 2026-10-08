export interface MediaAsset {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  focalPoint: "center" | "island";
}

export type Destination = { kind: "route"; to: "/" | "/destinations" } | { kind: "section"; id: "introduction" | "island-stories" };
export interface CTA { label: string; destination: Destination; variant: "primary" | "secondary" | "quiet" }
export interface MenuItem { id: string; label: string; plannedPath: string; destination?: Destination; available: boolean }
export interface Menu { id: string; label: string; items: MenuItem[] }
export interface SEO { title: string; description: string; canonical: string }
export interface WebsiteSettings {
  name: string;
  logoSubtitle: string;
  primaryCTA: CTA;
  footer: {
    description: string;
    groups: Menu[];
    contact: { label: string; value: string }[];
    socials: { label: string; available: false }[];
    newsletter: { heading: string; description: string; status: string };
    legal: { label: string; available: false }[];
    copyrightYear: number;
    demoNotice: string;
  };
}
export interface HomepageFoundation {
  seo: SEO;
  hero: { eyebrow: string; title: string; tagline: string; description: string; image: MediaAsset; primaryCTA: CTA; secondaryCTA: CTA; caption: string };
  introduction: { eyebrow: string; title: string; description: string };
  representative: { eyebrow: string; title: string; description: string; items: { id: string; number: string; category: string; title: string; description: string; image: MediaAsset }[] };
  closing: { eyebrow: string; title: string; cta: CTA };
}
export interface PublicFoundation { settings: WebsiteSettings; menu: Menu; homepage: HomepageFoundation }