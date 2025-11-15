import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import HomePage from "./pages/HomePage";
import MembershipPage from "./pages/MembershipPage";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const membershipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/membership",
  component: MembershipPage,
});

const routeTree = rootRoute.addChildren([indexRoute, membershipRoute]);

export const router = createRouter({ routeTree });
