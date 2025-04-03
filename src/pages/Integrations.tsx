
import { useState } from "react";
import { GitHubSyncStatus } from "@/types";
import GitHubConnect from "@/components/github/GitHubConnect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, LinkIcon, ExternalLink, Mail, Phone, Globe } from "lucide-react";

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
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Agent développé par AIWorkPay SAS</CardTitle>
            <CardDescription>
              Une solution innovante pour connecter des agents autonomes à des services de freelances
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
                  <span>Visiter le site</span>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Supabase Integration
                </CardTitle>
                <CardDescription>
                  Connectez votre propre base de données Supabase pour étendre les fonctionnalités de votre application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-3">Pourquoi Supabase?</h3>
                  <ul className="space-y-2 text-sm list-disc pl-5">
                    <li>Base de données PostgreSQL complète</li>
                    <li>Authentification des utilisateurs</li>
                    <li>Stockage de fichiers</li>
                    <li>Fonctions Edge et API</li>
                    <li>Interface d'administration simple</li>
                  </ul>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-3">Comment connecter Supabase</h3>
                  <p className="text-sm mb-4">
                    Lovable offre une intégration native avec Supabase. Pour l'activer:
                  </p>
                  <ol className="space-y-2 text-sm list-decimal pl-5 mb-6">
                    <li>Cliquez sur le menu Supabase en haut à droite de l'interface</li>
                    <li>Connectez-vous à votre compte Supabase</li> 
                    <li>Sélectionnez votre projet ou créez-en un nouveau</li>
                    <li>Suivez les instructions pour compléter l'intégration</li>
                  </ol>
                  
                  <div className="flex justify-center gap-4 mt-4">
                    <Button className="gap-2">
                      <LinkIcon className="h-4 w-4" />
                      Connecter Supabase
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
