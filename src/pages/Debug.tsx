
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeftRight, Cpu, Database, Eye, List, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for demonstration
const mockLogs = [
  { id: 1, level: "info", message: "Application started", timestamp: new Date().toISOString() },
  { id: 2, level: "warn", message: "API rate limit approaching", timestamp: new Date().toISOString() },
  { id: 3, level: "error", message: "Failed to connect to database", timestamp: new Date().toISOString() },
  { id: 4, level: "info", message: "User authentication successful", timestamp: new Date().toISOString() }
];

const Debug = () => {
  const { toast } = useToast();
  const [logs, setLogs] = useState(mockLogs);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleClearLogs = () => {
    setLogs([]);
    toast({
      title: "Logs cleared",
      description: "All debug logs have been cleared"
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // In a real app, this would fetch fresh logs from a service
      setLogs([
        ...logs,
        { 
          id: logs.length + 1, 
          level: "info", 
          message: "Logs refreshed at " + new Date().toLocaleTimeString(), 
          timestamp: new Date().toISOString() 
        }
      ]);
      setIsRefreshing(false);
      toast({
        title: "Logs refreshed",
        description: "Debug logs have been updated"
      });
    }, 800);
  };

  const simulateError = () => {
    toast({
      variant: "destructive",
      title: "Error simulated",
      description: "A test error has been logged"
    });
    setLogs([
      ...logs,
      { 
        id: logs.length + 1, 
        level: "error", 
        message: "Simulated error for testing", 
        timestamp: new Date().toISOString() 
      }
    ]);
  };

  return (
    <div className="container py-6 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Debug Console</h1>
        <p className="text-muted-foreground">Monitor and troubleshoot your application</p>
      </header>

      <Tabs defaultValue="logs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Logs
          </TabsTrigger>
          <TabsTrigger value="state" className="flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4" />
            State
          </TabsTrigger>
          <TabsTrigger value="network" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            Network
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Database
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Application Logs</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClearLogs}
              >
                Clear
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={simulateError}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Simulate Error
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Log Events</CardTitle>
              <CardDescription>
                Recent system logs and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full pr-4">
                {logs.length > 0 ? (
                  <div className="space-y-3">
                    {logs.map((log) => (
                      <div 
                        key={log.id} 
                        className={`p-3 rounded-md border ${
                          log.level === 'error' 
                            ? 'bg-red-50 border-red-200 text-red-800' 
                            : log.level === 'warn'
                              ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                              : 'bg-blue-50 border-blue-200 text-blue-800'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-medium">
                            {log.level.toUpperCase()}
                          </span>
                          <span className="text-xs opacity-70">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="mt-1">
                          {log.message}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    No logs available
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="state">
          <Card>
            <CardHeader>
              <CardTitle>Application State</CardTitle>
              <CardDescription>
                Current state of your application components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">State monitoring tools will be available here.</p>
              <div className="bg-gray-100 p-4 rounded-md mt-4">
                <pre className="text-sm">
                  {JSON.stringify(
                    {
                      "agents": [{ "id": "agent-1", "status": "active" }],
                      "missions": [{ "id": "mission-1", "status": "pending" }],
                      "systemStatus": "healthy"
                    }, 
                    null, 
                    2
                  )}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network">
          <Card>
            <CardHeader>
              <CardTitle>Network Activity</CardTitle>
              <CardDescription>
                Monitor network requests and responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Network monitoring will be available in future updates.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Database Explorer</CardTitle>
              <CardDescription>
                View and query database tables
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Database tools will be available in future updates.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Debug;
