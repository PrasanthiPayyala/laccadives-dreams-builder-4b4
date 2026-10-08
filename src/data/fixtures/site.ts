import aerial from "@/assets/island-aerial.jpg";
import shore from "@/assets/island-shore.jpg";
import turtle from "@/assets/reef-turtle.jpg";
import type { PublicFoundation, MenuItem } from "@/contracts/site";

const menuItems: MenuItem[] = [
  { id: "home", label: "Home", plannedPath: "/", available: true, destination: { kind: "route", to: "/" } },
  ...([
    ["destinations", "Destinations", "/destinations"], ["experiences", "Experiences", "/experiences"],
    ["packages", "Packages", "/packages"], ["journal", "Journal", "/blog"],
    ["guides", "Travel Guides", "/travel-guides"], ["about", "About", "/about"], ["contact", "Contact", "/contact"],
  ] as [string, string, string][]).map(([id, label, plannedPath]) => ({ id, label, plannedPath, available: false })),
];

// Editorial sample copy and generated illustrative media; not verified destination or company records.
export const publicFoundationFixture: PublicFoundation = {
  settings: {
    name: "Experience Laccadives", logoSubtitle: "An island state of mind",
    primaryCTA: { label: "Find your inspiration", destination: { kind: "section", id: "island-stories" }, variant: "primary" },
    footer: {
      description: "A little closer to the ocean. A little further from the everyday.",
      groups: [
        { id: "explore", label: "Explore", items: menuItems.slice(1, 6) },
        { id: "discover", label: "Discover", items: [menuItems[0]!, ...menuItems.slice(6)] },
      ],
      contact: [{ label: "Email", value: "Not yet provided" }, { label: "Phone", value: "Not yet provided" }],
      socials: [{ label: "Instagram", available: false }, { label: "Facebook", available: false }],
      newsletter: { heading: "A little island inspiration", description: "Notes from the shore, stories from the sea.", status: "Newsletter coming soon" },
      legal: [{ label: "Privacy policy", available: false }, { label: "Terms & conditions", available: false }],
      copyrightYear: 2026, demoNotice: "Editorial preview · Sample content and illustrative imagery",
    },
  },
  menu: { id: "primary", label: "Main navigation", items: menuItems },
  homepage: {
    seo: { title: "Experience Laccadives — An Island State of Mind", description: "An editorial introduction to Experience Laccadives, inspired by island shores, ocean adventures and a slower rhythm of travel.", canonical: "https://laccadive-dreams-builder.lovable.app/" },
    hero: {
      eyebrow: "The ocean is calling", title: "Experience\nLaccadives", tagline: "An island state of mind.",
      description: "Follow the tides. Find your quiet.\nLet the everyday drift away.",
      image: { id: "aerial", src: aerial, alt: "Illustrative aerial view of a palm-covered coral island surrounded by a turquoise lagoon", width: 1920, height: 1088, focalPoint: "island" },
      primaryCTA: { label: "Discover the island spirit", destination: { kind: "section", id: "island-stories" }, variant: "primary" },
      secondaryCTA: { label: "A slower kind of journey", destination: { kind: "section", id: "introduction" }, variant: "quiet" },
      caption: "Island dreaming, beautifully reimagined",
    },
    introduction: { eyebrow: "Away from the ordinary", title: "Some places ask you\nto do less. Feel more.", description: "Salt on your skin. Sand between your toes. A horizon that seems to go on forever. Experience Laccadives begins with a simple idea: make room for wonder, and let the islands set the pace." },
    representative: {
      eyebrow: "A glimpse of island life", title: "Find your kind of escape.", description: "Two perspectives. One extraordinary feeling.",
      items: [
        { id: "shore", number: "01", category: "The quiet side", title: "Where time follows the tide", description: "Palm-fringed shores, open horizons and the luxury of simply being.", image: { id: "shore", src: shore, alt: "Illustrative white sand beach with coconut palms and clear turquoise water", width: 1200, height: 912, focalPoint: "center" } },
        { id: "reef", number: "02", category: "Beneath the blue", title: "A whole world below the surface", description: "A different perspective, where the ocean reveals its quiet wonders.", image: { id: "reef", src: turtle, alt: "Illustrative sea turtle swimming above coral and small fish in clear ocean water", width: 1200, height: 912, focalPoint: "center" } },
      ],
    },
    closing: { eyebrow: "Stay a little longer", title: "Let your mind wander.", cta: { label: "Back to island inspiration", destination: { kind: "section", id: "island-stories" }, variant: "secondary" } },
  },
};