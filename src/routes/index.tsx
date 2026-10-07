import { createFileRoute } from "@tanstack/react-router";
import { siteRepository } from "@/repositories/site";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { HomepageFoundation } from "@/features/homepage/components/HomepageFoundation";

export const Route = createFileRoute("/")({
  loader: () => siteRepository.getPublicFoundation(),
  head: ({ loaderData }) => {
    const seo = loaderData?.homepage.seo ?? siteRepository.getPublicFoundation().homepage.seo;
    return {
      meta: [
        { title: seo.title }, { name: "description", content: seo.description },
        { property: "og:title", content: seo.title }, { property: "og:description", content: seo.description },
        { property: "og:type", content: "website" }, { property: "og:url", content: seo.canonical },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: seo.canonical }],
    };
  },
  component: Index,
});

function Index() {
  const { settings, menu, homepage } = Route.useLoaderData();
  return <><SiteHeader settings={settings} menu={menu} /><main id="main-content" tabIndex={-1}><HomepageFoundation data={homepage} /></main><SiteFooter settings={settings} /></>;
}
