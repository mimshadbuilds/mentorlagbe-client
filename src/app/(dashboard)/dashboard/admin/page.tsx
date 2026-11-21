import AdminOverview from "@/components/dashboard/admin/admin-overview";
import { getAdminStats } from "@/lib/actions/admin-query";

export default async function AdminOverviewPage() {
  const stats = await getAdminStats();
    return <AdminOverview stats={stats} />;
}
