import type { MediaAsset, SEO } from "./site";

export type IslandType = "inhabited" | "resort" | "uninhabited";

export interface DestinationFact { label: string; value: string }
export interface DestinationSection { id: string; heading: string; body: string }
export interface DestinationFAQ { id: string; question: string; answer: string }

/** Island record. Relations hold record IDs/slugs only, never display text. */
export interface DestinationRecord {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  islandType: IslandType;
  interests: string[];
  shortDescription: string;
  overview: string;
  heroImage: MediaAsset;
  gallery: MediaAsset[];
  location: { atoll: string; latitude: number; longitude: number };
  facts: DestinationFact[];
  highlights: string[];
  sections: DestinationSection[];
  faqs: DestinationFAQ[];
  relatedDestinationIds: string[];
  relatedExperienceIds: string[];
  relatedPackageIds: string[];
  featured: boolean;
  seo: SEO;
}

export type DestinationSummary = Pick<DestinationRecord, "id" | "slug" | "name" | "tagline" | "islandType" | "interests" | "shortDescription" | "heroImage" | "featured">;

export interface DestinationFilter { type?: IslandType; interest?: string }

export interface DestinationsIndexContent { seo: SEO; eyebrow: string; title: string; description: string; heroImage: MediaAsset }
