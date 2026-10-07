import { publicFoundationFixture } from "@/data/fixtures/site";
import type { SiteRepository } from "@/repositories/interfaces/site";

export const mockSiteRepository: SiteRepository = {
  getPublicFoundation: () => structuredClone(publicFoundationFixture),
};