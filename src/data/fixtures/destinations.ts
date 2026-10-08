import aerial from "@/assets/island-aerial.jpg";
import shore from "@/assets/island-shore.jpg";
import turtle from "@/assets/reef-turtle.jpg";
import type { MediaAsset } from "@/contracts/site";
import type { DestinationRecord, DestinationsIndexContent } from "@/contracts/destinations";

// Editorial sample copy with illustrative imagery. Travel facts must be verified before publishing.
const SITE = "https://laccadive-dreams-builder.lovable.app";
const img = (id: string, src: string, alt: string, w = 1200, h = 912): MediaAsset => ({ id, src, alt, width: w, height: h, focalPoint: "center" });
const aerialImg = (name: string) => img(`${name}-aerial`, aerial, `Illustrative aerial view of a palm-covered coral island ringed by a turquoise lagoon, representing ${name}`, 1920, 1088);
const shoreImg = (name: string) => img(`${name}-shore`, shore, `Illustrative white sand shoreline with coconut palms and clear water, representing ${name}`);
const reefImg = (name: string) => img(`${name}-reef`, turtle, `Illustrative sea turtle gliding over coral in clear water, representing the reefs of ${name}`);

const seo = (slug: string, name: string, description: string) => ({ title: `${name} — Island Guide | Experience Laccadives`, description, canonical: `${SITE}/destinations/${slug}` });

export const destinationsIndexFixture: DestinationsIndexContent = {
  seo: { title: "Destinations — The Islands of Lakshadweep | Experience Laccadives", description: "Explore the coral islands of the Laccadives: lagoons, reefs, island culture and quiet shores, each with its own character.", canonical: `${SITE}/destinations` },
  eyebrow: "The islands",
  title: "Thirty-six islands.\nA thousand shades of blue.",
  description: "Each island keeps its own rhythm. Some welcome you with lagoon-side villages, others with nothing but sand, palms and the sound of the reef. Choose where your story begins.",
  heroImage: aerialImg("the Laccadive islands"),
};

