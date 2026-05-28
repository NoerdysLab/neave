import type { ReactNode } from "react";

interface Item {
  title: string;
  body: string;
  icon: ReactNode;
}

const items: Item[] = [
  {
    title: "Low-microplastic by design",
    body: "100% natural fiber, no synthetic blends.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1 6.67-1.86 12.93-7.95 17.66" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6" />
      </svg>
    ),
  },
  {
    title: "GOTS-certified organic cotton",
    body: "Verifiable certification, not vague claims.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Plastic-free packaging",
    body: "Paper, start to finish.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="M3.3 7 12 12l8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
  {
    title: "Honest by default",
    body: "No vague wellness claims, just materials.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    ),
  },
];

export function ValueProps() {
  return (
    <section className="bg-[var(--color-surface)] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1100px]">
        <div className="max-w-2xl">
          <p className="eyebrow">What Neave is</p>
          <h2 className="mt-4 text-3xl text-[var(--color-text)] md:text-5xl">
            The short version.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--color-bg)] text-[var(--color-accent)]">
                {item.icon}
              </div>
              <h3 className="text-lg text-[var(--color-text)]">{item.title}</h3>
              <p className="text-[var(--color-text)]/80">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
