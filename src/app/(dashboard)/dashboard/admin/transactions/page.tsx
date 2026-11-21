import TransactionsTable from "@/components/dashboard/admin/transactions-table";
import { getAdminTransactions } from "@/lib/actions/admin-query";

export default async function TransactionsPage() {
  const transactions = await getAdminTransactions();
    return <TransactionsTable transactions={transactions} />;
}
