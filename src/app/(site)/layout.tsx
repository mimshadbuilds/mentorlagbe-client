import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import SiteHeader from "@/components/layout/header";
import SiteFooter from "@/components/layout/footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <Toaster />
    </>
  );
}
