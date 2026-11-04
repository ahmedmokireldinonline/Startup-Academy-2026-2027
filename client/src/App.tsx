import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

const Programs = lazy(() => import("./pages/Programs"));
const Register = lazy(() => import("./pages/Register"));
const Investors = lazy(() => import("./pages/Investors"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Admin = lazy(() => import("./pages/Admin"));
const About = lazy(() => import("./pages/About"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Books = lazy(() => import("./pages/Books"));
const Databases = lazy(() => import("./pages/Databases"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function RouteFallback() {
  return <div className="route-loading" role="status" aria-live="polite"><span className="route-loading-dot" /> Loading…</div>;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/register"} component={Register} />
      <Route path={"/programs"} component={Programs} />
      <Route path={"/investors"} component={Investors} />
      <Route path={"/books"} component={Books} />
      <Route path={"/databases"} component={Databases} />
      <Route path={"/about"} component={About} />
      <Route path={"/dashboard"} component={UserDashboard} />
      <Route path={"/admin/login"} component={AdminLogin} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/admin/control"} component={AdminDashboard} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Suspense fallback={<RouteFallback />}>
            <Router />
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
