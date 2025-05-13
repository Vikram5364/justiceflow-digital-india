
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

// Import pages
import Dashboard from '@/pages/Dashboard';
import Cases from '@/pages/Cases';
import CaseDetails from '@/pages/CaseDetails';
import Schedule from '@/pages/Schedule';
import Analytics from '@/pages/Analytics';
import VirtualCourtroom from '@/pages/VirtualCourtroom';
import LegalResearch from '@/pages/LegalResearch';
import PersonalPage from '@/pages/PersonalPage';
import NotFound from '@/pages/NotFound';
import Index from '@/pages/Index';

// Language provider
import { LanguageProvider } from '@/hooks/use-language';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/cases/:id" element={<CaseDetails />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/virtual-courtroom" element={<VirtualCourtroom />} />
              <Route path="/legal-research" element={<LegalResearch />} />
              <Route path="/personal" element={<PersonalPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
