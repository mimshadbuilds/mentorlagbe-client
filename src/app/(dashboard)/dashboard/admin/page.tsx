import type { Metadata } from "next";
import AdminOverview from "@/components/dashboard/admin/admin-overview";
import { getAdminStats } from "@/lib/actions/admin-query";

export const metadata: Metadata = {
  title: "Admin Overview | MentorLagbe",
  description:
    "Review platform activity, users, tuitions, and transactions in the MentorLagbe admin dashboard.",
};

export default async function AdminOverviewPage() {
  const stats = await getAdminStats();
    return <AdminOverview stats={stats} />;
}
