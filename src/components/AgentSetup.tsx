
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Agent, AgentPermission } from "@/types";
import { stripeService } from "@/services/stripeService";
import { Loader2, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [showPromptTips, setShowPromptTips] = useState(false);

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
    <Card className="w-full max-w-md mx-auto animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Configure Your Agent
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setShowPromptTips(!showPromptTips)}
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-64">Click for prompt tips</p>
            </TooltipContent>
          </Tooltip>
        </CardTitle>
        <CardDescription>
          Set up an autonomous agent with Stripe payment capabilities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showPromptTips && (
          <div className="bg-accent/50 p-3 rounded-md mb-4 text-sm animate-fade-in">
            <h3 className="font-medium mb-1">Tips for Effective Agent Creation:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use descriptive names that reflect the agent's purpose</li>
              <li>Set realistic budgets based on expected task volume</li>
              <li>Only enable permissions the agent truly needs</li>
              <li>Start with smaller budgets and increase as needed</li>
            </ul>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="agent-name" className="flex items-center gap-2">
            Agent Name
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-64">Choose a descriptive name that reflects the agent's purpose, e.g. "Data Scraper Agent"</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <Input
            id="agent-name"
            placeholder="Web Scraping Agent"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="transition-all duration-300 focus:ring-2 focus:ring-primary/30"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="budget" className="flex items-center gap-2">
            Monthly Budget (USD)
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-64">Set a reasonable monthly spending limit for this agent</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <Input
            id="budget"
            type="number"
            min="0"
            step="10"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="transition-all duration-300 focus:ring-2 focus:ring-primary/30"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            Agent Permissions
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-64">Only grant permissions that this agent needs to function</p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <div className="space-y-2 bg-background/50 p-3 rounded-md">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="create-mission" 
                checked={permissions.includes("create_mission")}
                onCheckedChange={() => handlePermissionChange("create_mission")}
              />
              <Label htmlFor="create-mission" className="text-sm font-normal cursor-pointer">Create Missions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="create-charge" 
                checked={permissions.includes("create_charge")}
                onCheckedChange={() => handlePermissionChange("create_charge")}
              />
              <Label htmlFor="create-charge" className="text-sm font-normal cursor-pointer">Create Charges</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="approve-payouts" 
                checked={permissions.includes("approve_payouts")}
                onCheckedChange={() => handlePermissionChange("approve_payouts")}
              />
              <Label htmlFor="approve-payouts" className="text-sm font-normal cursor-pointer">Approve Payouts</Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-1px]" 
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
