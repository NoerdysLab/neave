import { EmailCapture } from "./EmailCapture";

export function FinalCTA() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[680px] rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-14 text-center md:px-12 md:py-20">
        <h2 className="text-3xl text-[var(--color-text)] md:text-5xl">
          Be first in line.
        </h2>
        <p className="mt-4 text-lg text-[var(--color-text)]/80">
          Early access and 20% off at launch.
        </p>
        <div className="mx-auto mt-8 max-w-md">
          <EmailCapture source="final-cta" />
        </div>
      </div>
    </section>
  );
}
