# Experience Laccadives — Frontend Architecture & Delivery Plan

## Goal and boundaries
Create a premium public tourism experience and a CMS-oriented admin frontend whose content is modeled as structured records and reusable page blocks. Keep content editing and API integration behind replaceable interfaces so a later Laravel or Node service can take over without rewriting the presentation layer.

This is a planning blueprint only. No pages, components, backend, authentication, packages, or implementation files will be created until this plan is approved. The current project is a minimal TanStack Start v1 / React 19 / TypeScript scaffold; it is not a Next.js project, and the required framework is fixed. Use TanStack Router/Start equivalents while preserving the requested React, TypeScript, SSR, SEO, and API-ready outcomes. No backend is currently connected.

## 1. Recommended frontend architecture
Use a domain-oriented React application, with separate public-site and admin shells, shared UI primitives, typed content contracts, and an application data-access layer. Organize features by domain (destinations, experiences, packages, editorial, enquiries) rather than building one large page module. Route files own page composition and metadata; domain components render validated data; repositories/adapters provide it. Keep browser-only concerns out of SSR imports.

Conceptual data flow:

```text
Laravel / Node API (future) ─┐
                             ├─ typed API adapter ─ query/cache ─ page composition ─ reusable blocks
local structured fixtures ───┘
```

Keep the CMS/admin and public website in the same frontend initially, with separate layouts, route namespaces, access boundaries, and visual density. The contracts should also be usable by other clients later; do not couple them to React components.

## 2. Recommended project structure
Adapt this structure to the existing TanStack Start conventions (`src/routes`, generated route tree, `src/styles.css`, and existing UI primitives); do not introduce Next.js folders or a second router.

```text
src/
  routes/                 # file-based public, admin, and dynamic routes
    admin/                # dashboard and CMS routes; protected later
  features/
    destinations/         # domain types, queries, cards, detail sections
    experiences/
    packages/
    editorial/            # blogs, articles, guides, news
    enquiries/
    homepage/
    media/
  components/
    site/                 # public header, footer, navigation, shared sections
    admin/                # admin shell, sidebar, tables, editor patterns
    blocks/                # typed page-builder renderers and block registry
    ui/                    # shared accessible primitives and variants
  data/
    fixtures/             # realistic, typed sample content
  lib/
    api/                   # contracts, client, errors, serializers
    content/               # block registry, validation, relationship helpers
    seo/                   # metadata, canonical, JSON-LD helpers
    media/                 # media URL and responsive image helpers
  styles.css              # semantic tokens and global base styles
```

Keep route-specific page assembly small. Use shared types in domain/content modules rather than importing mock fixtures into UI components. Add or split modules only as implementation demonstrates a need.

## 3–4. Route architecture: public and admin
Public routes should be distinct, shareable paths with route-level titles/descriptions/social metadata and canonical handling:

- `/`, `/destinations`, `/destinations/$slug`
- `/experiences`, `/experiences/$slug`
- `/packages`, `/packages/$slug`
- `/blog`, `/blog/$slug`, `/travel-guides`, `/travel-guides/$slug`
- `/news`, `/news/$slug`, `/campaigns/$slug`
- `/about`, `/contact`, `/search`, `/faq`
- `/privacy`, `/terms`, `/cookies`

Use real route files for distinct pages, not hash fragments as page navigation. Reuse listing/detail templates where the content model and interaction are genuinely alike, while retaining unique route metadata and section configuration.

Admin route groups, all under `/admin` and a dedicated shell:

- `/admin` overview
- `/admin/website/homepage`, `/admin/website/pages`, `/admin/website/header`, `/admin/website/footer`, `/admin/website/menus`, `/admin/website/settings`
- `/admin/explore/destinations`, `/admin/explore/experiences`, `/admin/explore/packages`, `/admin/explore/categories`
- `/admin/content/blogs`, `/admin/content/articles`, `/admin/content/guides`, `/admin/content/news`, `/admin/content/faqs`, `/admin/content/testimonials`
- `/admin/media`, `/admin/marketing/...`, `/admin/enquiries/...`, `/admin/seo/...`, `/admin/analytics/...`, `/admin/system/...`

For each managed type, the eventual UI pattern is a list, create/edit form, preview, and status/workflow view. Build representative screens and reusable patterns first; expand the remaining sections by content type after contracts and editor patterns are proven.

