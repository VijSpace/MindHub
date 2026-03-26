"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { INITIAL_FORM_ACTION_STATE, type FormActionState } from "@/lib/types";

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="rounded-xl border border-slate-200 bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60"
    >
      {pending ? "Sending..." : "Comment"}
    </button>
  );
}

export default function CommentForm({
  action,
  disabled,
  disabledReason,
}: {
  action: (state: FormActionState, formData: FormData) => Promise<FormActionState>;
  disabled?: boolean;
  disabledReason?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(action, INITIAL_FORM_ACTION_STATE);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm"
    >
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Add a comment
        </label>
        <textarea
          name="content"
          rows={3}
          required
          disabled={disabled}
          placeholder="Keep it thoughtful and concise..."
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-slate-400 disabled:opacity-60"
        />
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{disabled ? disabledReason || "Log in to comment." : "Respect the space."}</span>
        <SubmitButton disabled={disabled} />
      </div>
      {state.message ? (
        <p
          className={`text-xs ${state.status === "error" ? "text-rose-600" : "text-slate-500"}`}
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
