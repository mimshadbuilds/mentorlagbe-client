import Image from "next/image";
import {
  ChevronRight,
  Code2,
  Languages,
  Sigma,
  Waves,
} from "lucide-react";


const categories = [
  {
    icon: Sigma,
    title: "Mathematics",
    description:
      "Calculus, Linear Algebra, Pure Math P1-P4, Mechanics & O/A Levels.",
    students: "3,450+ Students Enrolled",
    avatars: [
      { src: "/subjects/avatar-1.jpg", alt: "Tutor avatar BUET" },
      { src: "/subjects/avatar-2.jpg", alt: "Tutor avatar DU" },
      { src: "/subjects/avatar-3.jpg", alt: "Tutor avatar DMC" },
    ],
  },
  {
    icon: Waves,
    title: "Physics",
    description:
      "Newtonian Mechanics, Wave Optics, Modern Physics & Engineering Admission.",
    students: "2,890+ Students Enrolled",
    avatars: [
      { src: "/subjects/avatar-4.jpg", alt: "O Level tutor" },
      { src: "/subjects/avatar-5.jpg", alt: "A Level tutor female" },
      { src: "/subjects/avatar-6.jpg", alt: "CAIE mentor" },
    ],
  },
  {
    icon: Code2,
    title: "Programming",
    description:
      "Python, JavaScript, Data Structures & Algorithms, React, and Backend API Dev.",
    students: "4,120+ Students Enrolled",
    avatars: [
      { src: "/subjects/avatar-7.jpg", alt: "SSC tutor male" },
      { src: "/subjects/avatar-8.jpg", alt: "Class 10 mentor" },
      { src: "/subjects/avatar-9.jpg", alt: "Math teacher" },
    ],
  },
  {
    icon: Languages,
    title: "IELTS & English",
    description:
      "Academic Writing Task 1 & 2, Spoken English, Pronunciation & Reading Speed.",
    students: "3,980+ Students Enrolled",
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
            <h2 className="font-display mt-1 text-2xl leading-8 font-bold tracking-tight text-primary-container sm:text-[2rem] sm:leading-10">
              Explore Popular Subjects
            </h2>
          </div>
          <p className="max-w-md text-xs leading-4 text-on-surface-variant sm:text-[15px] sm:leading-6">
            Our highest-demand academic tracks taught by subject Olympiad
            winners and industry practitioners.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="group flex flex-col justify-between rounded-xl border border-surface-container/60 bg-surface-container-lowest p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:p-6">
                <div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 transition-colors group-hover:bg-secondary">
                    <Icon className="size-5 text-primary-container dark:text-on-primary-container group-hover:text-on-secondary" />
                  </div>

                  <div className="mb-1">
                    <h3 className="font-display text-base font-bold text-primary-container sm:text-lg">
                      {category.title}
                    </h3>
                  </div>
                  <p className="mb-3 text-[11px] leading-4 text-on-surface-variant sm:text-xs sm:leading-5">
                    {category.description}
                  </p>
                  <div className="mb-4 text-[10px] leading-[14px] font-semibold text-secondary sm:text-[11px]">
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