## 5. Component architecture
Separate components into: (1) accessible primitives, (2) public/admin layout and navigation, (3) domain display components (destination, experience, package, editorial), (4) section/block renderers, and (5) page compositions. Define props around domain DTOs and explicit display options—not fixture-specific structures. Keep stateful forms/editors separate from display cards and sections. Shared repeated items may be framed; avoid nesting decorative cards or turning whole page bands into cards.

## 6. Design-system architecture
Create semantic color, typography, spacing, radius, elevation, and focus tokens in the existing global stylesheet. Use a cohesive oceanic editorial direction: restrained ocean/deep-ink and reef/nature tones, crisp light surfaces, and a sparing warm accent; confirm final swatches and font pairing before the first visual implementation. Avoid generic travel-template gradients and SaaS styling.

Define reusable tokens and patterns for type scale, constrained content widths, responsive section spacing, buttons, inputs, links, cards, badges, breadcrumbs, navigation, dialogs/drawers, toasts, tables, empty/loading/error states, and image crops. Public pages should be spacious, image-led, and editorial; admin screens should use the same tokens but prioritize scanning, compact controls, status clarity, and efficient editing. Use existing shadcn-style primitives where suitable, extending semantic variants instead of one-off color styling.

## 7. CMS content model architecture
Treat records as structured, versionable resources with stable IDs, slugs, publication state, timestamps, SEO fields, and media references. Use explicit relationship IDs/collections—not free-text names—for destination/experience/package/editorial/FAQ associations. Suggested conceptual resources:

- `SiteSettings`, `NavigationMenu`, `NavigationItem`, `Page`, `PageSection` (typed block), `Redirect`
- `Destination`, `Experience`, `ExperienceCategory`, `Package`, `ItineraryDay`
- `Article`/`BlogPost`, `TravelGuide`, `NewsItem`, `Author`, `Tag`, `ContentCategory`
- `FAQ`, `Testimonial`, `MediaAsset`, `Gallery`
- `Enquiry`, `NewsletterSubscription`, `Announcement`, `Campaign`

Relationships should be IDs: destination↔experience/package; experience↔package; editorial↔destination/experience; FAQ↔destination/experience/package; package↔multiple destinations and experiences. Model many-to-many links explicitly at the contract boundary. Keep workflow fields (draft/review/approved/scheduled/published/archived, scheduled dates, authorship/audit data) distinct from public display fields. Role assignments must be separate from profile/user records in a future backend.

## 8. Page-builder/block architecture
Represent a page as ordered, typed sections with stable IDs, visibility, optional scheduling, and validated block-specific data. Start with a finite registry of known block types (hero, featured destinations/experiences/packages, interest selector, editorial feature, gallery, video, testimonials, statistics, travel info, newsletter, social feed, CTA). Each block gets a schema, editor-facing field definition later, and renderer. Block renderers receive resolved content references plus presentation settings; unresolved references produce a deliberate fallback, not a broken page. Support ordering/visibility in the future CMS contract. Do not create arbitrary executable HTML, arbitrary React component names from CMS, or a universal schema-less page builder.

## 9. Mock-data architecture
Use realistic local fixtures shaped exactly like the future API response contracts. Keep fixtures in a data layer and expose them through repository methods such as list/get; pages and components must never import fixture arrays directly. A mock adapter implements the same typed interface as a future HTTP adapter. Use stable IDs/slugs and relationship IDs; include varied statuses, missing optional fields, and meaningful island-specific examples. If the admin frontend demonstrates edits, clearly treat changes as preview/demo state rather than durable publishing. No browser storage or mock persistence should be mistaken for a backend.

## 10–11. API contracts and state management
Define versionable, transport-neutral TypeScript request/response DTOs and a repository/service interface for each domain. Normalize error, pagination, filtering, sorting, relationship expansion, and media representations. Keep content DTOs separate from view models and CMS edit forms. A future Laravel or Node integration should map backend JSON in adapters/serializers, not leak API naming or endpoint assumptions into cards/blocks. Use `/api/v1` as a future contract convention, but do not build endpoints now.

