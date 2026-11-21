import { tuitionRecords, type TuitionRecord } from "./tuitions";

/**
 * The tutor whose dashboard we are previewing. Everything in the tutor
 * dashboard is client-simulated for now.
 * TODO(backend): read the signed-in tutor + their posts from mentorlagbe-server.
 */
export const DEMO_TUTOR = {
  name: "Kamrul Mahmud",
  email: "kamrul.mahmud@mentorlagbe.com",
  plan: "free" as "free" | "pro",
};

/** docx line 103: free tutors can post up to 2 tuitions, Pro unlimited. */
export const FREE_POST_LIMIT = 2;

/** Tuition posts attributed to the demo tutor (docx line 104). */
const OWNED_TUITION_IDS = ["10"];

export function getOwnedTuitions(): TuitionRecord[] {
  return tuitionRecords.filter((tuition) =>
    OWNED_TUITION_IDS.includes(tuition.id ?? "")
  );
}

export type ApplicantStatus = "pending" | "accepted" | "rejected";

/** docx line 105: student applicants to the tutor's tuition posts. */
export interface TutorApplicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
  classLevel: string;
  tuitionId: string;
  appliedAt: string;
  schedule: string;
  note: string;
  status: ApplicantStatus;
}

export const tutorApplicants: TutorApplicant[] = [
  {
    id: "APP-9201",
    name: "Rahat Chowdhury",
    email: "rahat.c@gmail.com",
    phone: "+880 1712-349811",
    institution: "Notre Dame College",
    classLevel: "Class 12",
    tuitionId: "10",
    appliedAt: "2026-10-24",
    schedule: "Sat, Mon, Wed · 5:30–7:00 PM",
    note: "Need thorough focus on Calculus (Integration & Differential Equations) and Conics. Aiming for BUET Engineering admission.",
    status: "pending",
  },
  {
    id: "APP-9202",
    name: "Samia Rahman",
    email: "samia.rahman@gmail.com",
    phone: "+880 1814-225930",
    institution: "Holy Cross College",
    classLevel: "Class 11",
    tuitionId: "10",
    appliedAt: "2026-10-22",
    schedule: "Weekend mornings · 9:00–11:00 AM",
    note: "Looking for board-pattern CQ practice and weekly model tests before the exam.",
    status: "pending",
  },
  {
    id: "APP-9203",
    name: "Tanvir Hasan",
    email: "tanvir.h@gmail.com",
    phone: "+880 1632-884120",
    institution: "Dhaka College",
    classLevel: "Class 12",
    tuitionId: "10",
    appliedAt: "2026-10-19",
    schedule: "Sun, Tue, Thu · 6:00–7:30 PM",
    note: "Needs extra drills on matrices and vector algebra for the higher math paper.",
    status: "accepted",
  },
  {
    id: "APP-9204",
    name: "Nadia Islam",
    email: "nadia.i@gmail.com",
    phone: "+880 1775-601244",
    institution: "Bangladesh Krira Shikkha Protishtan",
    classLevel: "Class 12",
    tuitionId: "10",
    appliedAt: "2026-10-17",
    schedule: "Flexible / Discuss with Tutor",
    note: "Starting higher math from chapter one — requesting a slower pace with homework review.",
    status: "pending",
  },
  {
    id: "APP-9205",
    name: "Farhan Ahmed",
    email: "farhan.a@gmail.com",
    phone: "+880 1911-338702",
    institution: "Ideal College",
    classLevel: "Class 11",
    tuitionId: "10",
    appliedAt: "2026-10-14",
    schedule: "Weekday evenings",
    note: "Interested in a small batch of three students in the Dhanmondi area.",
    status: "rejected",
  },
];

export function getApplicantStats(applicants: TutorApplicant[]) {
  const count = (status: ApplicantStatus) =>
    applicants.filter((applicant) => applicant.status === status).length;

  return {
    total: applicants.length,
    pending: count("pending"),
    accepted: count("accepted"),
    rejected: count("rejected"),
  };
}
