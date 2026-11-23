import type { Metadata } from "next";
import UsersTable from "@/components/dashboard/admin/users-table";
import { getAdminUsers } from "@/lib/actions/admin-query";

export const metadata: Metadata = {
  title: "User Management | MentorLagbe",
  description:
    "Manage MentorLagbe users and their platform roles from the admin dashboard.",
};

export default async function UserManagementPage() {
  const users = await getAdminUsers();
    return <UsersTable users={users} />;
}