Use URL search parameters for shareable listing filters, pagination, and search. Use TanStack Query for server/cache-shaped data and invalidation so switching from fixtures to HTTP does not change page components. Keep local component state for transient menus, dialogs, and editor drafts; use validated forms for admin editing. Avoid a global state library until cross-route client-only state proves necessary. Never use local storage as an authority for roles, access, or saved CMS content.

## 12. SEO architecture
Every public route should own unique title, description, Open Graph title/description, type, and self-referencing canonical metadata. Generate metadata from the same content record used for rendering; provide a safe fallback for optional SEO fields. Add appropriate JSON-LD (Organization, TouristDestination/TouristAttraction where accurate, Article/BlogPosting, BreadcrumbList; FAQ only when visible and valid). Use absolute, correctly sized share images only when the matching rendered image has a valid absolute URL; omit rather than use placeholders. Sitemap and robots rules should eventually derive only from publishable indexable records; redirects need explicit status/target records. Verify rendered metadata per route and avoid stale root-level page-specific metadata.

## 13. Media architecture
Model media as reusable asset references with type, source URL, alt text, caption, title, credit/copyright, description, dimensions, and focal point where supported. Pages reference asset IDs; they do not own raw URLs as their only media model. Use responsive image sizes, explicit aspect ratios/crops, lazy loading below the fold, and poster images for video. The first frontend phase can use approved bundled/sample assets behind the media adapter; centralized upload, transformations, storage, and rights workflows require a later backend/CMS decision.

## 14–15. Future authentication and permissions
Authentication is not part of the frontend-only phase. Later, protect all admin routes and data operations with server-validated sessions; a hidden button or client route guard is not authorization. Before implementing authentication, ask whether user profile data is required. If profiles are needed, model them separately from auth identities; store roles in a separate role-assignment table and enforce permission checks server-side. Use granular permission keys (e.g. `blog.publish`, `destination.edit`, `settings.update`) with role-to-permission mapping, least privilege, audit logs, and explicit publish/approve separation. Do not ship fake admin credentials or claim frontend permission checks are secure.

## 16–18. Responsive, accessibility, and performance strategy
Design mobile-first, then verify representative pages at phone, tablet, laptop, and wide desktop widths. Prioritize readable image crops, stable navigation and controls, touch-sized actions, non-overflowing tables/editors, mobile menu/drawer behavior, and responsive forms. Use semantic landmarks/headings, keyboard-operable navigation/dialogs, visible focus, labels and error associations, meaningful alt text, contrast checks, reduced-motion support, and screen-reader status announcements. Target WCAG 2.2 AA as the working standard.

Optimize image formats/size and loading priority, lazy-load noncritical media, avoid shipping heavy video by default, split admin-only code from public routes when justified, minimize client-side work, preserve SSR for indexable pages, and monitor Core Web Vitals. Measure rather than pre-emptively adding caching or animation complexity.

## 19–20. Navigation structure
Public primary navigation: Destinations, Experiences, Packages, Stories (Blog/Guides/News), About, Contact; provide search and a clear enquiry CTA, with contextual dropdowns and a compact mobile drawer. Keep legal links and secondary content in the footer. CMS-configurable menus are the eventual source; use typed defaults in the frontend phase.

Admin sidebar: Overview; Website (Homepage, Pages, Header, Footer, Menus); Explore (Destinations, Experiences, Packages, Categories); Content (Blogs, Articles, Guides, News, FAQs, Testimonials); Media; Marketing; Enquiries; SEO; Analytics; System. Group labels, active-route state, permission-aware visibility later, and an efficient compact/mobile navigation pattern.

## 21–23. Phases, order, and first work
1. **Foundation and visual direction:** confirm design tokens, typography, image treatment, public/admin shells, route and content contracts; establish fixture/repository boundary.
2. **Public core:** implement homepage as block-driven composition, header/footer, destinations and experiences listings/details, packages listing/details, and shared editorial layouts. Validate responsive behavior and metadata as routes are added.
3. **Public breadth:** add remaining editorial, campaign, FAQ, contact/search/legal routes and page states; connect enquiry/newsletter forms only to clearly identified frontend demo behavior until a backend exists.
4. **Admin foundation:** build admin shell, navigation, overview, reusable list/editor/preview patterns, and representative homepage, destination, package, and editorial screens over the mock adapter.
5. **Admin breadth and integration seam:** expand remaining CMS screens and demonstrate typed workflow/permissions states without claiming persistence/security. Document API mapping and replace the adapter only when a backend contract is agreed.

