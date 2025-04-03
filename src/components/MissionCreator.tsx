
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Agent, Mission } from "@/types";
import { aiworkpayService } from "@/services/aiworkpayService";
import { Loader2 } from "lucide-react";

interface MissionCreatorProps {
  agent: Agent;
  onMissionCreated: (mission: Mission) => void;
}

const MissionCreator = ({ agent, onMissionCreated }: MissionCreatorProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [reward, setReward] = useState(10);
  const [metadataUrl, setMetadataUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateMission = async () => {
    if (!title || !description) return;
    
    setIsLoading(true);
    try {
      const response = await aiworkpayService.createMission(
        agent.id,
        agent.stripeAccountId,
        {
          title,
          description,
          reward,
          metadata: {
            url: metadataUrl,
            instructions: instructions,
          },
        }
      );
      
      if (response.success && response.data) {
        onMissionCreated(response.data as Mission);
        // Clear form
        setTitle("");
        setDescription("");
        setInstructions("");
        setReward(10);
        setMetadataUrl("");
      }
    } catch (error) {
      console.error("Error creating mission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Mission</CardTitle>
        <CardDescription>
          Define a task for human workers on AIWorkPay
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mission-title">Mission Title</Label>
          <Input
            id="mission-title"
            placeholder="E.g., Scrape product data from website"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mission-description">Description</Label>
          <Textarea
            id="mission-description"
            placeholder="Describe the task in detail..."
            className="min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mission-instructions">Detailed Instructions</Label>
          <Textarea
            id="mission-instructions"
            placeholder="Provide specific step-by-step instructions for completing the task..."
            className="min-h-[120px]"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="reward">Reward (USD)</Label>
            <Input
              id="reward"
              type="number"
              min="1"
              step="0.5"
              value={reward}
              onChange={(e) => setReward(Number(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="metadata-url">Target URL (Optional)</Label>
            <Input
              id="metadata-url"
              placeholder="https://example.com"
              value={metadataUrl}
              onChange={(e) => setMetadataUrl(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleCreateMission} 
          disabled={!title || !description || isLoading || reward <= 0}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Mission...
            </>
          ) : (
            "Create Mission"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MissionCreator;
