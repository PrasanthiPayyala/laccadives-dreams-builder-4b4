# Experience Laccadives — Frontend Architecture & Delivery Plan

## 1. Goal and boundaries
Create a premium public tourism experience and a CMS-oriented admin frontend whose content is modeled as structured records and reusable page blocks. Keep content editing and API integration behind replaceable interfaces so a later Laravel or Node service can take over without rewriting the presentation layer.

This is a planning blueprint only. No pages, components, backend, authentication, packages, or implementation files will be created until separately requested. The current project is a minimal TanStack Start v1 / React 19 / TypeScript scaffold; it is not a Next.js project, and the required framework is fixed. Use TanStack Router/Start equivalents while preserving React, TypeScript, SSR, SEO, and API-ready outcomes. No backend is connected.

## 2. Complete proposed project structure
The structure below extends the existing TanStack Start project, retaining file-based routes, generated route tree, existing semantic-token stylesheet, and current UI primitives. It is a target organization, not a demand to create every module immediately.

```text
src/
  routes/
    __root.tsx                         # shared document shell, head defaults, query provider
    index.tsx                          # public home at /
    about.tsx                          # static public pages
    contact.tsx
    search.tsx
    faq.tsx
    privacy-policy.tsx
    terms.tsx
    cookie-policy.tsx
    destinations.index.tsx             # /destinations
    destinations.$slug.tsx             # /destinations/:slug
    experiences.index.tsx
    experiences.$slug.tsx
    packages.index.tsx
    packages.$slug.tsx
    blog.index.tsx
    blog.$slug.tsx
    travel-guides.index.tsx
    travel-guides.$slug.tsx
    news.index.tsx
    news.$slug.tsx
    campaigns.$slug.tsx
    admin.tsx                          # admin shell/layout; renders Outlet
    admin.index.tsx                    # /admin dashboard
    admin.settings.tsx
    admin.homepage.tsx
    admin.pages.index.tsx
    admin.pages.$id.tsx
    admin.header.tsx
    admin.footer.tsx
    admin.menus.tsx
    admin.destinations.index.tsx
    admin.destinations.new.tsx
    admin.destinations.$id.tsx
    admin.experiences.index.tsx
    admin.experiences.new.tsx
    admin.experiences.$id.tsx
    admin.packages.index.tsx
    admin.packages.new.tsx
    admin.packages.$id.tsx
    admin.blog.index.tsx
    admin.blog.new.tsx
    admin.blog.$id.tsx
    admin.articles.tsx
    admin.travel-guides.tsx
    admin.news.tsx
    admin.faqs.tsx
    admin.testimonials.tsx
    admin.media.tsx
    admin.galleries.tsx
    admin.videos.tsx
    admin.newsletter.tsx
    admin.subscribers.tsx
    admin.enquiries.index.tsx
    admin.enquiries.$id.tsx
    admin.seo.tsx
    admin.redirects.tsx
    admin.announcements.tsx
    admin.popups.tsx
    admin.campaigns.tsx
    admin.users.tsx
    admin.roles.tsx
    admin.permissions.tsx
    admin.audit-logs.tsx
    admin.integrations.tsx

  components/
    site/                              # public header, footer, navigation, shared chrome
    admin/                             # admin shell, sidebar, topbar, reusable editor chrome
    content/                           # cards, grids, editorial and domain display patterns
    blocks/                            # homepage/page section renderers and registry
    forms/                             # shared public form fields and form feedback
    ui/                                # accessible design primitives and semantic variants

  features/                            # domain behavior; organize by business capability
    destinations/
      components/                      # destination-specific display/form patterns
      queries/                         # query options and cache keys, when added
      schemas/                         # content/editor validation contracts, when useful
      types.ts
    experiences/
    packages/
    editorial/                         # blog, article, guide, news shared concepts
    pages/                              # managed pages and page-section composition
    homepage/                          # home-specific block composition
    enquiries/
    marketing/                          # campaigns, popups, newsletter
    media/
    navigation/
    settings/
    seo/
    users/                              # future UI concepts only; no auth implementation now

  contracts/
    content.ts                          # cross-domain content contracts
    api.ts                              # pagination, errors, filters, response conventions
    media.ts
    navigation.ts
    forms.ts

  repositories/
    interfaces/                         # domain repository boundaries
    mock/                               # fixture-backed repository implementations
    api/                                # future HTTP implementations; not built now

  data/
    fixtures/                           # deterministic structured records, organized by domain
    seed-index.ts                       # fixture collection/index convention, if needed

  hooks/                                # reusable client hooks only when behavior is shared
  lib/
    api/                                # transport, request mapping, error normalization
    content/                            # block validation, relationship resolution
    media/                              # responsive source and asset helpers
    seo/                                # head metadata, canonical and schema helpers
    utils.ts
  styles/
    tokens.css                          # optional imported token layer if stylesheet grows
    admin.css                           # only if scoped admin rules become necessary
  styles.css                            # existing Tailwind v4 entry and semantic theme
```

**Directory responsibilities:** `routes` maps URL to page, route loader/query prefetch, and route-specific head metadata; it should not become the content database. `components` holds reusable presentation and shared shells. `features` groups domain-specific UI, queries, and form rules. `contracts` holds framework-independent records and API boundary types. `repositories` selects fixture or HTTP implementations. `data/fixtures` is sample content only. `hooks` is for genuinely shared interactive behavior, not a dumping ground. `lib` contains cross-domain helpers. `styles.css` and optional imported styles own semantic tokens and base styling. Do not manually edit generated `routeTree.gen.ts`; route files generate it.

Public and admin share primitives and tokens but not page shells. Public routes remain directly shareable and SEO-aware. Admin routes live under an `/admin` layout, with access control intentionally deferred. Add folders as needed rather than creating empty placeholders for the whole blueprint at once.

