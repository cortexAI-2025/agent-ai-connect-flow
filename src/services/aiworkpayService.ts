
import { AIWorkPayResponse, Mission, MissionStatus } from "@/types";
import { toast } from "sonner";
import { stripeService } from "./stripeService";

// This is a mock implementation - in a real application, this would connect to AIWorkPay API
export const aiworkpayService = {
  createMission: async (
    agentId: string, 
    stripeAccountId: string, 
    mission: Omit<Mission, "id" | "createdAt" | "status" | "agentId">
  ): Promise<AIWorkPayResponse> => {
    console.log("Creating mission on AIWorkPay:", mission.title);
    
    // Sign the request using the Stripe toolkit
    const signature = stripeService.signRequest(
      { mission: mission.title, reward: mission.reward },
      "agent_secret_" + agentId
    );
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, this would call the AIWorkPay API
    // Simulate occasional failures
    const success = Math.random() > 0.1;
    
    if (success) {
      toast.success("Mission created successfully on AIWorkPay");
      return {
        success: true,
        missionId: `mission_${Math.random().toString(36).substring(2, 9)}`,
        data: {
          ...mission,
          id: `mission_${Math.random().toString(36).substring(2, 9)}`,
          status: "pending" as MissionStatus,
          createdAt: new Date().toISOString(),
          agentId
        }
      };
    } else {
      toast.error("Failed to create mission on AIWorkPay");
      return {
        success: false,
        error: "Failed to create mission. Service temporarily unavailable."
      };
    }
  },
  
  getMissionStatus: async (missionId: string): Promise<AIWorkPayResponse> => {
    console.log("Checking status for mission:", missionId);
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, this would call the AIWorkPay API
    // For demo purposes, randomly select a status
    const statuses: MissionStatus[] = ["pending", "assigned", "completed", "validated", "paid"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      success: true,
      data: {
        status: randomStatus,
        updatedAt: new Date().toISOString()
      }
    };
  },
  
  validateMission: async (missionId: string, approved: boolean): Promise<AIWorkPayResponse> => {
    console.log(`${approved ? "Validating" : "Rejecting"} mission:`, missionId);
    
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // In a real implementation, this would call the AIWorkPay API
    if (approved) {
      toast.success("Mission validated successfully");
      return {
        success: true,
        data: {
          status: "validated",
          validatedAt: new Date().toISOString()
        }
      };
    } else {
      toast.info("Mission rejected");
      return {
        success: true,
        data: {
          status: "rejected",
          rejectedAt: new Date().toISOString()
        }
      };
    }
  }
};
