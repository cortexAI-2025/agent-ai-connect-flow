
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentSetup from "@/components/AgentSetup";
import AgentDashboard from "@/components/AgentDashboard";
import AutomationCenter from "@/components/AutomationCenter";
import { Agent, Mission } from "@/types";
import { mockAgents, mockMissions } from "@/lib/mocks";

const Index = () => {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  
  const handleAgentCreated = (newAgent: Agent) => {
    setAgent(newAgent);
  };
  
  const handleMissionUpdated = (missionId: string, updates: Partial<Mission>) => {
    setMissions(missions.map(mission => 
      mission.id === missionId 
        ? { ...mission, ...updates } 
        : mission
    ));
  };
  
  // For demo purposes, allow using a mock agent
  const handleUseMockAgent = () => {
    setAgent(mockAgents[0]);
    setMissions(mockMissions);
  };

  return (
    <div className="container py-6 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Agent AI Connect Flow
        </h1>
        <p className="text-muted-foreground mt-2">
          Create autonomous agents that can outsource tasks to humans via AIWorkPay and Stripe
        </p>
      </header>
      
      {!agent ? (
        <div className="max-w-md mx-auto">
          <AgentSetup onAgentCreated={handleAgentCreated} />
          <div className="mt-4 text-center">
            <button 
              onClick={handleUseMockAgent}
              className="text-sm text-primary hover:underline"
            >
              Or use a demo agent with pre-populated data
            </button>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="dashboard">Agent Dashboard</TabsTrigger>
              <TabsTrigger value="automation">Automation Center</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="dashboard">
            <AgentDashboard agent={agent} />
          </TabsContent>
          <TabsContent value="automation">
            <AutomationCenter 
              agent={agent} 
              missions={missions} 
              onMissionUpdated={handleMissionUpdated} 
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Index;
