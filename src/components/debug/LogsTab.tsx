
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Bell, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Types for the logs
export interface LogEntry {
  id: number;
  level: "info" | "warn" | "error";
  message: string;
  timestamp: string;
}

// Mock data for demonstration
const mockLogs: LogEntry[] = [
  { id: 1, level: "info", message: "Application started", timestamp: new Date().toISOString() },
  { id: 2, level: "warn", message: "API rate limit approaching", timestamp: new Date().toISOString() },
  { id: 3, level: "error", message: "Failed to connect to database", timestamp: new Date().toISOString() },
  { id: 4, level: "info", message: "User authentication successful", timestamp: new Date().toISOString() }
];

const LogsTab = () => {
  const { toast } = useToast();
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>(mockLogs);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newLogsCount, setNewLogsCount] = useState(0);
  const [filters, setFilters] = useState({
    info: true,
    warn: true,
    error: true
  });

  // Apply filters when logs or filters change
  useEffect(() => {
    const filtered = logs.filter(log => {
      if (log.level === "info" && filters.info) return true;
      if (log.level === "warn" && filters.warn) return true;
      if (log.level === "error" && filters.error) return true;
      return false;
    });
    setFilteredLogs(filtered);
  }, [logs, filters]);

  const handleClearLogs = () => {
    setLogs([]);
    setNewLogsCount(0);
    toast({
      title: "Logs cleared",
      description: "All debug logs have been cleared"
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // In a real app, this would fetch fresh logs from a service
      const newLog: LogEntry = { 
        id: logs.length + 1, 
        level: "info", 
        message: "Logs refreshed at " + new Date().toLocaleTimeString(), 
        timestamp: new Date().toISOString() 
      };
      
      setLogs([...logs, newLog]);
      setNewLogsCount(prev => prev + 1);
      setIsRefreshing(false);
      toast({
        title: "Logs refreshed",
        description: "Debug logs have been updated"
      });
    }, 800);
  };

  const simulateError = () => {
    toast({
      variant: "destructive",
      title: "Error simulated",
      description: "A test error has been logged"
    });
    
    const errorLog: LogEntry = { 
      id: logs.length + 1, 
      level: "error", 
      message: "Simulated error for testing", 
      timestamp: new Date().toISOString() 
    };
    
    setLogs([...logs, errorLog]);
    setNewLogsCount(prev => prev + 1);
  };

  const handleResetNewLogsCounter = () => {
    setNewLogsCount(0);
  };

  const toggleFilter = (type: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold">Application Logs</h2>
          {newLogsCount > 0 && (
            <Badge variant="destructive" className="animate-pulse flex items-center gap-1">
              <Bell className="h-3 w-3" />
              {newLogsCount} new
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Level</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filters.info}
                onCheckedChange={() => toggleFilter("info")}
              >
                <span className="text-blue-500 font-medium">INFO</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.warn}
                onCheckedChange={() => toggleFilter("warn")}
              >
                <span className="text-yellow-500 font-medium">WARN</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.error}
                onCheckedChange={() => toggleFilter("error")}
              >
                <span className="text-red-500 font-medium">ERROR</span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClearLogs}
          >
            Clear
          </Button>
          
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={simulateError}
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Simulate Error
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Log Events</CardTitle>
          <CardDescription>
            Recent system logs and events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full pr-4" onMouseEnter={handleResetNewLogsCounter}>
            {filteredLogs.length > 0 ? (
              <div className="space-y-3">
                {filteredLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className={`p-3 rounded-md border ${
                      log.level === 'error' 
                        ? 'bg-red-50 border-red-200 text-red-800' 
                        : log.level === 'warn'
                          ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                          : 'bg-blue-50 border-blue-200 text-blue-800'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium">
                        {log.level.toUpperCase()}
                      </span>
                      <span className="text-xs opacity-70">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1">
                      {log.message}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No logs available
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogsTab;
