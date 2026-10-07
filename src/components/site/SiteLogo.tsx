import { Link } from "@tanstack/react-router";
import type { WebsiteSettings } from "@/contracts/site";

export function SiteLogo({ settings }: { settings: WebsiteSettings }) {
  return <Link to="/" aria-label={`${settings.name} — Home`} className="site-logo block w-fit shrink-0">
    <span className="block font-display text-[15px] leading-none">Experience</span>
    <span className="mt-1 block text-lg font-medium leading-none tracking-[0.18em]">LACCADIVES</span>
  </Link>;
}