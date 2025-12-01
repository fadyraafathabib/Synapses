import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import HomePage from "./pages/HomePage";
import MembershipPage from "./pages/MembershipPage";
import SignupPage from "./pages/SignupPage";
import RegistrationPage from "./pages/RegistrationPage";
import PhoneNumbersForm from "./pages/PhoneNumbersForm";

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

const registrationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/registration",
  component: RegistrationPage,
});

const PhoneNumbersFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/phonenumbersform",
  component: PhoneNumbersForm,
});
const routeTree = rootRoute.addChildren([
  indexRoute,
  membershipRoute,
  signupRoute,
  registrationRoute,
  PhoneNumbersFormRoute,
]);



export const router = createRouter({ routeTree });
