import ModerationList from "@/components/dashboard/admin/moderation-list";
import { getAdminTuitions } from "@/lib/actions/admin-query";

export default async function AdminTuitionsPage() {
  const tuitions = await getAdminTuitions();
  return <ModerationList tuitions={tuitions} />;
}
