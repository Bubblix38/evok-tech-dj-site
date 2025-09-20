import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RadioProvider } from "@/contexts/RadioContext";
import { useCDNPreload } from "@/hooks/useCDNPreload";
import { Suspense } from "react";
import Home from "@/pages/Home";
import { LazyFunkVideos, LazyCursoDJ } from "@/utils/lazyLoad";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/not-found";

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <LoadingSpinner size="lg" text="Carregando página..." />
  </div>
);

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/videos">
        <Suspense fallback={<PageLoader />}>
          <LazyFunkVideos />
        </Suspense>
      </Route>
      <Route path="/curso-dj">
        <Suspense fallback={<PageLoader />}>
          <LazyCursoDJ />
        </Suspense>
      </Route>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize CDN preloading
  useCDNPreload();
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <RadioProvider>
            <Toaster />
            <Router />
          </RadioProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
