export function Nav() {
  return (
    <header className="border-b border-[var(--color-border)]/60">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-5">
        <a
          href="#top"
          aria-label="Neave home"
          className="wordmark text-2xl text-[var(--color-text)]"
        >
          neave
        </a>
        <a
          href="#join"
          className="text-sm font-medium text-[var(--color-text)] underline-offset-4 transition hover:text-[var(--color-accent)] hover:underline"
        >
          Join
        </a>
      </div>
    </header>
  );
}