export const destinationsFixture: DestinationRecord[] = [
  {
    id: "dst-agatti", slug: "agatti", name: "Agatti", tagline: "Where the journey begins",
    islandType: "inhabited", interests: ["Lagoons", "Water sports", "Culture"], featured: true,
    shortDescription: "The gateway island, home to the airstrip and a long, luminous lagoon.",
    overview: "Agatti is where most journeys into the Laccadives begin. A narrow ribbon of land framed by a wide lagoon, it pairs village life with reef-fringed shallows ideal for a first swim, paddle or snorkel.",
    heroImage: aerialImg("Agatti"), gallery: [shoreImg("Agatti"), reefImg("Agatti")],
    location: { atoll: "Agatti atoll", latitude: 10.86, longitude: 72.19 },
    facts: [{ label: "Best time", value: "October – May" }, { label: "Getting there", value: "Flights to Agatti aerodrome" }, { label: "Ideal stay", value: "2–3 nights" }, { label: "Permit", value: "Entry permit required" }],
    highlights: ["Lagoon kayaking at sunrise", "Snorkelling over shallow reefs", "Village walks and island cuisine"],
    sections: [
      { id: "things-to-do", heading: "Things to do", body: "Glass-bottom boat rides, beginner snorkelling, kayaking across the lagoon and short hops to nearby islands." },
      { id: "culture", heading: "Culture & cuisine", body: "Coconut-rich island cooking, tuna preparations and a calm, close-knit village pace." },
      { id: "tips", heading: "Travel tips", body: "Carry reef-safe sunscreen, dress modestly in villages, and keep some cash; card acceptance is limited." },
    ],
    faqs: [{ id: "f1", question: "Do I need a permit?", answer: "Yes. Visitors require an entry permit, usually arranged with your travel booking." }],
    relatedDestinationIds: ["dst-bangaram", "dst-kadmat"], relatedExperienceIds: [], relatedPackageIds: [],
    seo: seo("agatti", "Agatti", "Agatti, the gateway to the Laccadives: a luminous lagoon, gentle reefs and island village life."),
  },
  {
    id: "dst-bangaram", slug: "bangaram", name: "Bangaram", tagline: "A teardrop in the ocean",
    islandType: "uninhabited", interests: ["Diving", "Seclusion", "Lagoons"], featured: true,
    shortDescription: "A teardrop-shaped coral island with soft sand, still water and starlit nights.",
    overview: "Bangaram is the island of postcards: a teardrop of white sand fringed by palms and encircled by a calm lagoon. With no village, the island is given over to the sea, the sky and slow days.",
    heroImage: shoreImg("Bangaram"), gallery: [aerialImg("Bangaram"), reefImg("Bangaram")],
    location: { atoll: "Bangaram atoll", latitude: 10.94, longitude: 72.29 },
    facts: [{ label: "Best time", value: "October – April" }, { label: "Getting there", value: "Boat from Agatti" }, { label: "Ideal stay", value: "3–4 nights" }, { label: "Permit", value: "Entry permit required" }],
    highlights: ["Night skies without light pollution", "Lagoon and reef dives", "Walks around the whole island"],
    sections: [
      { id: "things-to-do", heading: "Things to do", body: "Diving along the outer reef, snorkelling in the lagoon, and simply doing nothing in the shade of the palms." },
      { id: "stay", heading: "Where to stay", body: "Accommodation is limited and low-impact; plan and confirm stays well in advance." },
    ],
    faqs: [{ id: "f1", question: "Is Bangaram suitable for families?", answer: "Yes, the calm lagoon suits confident swimmers of all ages under supervision." }],
    relatedDestinationIds: ["dst-agatti", "dst-kadmat"], relatedExperienceIds: [], relatedPackageIds: [],
    seo: seo("bangaram", "Bangaram", "Bangaram, a teardrop-shaped coral island of white sand, still lagoons and dark starlit skies."),
  },
  {
    id: "dst-kadmat", slug: "kadmat", name: "Kadmat", tagline: "The long white shore",
    islandType: "resort", interests: ["Diving", "Beaches", "Marine life"], featured: true,
    shortDescription: "Long beaches on one side, a shallow lagoon on the other, and reefs alive with colour.",
    overview: "Kadmat stretches long and slender, with an unhurried lagoon on its western side. It is a favourite for divers, with reef walls, turtles and schools of fish only a short boat ride away.",
    heroImage: reefImg("Kadmat"), gallery: [shoreImg("Kadmat"), aerialImg("Kadmat")],
    location: { atoll: "Kadmat", latitude: 11.22, longitude: 72.78 },
    facts: [{ label: "Best time", value: "November – April" }, { label: "Getting there", value: "Ship or boat transfer" }, { label: "Ideal stay", value: "3–5 nights" }, { label: "Permit", value: "Entry permit required" }],
    highlights: ["Guided dives for all levels", "Turtle encounters", "Quiet beach walks at dusk"],
    sections: [
      { id: "things-to-do", heading: "Things to do", body: "Discover-scuba sessions, certified dive trips, snorkelling, and beach days along the island's long shore." },
      { id: "marine", heading: "Marine life", body: "Reef fish, turtles and coral gardens. Observe without touching to protect fragile reefs." },
    ],
    faqs: [{ id: "f1", question: "Can beginners dive here?", answer: "Yes. Introductory dives with certified instructors are typically available." }],
    relatedDestinationIds: ["dst-bangaram", "dst-kavaratti"], relatedExperienceIds: [], relatedPackageIds: [],
    seo: seo("kadmat", "Kadmat", "Kadmat: long white beaches, a calm lagoon and some of the most rewarding reefs in the Laccadives."),
  },
  {
    id: "dst-kavaratti", slug: "kavaratti", name: "Kavaratti", tagline: "The island capital",
    islandType: "inhabited", interests: ["Culture", "Lagoons", "Marine life"], featured: false,
    shortDescription: "The administrative heart of the islands, with ornate mosques and a glassy lagoon.",
    overview: "Kavaratti combines island life with a gentle lagoon of remarkable clarity. Explore its heritage, then drift above coral gardens in a glass-bottom boat.",
    heroImage: aerialImg("Kavaratti"), gallery: [reefImg("Kavaratti")],
    location: { atoll: "Kavaratti", latitude: 10.57, longitude: 72.64 },
    facts: [{ label: "Best time", value: "October – May" }, { label: "Getting there", value: "Ship or helicopter transfer" }, { label: "Ideal stay", value: "2 nights" }, { label: "Permit", value: "Entry permit required" }],
    highlights: ["Island heritage", "Glass-bottom boat over coral", "Lagoon swimming"],
    sections: [{ id: "culture", heading: "Culture", body: "Respect local customs: dress modestly and ask before photographing people." }],
    faqs: [],
    relatedDestinationIds: ["dst-agatti", "dst-minicoy"], relatedExperienceIds: [], relatedPackageIds: [],
    seo: seo("kavaratti", "Kavaratti", "Kavaratti, the island capital: heritage, island life and a remarkably clear lagoon."),
  },
  {
    id: "dst-minicoy", slug: "minicoy", name: "Minicoy", tagline: "The southern crescent",
    islandType: "inhabited", interests: ["Culture", "Beaches", "Seclusion"], featured: false,
    shortDescription: "A crescent-shaped island with its own language, traditions and a historic lighthouse.",
    overview: "Far to the south, Minicoy feels like a world of its own, with a distinct culture, a sweeping crescent lagoon and a lighthouse watching over the sea.",
    heroImage: shoreImg("Minicoy"), gallery: [aerialImg("Minicoy")],
    location: { atoll: "Minicoy (Maliku)", latitude: 8.28, longitude: 73.05 },
    facts: [{ label: "Best time", value: "November – April" }, { label: "Getting there", value: "Ship transfer" }, { label: "Ideal stay", value: "3 nights" }, { label: "Permit", value: "Entry permit required" }],
    highlights: ["Historic lighthouse views", "Distinct island culture", "Crescent lagoon"],
    sections: [{ id: "culture", heading: "Culture", body: "Minicoy's traditions differ from the northern islands, from its language to its boat-building heritage." }],
    faqs: [],
    relatedDestinationIds: ["dst-kavaratti"], relatedExperienceIds: [], relatedPackageIds: [],
    seo: seo("minicoy", "Minicoy", "Minicoy, the southern crescent: distinct island culture, a historic lighthouse and a sweeping lagoon."),
  },
];
