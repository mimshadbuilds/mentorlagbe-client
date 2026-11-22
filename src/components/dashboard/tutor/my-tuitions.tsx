"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Eye,
  Info,
  MapPin,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { tutorApplicants } from "@/lib/data/tutor";
import {
  deleteTuition,
  setTuitionActive,
  updateTuition,
} from "@/lib/actions/tution";
import type { ITuition } from "@/lib/actions/tuition-query";

type StatusFilter = "all" | "approved" | "pending" | "closed" | "rejected";

const filters: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "approved", label: "Approved" },
  { key: "pending", label: "Pending" },
  { key: "closed", label: "Closed" },
  { key: "rejected", label: "Rejected" },
];

export default function MyTuitions({ tuitions }: { tuitions: ITuition[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    monthlyFee: "",
    daysPerWeek: "",
    description: "",
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const counts = {
    approved: tuitions.filter((t) => t.approvalStatus === "approved").length,
    pending: tuitions.filter((t) => t.approvalStatus === "pending").length,
    closed: tuitions.filter((t) => !t.isActive).length,
  };

  const visible = useMemo(
    () =>
      tuitions.filter((tuition) => {
        const statusMatch =
          filter === "all" ||
          (filter === "closed"
            ? !tuition.isActive
            : tuition.approvalStatus === filter && tuition.isActive);
        const searchMatch =
          query.trim() === "" ||
          `${tuition.title} ${tuition.subject}`
            .toLowerCase()
            .includes(query.trim().toLowerCase());
        return statusMatch && searchMatch;
      }),
    [tuitions, filter, query]
  );

  const showError = (error: unknown, fallback: string) =>
    toast.error(error instanceof Error ? error.message : fallback);

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      await setTuitionActive(id, isActive);
      toast.success(isActive ? "Tuition activated" : "Tuition closed");
      router.refresh();
    } catch (error) {
      showError(error, "Failed to update tuition status.");
    }
  };

  const openEdit = (tuition: ITuition) => {
    setEditingId(tuition._id);
    setEditForm({
      title: tuition.title,
      monthlyFee: String(tuition.monthlyFee),
      daysPerWeek: String(tuition.daysPerWeek),
      description: tuition.description,
    });
  };

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const editingTuition = tuitions.find((t) => t._id === editingId);
    if (!editingTuition) return;

    const changes = {
      title: editForm.title.trim(),
      monthlyFee: Number(editForm.monthlyFee),
      daysPerWeek: Number(editForm.daysPerWeek),
      description: editForm.description.trim(),
    };

    try {
      await updateTuition(editingTuition._id, {
        title: changes.title,
        subject: editingTuition.subject,
        classLevel: editingTuition.classLevel,
        mode: editingTuition.mode,
        location: editingTuition.location,
        monthlyFee: changes.monthlyFee,
        daysPerWeek: changes.daysPerWeek,
        bannerImage: editingTuition.bannerImage,
        description: changes.description,
      });
      toast.success("Tuition updated");
      setEditingId(null);
      router.refresh();
    } catch (error) {
      showError(error, "Failed to update tuition.");
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      await deleteTuition(deletingId);
      toast.success("Tuition deleted");
      setDeletingId(null);
      router.refresh();
    } catch (error) {
      showError(error, "Failed to delete tuition.");
    }
  };

  const editing = tuitions.find((tuition) => tuition._id === editingId);

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-manrope text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            My Tuitions
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            Edit, delete, and toggle the visibility of your tuition posts.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-secondary-container px-2.5 py-1 font-semibold text-on-secondary-container">
            {counts.approved} Approved
          </span>
          <span className="rounded-full bg-tertiary-fixed px-2.5 py-1 font-semibold text-on-tertiary-fixed-variant">
            {counts.pending} Pending
          </span>
          <span className="rounded-full bg-surface-container px-2.5 py-1 font-medium text-on-surface-variant">
            {counts.closed} Closed
          </span>
          <Link
            href="/dashboard/tutor/post-tuition"
            className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 font-semibold text-on-secondary transition-all hover:bg-[#156057]"
          >
            <Plus className="size-4" aria-hidden="true" />
            New Tuition
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-space-md shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs transition-all",
                filter === key
                  ? "bg-secondary-container font-semibold text-on-secondary-container"
                  : "text-on-surface-variant hover:bg-surface-container"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search
              className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-outline"
              aria-hidden="true"
            />
            <Input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search your tuitions..."
              className="h-9 rounded-lg border-surface-container bg-surface-container-low pl-9 text-sm md:text-sm"
            />
          </div>
          <button
            type="button"
            aria-label="Reset filters"
            title="Reset filters"
            onClick={() => {
              setFilter("all");
              setQuery("");
            }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {visible.length === 0 ? (
          <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest p-10 text-center text-sm text-on-surface-variant">
            No tuitions match this filter.
          </div>
        ) : (
          visible.map((tuition) => {
            const applicantCount = tutorApplicants.filter(
              (applicant) => applicant.tuitionId === tuition._id
            ).length;
            const approved = tuition.approvalStatus === "approved";

            return (
              <article
                key={tuition._id}
                className="flex flex-col gap-space-md rounded-xl bg-surface-container-lowest p-space-lg shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                        approved
                          ? "bg-secondary-container/60 text-secondary"
                          : tuition.approvalStatus === "pending"
                            ? "bg-tertiary-fixed text-on-tertiary-fixed-variant"
                            : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {approved ? (
                        <BadgeCheck className="size-3.5" aria-hidden="true" />
                      ) : (
                        <Info className="size-3.5" aria-hidden="true" />
                      )}
                      {approved
                        ? "Admin Approved"
                        : tuition.approvalStatus === "pending"
                          ? "Pending Review"
                          : "Rejected"}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full bg-surface-container px-2.5 py-1 text-xs font-medium text-on-surface",
                        !tuition.isActive && "opacity-70"
                      )}
                    >
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          tuition.isActive
                            ? "animate-pulse bg-secondary"
                            : "bg-outline"
                        )}
                      />
                      {tuition.isActive ? "Active Listing" : "Closed"}
                    </span>
                    <span className="text-xs text-outline">Ref: #{tuition._id}</span>
                  </div>
                  <span className="text-xs text-outline">
                    Posted {new Date(tuition.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-base font-bold text-primary">
                      {tuition.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-surface-container-low px-2.5 py-0.5 text-xs text-on-surface">
                        {tuition.classLevel}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-surface-container-low px-2.5 py-0.5 text-xs text-on-surface">
                        <MapPin className="size-3.5 text-outline" aria-hidden="true" />
                        {tuition.mode === "Online" ? "Online" : tuition.location}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-surface-container-low px-2.5 py-0.5 text-xs text-on-surface">
                        <CalendarDays className="size-3.5 text-outline" aria-hidden="true" />
                        {tuition.daysPerWeek} days / week
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col rounded-lg bg-surface-container-low/70 px-space-md py-space-sm lg:items-end">
                    <span className="text-xs font-semibold tracking-wider text-outline uppercase">
                      Tuition Honorarium
                    </span>
                    <span className="text-lg font-bold text-primary">
                      ৳{tuition.monthlyFee.toLocaleString("en-US")}
                      <span className="text-xs font-normal text-outline"> / mo</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 rounded-b-xl bg-surface-container-low/30 px-space-md py-space-md sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4 text-xs text-primary">
                    <span className="font-semibold">
                      {applicantCount} Student Applicants
                    </span>
                    <span className="inline-flex items-center gap-1 text-on-surface-variant">
                      <Eye className="size-3.5" aria-hidden="true" />
                      Visible
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-outline">
                        {tuition.isActive ? "Active" : "Closed"}
                      </span>
                      <Switch
                        checked={tuition.isActive}
                        onCheckedChange={(checked: boolean) =>
                          toggleActive(tuition._id ?? "", checked)
                        }
                        aria-label="Toggle tuition visibility"
                      />
                    </div>
                    <Link
                      href="/dashboard/tutor/applicants"
                      className="inline-flex items-center gap-1 rounded-lg bg-secondary-container px-3 py-1.5 text-xs font-semibold text-on-secondary-container transition-colors hover:bg-secondary/10"
                    >
                      Manage Applicants ({applicantCount})
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        title="Edit tuition"
                        aria-label={`Edit ${tuition.title}`}
                        onClick={() => openEdit(tuition)}
                        className="rounded-lg p-2 text-outline transition-colors hover:bg-surface-container hover:text-primary"
                      >
                        <Pencil className="size-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        title="Delete tuition"
                        aria-label={`Delete ${tuition.title}`}
                        onClick={() => setDeletingId(tuition._id ?? null)}
                        className="rounded-lg p-2 text-outline transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      <Dialog
        open={editingId !== null}
        onOpenChange={(open) => {
          if (!open) setEditingId(null);
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-manrope text-lg font-bold text-primary">
              Edit Tuition
            </DialogTitle>
            <DialogDescription className="text-xs text-on-surface-variant">
              Update the key details of your tuition post.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-title" className="text-xs">Title</Label>
              <Input
                id="edit-title"
                required
                minLength={10}
                value={editForm.title}
                onChange={(event) =>
                  setEditForm((prev) => ({ ...prev, title: event.target.value }))
                }
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-fee" className="text-xs">Monthly Fee (৳)</Label>
                <Input
                  id="edit-fee"
                  type="number"
                  min={1}
                  required
                  value={editForm.monthlyFee}
                  onChange={(event) =>
                    setEditForm((prev) => ({ ...prev, monthlyFee: event.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-days" className="text-xs">Days per Week</Label>
                <Input
                  id="edit-days"
                  type="number"
                  min={1}
                  max={7}
                  required
                  value={editForm.daysPerWeek}
                  onChange={(event) =>
                    setEditForm((prev) => ({ ...prev, daysPerWeek: event.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-description" className="text-xs">Description</Label>
              <Textarea
                id="edit-description"
                required
                minLength={20}
                rows={4}
                value={editForm.description}
                onChange={(event) =>
                  setEditForm((prev) => ({ ...prev, description: event.target.value }))
                }
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingId(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="secondary">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deletingId !== null}
        onOpenChange={(open) => {
          if (!open) setDeletingId(null);
        }}
      >
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-manrope text-lg font-bold text-primary">
              Delete this tuition?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This removes the listing from your dashboard. You can post a new
              tuition later if you have a free slot.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <p className="rounded-lg bg-surface-container-low p-3 text-xs font-semibold text-on-surface">
            {editing?.title ?? tuitions.find((t) => t._id === deletingId)?.title}
          </p>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Tuition</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete Tuition
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
