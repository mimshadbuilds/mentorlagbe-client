import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import SiteHeader from "@/components/layout/header";
import SiteFooter from "@/components/layout/footer";

const fontmanrope = Manrope({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    variable: "--font-manrope",
});

const fontinter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MentorLagbe | Smart Tuition & Mentorship Platform",
  description: "A trustworthy platform that makes finding quality tutors and managing tuition opportunities easier",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontmanrope.variable} ${fontinter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <Toaster />
        </ThemeProvider>
        </body>
    </html>
  );
}
