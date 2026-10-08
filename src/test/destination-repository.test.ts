import { describe, expect, it } from "vitest";
import { destinationRepository } from "@/repositories/destinations";

describe("M3 destination repository", () => {
  it("lists all five sample islands", () => {
    expect(destinationRepository.list()).toHaveLength(5);
  });
  it("filters by island type and interest", () => {
    expect(destinationRepository.list({ type: "uninhabited" }).map(d => d.slug)).toEqual(["bangaram"]);
    expect(destinationRepository.list({ interest: "Diving" }).map(d => d.slug)).toEqual(["bangaram", "kadmat"]);
  });
  it("returns null for unknown slugs and resolves related islands by id", () => {
    expect(destinationRepository.getBySlug("atlantis")).toBeNull();
    const agatti = destinationRepository.getBySlug("agatti")!;
    expect(destinationRepository.getRelated(agatti.relatedDestinationIds).map(d => d.slug)).toEqual(["bangaram", "kadmat"]);
  });
});
