import Image from "next/image";
import { ChevronRight, Globe, Languages, School, Sigma } from "lucide-react";


const categories = [
  {
    icon: Sigma,
    title: "HSC & College",
    batches: 64,
    description:
      "Higher Math, Physics, Chemistry, Biology & ICT for Class 11-12 Board & Admission.",
    students: "5,200+ Active Students",
    avatars: [
      { src: "/subjects/avatar-1.jpg", alt: "Tutor avatar BUET" },
      { src: "/subjects/avatar-2.jpg", alt: "Tutor avatar DU" },
      { src: "/subjects/avatar-3.jpg", alt: "Tutor avatar DMC" },
    ],
  },
  {
    icon: Globe,
    title: "O / A-Levels",
    batches: 48,
    description:
      "Edexcel & CAIE Pure Math P1-P4, Mechanics, Physics, Accounting & Economics.",
    students: "3,100+ Active Students",
    avatars: [
      { src: "/subjects/avatar-4.jpg", alt: "O Level tutor" },
      { src: "/subjects/avatar-5.jpg", alt: "A Level tutor female" },
      { src: "/subjects/avatar-6.jpg", alt: "CAIE mentor" },
    ],
  },
  {
    icon: School,
    title: "SSC & Class 9-10",
    batches: 52,
    description:
      "General Science, Higher Math, General Math, Physics & Board CQ drills.",
    students: "4,120+ Active Students",
    avatars: [
      { src: "/subjects/avatar-7.jpg", alt: "SSC tutor male" },
      { src: "/subjects/avatar-8.jpg", alt: "Class 10 mentor" },
      { src: "/subjects/avatar-9.jpg", alt: "Math teacher" },
    ],
  },
  {
    icon: Languages,
    title: "IELTS & Skills",
    batches: 39,
    description:
      "Academic Writing Task 1-2, Spoken English, Pronunciation & Web Development.",
    students: "3,980+ Active Students",
    avatars: [
      { src: "/subjects/avatar-10.jpg", alt: "IELTS trainer" },
      { src: "/subjects/avatar-11.jpg", alt: "Language coach" },
      { src: "/subjects/avatar-12.jpg", alt: "Skills mentor" },
    ],
  },
];

export default function PopularSubjects() {
  return (
    <section className="w-full bg-surface py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-[11px] leading-[14px] font-semibold tracking-wider text-secondary uppercase">
              Curated Disciplines
            </span>
            <h2 className="font-display mt-1 text-[2rem] leading-10 font-bold tracking-tight text-primary-container">
              Explore Disciplines & Academic Levels
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-6 text-on-surface-variant">
            Browse verified batches tailored to standard school, college, and
            international examination boards.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="group flex flex-col justify-between rounded-xl border border-surface-container/60 bg-surface-container-lowest p-6 shadow-sm transition-all duration-200 hover:shadow-md">
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container text-primary-container transition-colors group-hover:bg-secondary group-hover:text-on-secondary">
                    <Icon className="size-7" />
                  </div>

                  <div className="mb-1 flex items-center justify-between gap-2">
                    <h3 className="font-display text-xl font-bold text-primary-container">
                      {category.title}
                    </h3>
                    <span className="rounded bg-surface-container px-2 py-0.5 text-[11px] leading-[14px] font-semibold text-primary-container">
                      {category.batches} Batches
                    </span>
                  </div>
                  <p className="mb-4 text-[13px] leading-5 text-on-surface-variant">
                    {category.description}
                  </p>
                  <div className="mb-4 text-[11px] leading-[14px] font-semibold text-secondary">
                    {category.students}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-surface-container pt-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    {category.avatars.map((avatar) => (
                      <span
                        key={avatar.src}
                        className="relative inline-block h-7 w-7 overflow-hidden rounded-full bg-surface-container-high ring-2 ring-surface-container-lowest">
                        <Image
                          src={avatar.src}
                          alt={avatar.alt}
                          fill
                          sizes="28px"
                          className="object-cover"
                        />
                      </span>
                    ))}
                  </div>
                  <a href="#"
                    className="flex items-center gap-0.5 text-xs font-semibold text-secondary group-hover:underline">
                    Explore
                    <ChevronRight className="size-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
