import type { ITuition } from "@/components/layout/TuitionsCard";

export type TuitionApprovalStatus = "approved" | "pending" | "rejected";

/** Tutor profile summary shown on the Tuition Details page (docx line 92). */
export interface TutorProfile {
  /** e.g. "Associate Professor of Chemistry" */
  title: string;
  /** e.g. "University of Dhaka" */
  institution: string;
  bio: string;
  rating: number;
  reviewCount: number;
  /** e.g. "10+ Yrs" */
  experience: string;
  /** e.g. "200+" */
  mentored: string;
}

/**
 * A seeded tuition listing — the shape mentorlagbe-server will eventually
 * return from its tuitions endpoint.
 */
export interface TuitionRecord extends ITuition {
  approvalStatus: TuitionApprovalStatus;
  isActive: boolean;
  /** ISO date (yyyy-mm-dd) — drives the "Latest Posted" sort. */
  postedAt: string;
  /** About This Tuition body. */
  description: string;
  /** Schedule, e.g. "4 days / week". */
  daysPerWeek: string;
  tutorEmail: string;
  tutorProfile: TutorProfile;
}

/**
 * Seed dataset for Browse Tuitions (docx: "seed at least 10–12 approved
 * tuitions"). Entries 1–9 mirror the stitch design's cards verbatim; 10–12
 * are grounded extras. When mentorlagbe-server ships search & filtering,
 * this module is the only layer that gets swapped for API calls.
 */
