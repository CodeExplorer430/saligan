import { StatusCard } from "../components/status-card";

const cards = [
  {
    eyebrow: "Today",
    title: "DTR / time log",
    value: "Not started",
    description: "Clock and correction workflows will be implemented from approved requirements.",
  },
  {
    eyebrow: "Progress",
    title: "Rendered hours",
    value: "0h",
    description: "Verified rendered, overtime, undertime, and remaining totals will appear here.",
  },
  {
    eyebrow: "Reports",
    title: "Weekly report",
    value: "Draft",
    description: "Daily notes will later feed submission-ready weekly accomplishment reports.",
  },
] as const;

export function DashboardPage() {
  return (
    <>
      <section aria-labelledby="dashboard-title">
        <p className="text-sm font-semibold text-gray-500">Intern workspace</p>
        <h1 id="dashboard-title" className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Internship records, built to work offline.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
          Sprint 0 shell only. Business workflows remain locked behind approved specifications and
          tests.
        </p>
      </section>

      <section aria-label="Dashboard placeholders" className="mt-10 grid gap-5 md:grid-cols-3">
        {cards.map((card) => (
          <StatusCard key={card.title} {...card} />
        ))}
      </section>

      <section
        className="mt-5 rounded-xl bg-gray-900 p-6 text-white"
        aria-labelledby="offline-title"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-300">
          Offline-first baseline
        </p>
        <h2 id="offline-title" className="mt-3 text-xl font-semibold">
          Local storage and sync queue are prepared.
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-300">
          Placeholder IndexedDB tables exist for time logs, reports, and pending sync operations. No
          records are sent until synchronization behavior is specified and implemented.
        </p>
      </section>
    </>
  );
}