## 3. Public website route architecture
Use TanStack Router file routes: static path segments map to route filenames; `$slug` is a dynamic parameter. A listing route is an index leaf under its collection; detail pages load by slug. Route loaders should obtain data through the repository/query boundary. Each public leaf owns distinct title, description, Open Graph metadata, and self-canonical; dynamic metadata comes from its content record. Missing or unpublished records resolve to an intentional not-found/noindex state.

| Route | Purpose and data | Main sections / reusable UI | SEO and behavior |
|---|---|---|---|
| `/` | Brand introduction; global settings, ordered homepage blocks, selected content | Hero, featured destinations/experiences/packages, editorial, gallery/video, trust, travel info, newsletter, CTA | Static path, data-driven sections; unique home metadata; Organization schema where accurate |
| `/destinations` | Browse destinations; records, filters, facets | Intro, filters, destination grid, pagination, enquiry CTA | Indexable listing; title/description; query-string filters are shareable |
| `/destinations/$slug` | One destination; detail record, related content and FAQs | Breadcrumbs, hero, overview, gallery/map, travel info, things to do, stay/food/culture, FAQs, related experiences/packages/articles | Dynamic title/description/canonical; TouristDestination only for supported facts; breadcrumb schema |
| `/experiences` | Browse activity/interest catalog | Intro, category filters, experience grid, seasonal prompt | Indexable listing; query-driven filters/search |
| `/experiences/$slug` | Experience detail; destinations/packages relations | Hero, highlights, duration/difficulty/suitability, requirements, inclusions, gallery, FAQs, enquiry CTA, related records | Dynamic metadata and canonical; valid breadcrumb schema |
| `/packages` | Browse trip/package offers; statuses and public availability | Listing intro, filters, package grid, comparison cues, enquiry CTA | Only published/eligible packages public; filter state in URL |
| `/packages/$slug` | Package detail; itinerary days, destination/experience links, terms | Hero, summary, day-by-day itinerary, inclusions/exclusions, requirements, FAQs, enquiry form | Dynamic metadata; offers/pricing markup only if accurate and maintained |
| `/blog` | Editorial index; posts, categories, tags | Featured story, filters, article grid, pagination | Indexable; listing metadata; canonicalized query policy |
| `/blog/$slug` | Blog story and author/related content | Breadcrumbs, article header, rich body, gallery, related content, share actions | Article/BlogPosting JSON-LD from visible content; canonical and social image |
| `/travel-guides` | Practical travel-guide library | Intro, topic filters, guide grid, pagination | Indexable topic listing; query filters shareable |
| `/travel-guides/$slug` | One guide; linked destinations/experiences | Guide header, contents, rich body, practical callouts, related content | Dynamic metadata, Article schema only when fitting the actual content |
| `/news` | News index ordered by published date | News list/grid, category filter, pagination | Indexable listing; current records only |
| `/news/$slug` | One news article | Header, body, related links, date/byline | Dynamic metadata, Article schema, accurate dates |
| `/about` | Brand, local context, service promise | Editorial narrative, values, team/partners if approved, trust CTA | Static route metadata; Organization data consistent with real business facts |
| `/contact` | Contact choices and public enquiry entry point | Contact details from settings, map/link, contact form, FAQ links | Static metadata; form state accessible; no invented contact facts |
| `/search` | Cross-type search results | Search field, type filters, results by content kind, empty state | Search query in URL; normally noindex to avoid thin result pages |
| `/faq` | General FAQ | Topic grouping, accessible accordions, contact CTA | FAQ schema only for visible, genuine question/answer content; no duplicate hidden FAQs |
| `/campaigns/$slug` | CMS-managed campaign landing page | Campaign-specific blocks, tracking-ready CTAs/forms | Per-campaign metadata/index policy; dynamic, published records only |
| `/privacy-policy` | Legal privacy notice | Structured legal content, updated date | Static/legal metadata; content must be legally reviewed |
| `/terms` | Terms of use/service | Structured legal content, updated date | Static/legal metadata; content must be legally reviewed |
| `/cookie-policy` | Cookie notice/preferences explanation | Structured legal content and preferences entry point if later supported | Static/legal metadata; consent behavior requires a separate approved integration |

Shareable routes use separate paths, not hash fragments as substitutes. Search and listing filters use validated search params. Editorial and detail pages have explicit loading, empty/not-found, and error handling. Route shells should not fetch directly from fixtures or hardcode endpoint details.

## 4. Admin/CMS route architecture
These are planned frontend URLs only. No login, access enforcement, backend reads/writes, or actual persistence is part of this phase. The `/admin` parent supplies the admin shell and renders its outlet; the index child is `/admin`. Keep route components as page assembly and move reusable controls into admin/domain modules.

| Route(s) | Planned purpose |
|---|---|
| `/admin`, `/admin/settings` | Overview and centralized website settings |
| `/admin/homepage`, `/admin/pages`, `/admin/pages/$id` | Homepage sections, page index, page content/editor view |
| `/admin/header`, `/admin/footer`, `/admin/menus` | Shared chrome and navigation configuration |
| `/admin/destinations`, `/admin/destinations/new`, `/admin/destinations/$id` | List/create/edit destination records |
| `/admin/experiences`, `/admin/experiences/new`, `/admin/experiences/$id` | List/create/edit experiences and relations |
| `/admin/packages`, `/admin/packages/new`, `/admin/packages/$id` | Package list, creation, itinerary/editor details |
| `/admin/blog`, `/admin/blog/new`, `/admin/blog/$id` | Blog list and create/edit workflow |
| `/admin/articles`, `/admin/travel-guides`, `/admin/news` | Editorial collections, with shared list/editor patterns |
| `/admin/faqs`, `/admin/testimonials` | Reusable FAQ and testimonial management |
| `/admin/media`, `/admin/galleries`, `/admin/videos` | Asset library, gallery composition, video records |
| `/admin/newsletter`, `/admin/subscribers` | Newsletter configuration and subscriber list presentation |
| `/admin/enquiries`, `/admin/enquiries/$id` | Lead inbox, filters, enquiry detail and status history |
| `/admin/seo`, `/admin/redirects` | SEO defaults, per-content metadata, redirect records |
| `/admin/announcements`, `/admin/popups`, `/admin/campaigns` | Marketing content and campaign setup |
| `/admin/users`, `/admin/roles`, `/admin/permissions` | Future identity/role UI concepts; not secure or active in frontend-only phase |
| `/admin/audit-logs`, `/admin/integrations` | Future audit and integration configuration views |

