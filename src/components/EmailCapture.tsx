"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

interface EmailCaptureProps {
  source?: string;
  id?: string;
  buttonLabel?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailCapture({
  source = "landing",
  id,
  buttonLabel = "Join the waitlist",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const trimmed = email.trim();
    if (!EMAIL_REGEX.test(trimmed)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source }),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        alreadySubscribed?: boolean;
      };

      if (res.status === 409 || data.alreadySubscribed) {
        setStatus("success");
        return;
      }

      setStatus("error");
      setErrorMsg(data.error || "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        id={id}
        role="status"
        aria-live="polite"
        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 text-center"
      >
        <p className="font-medium text-[var(--color-text)]">
          You&apos;re on the list. Check your inbox.
        </p>
      </div>
    );
  }

  const inputId = `email-${source}`;

  return (
    <div id={id} className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch"
        noValidate
      >
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          required
          inputMode="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={status === "submitting"}
          aria-invalid={status === "error"}
          className="min-w-0 flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-base text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-lg bg-[var(--color-accent)] px-6 py-3 text-base font-medium text-white transition hover:bg-[var(--color-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 focus:ring-offset-2 focus:ring-offset-[var(--color-bg)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Joining" : buttonLabel}
        </button>
      </form>
      {status === "error" && errorMsg && (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
