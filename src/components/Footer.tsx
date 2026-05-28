export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border)] px-6 py-10">
      <div className="mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-4 text-sm text-[var(--color-muted)] sm:flex-row sm:items-center">
        <div className="flex items-baseline gap-3">
          <span className="wordmark text-xl text-[var(--color-text)]">
            neave
          </span>
          <span>new weave</span>
        </div>
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-6">
          <a
            href="mailto:hello@tryneave.com"
            className="transition hover:text-[var(--color-text)]"
          >
            hello@tryneave.com
          </a>
          <span>© {year} Neave</span>
        </div>
      </div>
    </footer>
  );
}
