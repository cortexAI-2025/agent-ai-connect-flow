
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Agent, Mission } from "@/types";
import MissionCreator from "./MissionCreator";
import MissionsList from "./MissionsList";
import { stripeService } from "@/services/stripeService";

interface AgentDashboardProps {
  agent: Agent;
}

const AgentDashboard = ({ agent }: AgentDashboardProps) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [balance, setBalance] = useState(agent.balanceRemaining);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  
  const refreshBalance = async () => {
    setIsLoadingBalance(true);
    try {
      const newBalance = await stripeService.checkBalance(agent.id, agent.stripeAccountId);
      setBalance(newBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setIsLoadingBalance(false);
    }
  };
  
  useEffect(() => {
    refreshBalance();
    // This would typically fetch missions from an API
    // For demo purposes, we're starting with an empty array
  }, [agent.id, agent.stripeAccountId]);
  
  const handleMissionCreated = (mission: Mission) => {
    setMissions([mission, ...missions]);
    // Update balance
    refreshBalance();
  };
  
  const handleMissionUpdated = (missionId: string, updates: Partial<Mission>) => {
    setMissions(missions.map(mission => 
      mission.id === missionId 
        ? { ...mission, ...updates } 
        : mission
    ));
    
    // If the mission was paid, update balance
    if (updates.status === "paid") {
      refreshBalance();
    }
  };
  
  const balancePercentage = (balance / agent.monthlyBudget) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{agent.name}</CardTitle>
          <CardDescription>
            Agent ID: {agent.id} • Stripe Account: {agent.stripeAccountId}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Monthly Budget</p>
                <p className="text-sm font-medium">
                  ${balance.toFixed(2)} / ${agent.monthlyBudget.toFixed(2)}
                </p>
              </div>
              <Progress value={balancePercentage} className="h-2" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-secondary rounded-md p-3">
                <p className="text-xs text-muted-foreground">Permissions</p>
                <p className="font-medium">
                  {agent.permissions.map(p => 
                    p.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')
                  ).join(', ')}
                </p>
              </div>
              
              <div className="bg-secondary rounded-md p-3">
                <p className="text-xs text-muted-foreground">Total Missions</p>
                <p className="font-medium">{missions.length}</p>
              </div>
              
              <div className="bg-secondary rounded-md p-3">
                <p className="text-xs text-muted-foreground">Completed Missions</p>
                <p className="font-medium">
                  {missions.filter(m => 
                    ['completed', 'validated', 'paid'].includes(m.status)
                  ).length}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MissionCreator agent={agent} onMissionCreated={handleMissionCreated} />
        <MissionsList missions={missions} onMissionUpdated={handleMissionUpdated} />
      </div>
    </div>
  );
};

export default AgentDashboard;
