import type { Metadata } from "next";
import TransactionsTable from "@/components/dashboard/admin/transactions-table";
import { getAdminTransactions } from "@/lib/actions/admin-query";

export const metadata: Metadata = {
  title: "Transactions | MentorLagbe",
  description:
    "Review payment transactions and subscription activity on the MentorLagbe platform.",
};

export default async function TransactionsPage() {
  const transactions = await getAdminTransactions();
    return <TransactionsTable transactions={transactions} />;
}
