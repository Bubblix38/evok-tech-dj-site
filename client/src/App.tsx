import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RadioProvider } from "@/contexts/RadioContext";
import { useCDNPreload } from "@/hooks/useCDNPreload";
import Home from "@/pages/Home";
import FunkVideos from "@/pages/FunkVideos";
import CursoDJ from "@/pages/CursoDJ";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/videos" component={FunkVideos} />
      <Route path="/curso-dj" component={CursoDJ} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize CDN preloading
  useCDNPreload();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RadioProvider>
          <Toaster />
          <Router />
        </RadioProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