For routes that manage a resource, keep list, create, and edit responsibilities explicit. A resource editor can group fields into Details, Media, Relationships, SEO, and Workflow. The stable `$id` is an internal record identifier; the public site uses the record's `$slug`. If permissions later differ by operation, enforce them in the trusted service as well as reflecting them in the UI.

## 5. Design system
**Direction:** Laccadives editorial luxury—documentary ocean imagery, confident typography, generous rhythm, restrained controls, and a distinct coral/reef accent. Avoid the generic resort-template treatment and generic SaaS admin dashboard. The public side should feel immersive and calm; the admin side should feel precise and operational while sharing brand tokens.

**Provisional token roles (visual decision to confirm before implementation):** deep ink/ocean for primary text and dark surfaces; clear lagoon/teal for key actions and active states; reef green for nature/success; coral or sunlit gold as a small action/highlight accent; bright salt-white for primary light surfaces; cool mist for secondary surfaces and borders. Use several balanced roles rather than an all-blue, all-beige, or all-dark palette. Add light/dark semantic values in the existing `src/styles.css` using the project's OKLCH token convention; do not use one-off hardcoded colors in components.

**Typography:** an editorial display face with distinctive character for large headlines paired with a highly legible sans-serif for body, navigation, form labels, and admin data. Use a restrained scale with clear roles: display/hero; page title; section heading; card title; body; supporting/caption; compact metadata. Avoid excessive all-caps and avoid using display type for dense CMS content. Load any web fonts through document head links, not remote CSS imports.

**Layout and surfaces:** spacing based on a consistent 4/8-point rhythm; a centered wide public content container with narrower reading measure; full-bleed image bands used selectively; smaller admin content width aligned to tables/forms. Use mostly crisp corners with a small consistent radius; reserve shadows for overlays and genuinely elevated controls, not every section. Define responsive section spacing and a shared image-crop/focal-point policy.

**Reusable patterns:** primary/secondary/quiet/danger buttons with sizes and loading/disabled states; text, select, checkbox, toggle, date, and search inputs; link/button focus; compact admin tables and status badges; destination/package/editorial cards; breadcrumb trail; section heading; modals/drawers; toast; skeleton; empty/error/retry states. Status must have text/icon in addition to color. Public cards are image-led; admin cards are limited to meaningful dashboard summaries and content items. Public shell favors spaciousness; admin favors scan density, visible labels, filters, and stable table columns.

## 6. Public component architecture
All records passed to components should be typed domain data or resolved view data—not fixture imports. Variants should be intentional and constrained. Shared interactive controls use accessible existing UI primitives where suitable.

| Component | Purpose / data and variants | Reuse and responsive behavior |
|---|---|---|
| `SiteHeader` | Site settings, logo, menus, CTA, search/language affordances; transparent/solid/overlay variants | All public routes; desktop full nav, mobile menu trigger, stable height |
| `DesktopNavigation` | Menu items with nested links and active route | Public shell; hover and keyboard behavior consistent, avoid hover-only access |
| `MobileNavigation` | Compact drawer/menu tree with CTA and search | Phone/tablet; focus-managed drawer, scroll-safe, clear close/back behavior |
| `MegaMenu` | Grouped nav items and optional feature link/media reference | Selected top-level items; responsive columns; keyboard-operable disclosure |
| `AnnouncementBar` | Enabled message, optional link, dismissibility policy | Public shell/campaign; wraps on narrow screens and does not obscure navigation |
| `SiteFooter` | Settings, description, links, contact/social/legal data | Public routes; columns collapse to labeled groups on mobile |
| `GlobalCTA` | Shared CTA label/destination/variant | Content endcaps and hero; full-width touch target on narrow screens when appropriate |
| `Breadcrumbs` | Ordered label + typed route destination items | Detail/editorial/legal routes; wraps or truncates accessibly; schema data source |
| `Hero` | Heading, copy, media asset, focal point, CTAs, overlay/readability options | Home, campaign and detail pages; art direction changes at breakpoints; text never obscures subject |
| `SectionHeader` | Eyebrow, heading, supporting copy, optional link | Any content band; responsive alignment and reading order |
| `DestinationCard` | Destination summary, cover asset, location/feature labels, slug link | Home/list/related content; stable image ratio and stacked narrow variant |
| `ExperienceCard` | Experience summary, category, duration/level, media, slug | Home/list/related content; labels wrap without shifting image geometry |
| `PackageCard` | Package summary, length, destinations, starting price if approved, CTA | Home/list/related; consistent price disclosure and mobile stacking |
| `ArticleCard` | Story type, title, excerpt, author/date, featured image | Blog/guides/news/related lists; horizontal and vertical editorial variants |
| `TestimonialCard` | Quote, author attribution, context and optional rating when factual | Home/detail; accessible carousel or static list, avoid auto-advance by default |
| `Gallery` | Ordered media references, captions, alt text, focal points | Destination/experience/article; adaptive grid/lightbox with keyboard and caption controls |
| `VideoSection` | Video asset/embed reference, poster, caption and transcript/caption availability | Home/detail; poster-first, user-initiated playback, reduced-motion aware |
| `StatsSection` | Label/value/source for factual stats | Home/brand pages; wraps into a small grid; never use unverified numbers |
| `FAQAccordion` | Question, answer, optional related entity | FAQ/detail pages; native semantics, keyboard controls, valid visible schema source |
| `NewsletterSection` | Copy, email field, consent copy, submission state | Home/footer/campaign; mobile stack, accessible consent and feedback |
| `SearchOverlay` | Search term, content-type facets, result records | Header/search page; focus-managed, URL-backed query, escape/close behavior |
| `ContactForm` | Name/contact/message/consent fields and status | Contact page; field errors, pending/success/failure states; demo-only until API exists |
| `EnquiryForm` | Trip context, date, travellers, preferences, message | Package/experience/contact; progressive grouping, optional prefilled relationships |
| `RelatedContent` | Explicit related records plus content type | Details/editorial; compact horizontal or grid layout; suppress empty relation groups |
| `ContentGrid` | Cards, columns, gap and empty state | Listings; responsive column counts and stable image aspects |
| `ContentCarousel` | Ordered content cards with previous/next controls | Optional featured groups; keyboard controls, no forced autoplay, static fallback |
| `MapSection` | Coordinates/place label, map link or later map adapter | Destination/contact; do not load heavy interactive map until requested; provide text/location fallback |
| `RichContent` | Sanitized structured editorial blocks | Articles/guides/destination long description; semantic headings/media, no arbitrary executable HTML |

