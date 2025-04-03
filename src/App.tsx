import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Integrations from "./pages/Integrations";
import Debug from "./pages/Debug";
import Knowledge from "./pages/Knowledge";
import DebugBadge from "./components/DebugBadge";
import Documentation from "./pages/Documentation";
import DocumentationLink from "./components/DocumentationLink";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/debug" element={<Debug />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <DocumentationLink />
          <DebugBadge />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
