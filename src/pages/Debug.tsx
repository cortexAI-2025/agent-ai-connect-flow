
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftRight, Cpu, Database, List } from "lucide-react";
import LogsTab from "@/components/debug/LogsTab";
import StateTab from "@/components/debug/StateTab";
import NetworkTab from "@/components/debug/NetworkTab";
import DatabaseTab from "@/components/debug/DatabaseTab";
import Navigation from "@/components/Navigation";

const Debug = () => {
  return (
    <div className="min-h-screen">
      <Navigation currentPage="Debug Console" />
      
      <div className="container py-6">
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

          <TabsContent value="logs">
            <LogsTab />
          </TabsContent>

          <TabsContent value="state">
            <StateTab />
          </TabsContent>

          <TabsContent value="network">
            <NetworkTab />
          </TabsContent>

          <TabsContent value="database">
            <DatabaseTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Debug;