## 7. Homepage block architecture
A page is a page record plus an ordered collection of typed section records. Each section has stable identity, block type, visibility, display settings, and validated block-specific content. Relationship fields refer to record IDs or selection rules; renderers resolve the records through repositories. The future editor controls add/edit/hide/duplicate/delete/reorder; those editing interactions are explicitly deferred.

| Block type | Core fields and media/CTA | Relations, optional fields, responsive/rendering behavior |
|---|---|---|
| Hero | Kicker, title, short copy, desktop/mobile media reference, focal point, primary/secondary CTA | Optional video/poster, alignment and height preset; image focal point changes by breakpoint; readable text overlay |
| Featured Destinations | Heading, selected destination IDs or curated query, item count | Optional intro and view-all CTA; responsive card grid or controlled carousel |
| Featured Experiences | Heading, selected IDs/category query, count | Optional category labels and CTA; cards adapt to grid/list; no fragile text sizing |
| Explore by Interest | Heading, interest/category IDs, icon/image per interest, destination path | Optional intro; compact tiles become horizontally scrollable or stacked on mobile |
| Featured Packages | Heading, curated package IDs, count | Optional introductory note/CTA and price-display switch; clear starting-price qualifier |
| Editorial Story | Heading/eyebrow, selected post/guide reference, excerpt override only if explicitly modeled, media | Optional secondary story and CTA; single feature becomes stacked on narrow screens |
| Gallery | Heading, ordered media asset IDs, captions/alt from asset records | Optional link/lightbox; masonry-like treatment only if stable and accessible; responsive crop rules |
| Video | Heading, video asset, poster, transcript/caption references | Optional duration/caption/CTA; click-to-play poster, no background autoplay with sound |
| Statistics | Heading and ordered label/value/source entries | Optional explanatory copy; factual source and unit required; responsive compact grid |
| Testimonials | Heading, curated testimonial IDs | Optional attribution context; static list first, carousel controls only if justified |
| Travel Information | Heading and selected guide/info cards | Optional season/arrival context; content relations remain structured; wraps on mobile |
| Newsletter | Heading, copy, form presentation/consent reference | Optional image/CTA; form behavior remains disconnected until provider/API phase |
| Social | Heading and approved post/media references or curated gallery | Optional external profile CTA; no live third-party embed in initial phase; avoid unreliable feeds |
| Custom CTA | Heading, copy, CTA(s), background asset/color role | Optional eyebrow and trust note; responsive stacking, explicit contrast treatment |

**Common block rules:** section order is explicit; hidden sections remain stored but omitted from public rendering; duplicate creates a new section identity while retaining selected content/settings; deletion requires future confirmation and draft/published lifecycle handling; unsupported block types fail gracefully and are observable. Each block has a schema/version so future field changes can be migrated. Avoid arbitrary component names or raw HTML stored as executable content.

## 8. Structured content models
These are conceptual contract descriptions, not implementation code. Keep contracts independent of React and distinguish stable IDs, slugs, content fields, workflow, relations, and SEO. Shared fields should be composed consistently rather than copied with incompatible meanings.

