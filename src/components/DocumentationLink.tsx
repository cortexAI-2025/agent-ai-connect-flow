
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const DocumentationLink: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button asChild variant="secondary" className="shadow-lg flex items-center gap-2">
        <Link to="/documentation">
          <FileText className="h-4 w-4" />
          <span>Documentation</span>
        </Link>
      </Button>
    </div>
  );
};

export default DocumentationLink;
