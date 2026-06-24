import { APP_FULL_NAME, APP_NAME } from "@saligan/shared";
import type { ReactNode } from "react";

import { SyncStatus } from "./sync-status";

interface AppShellProps {
  readonly children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xl font-bold tracking-tight">{APP_NAME}</p>
            <p className="hidden text-xs text-gray-500 md:block">{APP_FULL_NAME}</p>
          </div>
          <SyncStatus />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</main>
    </div>
  );
}
