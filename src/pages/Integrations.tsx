import { useState } from "react";
import { GitHubSyncStatus } from "@/types";
import GitHubConnect from "@/components/github/GitHubConnect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, LinkIcon, ExternalLink, Mail, Phone, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";

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
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
            Integrations
          </h1>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Connect your application to external services to extend its functionality
          </p>
        </header>

        <div className="max-w-3xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Agent developed by AIWorkPay SAS</CardTitle>
              <CardDescription>
                An innovative solution to connect autonomous agents with freelance services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>contact@aiworkpay.fr</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>+33602405147</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href="https://aiworkpay.tech" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      https://aiworkpay.tech
                    </a>
                  </div>
                </div>
                <Button asChild variant="outline">
                  <a href="https://aiworkpay.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <span>Visit website</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Supabase Integration
                  </CardTitle>
                  <CardDescription>
                    Connect your own Supabase database to extend your application's functionality
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-3">Why Supabase?</h3>
                    <ul className="space-y-2 text-sm list-disc pl-5">
                      <li>Complete PostgreSQL database</li>
                      <li>User authentication</li>
                      <li>File storage</li>
                      <li>Edge functions and API</li>
                      <li>Simple admin interface</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-3">How to connect Supabase</h3>
                    <p className="text-sm mb-4">
                      Lovable offers native integration with Supabase. To activate it:
                    </p>
                    <ol className="space-y-2 text-sm list-decimal pl-5 mb-6">
                      <li>Click on the Supabase menu at the top right of the interface</li>
                      <li>Log in to your Supabase account</li> 
                      <li>Select your project or create a new one</li>
                      <li>Follow the instructions to complete the integration</li>
                    </ol>
                    
                    <div className="flex justify-center gap-4 mt-4">
                      <Button className="gap-2">
                        <LinkIcon className="h-4 w-4" />
                        Connect Supabase
                      </Button>
                      <Button variant="outline" className="gap-2" asChild>
                        <a href="https://docs.lovable.dev/integrations/supabase/" target="_blank" rel="noopener noreferrer">
                          Documentation
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="other" className="animate-fade-in">
              <div className="bg-muted/50 rounded-lg p-12 text-center">
                <h3 className="text-xl font-medium mb-2">More integrations coming soon</h3>
                <p className="text-muted-foreground">
                  Additional integrations with external services will be available soon.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
