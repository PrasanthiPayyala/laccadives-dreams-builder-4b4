import type { PublicFoundation } from "@/contracts/site";

export interface SiteRepository {
  getPublicFoundation(): PublicFoundation;
}