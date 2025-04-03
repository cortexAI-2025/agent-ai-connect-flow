
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Agent, AgentPermission } from "@/types";
import { stripeService } from "@/services/stripeService";
import { Loader2 } from "lucide-react";

interface AgentSetupProps {
  onAgentCreated: (agent: Agent) => void;
}

const AgentSetup = ({ onAgentCreated }: AgentSetupProps) => {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
  const [permissions, setPermissions] = useState<AgentPermission[]>([
    "create_mission",
    "approve_payouts",
  ]);

  const handlePermissionChange = (permission: AgentPermission) => {
    if (permissions.includes(permission)) {
      setPermissions(permissions.filter((p) => p !== permission));
    } else {
      setPermissions([...permissions, permission]);
    }
  };

  const handleCreateAgent = async () => {
    if (!name) return;
    
    setIsLoading(true);
    try {
      const agent = await stripeService.createAgentAccount(
        name,
        budget,
        permissions
      );
      onAgentCreated(agent);
    } catch (error) {
      console.error("Error creating agent:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Configure Your Agent</CardTitle>
        <CardDescription>
          Set up an autonomous agent with Stripe payment capabilities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="agent-name">Agent Name</Label>
          <Input
            id="agent-name"
            placeholder="Web Scraping Agent"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="budget">Monthly Budget (USD)</Label>
          <Input
            id="budget"
            type="number"
            min="0"
            step="10"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Agent Permissions</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="create-mission" 
                checked={permissions.includes("create_mission")}
                onCheckedChange={() => handlePermissionChange("create_mission")}
              />
              <Label htmlFor="create-mission">Create Missions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="create-charge" 
                checked={permissions.includes("create_charge")}
                onCheckedChange={() => handlePermissionChange("create_charge")}
              />
              <Label htmlFor="create-charge">Create Charges</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="approve-payouts" 
                checked={permissions.includes("approve_payouts")}
                onCheckedChange={() => handlePermissionChange("approve_payouts")}
              />
              <Label htmlFor="approve-payouts">Approve Payouts</Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleCreateAgent} 
          disabled={!name || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Agent...
            </>
          ) : (
            "Create Agent"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentSetup;
