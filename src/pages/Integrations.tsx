
import { useState } from "react";
import { GitHubSyncStatus } from "@/types";
import GitHubConnect from "@/components/github/GitHubConnect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatabaseTab from "@/components/debug/DatabaseTab";

// Données simulées pour la démonstration
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
    <div className="container py-6 min-h-screen">
      <header className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
          Intégrations
        </h1>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
          Connectez votre application à des services externes pour étendre ses fonctionnalités
        </p>
      </header>

      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="github" value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
          <div className="flex justify-center mb-6">
            <TabsList className="bg-accent/50 backdrop-blur-sm">
              <TabsTrigger value="github" className="transition-all duration-200">GitHub</TabsTrigger>
              <TabsTrigger value="database" className="transition-all duration-200">Base de données</TabsTrigger>
              <TabsTrigger value="other" className="transition-all duration-200">Autres services</TabsTrigger>
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
            <DatabaseTab />
          </TabsContent>
          <TabsContent value="other" className="animate-fade-in">
            <div className="bg-muted/50 rounded-lg p-12 text-center">
              <h3 className="text-xl font-medium mb-2">Plus d'intégrations à venir</h3>
              <p className="text-muted-foreground">
                D'autres intégrations avec des services externes seront disponibles prochainement.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Integrations;
