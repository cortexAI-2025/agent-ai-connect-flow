
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

/**
 * Header component for the documentation page
 */
const DocumentationHeader = () => {
  return (
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
        Comprehensive guide to understand and use Agent AI Connect Flow
      </p>
    </header>
  );
};

export default DocumentationHeader;
