import { ArrowUpRight, Instagram, Facebook } from "lucide-react";
import type { WebsiteSettings } from "@/contracts/site";
import { SiteLogo } from "./SiteLogo";
import { NavigationItem } from "./Navigation";

export function SiteFooter({ settings }: { settings: WebsiteSettings }) {
  const { footer } = settings;
  return <footer className="bg-surface text-foreground">
    <div className="site-container py-16 md:py-20">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
        <div><SiteLogo settings={settings} /><p className="mt-6 max-w-60 text-sm leading-7 text-muted-foreground">{footer.description}</p>
          <div className="mt-6 flex gap-4">{footer.socials.map((social, i) => <span key={social.label} aria-label={`${social.label} — coming soon`} title={`${social.label} — coming soon`} className="grid size-11 place-items-center text-muted-foreground" aria-disabled="true">{i === 0 ? <Instagram className="size-5" /> : <Facebook className="size-5" />}</span>)}</div>
        </div>
        {footer.groups.map(group => <nav key={group.id} aria-label={`Footer ${group.label}`}><h2 className="mb-4 text-sm font-medium">{group.label}</h2><ul className="space-y-1">{group.items.map(item => <li key={item.id}><NavigationItem item={item} /></li>)}</ul></nav>)}
        <div><h2 className="font-display text-2xl">{footer.newsletter.heading}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{footer.newsletter.description}</p><p className="mt-5 flex min-h-12 items-center justify-between gap-3 border-b border-border pb-3 text-sm text-muted-foreground">{footer.newsletter.status}<ArrowUpRight className="size-4 shrink-0" aria-hidden="true" /></p>
          <dl className="mt-6 space-y-2 text-xs text-muted-foreground">{footer.contact.map(contact => <div key={contact.label} className="flex flex-wrap gap-2"><dt>{contact.label}:</dt><dd>{contact.value}</dd></div>)}</dl>
        </div>
      </div>
      <div className="mt-12 flex flex-col justify-between gap-4 border-t border-border pt-6 text-xs leading-6 text-muted-foreground md:flex-row">
        <p>© {footer.copyrightYear} {settings.name}.</p><ul className="flex flex-wrap gap-x-6 gap-y-2">{footer.legal.map(link => <li key={link.label}><span aria-disabled="true" title="Coming soon">{link.label}</span></li>)}</ul>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{footer.demoNotice}</p>
    </div>
  </footer>;
}