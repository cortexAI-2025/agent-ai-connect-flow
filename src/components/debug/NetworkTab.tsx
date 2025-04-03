
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const NetworkTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Activity</CardTitle>
        <CardDescription>
          Monitor network requests and responses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Network monitoring will be available in future updates.</p>
      </CardContent>
    </Card>
  );
};

export default NetworkTab;
