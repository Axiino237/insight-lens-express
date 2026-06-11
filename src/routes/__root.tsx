import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { BirdAnimation } from "../components/BirdAnimation";
import logo from "../assets/logo.png";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="relative mx-auto h-24 w-24 mb-8">
          <img src={logo} alt="The First Step Solutions" className="h-full w-full object-contain" />
        </div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground">
          404 - Page Not Found
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="relative mx-auto h-24 w-24 mb-8">
          <img src={logo} alt="The First Step Solutions" className="h-full w-full object-contain" />
        </div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground">
          Something went wrong
        </h1>
        <p className="mt-4 text-sm text-destructive bg-destructive/10 p-4 rounded-xl border border-destructive/20 font-mono">
          {error.message || "An unexpected error occurred."}
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Refresh page
          </a>
        </div>
      </div>
    </div>
  );
}

function PendingComponent() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-xl">
      <div className="flex flex-col items-center gap-6 animate-pulse">
        <div className="relative h-24 w-24 md:h-32 md:w-32">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-warm rounded-full blur-2xl opacity-35 scale-110" />
          <BirdAnimation className="relative h-full w-full object-contain float-slow" speedMs={65} />
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="h-2 w-2 rounded-full bg-brand-cyan animate-bounce [animation-delay:-0.3s]" />
          <span className="h-2 w-2 rounded-full bg-brand-magenta animate-bounce [animation-delay:-0.15s]" />
          <span className="h-2 w-2 rounded-full bg-brand-orange animate-bounce" />
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
  pendingComponent: PendingComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
