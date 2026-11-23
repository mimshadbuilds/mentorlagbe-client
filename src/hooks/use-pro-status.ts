"use client";

import { useEffect, useState } from "react";
import { getCurrentProfile } from "@/lib/actions/payment";

export function useProStatus(userId?: string) {
  const [result, setResult] = useState<{ userId: string; isPro: boolean } | null>(
    null
  );

  useEffect(() => {
    if (!userId) return;

    let active = true;

    getCurrentProfile()
      .then((profile) => {
        if (active) setResult({ userId, isPro: profile.plan === "pro" });
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [userId]);

  return Boolean(userId && result && result.userId === userId && result.isPro);
}
