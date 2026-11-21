import type { ReactNode } from "react";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import SiteHeader from "@/components/layout/header";
import SiteFooter from "@/components/layout/footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* SiteHeader reads usePathname() — for dynamic routes (e.g.
          /tuitions/[id]) that URL data is runtime-only, so the header sits
          behind a boundary and streams in. Static routes resolve it at build
          and ship it in the shell. Fallback mirrors the real bar (h-16) to
          avoid layout shift. */}
      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="sticky top-0 z-50 h-16 w-full border-b border-border bg-background/95 backdrop-blur"
          />
        }>
        <SiteHeader />
      </Suspense>
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <Toaster />
    </>
  );
}
