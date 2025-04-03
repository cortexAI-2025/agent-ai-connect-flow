
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock state data for demonstration
const mockStateData = {
  "agents": [{ "id": "agent-1", "status": "active" }],
  "missions": [{ "id": "mission-1", "status": "pending" }],
  "systemStatus": "healthy"
};

const StateTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application State</CardTitle>
        <CardDescription>
          Current state of your application components
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">State monitoring tools will be available here.</p>
        <div className="bg-gray-100 p-4 rounded-md mt-4">
          <pre className="text-sm">
            {JSON.stringify(mockStateData, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default StateTab;
