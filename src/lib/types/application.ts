export type TApplicationStatus = "pending" | "accepted" | "rejected";

export interface IApplication {
  _id: string;
  tuitionId: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  tutorEmail: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  preferredSchedule: string;
  studentNote: string;
  status: TApplicationStatus;
  appliedAt: string;
}

export interface INewApplication {
  tuitionId: string;
  preferredSchedule: string;
  studentNote: string;
}
