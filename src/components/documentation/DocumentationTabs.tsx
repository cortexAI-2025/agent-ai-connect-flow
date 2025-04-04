
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Code } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";

interface DocumentationTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  agentDocumentation: string;
  codeExamples: string;
}

/**
 * Tabbed content component for documentation and code examples
 */
const DocumentationTabs = ({ 
  activeTab, 
  onTabChange, 
  agentDocumentation, 
  codeExamples 
}: DocumentationTabsProps) => {
  return (
    <Tabs 
      defaultValue="docs" 
      value={activeTab} 
      onValueChange={onTabChange} 
      className="w-full"
    >
      <div className="flex justify-center mb-6">
        <TabsList>
          <TabsTrigger value="docs" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Documentation</span>
          </TabsTrigger>
          <TabsTrigger value="examples" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>Exemples de code</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="bg-card rounded-lg border shadow-sm">
        <TabsContent value="docs" className="p-6">
          <ScrollArea className="h-[calc(100vh-250px)]">
            <MarkdownRenderer markdown={agentDocumentation} />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="examples" className="p-6">
          <ScrollArea className="h-[calc(100vh-250px)]">
            <MarkdownRenderer markdown={codeExamples} />
          </ScrollArea>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default DocumentationTabs;
