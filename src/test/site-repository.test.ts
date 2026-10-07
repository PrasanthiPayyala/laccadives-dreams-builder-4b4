import { describe, expect, it } from "vitest";
import { siteRepository } from "@/repositories/site";

describe("M1 public repository", () => {
  it("returns deterministic isolated records", () => {
    const first = siteRepository.getPublicFoundation();
    const second = siteRepository.getPublicFoundation();
    expect(first).toEqual(second);
    first.settings.name = "Changed";
    expect(siteRepository.getPublicFoundation().settings.name).toBe("Experience Laccadives");
  });
  it("exposes only implemented destinations and exactly one sample section", () => {
    const data = siteRepository.getPublicFoundation();
    expect(data.menu.items).toHaveLength(8);
    expect(data.menu.items.filter(item => item.available).map(item => item.plannedPath)).toEqual(["/"]);
    expect(data.menu.items.filter(item => !item.available).every(item => !item.destination)).toBe(true);
    expect(data.homepage.representative.items).toHaveLength(2);
    expect(data.settings.footer.contact.every(item => item.value === "Not yet provided")).toBe(true);
  });
  it("includes homepage SEO and meaningful media dimensions", () => {
    const { homepage } = siteRepository.getPublicFoundation();
    expect(homepage.seo.canonical).toBe("https://laccadive-dreams-builder.lovable.app/");
    for (const media of [homepage.hero.image, ...homepage.representative.items.map(item => item.image)]) {
      expect(media.alt.length).toBeGreaterThan(20);
      expect(media.width).toBeGreaterThan(0);
      expect(media.height).toBeGreaterThan(0);
    }
  });
});