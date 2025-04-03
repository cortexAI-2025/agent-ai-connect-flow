
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const DocumentationLink: React.FC = () => {
  const location = useLocation();
  
  // Ne pas afficher les liens sur les pages de documentation et de contact
  if (location.pathname === "/documentation" || location.pathname === "/contact") return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <Button asChild variant="secondary" className="shadow-lg flex items-center gap-2">
        <Link to="/documentation">
          <FileText className="h-4 w-4" />
          <span>Documentation</span>
        </Link>
      </Button>
      <Button asChild variant="secondary" className="shadow-lg flex items-center gap-2">
        <Link to="/contact">
          <Mail className="h-4 w-4" />
          <span>Contact</span>
        </Link>
      </Button>
    </div>
  );
};

export default DocumentationLink;
