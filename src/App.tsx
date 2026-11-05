import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, matchPath } from "react-router-dom";
import { useEffect } from "react";
import { projects } from "@/data/projects";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PageTitle = () => {
  const { pathname } = useLocation();
  const projectId = matchPath('/project/:projectId', pathname)?.params.projectId;
  const project = projects.find(item => item.id === projectId);
  const title = project ? `${project.title} - Mateo Aponte` : 'Mateo Aponte - Software Engineer';

  useEffect(() => {
    document.title = title;
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
  }, [title]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageTitle />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
