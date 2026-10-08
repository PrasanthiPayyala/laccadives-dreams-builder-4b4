import { destinationsFixture, destinationsIndexFixture } from "@/data/fixtures/destinations";
import type { DestinationRecord, DestinationSummary } from "@/contracts/destinations";
import type { DestinationRepository } from "@/repositories/interfaces/destinations";

const toSummary = ({ id, slug, name, tagline, islandType, interests, shortDescription, heroImage, featured }: DestinationRecord): DestinationSummary =>
  structuredClone({ id, slug, name, tagline, islandType, interests, shortDescription, heroImage, featured });

export const mockDestinationRepository: DestinationRepository = {
  getIndexContent: () => structuredClone(destinationsIndexFixture),
  list: (filter = {}) =>
    destinationsFixture
      .filter(d => (!filter.type || d.islandType === filter.type) && (!filter.interest || d.interests.includes(filter.interest)))
      .map(toSummary),
  listInterests: () => [...new Set(destinationsFixture.flatMap(d => d.interests))].sort(),
  getBySlug: slug => {
    const found = destinationsFixture.find(d => d.slug === slug);
    return found ? structuredClone(found) : null;
  },
  getRelated: ids => ids.flatMap(id => destinationsFixture.filter(d => d.id === id)).map(toSummary),
};
