import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu as MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import type { Menu, MenuItem, WebsiteSettings } from "@/contracts/site";
import { GlobalCTA } from "./GlobalCTA";

export function NavigationItem({ item, mobile = false }: { item: MenuItem; mobile?: boolean }) {
  const classes = mobile ? "flex min-h-12 items-center justify-between gap-3 py-2 text-lg" : "inline-flex min-h-11 items-center text-[13px] transition-colors";
  if (!item.available || !item.destination) return <span className={`${classes} text-muted-foreground`} aria-disabled="true" title={`${item.label} — coming soon`}>
    {item.label}{mobile && <span className="text-xs font-sans">Coming soon</span>}
  </span>;
  const d = item.destination;
  const linkClass = `${classes} text-foreground hover:text-primary`;
  if (d.kind === "section") return <Link to="/" hash={d.id} className={linkClass}>{item.label}</Link>;
  return <Link to={d.to} activeOptions={{ exact: d.to === "/" }} activeProps={{ className: "text-primary" }} className={linkClass}>{item.label}</Link>;
}

export function DesktopNavigation({ menu }: { menu: Menu }) {
  return <nav aria-label={menu.label} className="hidden min-w-0 xl:block"><ul className="flex items-center gap-5">
    {menu.items.map(item => <li key={item.id}><NavigationItem item={item} /></li>)}
  </ul></nav>;
}

export function MobileNavigation({ menu, settings }: { menu: Menu; settings: WebsiteSettings }) {
  const [open, setOpen] = useState(false);
  return <Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger asChild><Button variant="ghost" size="icon" className="size-12 xl:hidden" aria-label="Open navigation"><MenuIcon /></Button></SheetTrigger>
    <SheetContent className="w-full max-w-sm overflow-y-auto px-8 pb-10 pt-16">
      <SheetTitle className="font-display text-3xl">Experience Laccadives</SheetTitle>
      <SheetDescription className="mt-2">{settings.logoSubtitle}</SheetDescription>
      <nav aria-label="Mobile navigation" className="mt-8"><ul className="divide-y divide-border">
        {menu.items.map(item => <li key={item.id}>{item.available ? <SheetClose asChild><span><NavigationItem item={item} mobile /></span></SheetClose> : <NavigationItem item={item} mobile />}</li>)}
      </ul></nav>
      <GlobalCTA {...settings.primaryCTA} onClick={() => setOpen(false)} className="mt-8 w-full" />
    </SheetContent>
  </Sheet>;
}