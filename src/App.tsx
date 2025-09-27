
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { SimplifiedStakingProvider } from '@/contexts/WeightedStakingContext';

import Layout from '@/components/layout/Layout';
import Index from '@/pages/Index';
import Pools from '@/pages/Pools';
import CreatePool from '@/pages/CreatePool';
import Dashboard from '@/pages/Dashboard';
import Leaderboard from '@/pages/Leaderboard';
import Admin from '@/pages/Admin';
import Docs from '@/pages/Docs';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import NotFound from '@/pages/NotFound';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SimplifiedStakingProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pools" element={<Pools />} />
              <Route path="/create" element={<CreatePool />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
              {/* <Route path="/admin" element={<Admin />} /> */}
              <Route path="/docs" element={<Docs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
        <Toaster />
      </SimplifiedStakingProvider>
    </QueryClientProvider>
  );
}

export default App;
