import Link from "next/link";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/icons/brand-icons";

const exploreLinks = [
  { label: "Browse Tuitions", href: "/tuitions" },
  { label: "Popular Subjects", href: "#" },
  { label: "Top Tutors", href: "#" },
  { label: "Mentorship Batches", href: "#" },
  { label: "Pricing Plans", href: "/pricing" },
];

const tutorLinks = [
  { label: "Become a Tutor", href: "/sign-up" },
  { label: "Post Tuition", href: "#" },
  { label: "Tutor Guidelines", href: "#" },
  { label: "Verification Process", href: "#" },
  { label: "Tutor Pro", href: "#" },
];

const supportLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "#" },
  { label: "Trust & Safety", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Help Center", href: "#" },
];

const socialLinks = [
  { label: "X", href: "#", Icon: XIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "YouTube", href: "#", Icon: YoutubeIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Settings", href: "#" },
];

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-space-sm">
      <span className="mb-space-xs text-base font-semibold text-primary-container">
        {title}
      </span>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-sm text-muted-foreground transition-colors hover:text-secondary"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-border bg-surface-container-lowest">
      <div className="mx-auto max-w-7xl px-4 pt-space-xl pb-space-lg md:px-6 lg:px-8">
        <div className="mb-space-xl grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="flex flex-col pr-space-md lg:col-span-2">
            <div className="mb-space-md flex items-center gap-space-sm">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="size-5" />
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-primary-container">
                MentorLagbe
              </span>
            </div>
            <p className="mb-space-lg text-sm leading-relaxed text-muted-foreground">
              A trustworthy marketplace connecting verified students with expert
              tutors for subject-wise tuition batches and personalized 1-on-1
              mentorship.
            </p>
            <div className="flex items-center gap-space-sm">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg bg-surface-container-low text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <LinkColumn title="Explore" links={exploreLinks} />
          <LinkColumn title="For Tutors" links={tutorLinks} />
          <LinkColumn title="Platform & Support" links={supportLinks} />

          {/* Contact */}
          <div className="flex flex-col gap-space-sm">
            <span className="mb-space-xs text-base font-semibold text-primary-container">
              Contact & Location
            </span>
            <div className="flex items-start gap-space-xs text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-secondary" />
              <span className="text-sm">Dhaka, Bangladesh / Global Online</span>
            </div>
            <div className="flex items-center gap-space-xs text-muted-foreground">
              <Mail className="size-4 shrink-0 text-secondary" />
              <a
                href="mailto:support@mentorlagbe.com"
                className="text-sm transition-colors hover:text-secondary"
              >
                support@mentorlagbe.com
              </a>
            </div>
            <div className="flex items-center gap-space-xs text-muted-foreground">
              <Phone className="size-4 shrink-0 text-secondary" />
              <a
                href="tel:+8801700000000"
                className="text-sm transition-colors hover:text-secondary"
              >
                +880 1700-000000
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-space-md border-t border-border pt-space-lg sm:flex-row">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            © 2026 MentorLagbe Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-space-md">
            {legalLinks.map((link, index) => (
              <span key={link.label} className="flex items-center gap-space-md">
                {index > 0 && (
                  <span aria-hidden className="text-outline-variant">
                    •
                  </span>
                )}
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-secondary"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
