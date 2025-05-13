
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/hooks/use-language";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Cases from "./pages/Cases";
import Schedule from "./pages/Schedule";
import Analytics from "./pages/Analytics";
import CaseDetails from "./pages/CaseDetails";
import VirtualCourtroom from "./pages/VirtualCourtroom";
import PersonalPage from "./pages/PersonalPage";
import LegalResearch from "./pages/LegalResearch";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/cases/:caseId" element={<CaseDetails />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/virtual-courtroom" element={<VirtualCourtroom />} />
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="/legal-research" element={<LegalResearch />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