export const tuitionRecords: TuitionRecord[] = [
  {
    id: "1",
    title: "Organic & Physical Chemistry Comprehensive Board Syllabus",
    subject: "Chemistry",
    classLevel: "HSC 11-12",
    mode: "online",
    monthlyFee: 4200,
    tutorName: "Dr. Farzana Kabir",
    tutorAffiliation: "DU Chemistry",
    verifiedSeal: "NID Verified",
    modeDetail: "Interactive Sessions",
    image: "/tuitions/tuition-7.jpg",
    approvalStatus: "approved",
    isActive: true,
    postedAt: "2026-11-18",
    description:
      "Complete board-syllabus coverage of Organic and Physical Chemistry with chapter-wise theory, mechanism drills, and weekly model tests aligned with the HSC board pattern.",
    daysPerWeek: "4 days / week",
    tutorEmail: "farzana.kabir@mentorlagbe.com",
    tutorProfile: {
      title: "Associate Professor of Chemistry",
      institution: "University of Dhaka",
      bio: "Specializes in organic reaction mechanisms and physical chemistry numericals. Known for board-pattern model tests and step-by-step problem clinics.",
      rating: 4.9,
      reviewCount: 38,
      experience: "10+ Yrs",
      mentored: "200+",
    },
  },
  {
    id: "2",
    title: "Pure Mathematics P1-P3 & Mechanics Problem Solving Studio",
    subject: "Higher Math",
    classLevel: "A-Level",
    mode: "in-person",
    location: "Dhanmondi, Dhaka",
    monthlyFee: 6500,
    tutorName: "Nusrat Jahan",
    tutorAffiliation: "BUET EEE",
    verifiedSeal: "BUET Alum",
    image: "/tuitions/tuition-8.jpg",
    approvalStatus: "approved",
    isActive: true,
    postedAt: "2026-11-17",
    description:
      "Pure Mathematics P1–P3 and Mechanics problem-solving studio with past-paper walkthroughs, timed practice sets, and concept clinics before every exam window.",
    daysPerWeek: "3 days / week",
    tutorEmail: "nusrat.jahan@mentorlagbe.com",
    tutorProfile: {
      title: "Lecturer in Electrical & Electronic Engineering",
      institution: "BUET",
      bio: "A-Level mathematics specialist with an engineering background, focused on past-paper technique and timed problem-solving drills.",
      rating: 4.8,
      reviewCount: 27,
      experience: "5+ Yrs",
      mentored: "120+",
    },
  },
  {
    id: "3",
    title: "SSC Physics & Chemistry Board CQ Mastery Group",
    subject: "Physics",
    classLevel: "Class 9-10 (SSC)",
    mode: "in-person",
    location: "Uttara (Sector 4), Dhaka",
    monthlyFee: 4000,
    tutorName: "Mahmudul Hasan",
    tutorAffiliation: "Dhaka Medical",
    verifiedSeal: "DMC Verified",
    image: "/tuitions/tuition-9.jpg",
    approvalStatus: "approved",
    isActive: true,
    postedAt: "2026-11-16",
    description:
      "Board-focused CQ and MCQ mastery for SSC Physics and Chemistry — weekly CQ drills, practical viva preparation, and NCTB pattern model tests.",
    daysPerWeek: "3 days / week",
    tutorEmail: "mahmudul.hasan@mentorlagbe.com",
    tutorProfile: {
      title: "MBBS, Medical Officer",
      institution: "Dhaka Medical College",
      bio: "Combines strong science fundamentals with exam-room strategy, helping students convert theory into full-mark CQ answers.",
      rating: 4.9,
      reviewCount: 31,
      experience: "4+ Yrs",
      mentored: "90+",
    },
  },
  {
    id: "4",
    title: "Academic English Writing & Reading Comprehension",
    subject: "English",
    classLevel: "O-Level",
    mode: "online",
    monthlyFee: 5500,
    tutorName: "Sarah Rahman",
    tutorAffiliation: "IBA, Dhaka University",
    verifiedSeal: "IELTS 8.5",
    modeDetail: "O-Level / Edexcel English Language B",
    image: "/tuitions/tuition-10.jpg",
    approvalStatus: "approved",
    isActive: true,
    postedAt: "2026-11-15",
    description:
      "Academic writing, reading comprehension, and grammar for O-Level / Edexcel English Language B with weekly timed writing practice and detailed feedback.",
    daysPerWeek: "4 days / week",
    tutorEmail: "sarah.rahman@mentorlagbe.com",
    tutorProfile: {
      title: "IELTS Trainer & English Language Instructor",
      institution: "IBA, Dhaka University",
      bio: "IELTS 8.5 scorer who teaches writing as a structured skill — planning, paragraphing, and feedback loops that lift grades fast.",
      rating: 5.0,
      reviewCount: 45,
      experience: "8+ Yrs",
      mentored: "300+",
    },
  },
  {
    id: "5",
    title: "C Programming & HSC ICT Algorithmic Fundamentals",
    subject: "ICT",
    classLevel: "HSC 11-12",
    mode: "online",
    monthlyFee: 3500,
    tutorName: "Arif Hossain",
    tutorAffiliation: "KUET Computer Science",
    verifiedSeal: "KUET CSE",
    modeDetail: "ICT Chapter 4 & 5 C Code Special",
    image: "/tuitions/tuition-11.jpg",
    approvalStatus: "approved",
    isActive: true,
    postedAt: "2026-11-14",
    description:
      "C programming fundamentals, algorithmic thinking, and HSC ICT Chapter 4 & 5 C code special — code-along sessions with chapter-wise problem sets.",
    daysPerWeek: "3 days / week",
    tutorEmail: "arif.hossain@mentorlagbe.com",
    tutorProfile: {
      title: "Software Engineer & ICT Tutor",
      institution: "KUET",
      bio: "Working software engineer who teaches ICT the way it is used in practice — code-along sessions instead of rote memorization.",
      rating: 4.7,
      reviewCount: 19,
      experience: "3+ Yrs",
      mentored: "70+",
    },
  },
  {
    id: "6",
    title: "HSC Physics 1st & 2nd Paper Concept & Mathematical Drill",
    subject: "Physics",
    classLevel: "HSC 11-12",
    mode: "in-person",
    location: "Mirpur (DOHS / Sec 10), Dhaka",
    monthlyFee: 4500,
    tutorName: "Engr. Tanvir Ahmed",
    tutorAffiliation: "BUET Mechanical",
    verifiedSeal: "BUET Alum",
    image: "/tuitions/tuition-12.jpg",
    approvalStatus: "approved",
    isActive: true,
    postedAt: "2026-11-13",
    description:
      "Concept-first HSC Physics for both papers with mathematical drill sessions, numerical problem marathons, and board-pattern model tests.",
    daysPerWeek: "4 days / week",
    tutorEmail: "tanvir.ahmed@mentorlagbe.com",
    tutorProfile: {
      title: "Mechanical Engineer & HSC Physics Mentor",
      institution: "BUET",
      bio: "Engineering graduate who makes physics formulas intuitive through real-world examples and relentless numerical practice.",
      rating: 4.9,
      reviewCount: 34,
      experience: "7+ Yrs",
      mentored: "150+",
    },
  },
  {
    id: "7",
    title: "Medical Admission Biology & Botany Rapid Recall Batch",
    subject: "Biology",
    classLevel: "Admission Prep",
    mode: "in-person",
    location: "Mohammadpur, Dhaka",
    monthlyFee: 7000,
    tutorName: "Dr. Samin Yasar",
    tutorAffiliation: "Dhaka Medical College",
    verifiedSeal: "DMC 5th Year",
    image: "/tuitions/tuition-13.jpg",
    approvalStatus: "approved",
    isActive: true,
    postedAt: "2026-11-12",
    description:
      "Rapid recall coverage of Biology and Botany for medical admission with chapter-wise MCQ drills, previous-year analysis, and weekly timed mock tests.",
    daysPerWeek: "5 days / week",
    tutorEmail: "samin.yasar@mentorlagbe.com",
    tutorProfile: {
      title: "Medical Admission Coach",
      institution: "Dhaka Medical College",
      bio: "Fifth-year medical student who cracked the entrance on first attempt — now drills the exact recall techniques that win MBBS seats.",
      rating: 5.0,
      reviewCount: 52,
      experience: "6+ Yrs",
      mentored: "400+",
    },
  },
  {
    id: "8",
    title: "SSC General & Higher Mathematics Complete Board Syllabus",
    subject: "Higher Math",
    classLevel: "Class 9-10 (SSC)",
    mode: "online",
    monthlyFee: 3800,
    tutorName: "Md. Sakibul Islam",
    tutorAffiliation: "RUET Civil",
    verifiedSeal: "RUET Verified",
    modeDetail: "Weekly 3 Live Tests + Notes",
    image: "/tuitions/tuition-14.jpg",
    approvalStatus: "approved",
    isActive: true,
    postedAt: "2026-11-11",
    description:
      "Complete SSC General and Higher Mathematics syllabus with exercise walkthroughs, weekly live tests, and printed notes after every chapter.",
    daysPerWeek: "3 days / week",
    tutorEmail: "sakibul.islam@mentorlagbe.com",
    tutorProfile: {
      title: "Civil Engineer & Mathematics Tutor",
      institution: "RUET",
      bio: "Believes math is practice, not talent — weekly live tests and chapter notes keep every student on schedule for the board exam.",
      rating: 4.8,
      reviewCount: 22,
      experience: "4+ Yrs",
      mentored: "110+",
    },
  },
  {
    id: "9",
    title: "BUET & Engineering Admission Math Mastery Circle",
    subject: "Higher Math",
    classLevel: "Admission Prep",
    mode: "in-person",
    location: "Nasirabad, Chittagong",
    monthlyFee: 8000,
    tutorName: "Ashraf Uddin",
    tutorAffiliation: "Ex-CUET",
    verifiedSeal: "CUET Faculty",
    image: "/tuitions/tuition-15.jpg",
    approvalStatus: "approved",
    isActive: true,
    postedAt: "2026-11-10",
    description:
      "Engineering admission math mastery circle covering BUET and CUET question patterns with past-paper solving, speed drills, and rank-focused mock exams.",
    daysPerWeek: "4 days / week",
    tutorEmail: "ashraf.uddin@mentorlagbe.com",
    tutorProfile: {
      title: "Former CUET Faculty, Admission Math Mentor",
      institution: "CUET",
      bio: "Fifteen years inside admission coaching — knows exactly which question patterns repeat and how to train speed without losing accuracy.",
      rating: 4.9,
      reviewCount: 61,
      experience: "15+ Yrs",
      mentored: "1,000+",
    },
  },
  {
    id: "10",
    title: "HSC Higher Mathematics P1 & P2 Comprehensive Board Batch",
    subject: "Higher Math",
    classLevel: "HSC 11-12",
    mode: "in-person",
    location: "Dhanmondi, Dhaka",
    monthlyFee: 5000,
    tutorName: "Kamrul Mahmud",
    tutorAffiliation: "DU Mathematics",
    verifiedSeal: "NID Verified",
    image: "/tuitions/tuition-16.jpg",
    approvalStatus: "approved",
    isActive: true,
    postedAt: "2026-11-06",
    description:
      "HSC Higher Mathematics P1 & P2 board batch with exercise-by-exercise classroom teaching, weekly CQ practice, and full-length board model tests.",
    daysPerWeek: "3 days / week",
    tutorEmail: "kamrul.mahmud@mentorlagbe.com",
    tutorProfile: {
      title: "Assistant Professor of Mathematics",
      institution: "University of Dhaka",
      bio: "Teaches the NCTB syllabus exercise by exercise so no chapter is left behind, with model tests mirroring the real board paper.",
      rating: 4.8,
      reviewCount: 26,
      experience: "9+ Yrs",
      mentored: "180+",
    },
  },
  {
    id: "11",
    title: "SSC General Science & Mathematics Foundation",
    subject: "Biology",
    classLevel: "Class 9-10 (SSC)",
    mode: "online",
    monthlyFee: 3200,
    tutorName: "Nabila Haque",
    tutorAffiliation: "DU Zoology",
    verifiedSeal: "DU Verified",
    modeDetail: "2 Live Classes Weekly + Notes",
    image: "/tuitions/tuition-17.jpg",
    approvalStatus: "approved",
    isActive: true,
    postedAt: "2026-11-02",
    description:
      "NCTB English Version science and mathematics foundation for Class 9–10 with two live classes weekly, chapter notes, and weekly assessments.",
    daysPerWeek: "2 days / week",
    tutorEmail: "nabila.haque@mentorlagbe.com",
    tutorProfile: {
      title: "Zoology Lecturer & Science Mentor",
      institution: "University of Dhaka",
      bio: "Makes Class 9–10 science lively with visual explanations and steady weekly assessments that build exam confidence early.",
      rating: 4.9,
      reviewCount: 24,
      experience: "5+ Yrs",
      mentored: "130+",
    },
  },
  {
    id: "12",
    title: "A-Level Physics & Chemistry Intensive Revision Batch",
    subject: "Physics",
    classLevel: "A-Level",
    mode: "in-person",
    location: "Gulshan & Banani, Dhaka",
    monthlyFee: 6800,
    tutorName: "Imran Kabir",
    tutorAffiliation: "BUET Electrical",
    verifiedSeal: "BUET Alum",
    image: "/tuitions/tuition-18.jpg",
    approvalStatus: "approved",
    isActive: true,
    postedAt: "2026-10-28",
    description:
      "Intensive A-Level Physics and Chemistry revision with syllabus triage, past-paper sittings, and exam-technique workshops before the session.",
    daysPerWeek: "3 days / week",
    tutorEmail: "imran.kabir@mentorlagbe.com",
    tutorProfile: {
      title: "Electrical Engineer & A-Level Science Tutor",
      institution: "BUET",
      bio: "Runs revision like a pre-exam boot camp — syllabus triage first, then past papers under real exam conditions with technique debriefs.",
      rating: 4.8,
      reviewCount: 29,
      experience: "6+ Yrs",
      mentored: "140+",
    },
  },
];

/** Docx rule: only admin-approved & active listings appear on Browse. */
export const approvedTuitions: TuitionRecord[] = tuitionRecords.filter(
  (tuition) => tuition.approvalStatus === "approved" && tuition.isActive,
);