| Entity | Conceptual fields |
|---|---|
| Destination | ID, name, slug, short/full description, hero media, gallery IDs, location and optional coordinates/map reference, season/weather/arrival/travel sections, things-to-do/stay/food/culture/tips, FAQ IDs, related experience/package/article IDs, status, SEO, timestamps |
| Experience | ID, name, slug, category IDs, destination IDs, description, hero/gallery media IDs, duration, season, difficulty, suitability, highlights, requirements, inclusions/exclusions, FAQ/package/destination relations, CTA, status, SEO |
| Package | ID, name, slug, package code, descriptions, media IDs, duration/nights/days, destination and experience IDs, optional price/currency/qualifier, ordered itinerary-day records, inclusions/exclusions/requirements/terms, FAQs, status (draft/published/featured/seasonal/archived), SEO |
| BlogPost | ID, title, slug, author ID, category/tag IDs, excerpt, featured asset, structured rich body, gallery, destination/experience/content relation IDs, publication state/dates, SEO/social fields |
| TravelGuide | ID, title, slug, topic/category, author, excerpt, structured body, featured media, linked destination/experience/content IDs, state/dates, SEO |
| NewsArticle | ID, title, slug, summary/body, author, category, media, related records, publish date/state, SEO |
| FAQ | ID, question, structured answer, topic/category, related destination/experience/package IDs, display order, state; relationships are many-to-many, not text labels |
| Testimonial | ID, quote, attributed name, optional location/context, consent/provenance fields, related package/experience IDs, media if approved, display state/order |
| Page | ID, title, slug, page kind, ordered block IDs/configuration, visibility/state, preview metadata, SEO, timestamps |
| HomepageBlock | Stable block ID, discriminated type, schema version, order, visibility, typed content settings, media references, CTA, selected entity IDs/query rule |
| MediaAsset | ID, media type, source/original and renditions, MIME/dimensions/duration, alt text, title, caption, credit/copyright, description, focal point, file size, rights/state |
| Menu / MenuItem | Menu ID/name/location; item ID/label, internal route or approved external URL, parent item/order, display state, optional target/feature content reference |
| WebsiteSettings | Site name/tagline, logo/favicon asset IDs, contact channels/address/map, social links, copyright, global CTA, locale/timezone defaults |
| SEO | Title, description, canonical policy/URL, index/follow directives, Open Graph title/description/image, X card/title/description/image, schema eligibility; inherit defaults only through explicit rules |
| Announcement | ID, message, link/CTA, start/end, dismissibility, audience/page targeting, state/order |
| Popup | ID, content, CTA/form reference, trigger/frequency/close behavior, targeting and schedule, state; consent/privacy constraints |
| Campaign | ID, name, slug, ordered page blocks, campaign source/UTM configuration, start/end/state, SEO/index policy |
| Enquiry | ID, contact details, country, travel date, traveller count, destination/experience/package IDs, budget, message, source page, UTM fields, submitted time, consent, status/history |
| NewsletterSubscriber | ID, email, consent/source, signup time, confirmation/unsubscribe state and audit trail; sensitive handling belongs to backend |

**Relationship rules:** Destination↔Experience, Destination↔Package, Experience↔Package, Blog/Guide/Article↔Destination/Experience, and FAQ↔Destination/Experience/Package are explicit ID relations, often many-to-many. A package itinerary references destinations/experiences by ID per day. Menus point to stable internal route/content targets rather than duplicated page names when possible. Media is referenced by ID. Roles are separate from user/profile records in a future backend. Translation readiness should preserve stable IDs and locale-specific text without forcing a booking or localization subsystem into this phase.

## 9. Mock data and data access
Frontend-only flow:

```text
UI route/page → domain repository interface → mock adapter → typed local fixtures
```

Later replacement:

```text
same UI route/page → same domain repository interface → HTTP/API adapter → Laravel or Node service
```

Each domain repository offers user-intent operations (list with filters/page, get by slug/ID, related records) and returns the same contract regardless of adapter. Fixtures use stable IDs/slugs, realistic relationships, varied optional fields and statuses, and enough records to exercise pagination/empty states. A page requests data via query/repository boundary; neither route presentation nor cards import fixture arrays. The mock adapter can simulate delay, empty responses, not-found, and recoverable failures for state design. Any local editing preview is ephemeral and clearly labeled; it must not imply publishing or durable storage. The API switch is adapter configuration plus response mapping, not a replacement of display components.

## 10. Admin UI architecture
Use a small set of shared CMS patterns, then configure them per domain. A content table/list supports search, filters, sort, pagination, selected columns, status labels, row actions, and empty/loading/error states. Editors use consistent sections (core details, media, relationships, SEO, workflow), validation, dirty-state feedback, preview, and save feedback. Enquiry screens prioritize queue status, contact context, source attribution, and a readable activity history.

Reusable patterns: dashboard summary tiles and recent activity; data table/list; filter bar; search; pagination; create/edit form; read-only detail view; side drawer for quick inspect; dialog for destructive confirmation; media picker; SEO panel; status selector; future schedule/publish controls; ordered-list/drag-reorder affordance; skeleton, empty, retryable error, and toast. Use tables on roomy screens and a meaningful stacked/list treatment on narrow screens rather than forcing horizontal overflow. Drag/drop must have keyboard alternatives and explicit move controls. Status changes include text and confirmation where destructive. These remain frontend patterns over mock data; no action implies durable mutation.

## 11. Future page-builder UI architecture
Recommended future flow: select a page → view a live preview with an adjacent section outline → add a known block from a categorized picker → configure its typed fields and select linked content/media → preview at desktop/tablet/mobile widths → save draft → request review/approve/publish according to role. Keep the preview visually close to the public renderer and make the selected block correspond to its outline entry.

Each row/card exposes clear edit, duplicate, hide/show, delete, move up/down/reorder commands. Confirm destructive deletion; hidden blocks remain visible in the editor with an unambiguous state. Support unsaved-change warning, validation at block and page level, preview link/version context, and error recovery. On mobile, use a full-screen editor/drawer instead of cramped columns. Dragging is supplemental, never the only reorder mechanism. This interaction and persistence are future CMS scope, not current implementation.

## 12. SEO architecture
Use TanStack Start route `head()` metadata on each public leaf. Static route text is authored per route; dynamic routes derive title/description/social fields from the record returned by route data. The root route holds only sitewide defaults and must not supply a page-specific image/title that masks leaf metadata. Use self-referencing relative canonical paths until a public domain is assigned. Add `og:image` and X/Twitter image only when an absolute, correctly sized rendition of the same meaningful image shown on that route is available.

