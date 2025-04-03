
import { useState } from "react";
import { Bug, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const DebugBadge = () => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  
  // Ne pas afficher le badge sur la page de debug
  if (!isVisible || location.pathname === "/debug") return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-white shadow-lg">
      <Link to="/debug">
        <Button variant="ghost" size="sm" className="h-8 gap-2 text-white hover:bg-slate-700 hover:text-white">
          <Bug className="h-4 w-4" />
          <span>Debug</span>
        </Button>
      </Link>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6 rounded-full bg-slate-700 p-1 hover:bg-slate-600"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
};

export default DebugBadge;
