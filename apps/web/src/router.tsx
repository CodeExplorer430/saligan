import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";

import { AppShell } from "./components/app-shell";
import { DashboardPage } from "./routes/dashboard";

const rootRoute = createRootRoute({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});

const routeTree = rootRoute.addChildren([dashboardRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