Represent page title, meta description, canonical policy/override, robots index/follow directives, Open Graph and X card fields in the content SEO contract. Define fallback precedence: content-specific SEO → content title/summary/media → route-safe default. No placeholder social image. Breadcrumb UI and structured data derive from the same route/content hierarchy. Emit Organization, TouristDestination/TouristAttraction, Article/BlogPosting, and BreadcrumbList only where the visible facts support the schema; FAQPage only for visible, genuine FAQs. Generate sitemap/robots from public, published, indexable records when the backend and host URL exist; do not invent last-modified dates from build/current time. Redirects need explicit source, target, and permanent/temporary status. Search results and unpublished/preview views should be noindex. Validate metadata in rendered route output; crawler indexing/rankings cannot be guaranteed by frontend implementation.

## 13. Responsive strategy
Use content-first breakpoints from the existing utility system and verify real widths rather than designing only for named devices. Desktop: editorial multi-column layouts, full navigation, optional side-by-side page-builder preview. Laptop: protect reading width and avoid dense multi-column forms. Tablet: simplify mega menus, reduce grids, use compact navigation and two-column admin lists. Mobile: single-column reading/order, touch-friendly controls, carefully composed hero crops, drawer navigation, stacked forms, and no clipped copy.

- Header/navigation: full desktop menu and keyboard-operable dropdown; mobile drawer with clear close and focus handling.
- Hero/cards/grids: stable aspect ratios, responsive focal points and column changes; no forced crop of key subjects.
- Gallery: grid/lightbox with keyboard alternative and mobile swipe only as an enhancement.
- Forms: one-column fields, persistent labels, inline errors and full-width primary action where useful.
- Admin sidebar/tables: collapsible drawer/sidebar, filters in a drawer on narrow screens, card rows or deliberate table overflow affordance.
- Page builder: preview and outline stack on narrow screens; editors use full-width panels.
- Modal/drawer: fit within viewport safe areas, scroll content rather than clipping, maintain focus and escape behavior.

## 14. Accessibility
Target WCAG 2.2 AA as a practical acceptance bar. Use semantic landmarks and heading order; one main landmark per page; meaningful list/table semantics; visible focus states; logical keyboard order; no keyboard traps; skip navigation; links for navigation and buttons for actions. Ensure menus, carousel controls, accordions, dialogs, drawers, and search overlay have accessible names, keyboard operation, focus return, Escape handling, and appropriate announcements.

Forms need programmatically associated labels, instructions, required/invalid state, inline error association, success/failure announcement, and non-color-only status. Provide descriptive alt text for informative imagery, empty alt for decorative imagery, captions/transcripts for relevant video, and credit where required. Check text/UI contrast and focus contrast, zoom/reflow, reduced motion, touch targets, and screen-reader status messages. Avoid autoplaying media and ensure all content/CTA remains accessible without animation, hover, color, or a map. Run automated checks plus keyboard and screen-reader spot checks on representative public and admin journeys.

## 15. Performance architecture
Treat photography/video as major payload and layout-shift risks. Use responsive renditions with intrinsic dimensions/aspect ratios, modern image formats where supported, appropriate compression, CDN-ready asset URLs, meaningful alt/focal metadata, eager priority only for the first visible hero, and lazy loading below the fold. Avoid loading full interactive maps, social embeds, or video before user intent; use poster images and provide captions/transcripts. Keep font families/weights limited, self-host or load with efficient display behavior where licensing allows, and prevent layout shift.

Preserve SSR for public indexable routes. Use route-level data loading through the repository/query boundary, cache stable content by query keys, and define stale/error behavior. Split admin-only and heavy interactive modules from public bundles when real route usage warrants it. Avoid global client state and unnecessary hydration. Track Core Web Vitals (LCP, INP, CLS), image bytes, JS payload, and route load behavior on representative devices. CDN, production cache headers, image transformation service, and API caching policy are future deployment/backend decisions; define cache invalidation with publish events before enabling long-lived content caching.

## 16. Future CMS workflow
Define a state machine: Draft → Review → Approved → Scheduled → Published → Archived, with explicit return-to-draft/revision paths. Draft preview is access-limited later and never accidentally indexed. Review/approval records actor, time, and comments; approval is separate from publish authority where policy requires it. Scheduling includes timezone, scheduled publish/unpublish time, and conflict/validation feedback. Publish and unpublish changes create auditable events. Version history stores immutable snapshots or backend revision references; restore creates a new revision rather than erasing history. Soft delete moves content to trash with restore and retention rules; permanent deletion is restricted. Workflow actions are future service behavior—frontend affordances in the mock phase must be visibly non-persistent and cannot represent secure approvals.

## 17. Future roles and permissions
Roles: Super Admin (all explicitly granted abilities and account recovery authority); Administrator (site operations/settings according to policy); Editor (content review, editing, and approved publication rights); Author (create/edit own drafts and submit review); Marketing (campaign, announcement, newsletter configuration); Enquiry Manager (view/assign/update leads, no site-wide settings by default).

Model granular permissions as named capabilities, e.g. `blog.create`, `blog.edit`, `blog.publish`, `destination.create`, `destination.edit`, `destination.publish`, `settings.update`, `users.manage`, plus media, enquiry, campaign, and SEO actions. Keep role assignments in a separate backend table, never on profiles/users. Use least privilege, explicit ownership/scope rules, and server-side validation on every protected operation; client-side hiding only improves usability. Separate approval and publish rights where required, record sensitive actions in an audit log, and define role changes/revocation behavior. None of these controls are implemented or security-enforced in the initial frontend phase.

## 18. Media architecture
The future media library presents searchable/filterable assets by image, video, document, and PDF, with upload status, preview, dimensions, file type, usage references, and rights metadata. Model a media asset independently from a content record; content and page blocks refer to asset IDs. Images carry title, alt text, caption, credit/copyright, description, dimensions, focal point, and responsive renditions. Videos carry poster, duration, captions/transcript, and source/rights details. Documents/PDFs expose readable titles, file size/type, and accessible download labels.

