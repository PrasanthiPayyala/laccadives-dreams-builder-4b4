import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { CTA } from "@/contracts/site";
import { cn } from "@/lib/utils";

export function GlobalCTA({ label, destination, variant, className }: CTA & { className?: string }) {
  const content = <>{label}<ArrowUpRight aria-hidden="true" /></>;
  return <Button asChild variant={variant === "primary" ? "default" : variant === "secondary" ? "secondary" : "ghost"} className={cn("min-h-12 rounded-sm px-6 shadow-none", className)}>
    {destination.kind === "route" ? <Link to={destination.to}>{content}</Link> : <Link to="/" hash={destination.id}>{content}</Link>}
  </Button>;
}