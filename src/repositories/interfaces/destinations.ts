import type { DestinationFilter, DestinationRecord, DestinationSummary, DestinationsIndexContent } from "@/contracts/destinations";

export interface DestinationRepository {
  getIndexContent(): DestinationsIndexContent;
  list(filter?: DestinationFilter): DestinationSummary[];
  listInterests(): string[];
  getBySlug(slug: string): DestinationRecord | null;
  getRelated(ids: string[]): DestinationSummary[];
}
