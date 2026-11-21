"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { UserRole } from "@/components/layout/AuthUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";

export interface ProfileUser {
  name: string;
  email: string;
  image: string | null;
  role: UserRole;
  phone: string;
  bio: string;
}

export default function UpdateProfileForm({ user }: { user: ProfileUser }) {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [bio, setBio] = useState(user.bio);
  const [image, setImage] = useState(user.image ?? "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }

    setSaving(true);

    try {
      await authClient.updateUser({
        name: name.trim(),
        phone: phone.trim(),
        bio: bio.trim(),
        image: image.trim(),
      });
      toast.success("Profile updated");
      router.refresh();
    } catch {
      toast.error("Could not update your profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    setName(user.name);
    setPhone(user.phone);
    setBio(user.bio);
    setImage(user.image ?? "");
  };

  return (
    <div className="flex max-w-4xl flex-col gap-space-lg">
      <div>
        <h1 className="font-manrope text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          Update Profile
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Manage your name, phone, bio and profile picture — available to every role.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 shrink-0 ring-2 ring-secondary/25">
            <AvatarImage src={image || undefined} alt={name} className="object-cover" />
            <AvatarFallback className="bg-secondary-container text-xl font-bold text-secondary">
              {name.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-base font-bold text-primary">{user.name}</span>
            <span className="truncate text-xs text-outline">{user.email}</span>
            <span className="mt-1 w-fit rounded-full bg-secondary-container px-2.5 py-0.5 text-xs font-semibold capitalize text-on-secondary-container">
              {user.role}
            </span>
          </div>
        </div>
        <span className="text-xs text-outline">
          Your avatar and name appear across your dashboard.
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-space-lg rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
        <div>
          <h2 className="font-manrope text-lg font-bold text-primary">Personal Information</h2>
          <p className="mt-0.5 text-xs text-on-surface-variant">
            Email is your sign-in address and cannot be changed here.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-name">Full Name</Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-email">Email Address</Label>
            <Input
              id="profile-email"
              value={user.email}
              readOnly
              className="bg-surface-container-low text-on-surface-variant"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-phone">Phone</Label>
            <Input
              id="profile-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+880 1XXX-XXXXXX"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-image">Profile Picture URL</Label>
            <Input
              id="profile-image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/photo.jpg"
            />
            {/* TODO(backend): direct ImgBB upload needs an API key. */}
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="profile-bio">Bio</Label>
            <Textarea
              id="profile-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="Tell students a little about yourself..."
            />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-space-sm border-t border-surface-container pt-space-md sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={handleDiscard}>
            Discard Changes
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="bg-secondary text-on-secondary shadow-sm hover:bg-[#156057]">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
