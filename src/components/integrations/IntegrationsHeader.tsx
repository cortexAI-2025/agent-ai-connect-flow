
import React from "react";

const IntegrationsHeader = () => {
  return (
    <header className="text-center mb-8 animate-fade-in">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
        Integrations
      </h1>
      <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
        Connect your application to external services to extend its functionality
      </p>
    </header>
  );
};

export default IntegrationsHeader;
