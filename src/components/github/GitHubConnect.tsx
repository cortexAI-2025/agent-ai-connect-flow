
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
      // In a real implementation, this would redirect to the GitHub authentication flow
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate an API call
      onConnect();
      toast({
        title: "Connection successful",
        description: "Your GitHub account is now connected.",
      });
    } catch (error) {
      toast({
        title: "Connection error",
        description: "Unable to connect to GitHub.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      // In a real implementation, this would disconnect the GitHub account
      await new Promise(resolve => setTimeout(resolve, 500)); 
      onDisconnect();
      toast({
        title: "Disconnection successful",
        description: "Your GitHub account has been disconnected.",
      });
    } catch (error) {
      toast({
        title: "Disconnection error",
        description: "Unable to disconnect your GitHub account.",
        variant: "destructive",
      });
    }
  };

  const handleSync = async (repoId?: string) => {
    setIsSyncing(true);
    try {
      // In a real implementation, this would synchronize with GitHub
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSync(repoId);
      toast({
        title: "Synchronization successful",
        description: repoId 
          ? "The repository was successfully synchronized."
          : "All repositories were successfully synchronized.",
      });
    } catch (error) {
      toast({
        title: "Synchronization error",
        description: "Unable to synchronize with GitHub.",
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
          GitHub Integration
        </CardTitle>
        <CardDescription>
          Synchronize your project with a GitHub repository for advanced version control.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!syncStatus?.connected ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Connect your GitHub account to start synchronizing your projects.
            </p>
            <Button 
              onClick={handleConnect} 
              disabled={isConnecting} 
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              {isConnecting ? "Connecting..." : "Connect to GitHub"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Account connected</p>
                <p className="text-sm text-muted-foreground">
                  {syncStatus.lastSynced 
                    ? `Last synchronization: ${new Date(syncStatus.lastSynced).toLocaleString()}` 
                    : "Not yet synchronized"}
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
                {isSyncing ? "Synchronizing..." : "Sync all"}
              </Button>
            </div>
            
            {syncStatus.repos && syncStatus.repos.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Available repositories</h4>
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
            Disconnect
          </Button>
          <Button 
            variant="default"
            onClick={() => window.open("https://github.com/settings/applications", "_blank")}
          >
            Manage on GitHub
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default GitHubConnect;
