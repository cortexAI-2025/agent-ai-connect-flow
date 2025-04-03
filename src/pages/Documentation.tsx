
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Code } from "lucide-react";

const Documentation = () => {
  const [activeTab, setActiveTab] = useState<string>("docs");
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [examplesContent, setExamplesContent] = useState<string>("");

  // Fetch markdown content on component mount
  React.useEffect(() => {
    const fetchDocs = async () => {
      try {
        const docsResponse = await fetch('/src/docs/AgentDocumentation.md');
        const examplesResponse = await fetch('/src/docs/CodeExamples.md');
        
        if (docsResponse.ok && examplesResponse.ok) {
          const docsText = await docsResponse.text();
          const examplesText = await examplesResponse.text();
          setMarkdownContent(docsText);
          setExamplesContent(examplesText);
        } else {
          console.error('Failed to fetch markdown files');
        }
      } catch (error) {
        console.error('Error fetching markdown:', error);
      }
    };

    fetchDocs();
  }, []);

  // Simple markdown rendering function for demo purposes
  // In a real app, you'd use a proper markdown parser like marked or react-markdown
  const renderMarkdown = (markdown: string) => {
    return (
      <div 
        className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{
          __html: markdown
            .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
            .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
            .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
            .replace(/^#### (.*$)/gm, '<h4 class="text-lg font-bold mt-4 mb-2">$1</h4>')
            .replace(/^\* (.*$)/gm, '<li>$1</li>')
            .replace(/^- (.*$)/gm, '<li>$1</li>')
            .replace(/<li>(.*)<\/li>/gm, '<ul class="list-disc pl-5 my-2"><li>$1</li></ul>')
            .replace(/```(typescript|javascript|tsx|jsx|js|ts)\n([\s\S]*?)```/gm, '<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code>$2</code></pre>')
            .replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/gm, '<em>$1</em>')
            .replace(/^---$/gm, '<hr class="my-6" />')
            .replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2" class="text-primary hover:underline">$1</a>')
            .replace(/\n\n/gm, '</p><p class="my-3">')
        }}
      />
    );
  };

  return (
    <div className="container py-6 min-h-screen">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <h1 className="text-3xl font-bold mt-4">Documentation</h1>
        <p className="text-muted-foreground">
          Complete guide to understanding and using Agent AI Connect Flow
        </p>
      </header>

      <Tabs defaultValue="docs" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="docs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Documentation</span>
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Code Examples</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="bg-card rounded-lg border shadow-sm">
          <TabsContent value="docs" className="p-6">
            <ScrollArea className="h-[calc(100vh-250px)]">
              {renderMarkdown(markdownContent)}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="examples" className="p-6">
            <ScrollArea className="h-[calc(100vh-250px)]">
              {renderMarkdown(examplesContent)}
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Documentation;
