
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AgentPermission } from "@/types";

interface PermissionsSelectorProps {
  permissions: AgentPermission[];
  onChange: (permissions: AgentPermission[]) => void;
}

const PermissionsSelector = ({ permissions, onChange }: PermissionsSelectorProps) => {
  const handlePermissionChange = (permission: AgentPermission) => {
    if (permissions.includes(permission)) {
      onChange(permissions.filter((p) => p !== permission));
    } else {
      onChange([...permissions, permission]);
    }
  };

  return (
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
  );
};

export default PermissionsSelector;
