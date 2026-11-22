import { tuitionRecords, type TuitionRecord } from "./tuitions";

export type ApplicationStatus = "pending" | "accepted" | "rejected";

/** A student application joined with the tuition record it points to. */
export interface ApplicationRow {
  id: string;
  tuitionId: string;
  status: ApplicationStatus;
  /** ISO date (yyyy-mm-dd). */
  appliedAt: string;
  tuition: TuitionRecord;
}

interface ApplicationSeed {
  id: string;
  tuitionId: string;
  appliedAt: string;
  status: ApplicationStatus;
}

/**
 * Seed applications (docx lines 100/117: realistic connected data) — each row
 * points at a seeded tuition, so title/tutor/fee always stay in sync.
 *
 * TODO(backend): swap for GET mentorlagbe-server /applications once that
 * endpoint exists — rows will be filtered by the signed-in student's email
 * and mutations (cancel) will POST/PATCH to the server.
 */
const applicationSeeds: ApplicationSeed[] = [
  { id: "APP-9201", tuitionId: "10", appliedAt: "2026-10-24", status: "pending" },
  { id: "APP-8942", tuitionId: "1", appliedAt: "2026-10-20", status: "accepted" },
  { id: "APP-8706", tuitionId: "9", appliedAt: "2026-10-16", status: "pending" },
  { id: "APP-8510", tuitionId: "3", appliedAt: "2026-10-12", status: "rejected" },
  { id: "APP-8355", tuitionId: "5", appliedAt: "2026-10-08", status: "accepted" },
  { id: "APP-8102", tuitionId: "4", appliedAt: "2026-10-02", status: "rejected" },
];

/** Newest first. */
export function getApplications(): ApplicationRow[] {
  return applicationSeeds
    .map((seed) => {
      const tuition = tuitionRecords.find(
        (record) => record.id === seed.tuitionId
      );
      return tuition ? { ...seed, tuition } : null;
    })
    .filter((row): row is ApplicationRow => row !== null)
    .sort((a, b) => b.appliedAt.localeCompare(a.appliedAt));
}

/** docx line 99: reusable stats for the overview cards. */
export function getApplicationStats(applications: ApplicationRow[]) {
  const count = (status: ApplicationStatus) =>
    applications.filter((application) => application.status === status).length;

  return {
    total: applications.length,
    pending: count("pending"),
    accepted: count("accepted"),
    rejected: count("rejected"),
  };
}

/** "2026-10-24" → "Oct 24, 2026" */
export function formatAppliedDate(iso: string): string {
  const date = new Date(iso.includes("T") ? iso : `${iso}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
