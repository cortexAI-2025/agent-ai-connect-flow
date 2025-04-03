
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, RefreshCw, Play } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type TableInfo = {
  name: string;
  rowCount: number;
  lastUpdated: string;
};

// Mock database tables for demonstration
const mockTables: TableInfo[] = [
  { name: "users", rowCount: 23, lastUpdated: "2025-04-02 15:32:11" },
  { name: "missions", rowCount: 18, lastUpdated: "2025-04-03 09:17:34" },
  { name: "transactions", rowCount: 42, lastUpdated: "2025-04-02 22:10:45" },
];

type QueryResult = {
  columns: string[];
  rows: Record<string, any>[];
};

const DatabaseTab = () => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [queryInput, setQueryInput] = useState<string>("SELECT * FROM users LIMIT 10;");
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle viewing a table
  const handleViewTable = (tableName: string) => {
    setIsLoading(true);
    setSelectedTable(tableName);
    
    // Simulate loading table data from Supabase
    setTimeout(() => {
      // Mock table data based on selected table
      let data: Record<string, any>[] = [];
      let columns: string[] = [];
      
      if (tableName === "users") {
        columns = ["id", "name", "email", "created_at"];
        data = [
          { id: 1, name: "John Doe", email: "john@example.com", created_at: "2025-03-15" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", created_at: "2025-03-16" },
          { id: 3, name: "Bob Johnson", email: "bob@example.com", created_at: "2025-03-18" },
        ];
      } else if (tableName === "missions") {
        columns = ["id", "title", "status", "created_at"];
        data = [
          { id: 1, title: "Data Collection", status: "completed", created_at: "2025-04-01" },
          { id: 2, title: "Market Research", status: "pending", created_at: "2025-04-02" },
        ];
      } else if (tableName === "transactions") {
        columns = ["id", "amount", "status", "date"];
        data = [
          { id: 1, amount: 250, status: "completed", date: "2025-04-01" },
          { id: 2, amount: 150, status: "pending", date: "2025-04-02" },
          { id: 3, amount: 350, status: "completed", date: "2025-04-03" },
        ];
      }
      
      setQueryResult({ columns, rows: data });
      setIsLoading(false);
    }, 800);
  };

  // Function to execute custom SQL query
  const executeQuery = () => {
    setIsLoading(true);
    setSelectedTable(null);
    
    // Simulate query execution
    setTimeout(() => {
      // Mock query result
      const result: QueryResult = {
        columns: ["id", "name", "value"],
        rows: [
          { id: 1, name: "Result 1", value: 42 },
          { id: 2, name: "Result 2", value: 73 },
          { id: 3, name: "Result 3", value: 19 },
        ]
      };
      
      setQueryResult(result);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Explorer
        </CardTitle>
        <CardDescription>
          View and query your Supabase database tables
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tables" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="query">SQL Query</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tables" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockTables.map((table) => (
                <Card key={table.name} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewTable(table.name)}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-primary">{table.name}</h3>
                      <span className="text-xs bg-secondary rounded-full px-2 py-1">{table.rowCount} rows</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Last updated: {table.lastUpdated}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="query" className="space-y-4">
            <div className="space-y-2">
              <Textarea 
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Enter SQL query..."
                className="font-mono text-sm min-h-[120px]"
              />
              <Button 
                onClick={executeQuery} 
                className="gap-2"
                disabled={isLoading}
              >
                {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                Execute Query
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
        
        {!isLoading && queryResult && (
          <div className="mt-6 border rounded-md overflow-hidden">
            <div className="p-3 bg-muted flex items-center justify-between">
              <h3 className="font-medium">
                {selectedTable ? `Table: ${selectedTable}` : "Query Results"}
              </h3>
              <span className="text-xs bg-secondary rounded-full px-2 py-1">{queryResult.rows.length} rows</span>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {queryResult.columns.map((column) => (
                      <TableHead key={column}>{column}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queryResult.rows.map((row, index) => (
                    <TableRow key={index}>
                      {queryResult.columns.map((column) => (
                        <TableCell key={`${index}-${column}`}>{row[column]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
        
        <div className="mt-4 p-4 bg-muted rounded-md">
          <p className="text-sm">
            <strong>Note:</strong> This is a mock implementation. To connect to your actual Supabase database, 
            you'll need to activate the Supabase integration through Lovable and provide your project credentials.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseTab;
