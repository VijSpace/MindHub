"use client";

import { useEffect, useState, useTransition } from "react";
import { getBrowserClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/config";

type MessageTone = "neutral" | "success" | "error";
type PendingAction = "login" | "saveNickname" | "signOut" | null;

const supabase = hasSupabaseEnv() ? getBrowserClient() : null;

export default function AuthPanel() {
  const isConfigured = supabase !== null;
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageTone, setMessageTone] = useState<MessageTone>("neutral");
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [isPending, startTransition] = useTransition();

  const setErrorMessage = (text: string) => {
    setMessageTone("error");
    setMessage(text);
  };

  const setSuccessMessage = (text: string) => {
    setMessageTone("success");
    setMessage(text);
  };

  const setNeutralMessage = (text: string) => {
    setMessageTone("neutral");
    setMessage(text);
  };

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let active = true;
    setIsLoadingSession(true);

    const load = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!active) return;

      if (error) {
        setUserId(null);
        setNickname("");
        setErrorMessage("Unable to load account status. Please refresh and try again.");
        setIsLoadingSession(false);
        return;
      }

      const user = data.user;
      setUserId(user?.id ?? null);

      if (user?.id) {
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("nickname")
          .eq("id", user.id)
          .maybeSingle();

        if (!active) return;

        if (profileError) {
          setNickname("");
          setErrorMessage("Logged in, but nickname could not be loaded.");
          setIsLoadingSession(false);
          return;
        }

        setNickname(profile?.nickname ?? "");
      } else {
        setNickname("");
      }

      setIsLoadingSession(false);
    };

    void load();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void load();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  if (!isConfigured) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 shadow-sm">
        <p className="text-sm font-medium text-amber-900">Account</p>
        <p className="mt-3 text-sm text-amber-800">
          Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.
          Then run `db/schema.sql` to enable login, posting, and comments.
        </p>
      </div>
    );
  }

  const handleEmailLogin = () => {
    if (!supabase) return;

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage("Please enter your email.");
      return;
    }

    startTransition(async () => {
      setPendingAction("login");
      setMessage(null);

      try {
        const { error } = await supabase.auth.signInWithOtp({
          email: trimmedEmail,
          options: {
            emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
          },
        });

        if (error) {
          setErrorMessage("Failed to send login link. Please check the email and try again.");
          return;
        }

        setSuccessMessage("Magic link sent. Check your email inbox.");
        setEmail("");
      } finally {
        setPendingAction(null);
      }
    });
  };

  const handleSaveNickname = () => {
    if (!userId || !supabase) return;

    startTransition(async () => {
      setPendingAction("saveNickname");
      setMessage(null);

      try {
        const { error } = await supabase
          .from("users")
          .upsert({ id: userId, nickname: nickname.trim() || null });

        if (error) {
          setErrorMessage("Nickname could not be saved. Please retry.");
          return;
        }

        setSuccessMessage("Nickname saved.");
      } finally {
        setPendingAction(null);
      }
    });
  };

  const handleSignOut = () => {
    if (!supabase) return;

    startTransition(async () => {
      setPendingAction("signOut");
      setMessage(null);

      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          setErrorMessage("Sign out failed. Please try again.");
          return;
        }

        setNeutralMessage("Signed out.");
      } finally {
        setPendingAction(null);
      }
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">Account</p>
        {userId ? (
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isPending}
            className="text-xs font-semibold text-slate-500 transition hover:text-slate-800 disabled:opacity-60"
          >
            {pendingAction === "signOut" ? "Signing out..." : "Sign out"}
          </button>
        ) : null}
      </div>

      {isLoadingSession ? (
        <p className="mt-3 text-sm text-slate-500">Checking account...</p>
      ) : userId ? (
        <div className="mt-3 space-y-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Nickname
            </label>
            <div className="mt-2 flex gap-2">
              <input
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-slate-400"
                placeholder="quiet-forest"
              />
              <button
                type="button"
                onClick={handleSaveNickname}
                disabled={isPending}
                className="rounded-xl border border-slate-200 bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60"
              >
                {pendingAction === "saveNickname" ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          <p className="text-sm text-slate-500">Log in with email to post or comment.</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-slate-400"
            />
            <button
              type="button"
              onClick={handleEmailLogin}
              disabled={!email.trim() || isPending}
              className="rounded-xl border border-slate-200 bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60"
            >
              {pendingAction === "login" ? "Sending..." : "Email link"}
            </button>
          </div>
        </div>
      )}

      {message ? (
        <p
          className={`mt-3 text-xs ${
            messageTone === "error"
              ? "text-rose-600"
              : messageTone === "success"
                ? "text-emerald-700"
                : "text-slate-500"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