Build first: design tokens and content/repository contracts, then global public shell and homepage block renderer, then one full content family end-to-end (destination list/detail), then repeat patterns for other families, followed by admin patterns. This validates architecture before multiplying routes.

## 24. Explicitly not in the frontend phase
Do not build database, CMS backend, uploads, real user registration/login, authorization enforcement, durable publishing/scheduling, actual email/newsletter delivery, live analytics, redirects/sitemap services, bookings, payment/availability/permits, hotel/activity inventory, partner portal, mobile app, marketplace, multi-language publishing, or integrations. These need product, security, service, and data-contract decisions. Show frontend-only affordances only where needed to validate layouts, clearly marked as non-persistent.

## 25–26. Main risks and mistakes to avoid
Risks: page-builder flexibility becoming unbounded; API and frontend models diverging; large media harming performance; inaccurate destination claims/SEO structured data; CMS editors needing richer validation than display schemas; workflow and authorization being mistaken for secure because UI hides actions; dynamic route coverage/metadata drifting; early build scope becoming too broad. Mitigate with finite block types, schemas, contract fixtures, responsive/performance checks, explicit workflow states, and phased route families.

Avoid hardcoding homepage sections, content values, navigation/settings, URLs, relationship names, or SEO into components; avoid components coupled to mock shapes, schema-less HTML blocks, giant all-in-one editors, duplicate content across routes, local-storage persistence presented as CMS, role checks in the browser, premature booking/backend work, and building every listed admin module before the shared patterns are proven.

## 27–28. Laravel/Node portability and content-to-section mapping
Keep the frontend independent of backend framework: domain DTOs, repository interface, adapter, and error normalization form the boundary. Define endpoint and field mappings only after the chosen service publishes its contract. Avoid server-framework-specific response objects and database assumptions in browser components. For each page, resolve its ordered `PageSection` records into a discriminated block type; validate block data, resolve linked IDs through domain repositories, then render the matching registry entry. Content editors configure data and references; reusable React blocks own presentation. This supports a later API, mobile app, or partner client using the same content concepts without sharing UI code.

## 29. Frontend definition of done
- Public route inventory and representative admin route patterns exist, with no placeholder home page.
- Homepage composition is data-driven from ordered typed blocks; content and shared settings are not buried in display components.
- Every content family uses stable IDs, slug-based URLs, explicit relationships, and fixture-backed repositories.
- Mock-to-HTTP adapter replacement does not require rewriting display components.
- Public routes have unique, verified metadata, correct canonical/social handling, and valid structured data where appropriate.
- Core journeys work across phone/tablet/desktop; menus, filters, forms, drawers, and editor patterns have usable loading/empty/error states.
- Keyboard, screen-reader, contrast, focus, and reduced-motion checks meet the agreed WCAG 2.2 AA target.
- Images/video are rights-cleared, responsive, accessible, and performant; no external placeholder/stock hotlinks are embedded as permanent content.
- No backend, auth, persistence, bookings, or integrations are represented as production-ready when they are not.

## 30. Recommended Lovable milestone strategy
Use one bounded prompt per milestone, approve the milestone scope before building, and review the running preview before advancing. Each prompt should identify only the route family and interaction states in scope, require existing token/component conventions, and forbid unrelated feature expansion. Suggested sequence: (1) foundation/design system and public shell; (2) homepage blocks and fixtures; (3) destinations; (4) experiences and packages; (5) editorial and remaining public routes; (6) admin shell and core editing patterns; (7) remaining admin sections and mock workflows; (8) responsive/accessibility/SEO/performance verification and API handoff. Keep backend, authentication, payment, and booking milestones explicitly separate and unstarted until their requirements are approved.

## Project-specific technical notes
- Continue with TanStack Start v1, TanStack Router file routes, React 19, TypeScript, and the existing Tailwind v4 semantic-token stylesheet; do not introduce Next.js or a competing router.
- Use leaf-route head metadata; the root should contain only sitewide defaults. The current scaffold still has template metadata and a blank index placeholder, which must be replaced in the first approved build milestone.
- Record any new structural decisions in the project `AGENTS.md` during implementation, not during this planning-only review.
