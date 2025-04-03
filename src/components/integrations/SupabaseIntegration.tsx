
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, LinkIcon, ExternalLink } from "lucide-react";

const SupabaseIntegration = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Supabase Integration
        </CardTitle>
        <CardDescription>
          Connect your own Supabase database to extend your application's functionality
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/30 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-3">Why Supabase?</h3>
          <ul className="space-y-2 text-sm list-disc pl-5">
            <li>Complete PostgreSQL database</li>
            <li>User authentication</li>
            <li>File storage</li>
            <li>Edge functions and API</li>
            <li>Simple admin interface</li>
          </ul>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-3">How to connect Supabase</h3>
          <p className="text-sm mb-4">
            Lovable offers native integration with Supabase. To activate it:
          </p>
          <ol className="space-y-2 text-sm list-decimal pl-5 mb-6">
            <li>Click on the Supabase menu at the top right of the interface</li>
            <li>Log in to your Supabase account</li> 
            <li>Select your project or create a new one</li>
            <li>Follow the instructions to complete the integration</li>
          </ol>
          
          <div className="flex justify-center gap-4 mt-4">
            <Button className="gap-2">
              <LinkIcon className="h-4 w-4" />
              Connect Supabase
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a href="https://docs.lovable.dev/integrations/supabase/" target="_blank" rel="noopener noreferrer">
                Documentation
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseIntegration;
