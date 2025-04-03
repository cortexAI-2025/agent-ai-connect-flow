
import { useState } from "react";
import { GitHubSyncStatus } from "@/types";
import GitHubConnect from "@/components/github/GitHubConnect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import IntegrationsHeader from "@/components/integrations/IntegrationsHeader";
import AIWorkPayCard from "@/components/integrations/AIWorkPayCard";
import SupabaseIntegration from "@/components/integrations/SupabaseIntegration";
import OtherIntegrationsTab from "@/components/integrations/OtherIntegrationsTab";

// Simulated data for demonstration
const mockGitHubRepos = [
  {
    id: "1",
    name: "agent-ai-connect",
    fullName: "user/agent-ai-connect",
    url: "https://github.com/user/agent-ai-connect",
    description: "Agent AI Connect Flow project",
    isPrivate: false,
    lastSynced: new Date().toISOString(),
    isSyncing: false
  },
  {
    id: "2",
    name: "ai-work-pay",
    fullName: "user/ai-work-pay",
    url: "https://github.com/user/ai-work-pay",
    description: "AIWorkPay integration library",
    isPrivate: true,
    isSyncing: false
  }
];

const Integrations = () => {
  const [activeTab, setActiveTab] = useState<string>("github");
  const [gitHubStatus, setGitHubStatus] = useState<GitHubSyncStatus>({
    connected: false
  });

  const handleGitHubConnect = () => {
    setGitHubStatus({
      connected: true,
      lastSynced: new Date().toISOString(),
      repos: mockGitHubRepos
    });
  };

  const handleGitHubDisconnect = () => {
    setGitHubStatus({
      connected: false
    });
  };

  const handleGitHubSync = (repoId?: string) => {
    if (repoId) {
      setGitHubStatus(prev => ({
        ...prev,
        lastSynced: new Date().toISOString(),
        repos: prev.repos?.map(repo => 
          repo.id === repoId 
            ? { ...repo, lastSynced: new Date().toISOString() } 
            : repo
        )
      }));
    } else {
      setGitHubStatus(prev => ({
        ...prev,
        lastSynced: new Date().toISOString(),
        repos: prev.repos?.map(repo => ({ 
          ...repo, 
          lastSynced: new Date().toISOString() 
        }))
      }));
    }
  };

  return (
    <div className="min-h-screen pb-6">
      <Navigation currentPage="Integrations" />
      
      <div className="container py-6">
        <IntegrationsHeader />

        <div className="max-w-3xl mx-auto">
          <AIWorkPayCard />

          <Tabs defaultValue="github" value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
            <div className="flex justify-center mb-6">
              <TabsList className="bg-accent/50 backdrop-blur-sm">
                <TabsTrigger value="github" className="transition-all duration-200">GitHub</TabsTrigger>
                <TabsTrigger value="database" className="transition-all duration-200">Database</TabsTrigger>
                <TabsTrigger value="other" className="transition-all duration-200">Other services</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="github" className="animate-fade-in">
              <GitHubConnect 
                syncStatus={gitHubStatus}
                onConnect={handleGitHubConnect}
                onDisconnect={handleGitHubDisconnect}
                onSync={handleGitHubSync}
              />
            </TabsContent>
            <TabsContent value="database" className="animate-fade-in">
              <SupabaseIntegration />
            </TabsContent>
            <TabsContent value="other" className="animate-fade-in">
              <OtherIntegrationsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
