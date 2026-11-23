import type { Metadata } from "next";
import { headers } from "next/headers";
import UpdateProfileForm from "@/components/dashboard/profile/profile-form";
import type { UserRole } from "@/components/layout/AuthUser";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Update Profile | MentorLagbe",
  description:
    "Update your MentorLagbe profile information, including your contact details and bio.",
};

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  return (
    <UpdateProfileForm
      user={{
        name: user?.name ?? "",
        email: user?.email ?? "",
        image: user?.image ?? null,
        role: (user?.role as UserRole) ?? "student",
        phone: user?.phone ?? "",
        bio: user?.bio ?? "",
      }}
    />
  );
}
