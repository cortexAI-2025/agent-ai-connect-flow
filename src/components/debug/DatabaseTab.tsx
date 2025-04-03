
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DatabaseTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Explorer</CardTitle>
        <CardDescription>
          View and query database tables
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Database tools will be available in future updates.</p>
      </CardContent>
    </Card>
  );
};

export default DatabaseTab;
