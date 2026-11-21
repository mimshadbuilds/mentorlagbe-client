import UsersTable from "@/components/dashboard/admin/users-table";
import { getAdminUsers } from "@/lib/actions/admin-query";

export default async function UserManagementPage() {
  const users = await getAdminUsers();
    return <UsersTable users={users} />;
}
