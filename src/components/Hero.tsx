import Image from "next/image";
import { EmailCapture } from "./EmailCapture";

export function Hero() {
  return (
    <section id="top" className="px-6 pb-24 pt-12 md:pb-32 md:pt-20">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h1 className="text-4xl text-[var(--color-text)] sm:text-5xl md:text-6xl">
            Most pillowcases are part plastic. Yours doesn&apos;t have to be.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text)]/85 md:text-xl">
            Neave makes GOTS-certified organic cotton pillowcases, shipped
            without plastic. Join the waitlist for early access and 20% off at
            launch.
          </p>
          <div className="mt-8 max-w-md">
            <EmailCapture source="hero" id="join" />
          </div>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            No spam. One email when we launch.
          </p>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] md:aspect-[5/6]">
          {/* TODO: swap for real photography */}
          <Image
            src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1400&auto=format&fit=crop"
            alt="Rumpled natural cotton bedding in soft morning light"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
