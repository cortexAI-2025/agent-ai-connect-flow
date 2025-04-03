
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Agent, Mission } from "@/types";
import { aiworkpayService } from "@/services/aiworkpayService";
import { stripeService } from "@/services/stripeService";
import { toast } from "sonner";

interface AutomationCenterProps {
  agent: Agent;
  missions: Mission[];
  onMissionUpdated: (missionId: string, updates: Partial<Mission>) => void;
}

const AutomationCenter = ({ agent, missions, onMissionUpdated }: AutomationCenterProps) => {
  const [autoValidate, setAutoValidate] = useState(false);
  const [autoPayment, setAutoPayment] = useState(false);
  const [activityLog, setActivityLog] = useState<string[]>([]);
  
  // Simulate automation activities
  useEffect(() => {
    if (!autoValidate && !autoPayment) return;
    
    const completedMissions = missions.filter(m => m.status === "completed");
    if (completedMissions.length === 0) return;
    
    const interval = setInterval(async () => {
      // Randomly select a completed mission to process
      const missionIndex = Math.floor(Math.random() * completedMissions.length);
      const mission = completedMissions[missionIndex];
      
      if (autoValidate) {
        // Log the activity
        const logEntry = `[${new Date().toLocaleTimeString()}] Validating mission: ${mission.title}`;
        setActivityLog(prev => [logEntry, ...prev].slice(0, 10));
        
        try {
          const response = await aiworkpayService.validateMission(mission.id, true);
          
          if (response.success) {
            onMissionUpdated(mission.id, { status: "validated" });
            
            // Process payment if auto-payment is enabled
            if (autoPayment) {
              const paymentLogEntry = `[${new Date().toLocaleTimeString()}] Processing payment for: ${mission.title}`;
              setActivityLog(prev => [paymentLogEntry, ...prev].slice(0, 10));
              
              const paymentResult = await stripeService.approvePayment(
                mission.id,
                mission.reward,
                agent.stripeAccountId
              );
              
              if (paymentResult.success) {
                onMissionUpdated(mission.id, { status: "paid" });
              }
            }
          }
        } catch (error) {
          console.error("Automation error:", error);
          toast.error("Automation task failed");
        }
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoValidate, autoPayment, missions, agent, onMissionUpdated]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Automation Center</CardTitle>
        <CardDescription>
          Configure autonomous behaviors for your agent
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-validate">Auto-Validate Completed Missions</Label>
              <p className="text-sm text-muted-foreground">
                Automatically validate missions when they are marked as completed
              </p>
            </div>
            <Switch
              id="auto-validate"
              checked={autoValidate}
              onCheckedChange={setAutoValidate}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-payment">Auto-Payment Processing</Label>
              <p className="text-sm text-muted-foreground">
                Automatically process payments for validated missions
              </p>
            </div>
            <Switch
              id="auto-payment"
              checked={autoPayment}
              onCheckedChange={setAutoPayment}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Agent Activity Log</h3>
            <Badge variant="outline" className={autoValidate || autoPayment ? "bg-green-500/10" : ""}>
              {autoValidate || autoPayment ? "Active" : "Inactive"}
            </Badge>
          </div>
          
          <div className="bg-muted rounded-md p-3 h-64 overflow-auto">
            {activityLog.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                Automation is {autoValidate || autoPayment ? "active" : "inactive"}. 
                Activity logs will appear here.
              </p>
            ) : (
              <div className="space-y-2">
                {activityLog.map((log, index) => (
                  <p key={index} className="text-xs text-muted-foreground">
                    {log}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationCenter;
