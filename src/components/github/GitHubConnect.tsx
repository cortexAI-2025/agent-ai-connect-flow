
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubSyncStatus } from "@/types";
import { Github, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GitHubConnectProps {
  syncStatus?: GitHubSyncStatus;
  onConnect: () => void;
  onDisconnect: () => void;
  onSync: (repoId?: string) => void;
}

const GitHubConnect = ({ syncStatus, onConnect, onDisconnect, onSync }: GitHubConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Dans une implémentation réelle, ceci redirigerait vers le flow d'authentification GitHub
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler un appel API
      onConnect();
      toast({
        title: "Connexion réussie",
        description: "Votre compte GitHub est maintenant connecté.",
      });
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter à GitHub.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      // Dans une implémentation réelle, ceci déconnecterait le compte GitHub
      await new Promise(resolve => setTimeout(resolve, 500)); 
      onDisconnect();
      toast({
        title: "Déconnexion réussie",
        description: "Votre compte GitHub a été déconnecté.",
      });
    } catch (error) {
      toast({
        title: "Erreur de déconnexion",
        description: "Impossible de déconnecter votre compte GitHub.",
        variant: "destructive",
      });
    }
  };

  const handleSync = async (repoId?: string) => {
    setIsSyncing(true);
    try {
      // Dans une implémentation réelle, ceci synchroniserait avec GitHub
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSync(repoId);
      toast({
        title: "Synchronisation réussie",
        description: repoId 
          ? "Le dépôt a été synchronisé avec succès."
          : "Tous les dépôts ont été synchronisés avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur de synchronisation",
        description: "Impossible de synchroniser avec GitHub.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          Intégration GitHub
        </CardTitle>
        <CardDescription>
          Synchronisez votre projet avec un dépôt GitHub pour un contrôle de version plus avancé.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!syncStatus?.connected ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Connectez votre compte GitHub pour commencer à synchroniser vos projets.
            </p>
            <Button 
              onClick={handleConnect} 
              disabled={isConnecting} 
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              {isConnecting ? "Connexion en cours..." : "Se connecter à GitHub"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Compte connecté</p>
                <p className="text-sm text-muted-foreground">
                  {syncStatus.lastSynced 
                    ? `Dernière synchronisation: ${new Date(syncStatus.lastSynced).toLocaleString()}` 
                    : "Pas encore synchronisé"}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleSync()} 
                disabled={isSyncing}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? "Synchronisation..." : "Synchroniser tout"}
              </Button>
            </div>
            
            {syncStatus.repos && syncStatus.repos.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Dépôts disponibles</h4>
                <ul className="space-y-2">
                  {syncStatus.repos.map(repo => (
                    <li key={repo.id} className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <p className="font-medium">{repo.name}</p>
                        <p className="text-xs text-muted-foreground">{repo.url}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleSync(repo.id)}
                        disabled={repo.isSyncing}
                        className="flex items-center gap-1"
                      >
                        <RefreshCw className={`h-3 w-3 ${repo.isSyncing ? 'animate-spin' : ''}`} />
                        Sync
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
      {syncStatus?.connected && (
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleDisconnect}
          >
            Déconnecter
          </Button>
          <Button 
            variant="default"
            onClick={() => window.open("https://github.com/settings/applications", "_blank")}
          >
            Gérer sur GitHub
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default GitHubConnect;
