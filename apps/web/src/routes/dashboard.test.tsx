import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { DashboardPage } from "./dashboard";

describe("dashboard shell", () => {
  beforeEach(() => {
    Object.defineProperty(window.navigator, "onLine", {
      configurable: true,
      value: true,
    });
  });

  it("renders required Sprint 0 placeholders", () => {
    render(<DashboardPage />);

    expect(screen.getByRole("heading", { name: /internship records/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "DTR / time log" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Rendered hours" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Weekly report" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /local storage and sync queue/i }),
    ).toBeInTheDocument();
  });
});
