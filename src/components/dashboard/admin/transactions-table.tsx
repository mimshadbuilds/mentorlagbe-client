"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "cn";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IAdminTransaction } from "@/lib/actions/admin-query";

export default function TransactionsTable({ transactions }: { transactions: IAdminTransaction[] }) {
  const [query, setQuery] = useState("");
  const showStatus = transactions.some((item) => item.status);

  const filtered = useMemo(() =>
      transactions.filter((item) =>
        query.trim() === ""
          ? true
          : `${item.userName} ${item.userEmail} ${item.transactionId}`
              .toLowerCase()
              .includes(query.trim().toLowerCase())
      ),
    [transactions, query]
  );

  return (
    <div className="flex flex-col gap-space-lg">
      <div>
        <h1 className="font-manrope text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          Stripe Subscription Transactions
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          All subscription payment records — subscriber, plan, amount, transaction ID, and date.
        </p>
      </div>

      <div className="flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
        <div className="flex flex-col justify-between gap-space-md p-space-lg md:flex-row md:items-center">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute top-1/2 left-3 size-[18px] -translate-y-1/2 text-outline"
              aria-hidden="true"
            />
            <Input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search subscriber, email, or transaction ID..."
              aria-label="Search transactions"
              className="h-9 rounded-lg border-0 bg-surface-container-low pl-9 text-sm"
            />
          </div>
          <span className="text-xs font-semibold text-outline">
            {transactions.length} TRANSACTIONS
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-surface-container-low hover:bg-surface-container-low">
              <TableHead className="px-space-lg py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Subscriber
              </TableHead>
              <TableHead className="px-space-md py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Role
              </TableHead>
              <TableHead className="px-space-md py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Plan Name
              </TableHead>
              <TableHead className="px-space-md py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Amount
              </TableHead>
              <TableHead className="px-space-md py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Transaction ID
              </TableHead>
              <TableHead className="px-space-md py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                Payment Date
              </TableHead>
              {showStatus && (
                <TableHead className="px-space-lg py-3.5 text-xs font-semibold tracking-wider text-outline uppercase">
                  Status
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={showStatus ? 7 : 6} className="py-10 text-center text-sm text-on-surface-variant">
                  No transactions found{query.trim() ? ` for "${query.trim()}"` : ""}.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item) => (
                <TableRow key={item._id} className="hover:bg-surface-container-low/60">
                  <TableCell className="px-space-lg py-4">
                    <div className="flex min-w-[180px] flex-col">
                      <span className="text-sm font-bold text-primary">{item.userName}</span>
                      <span className="text-xs text-outline">{item.userEmail}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-space-md py-4">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        item.userRole === "admin"
                          ? "bg-primary-container text-primary"
                          : item.userRole === "tutor"
                            ? "bg-secondary-container text-on-secondary-container"
                            : "bg-surface-container text-on-surface-variant"
                      )}>
                      {item.userRole.charAt(0).toUpperCase() + item.userRole.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="px-space-md py-4 text-xs font-medium text-on-surface-variant">
                    {item.planName}
                  </TableCell>
                  <TableCell className="px-space-md py-4 text-sm font-bold text-primary">
                    ${item.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="px-space-md py-4 font-mono text-xs text-on-surface-variant">
                    {item.transactionId}
                  </TableCell>
                  <TableCell className="px-space-md py-4 text-xs text-on-surface-variant">
                    {new Date(item.paidAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  {showStatus && (
                    <TableCell className="px-space-lg py-4 text-xs font-semibold text-on-surface-variant">
                      {item.status}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="p-space-md text-xs text-outline">
          Showing 1 to {filtered.length} of {transactions.length} transactions
        </div>
      </div>
    </div>
  );
}
