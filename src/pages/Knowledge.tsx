
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Save, Plus, Trash, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// For the purpose of this demo, we'll use localStorage for persistence
// In a real app, this would typically connect to a backend
const STORAGE_KEY = "project_knowledge";

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const Knowledge = () => {
  const { toast } = useToast();
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const selectedItem = knowledgeItems.find(item => item.id === selectedItemId);

  const saveToLocalStorage = (items: KnowledgeItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    setKnowledgeItems(items);
  };

  const handleAddNew = () => {
    setSelectedItemId(null);
    setTitle("");
    setContent("");
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for this knowledge item",
        variant: "destructive"
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please provide content for this knowledge item",
        variant: "destructive"
      });
      return;
    }

    const newItems = [...knowledgeItems];
    
    if (selectedItemId) {
      // Update existing item
      const index = newItems.findIndex(item => item.id === selectedItemId);
      if (index !== -1) {
        newItems[index] = {
          ...newItems[index],
          title,
          content,
        };
      }
    } else {
      // Add new item
      newItems.push({
        id: Date.now().toString(),
        title,
        content,
        createdAt: new Date().toISOString(),
      });
    }

    saveToLocalStorage(newItems);
    setIsEditing(false);
    
    toast({
      title: selectedItemId ? "Knowledge updated" : "Knowledge added",
      description: `Successfully ${selectedItemId ? "updated" : "added"} "${title}"`,
    });
  };

  const handleEdit = (id: string) => {
    const item = knowledgeItems.find(item => item.id === id);
    if (item) {
      setSelectedItemId(id);
      setTitle(item.title);
      setContent(item.content);
      setIsEditing(true);
    }
  };

  const handleDelete = (id: string) => {
    const newItems = knowledgeItems.filter(item => item.id !== id);
    saveToLocalStorage(newItems);
    
    if (selectedItemId === id) {
      setSelectedItemId(null);
      setTitle("");
      setContent("");
      setIsEditing(false);
    }
    
    toast({
      title: "Knowledge deleted",
      description: "The knowledge item has been removed",
    });
  };

  const handleSelect = (id: string) => {
    setSelectedItemId(id);
    setIsEditing(false);
  };

  return (
    <div className="container py-6 min-h-screen">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Knowledge
          </Button>
        </div>
        <h1 className="text-3xl font-bold mt-4">Project Knowledge</h1>
        <p className="text-muted-foreground">
          Store and manage custom information or instructions for your project
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Knowledge items list */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Knowledge Items
            </CardTitle>
            <CardDescription>
              Select an item to view its details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full pr-4">
              {knowledgeItems.length > 0 ? (
                <div className="space-y-2">
                  {knowledgeItems.map((item) => (
                    <div 
                      key={item.id}
                      className={`p-3 rounded-md border cursor-pointer transition-colors ${
                        selectedItemId === item.id 
                          ? 'bg-primary/10 border-primary/20' 
                          : 'hover:bg-accent'
                      }`}
                      onClick={() => handleSelect(item.id)}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-medium">
                          {item.title}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground truncate">
                        {item.content.substring(0, 50)}
                        {item.content.length > 50 ? '...' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No knowledge items available
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Knowledge content */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {isEditing 
                ? (selectedItemId ? 'Edit Knowledge' : 'Add New Knowledge') 
                : (selectedItem ? selectedItem.title : 'Select or Create Knowledge')}
            </CardTitle>
            <CardDescription>
              {isEditing 
                ? 'Enter the information you want to store'
                : 'View or edit knowledge details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.g., API Documentation, Design Guidelines, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea 
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your knowledge content here..."
                    className="min-h-[200px]"
                  />
                </div>
              </div>
            ) : selectedItem ? (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Created: {new Date(selectedItem.createdAt).toLocaleString()}
                </div>
                <div className="p-4 bg-accent/30 rounded-md whitespace-pre-wrap">
                  {selectedItem.content}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                Select an item from the list or add a new knowledge item
              </div>
            )}
          </CardContent>
          {(isEditing || selectedItem) && (
            <CardFooter className="flex justify-end gap-2">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (selectedItemId) {
                        setIsEditing(false);
                      } else {
                        setSelectedItemId(null);
                        setTitle("");
                        setContent("");
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </>
              ) : selectedItem && (
                <Button onClick={() => handleEdit(selectedItem.id)} className="gap-2">
                  Edit
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Knowledge;
