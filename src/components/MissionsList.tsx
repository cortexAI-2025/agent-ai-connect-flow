
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mission } from "@/types";
import { aiworkpayService } from "@/services/aiworkpayService";
import { stripeService } from "@/services/stripeService";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface MissionsListProps {
  missions: Mission[];
  onMissionUpdated: (missionId: string, updates: Partial<Mission>) => void;
}

const MissionsList = ({ missions, onMissionUpdated }: MissionsListProps) => {
  const [loadingMissions, setLoadingMissions] = useState<Record<string, boolean>>({});
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "assigned": return "bg-blue-500";
      case "completed": return "bg-green-500";
      case "validated": return "bg-emerald-500";
      case "paid": return "bg-purple-500";
      case "rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };
  
  const handleValidateMission = async (mission: Mission) => {
    setLoadingMissions({ ...loadingMissions, [mission.id]: true });
    
    try {
      const response = await aiworkpayService.validateMission(mission.id, true);
      
      if (response.success) {
        // Update mission status
        onMissionUpdated(mission.id, { status: "validated" });
        
        // Process payment if mission is validated
        const paymentResult = await stripeService.approvePayment(
          mission.id,
          mission.reward,
          mission.agentId
        );
        
        if (paymentResult.success) {
          onMissionUpdated(mission.id, { status: "paid" });
        }
      }
    } catch (error) {
      console.error("Error validating mission:", error);
      toast.error("Failed to validate mission");
    } finally {
      setLoadingMissions({ ...loadingMissions, [mission.id]: false });
    }
  };
  
  const handleRejectMission = async (mission: Mission) => {
    setLoadingMissions({ ...loadingMissions, [mission.id]: true });
    
    try {
      const response = await aiworkpayService.validateMission(mission.id, false);
      
      if (response.success) {
        onMissionUpdated(mission.id, { status: "rejected" });
      }
    } catch (error) {
      console.error("Error rejecting mission:", error);
      toast.error("Failed to reject mission");
    } finally {
      setLoadingMissions({ ...loadingMissions, [mission.id]: false });
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Missions</CardTitle>
        <CardDescription>
          Manage tasks assigned to human workers
        </CardDescription>
      </CardHeader>
      <CardContent>
        {missions.length === 0 ? (
          <p className="text-center py-6 text-muted-foreground">
            No missions created yet. Use the form to create your first mission.
          </p>
        ) : (
          <div className="space-y-4">
            {missions.map((mission) => (
              <Card key={mission.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{mission.title}</h3>
                      <Badge className={`${getStatusColor(mission.status)}`}>
                        {mission.status.charAt(0).toUpperCase() + mission.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{mission.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Reward:</span> ${mission.reward.toFixed(2)}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Created:</span> {formatDate(mission.createdAt)}
                      </div>
                      {mission.completedAt && (
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Completed:</span> {formatDate(mission.completedAt)}
                        </div>
                      )}
                      {mission.metadata.url && (
                        <div className="col-span-2 truncate">
                          <span className="text-muted-foreground">URL:</span> {mission.metadata.url}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {mission.status === "completed" && (
                    <div className="flex flex-row md:flex-col justify-end bg-accent p-4 gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full"
                        onClick={() => handleValidateMission(mission)}
                        disabled={loadingMissions[mission.id]}
                      >
                        {loadingMissions[mission.id] ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" /> Validate & Pay
                          </>
                        )}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        onClick={() => handleRejectMission(mission)}
                        disabled={loadingMissions[mission.id]}
                      >
                        <XCircle className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MissionsList;