A shared media picker supports browse, search, type filters, selection, preview, and metadata editing; it should indicate where an asset is already used before deletion. Gallery records are ordered collections of asset references with optional per-use caption/crop overrides, while source asset rights and alt metadata remain centralized. The initial frontend uses approved local/bundled sample media behind the same asset shape. Upload, storage, transformations, deduplication, permissions, and deletion rules wait for the chosen backend/storage service.

## 19. Forms, enquiries, and newsletter
Create separate form configurations over shared accessible field and feedback patterns. Contact form: name, email, phone optional, message, consent. Trip planner: contact, country, date/flexibility, traveller count, destination/interest/package references, budget range, message. Package/experience enquiry preselects the related record and preserves the user's ability to change it. Newsletter asks only for required contact/consent details and communicates consent purpose and unsubscribe expectation.

Validate required fields, email/phone format conservatively, traveller/date ranges and field lengths; server validation will be authoritative later. Show field-level errors, submitting state, success confirmation, retryable failure, and duplicate-submit prevention. Consent copy must be approved and explicit; do not pre-check optional marketing consent. Preserve UTM/source-page capture readiness in the form contract without exposing hidden values as user-editable controls. In this frontend-only phase, submissions demonstrate validation and success/failure presentation only; they are not sent, saved, emailed, or subscribed to a real provider.

## 20. API handoff architecture (Laravel or Node)
Keep frontend contracts transport-neutral and define a domain repository interface before choosing endpoints. The mock and future HTTP adapters satisfy the same operations. An HTTP adapter later owns base URL, headers/session attachment, request serialization, query parameter mapping, response parsing, and error conversion. Domain pages consume normalized records and query states rather than framework-specific JSON or HTTP response objects.

Contract areas: record IDs/slugs; list filters/sort/page-size/cursor; pagination metadata; relationship include/expand behavior; create/update input vs public output; validation problem shape; authentication/session boundary; permission failures; not-found/conflict/rate-limit/server/network errors; media references; workflow timestamps. Confirm Laravel/Node field naming and date/time/currency formats against a published API contract; map them in the adapter instead of renaming UI fields everywhere. Keep loading, empty, stale, and error states consistent for both adapters.

TanStack Query owns request/cache lifecycle, query keys, invalidation, and mutation updates when the API is introduced. Use URL search params for shareable list state. Cache public published content differently from admin drafts; never leak preview/draft data into a public cache key. Authentication later attaches a validated session at the service boundary; server-side authorization remains the authority. Document API versioning and deprecation before multiple clients depend on it. Do not write endpoints, secrets, auth middleware, or backend code now.

## 21. Implementation milestones
Each milestone is one controlled Build prompt after the planning scope is separately approved. “Routes affected” names intended route scope, not files being created now.

| Milestone | Goal; routes/components/data | Dependencies | Must not touch | Acceptance and review checkpoint |
|---|---|---|---|---|
| M1 — Foundation + design system + public shell | Root shell, `/`, shared tokens, public header/footer, typed domain/repository boundary, initial approved visual assets | Existing TanStack/Tailwind patterns; design direction confirmation | Admin backend, auth, every content module at once | Home is no longer a placeholder; tokens and shell render; keyboard nav and small-screen header reviewed; approve visual direction before breadth |
| M2 — Homepage + block architecture | `/`; homepage composition, block registry, fixture records and mock repository | M1 contracts and public shell | CMS drag/drop/editor, API calls, unrelated pages | Sections come from ordered typed local data; hidden/unknown blocks handled; representative blocks responsive; inspect desktop and phone |
| M3 — Destinations | `/destinations`, `/destinations/$slug`; listing/detail/cards/gallery/map fallback | M1 data boundary, M2 reusable section/cards | Booking/map integration, other content families | Filter/list/detail relation flow works from fixtures; unique metadata, not-found, empty/loading/error states; inspect one complete island journey |
| M4 — Experiences | `/experiences`, `/experiences/$slug`; category filters, cards, related destinations/packages | M3 domain display and relationship conventions | Inventory/availability booking | Category and relation data remains structured; detail CTA and responsive states work; review real content density |
| M5 — Packages | `/packages`, `/packages/$slug`; itinerary, price presentation, enquiry context | Shared cards/forms contract, M3/M4 relations | Payments, booking, live prices/availability | Day sequence and inclusions readable; price qualifiers clear; no unsupported availability claims; review mobile itinerary |
| M6 — Blog, guides, news | Editorial listing/detail route families and rich content display | Media/SEO conventions, repository boundary | Full CMS editor, external feed | All requested indexes/details, author/date/relations, metadata and not-found states work; review long-form reading/mobile |
| M7 — Remaining public pages, search, forms | About/contact/search/FAQ/campaign/legal routes; form presentation and feedback | Public shell, domain records, approved legal/contact copy | Sending email/newsletter, legal advice, analytics pixels | Route-specific SEO; accessible search/form states; no invented facts; user-supplied legal/contact content identified |
| M8 — Admin shell + dashboard | `/admin`, settings shell; sidebar/topbar and overview with fixture summaries | M1 tokens and repository mocks | Login, roles enforcement, persisted metrics | Separate admin visual density, responsive nav, representative empty/loading/error states; review all nav destinations before adding breadth |
| M9 — CMS content screens | Destination, experience, package, blog and representative content lists/edit forms | M8 patterns and shared contracts | Real save/publish, auth, all remaining modules in one pass | Reusable list/editor sections, validation presentation, relations, SEO fields; mock edits clearly non-persistent; review one create/edit journey per representative type |
| M10 — Homepage/page-builder UI | `/admin/homepage`, `/admin/pages`, `/admin/pages/$id`; section outline, block picker/config preview mockup | M2 block registry, M8/M9 editor primitives | Persisted ordering, public publishing | Add/edit/hide/duplicate/delete/reorder shown as frontend-only prototype; keyboard move controls and responsive preview; review workflow before any backend |
| M11 — Media, SEO, marketing, enquiries | Media/gallery/video, SEO/redirect, campaign/announcement/popup and enquiry/newsletter views | M8 patterns, M9 contracts, M10 references | Cloud uploads, provider integration, live tracking, real inbox writes | Asset metadata and forms represented; relation to media IDs; list/detail/status patterns; ensure all external connections absent |
| M12 — Roles, permissions, audit, versioning UI | User/role/permission/audit screens and workflow indicators | M8 admin shell; separately approved security policy | Authentication, real access enforcement, role mutation | UI communicates mock-only states; roles conceptually separate; permission matrix and audit history reviewed; no credential/demo-admin shortcut |
| M13 — Responsive, accessibility, performance, SEO verification | Representative public/admin routes across widths; accessibility and metadata sweep | M1–M12 pages that are in scope | Unrequested redesign/content expansion, SEO claims about rankings | Keyboard/screen-reader spot checks, contrast/focus, route metadata, image loading, Core Web Vitals review; prioritized defects resolved |
| M14 — API integration preparation/handoff | Contract documentation, adapter mapping checklist, fixture parity and integration boundary review | M1 contracts and whichever frontend milestones are complete; chosen API contract | Implementing Laravel/Node, secrets, real auth without approval | A backend team can map fields/errors/pagination/media and swap adapter without changing display components; unresolved backend decisions listed clearly |

