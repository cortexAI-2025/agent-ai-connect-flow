
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Agent, AgentPermission } from "@/types";
import { stripeService } from "@/services/stripeService";
import { Loader2, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PromptTips from "./agent/PromptTips";
import PermissionsSelector from "./agent/PermissionsSelector";

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
        {showPromptTips && <PromptTips />}

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
        
        <PermissionsSelector 
          permissions={permissions} 
          onChange={setPermissions} 
        />
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
