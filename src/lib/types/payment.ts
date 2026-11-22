export type TProPlan = "tutor_pro" | "student_pro";
export type TUserPlan = "free" | "pro";
export type TUserRole = "student" | "tutor" | "admin";

export interface ICheckoutSessionResponse {
  success?: boolean;
  message?: string;
  url?: string;
  checkoutUrl?: string;
  sessionId?: string;
}

export interface IPaymentStatus {
  paymentStatus?: string;
  status?: string;
  planName?: string;
  amount?: number;
  currency?: string;
  transactionId?: string;
  paidAt?: string;
  plan?: string;
  message?: string;
}

export interface ICurrentProfile {
  _id?: string;
  name: string;
  email: string;
  role: TUserRole;
  plan: TUserPlan;
  image?: string | null;
  phone?: string;
  bio?: string;
}
