"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  FilePen,
  Search,
  ShieldCheck,
} from "lucide-react";
import TuitionsCard from "@/components/layout/TuitionsCard";
import { approvedTuitions } from "@/lib/data/tuitions";
import { cn } from "cn";
import Link from "next/link";

const PAGE_SIZE = 9;

type FilterKey = "search" | "subject" | "classLevel" | "mode" | "location";

const emptyFilters: Record<FilterKey, string> = {
  search: "",
  subject: "",
  classLevel: "",
  mode: "",
  location: "",
};

const subjectOptions = [
  { value: "", label: "All Subjects" },
  { value: "Higher Math", label: "Higher Math" },
  { value: "Physics", label: "Physics" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Biology", label: "Biology" },
  { value: "English", label: "English" },
  { value: "ICT", label: "ICT & Computing" },
];

const classOptions = [
  { value: "", label: "All Curricula / Levels" },
  { value: "Class 9-10 (SSC)", label: "Class 9-10 (SSC)" },
  { value: "HSC 11-12", label: "HSC 11-12" },
  { value: "O-Level", label: "O-Level (CAIE/Edexcel)" },
  { value: "A-Level", label: "A-Level (CAIE/Edexcel)" },
  { value: "Admission Prep", label: "University Admission" },
];

const modeOptions = [
  { value: "", label: "All Modes" },
  { value: "Online", label: "Online Live Batch" },
  { value: "In-Person", label: "In-Person / Offline" },
];

const locationOptions = [
  { value: "", label: "All Locations" },
  { value: "Dhanmondi", label: "Dhanmondi, Dhaka" },
  { value: "Uttara", label: "Uttara, Dhaka" },
  { value: "Mirpur", label: "Mirpur, Dhaka" },
  { value: "Gulshan", label: "Gulshan & Banani" },
  { value: "Mohammadpur", label: "Mohammadpur, Dhaka" },
  { value: "Chittagong", label: "Chittagong Central" },
  { value: "Sylhet", label: "Sylhet Metro" },
];

const sortOptions = [
  { value: "latest", label: "Latest Posted" },
  { value: "fee-asc", label: "Monthly Fee: Low to High" },
  { value: "fee-desc", label: "Monthly Fee: High to Low" },
];

const quickFilters = [
  { label: "Maths (A-Levels)", subject: "Higher Math", classLevel: "A-Level" },
  { label: "HSC Chemistry (Board CQ)", subject: "Chemistry", classLevel: "HSC 11-12" },
  { label: "IELTS & O-Level English", subject: "English", classLevel: "" },
  { label: "SSC Physics Foundation", subject: "Physics", classLevel: "Class 9-10 (SSC)" },
];

interface FilterSelectProps {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function FilterSelect({ id, label, value, options, onChange }: FilterSelectProps) {
  return (
    <div className="relative lg:col-span-2">
      <select
        id={id}
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full cursor-pointer appearance-none rounded-lg bg-surface-container-low px-3.5 text-sm text-on-surface focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 size-[18px] -translate-y-1/2 text-on-surface-variant"
      />
    </div>
  );
}

export default function BrowseTuitions() {
  const [filters, setFilters] = useState(emptyFilters);
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  const updateFilter = (key: FilterKey, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const applyQuickFilter = (subject: string, classLevel: string) => {
    setFilters((prev) => ({ ...prev, subject, classLevel }));
    setPage(1);
  };

  const clearAllFilters = () => {
    setFilters(emptyFilters);
    setSort("latest");
    setPage(1);
  };

  // Client-side search & filter, we will moves this to server-side later
  const filteredTuitions = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    const matches = approvedTuitions.filter((tuition) => {
      if (
        query &&
        !tuition.title.toLowerCase().includes(query) &&
        !tuition.subject.toLowerCase().includes(query)
      ) {
        return false;
      }
      if (
        filters.subject &&
        !tuition.subject.toLowerCase().includes(filters.subject.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.classLevel &&
        !tuition.classLevel.toLowerCase().includes(filters.classLevel.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.mode &&
        !tuition.mode.toLowerCase().includes(filters.mode.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.location &&
        !(tuition.location ?? "").toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    if (sort === "fee-asc") {
      return [...matches].sort((a, b) => a.monthlyFee - b.monthlyFee);
    }
    if (sort === "fee-desc") {
      return [...matches].sort((a, b) => b.monthlyFee - a.monthlyFee);
    }
    return [...matches].sort((a, b) => b.postedAt.localeCompare(a.postedAt));
  }, [filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredTuitions.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageTuitions = filteredTuitions.slice(startIndex, startIndex + PAGE_SIZE);
  const showingFrom = filteredTuitions.length === 0 ? 0 : startIndex + 1;
  const showingTo = startIndex + pageTuitions.length;
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      <section className="w-full bg-surface-container-low py-space-lg shadow-[0_1px_8px_rgba(20,43,70,0.03)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-space-md px-6 lg:px-12">
          <div className="flex flex-col gap-space-sm md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-space-xs text-xs font-semibold tracking-wider text-secondary uppercase">
                <span className="size-2 rounded-full bg-secondary" />
                National Tuition Directory
              </div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-primary-container sm:text-4xl">
                Browse Verified Tuitions
              </h1>
              <p className="mt-1 text-sm text-on-surface-variant">
                Explore authentic 1-on-1 and targeted batch tutoring openings posted
                directly by certified educators across Bangladesh.
              </p>
            </div>
            <div className="flex items-center gap-space-sm">
              <Link href="#"
                className="flex items-center gap-1.5 rounded-lg bg-surface-container-lowest px-4 py-2 text-sm font-semibold text-secondary shadow-sm transition-all hover:bg-secondary hover:text-on-secondary">
                <FilePen className="size-4" aria-hidden="true" />
                Request Custom Tutor
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-space-sm rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
            <div className="grid grid-cols-1 items-center gap-space-sm sm:grid-cols-2 lg:grid-cols-12">
              <div className="relative lg:col-span-4">
                <Search
                  aria-hidden="true"
                  className="absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-on-surface-variant"
                />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => updateFilter("search", e.target.value)}
                  placeholder="Search by topic, keyword (e.g. Calculus, CQ Drill)"
                  aria-label="Search tuitions"
                  className="h-11 w-full rounded-lg bg-surface-container-low pr-4 pl-11 text-sm text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none"
                />
              </div>
              <FilterSelect
                id="subjectFilter"
                label="Filter by subject"
                value={filters.subject}
                options={subjectOptions}
                onChange={(value) => updateFilter("subject", value)}
              />
              <FilterSelect
                id="classFilter"
                label="Filter by class level"
                value={filters.classLevel}
                options={classOptions}
                onChange={(value) => updateFilter("classLevel", value)}
              />
              <FilterSelect
                id="modeFilter"
                label="Filter by delivery mode"
                value={filters.mode}
                options={modeOptions}
                onChange={(value) => updateFilter("mode", value)}
              />
              <FilterSelect
                id="locationFilter"
                label="Filter by location"
                value={filters.location}
                options={locationOptions}
                onChange={(value) => updateFilter("location", value)}
              />
            </div>

            <div className="flex items-center justify-between gap-space-sm pt-1 text-xs">
              <div className="flex items-center gap-space-xs overflow-x-auto py-1 text-on-surface-variant">
                <span className="shrink-0 font-medium text-on-surface">
                  Quick Filters:
                </span>
                {quickFilters.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => applyQuickFilter(chip.subject, chip.classLevel)}
                    className="shrink-0 cursor-pointer rounded-full bg-surface-container-low px-2.5 py-1 transition-colors hover:bg-surface-container hover:text-primary">
                    {chip.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={clearAllFilters}
                className="shrink-0 cursor-pointer text-secondary underline transition-colors hover:text-primary">
                Clear all filters
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-space-lg px-6 py-space-lg lg:px-12">
        <div className="flex flex-col gap-space-sm pb-space-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-primary-container">
              {filteredTuitions.length}
            </span>
            <span className="text-sm text-on-surface-variant">
              Active Tuitions Available Nationwide
            </span>
          </div>
          <div className="flex items-center gap-space-sm">
            <label htmlFor="sortOrder"
              className="text-sm font-medium text-on-surface-variant">
              Sort by:
            </label>
            <div className="relative">
              <select
                id="sortOrder"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-9 cursor-pointer appearance-none rounded-lg bg-surface-container-lowest pr-8 pl-3 text-sm text-on-surface shadow-sm focus:outline-none">
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronsUpDown
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-on-surface-variant"
              />
            </div>
          </div>
        </div>

        {pageTuitions.length > 0 ? (
          <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-3">
            {pageTuitions.map((tuition) => (
              <TuitionsCard
                key={tuition.id}
                tuition={tuition}
                onlineIndicator="dot"
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-surface-container bg-surface-container-lowest py-space-xl text-center shadow-sm">
            <p className="font-display text-lg font-bold text-primary-container">
              No tuitions match your filters
            </p>
            <p className="mt-1 text-sm text-on-surface-variant">
              Try a different keyword, or clear the filters to see all{" "}
              {approvedTuitions.length} listings.
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="mt-4 cursor-pointer rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-on-secondary shadow-sm transition-colors hover:bg-[#156057]">
              Clear all filters
            </button>
          </div>
        )}

        {filteredTuitions.length > 0 && (
          <div className="flex flex-col gap-space-md pt-space-lg pb-space-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-on-surface-variant">
              Showing listings{" "}
              <span className="font-medium text-on-surface">
                {showingFrom} – {showingTo}
              </span>{" "}
              of{" "}
              <span className="font-medium text-on-surface">
                {filteredTuitions.length}
              </span>{" "}
              openings
            </p>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg",
                  currentPage === 1
                    ? "cursor-not-allowed bg-surface-container-low text-on-surface-variant/40"
                    : "cursor-pointer bg-surface-container-lowest text-on-surface shadow-sm transition-colors hover:bg-surface-container"
                )}>
              <ChevronLeft className="size-4" aria-hidden="true" />
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() => setPage(number)}
                  aria-current={number === currentPage ? "page" : undefined}
                  className={cn(
                    "flex size-9 cursor-pointer items-center justify-center rounded-lg text-sm shadow-sm transition-colors",
                    number === currentPage
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
                  )}>
                  {number}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg",
                  currentPage === totalPages
                    ? "cursor-not-allowed bg-surface-container-low text-on-surface-variant/40"
                    : "cursor-pointer bg-surface-container-lowest text-on-surface shadow-sm transition-colors hover:bg-surface-container"
                )}>
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-space-md rounded-xl bg-surface-container p-space-lg shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-space-md">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
              <ShieldCheck className="size-7" aria-hidden="true" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-primary-container">
                Need a customized private tutor at your home?
              </h4>
              <p className="mt-0.5 text-sm text-on-surface-variant">
                Post a free tuition circular in under 2 minutes. Our academic
                coordination team matches top-percentile verified mentors.
              </p>
            </div>
          </div>
          <Link href="#"
            className="whitespace-nowrap rounded-lg bg-primary px-space-lg py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary/80">
            Post Tuition Requirement
          </Link>
        </div>
      </section>
    </>
  );
}
