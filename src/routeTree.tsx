import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import HomePage from "./pages/HomePage";
import MembershipPage from "./pages/MembershipPage";
import SignupPage from "./pages/SignupPage";

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

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignupPage,
});

const routeTree = rootRoute.addChildren([indexRoute, membershipRoute, signupRoute]);



export const router = createRouter({ routeTree });
