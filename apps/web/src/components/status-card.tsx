interface StatusCardProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly value: string;
  readonly description: string;
}

export function StatusCard({ eyebrow, title, value, description }: StatusCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">{eyebrow}</p>
      <div className="mt-4 flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold">{value}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
    </article>
  );
}
