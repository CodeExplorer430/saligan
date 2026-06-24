import { useOnlineStatus } from "../hooks/use-online-status";

export function SyncStatus() {
  const isOnline = useOnlineStatus();

  return (
    <div
      aria-live="polite"
      className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm"
    >
      <span
        aria-hidden="true"
        className={`size-2 rounded-full ${isOnline ? "bg-emerald-500" : "bg-amber-500"}`}
      />
      <span>{isOnline ? "Online · sync available" : "Offline · changes stay on device"}</span>
    </div>
  );
}