## 22. Credit-efficient Lovable workflow: PLAN, CHAT, BUILD
**PLAN:** Use for bounded milestones with meaningful architecture or visual decisions. State goal, in/out of scope, affected routes, acceptance tests, and dependencies. Review and revise before Build. Do not ask Plan to silently expand into the entire product.

**CHAT:** Use to clarify one requirement, inspect a design choice, document a backend contract, review a route or explain a trade-off without making code changes. Keep durable architectural decisions in the plan/approved project guidance, not buried in a long chat.

**BUILD:** Use only after the milestone is approved. One prompt should target one milestone or a small, inseparable slice. Name the existing app/framework, routes allowed, data boundary, reusable components, design tokens, required states, responsive checks, and explicit “do not touch” list. Ask for a preview review at the milestone checkpoint. Do not bundle future integrations or all admin modules into a single prompt.

For limited credits: reuse approved patterns and fixtures; defer broad polish until representative route families establish shared components; request one focused revision per review; avoid regenerating completed work; keep an implementation checklist with acceptance criteria; stop between milestones for scope decisions. Build prompts should be small, explicit, bounded, reusable, and non-destructive.

## 23. Explicitly out of scope for now
Initial frontend work does not include a Laravel backend, Node backend, database, real authentication, real authorization enforcement, payment gateway, booking engine, live availability/permits, real newsletter provider, real email service, cloud storage, production deployment, partner portal, mobile application, marketplace, actual analytics/conversion integrations, or real persistence. The frontend only prepares clean contracts and visible mock states for later decisions. No service is connected and no production behavior should be implied.

## 24. Final recommendation
1. **Final architecture:** TanStack Start v1 + React 19 + TypeScript, public/admin route shells, domain-oriented features, typed transport-neutral contracts, repository interfaces, fixture adapter first, future HTTP adapter, SSR-compatible page rendering.
2. **Final folder strategy:** `routes` for URL/page composition; `components` for shared presentation; `features` for domain behavior; `contracts` for framework-independent shapes; `repositories` for data adapters; `data/fixtures` for deterministic local records; `lib`/`hooks` for shared support; existing `src/styles.css` for Tailwind v4 tokens.
3. **Final public map:** `/`; collection/detail routes for destinations, experiences, packages, blog, travel-guides and news; `/about`, `/contact`, `/search`, `/faq`, `/campaigns/$slug`, `/privacy-policy`, `/terms`, `/cookie-policy`.
4. **Final admin map:** `/admin` and all settings, homepage/pages, header/footer/menus, destination/experience/package/blog editing, articles/guides/news/FAQs/testimonials, media/galleries/videos, newsletter/subscribers, enquiries, SEO/redirects, marketing and system/user/role/audit/integration screens listed in Section 4.
5. **Final design direction:** premium Laccadives editorial luxury with ocean, reef, bright neutral and restrained warm accent roles; distinctive display type plus highly legible sans; public image-led spaciousness and a shared but denser admin language.
6. **Final component strategy:** accessible shared primitives, distinct public/admin shells, domain cards/details, finite typed block renderers, and form/editor patterns composed from domain data rather than fixtures.
7. **Final content strategy:** stable IDs, slug URLs, explicit relational references, distinct workflow/SEO/media records, and a finite versioned block registry.
8. **Final data/API strategy:** UI → domain repository → fixture adapter now; preserve the same interface for a future Laravel/Node HTTP adapter with typed mapping, normalized errors, query/cache behavior, and URL-backed filters.
9. **Final milestone sequence:** M1 foundation; M2 home blocks; M3 destinations; M4 experiences; M5 packages; M6 editorial; M7 remaining public routes/forms; M8 admin shell; M9 content screens; M10 page builder UI; M11 media/SEO/marketing/enquiries; M12 role/workflow UI concepts; M13 verification; M14 API handoff.
10. **Exact first Build milestone after a separate go-ahead:** M1 only—confirm the approved visual direction, replace the homepage placeholder with the first public shell, establish semantic design tokens and the typed fixture/repository boundary, add the public header/footer, and verify home metadata and responsive navigation. Do not build the rest of the website, admin CMS, authentication, backend, or integrations in that first milestone.

This document is the planning deliverable. No implementation approval or build has been performed.
