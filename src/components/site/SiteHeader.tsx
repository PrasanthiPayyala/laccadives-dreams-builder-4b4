import { Search } from "lucide-react";
import type { Menu, WebsiteSettings } from "@/contracts/site";
import { Button } from "@/components/ui/button";
import { SiteLogo } from "./SiteLogo";
import { GlobalCTA } from "./GlobalCTA";
import { DesktopNavigation, MobileNavigation } from "./Navigation";

export function SiteHeader({ settings, menu }: { settings: WebsiteSettings; menu: Menu }) {
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <header className="bg-background">
      <div className="site-container grid h-24 grid-cols-[minmax(0,1fr)_auto] items-center gap-6 xl:flex xl:justify-between">
        <SiteLogo settings={settings} />
        <DesktopNavigation menu={menu} />
        <div className="flex shrink-0 items-center gap-3">
          <Button variant="ghost" size="icon" disabled aria-label="Search — coming soon" title="Search — coming soon" className="hidden size-11 sm:inline-flex"><Search /></Button>
          <GlobalCTA {...settings.primaryCTA} className="hidden lg:inline-flex" />
          <MobileNavigation settings={settings} menu={menu} />
        </div>
      </div>
    </header>
  </>;
}