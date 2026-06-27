import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SyncStatus } from "./sync-status";

describe("sync status", () => {
  it("updates when browser connectivity changes", () => {
    Object.defineProperty(window.navigator, "onLine", {
      configurable: true,
      value: true,
    });

    render(<SyncStatus />);
    expect(screen.getByText(/online · sync available/i)).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event("offline"));
    });

    expect(screen.getByText(/offline · changes stay on device/i)).toBeInTheDocument();
  });
});
