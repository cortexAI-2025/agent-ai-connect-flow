
import React from "react";
import { useEffect, useState } from "react";
import DocumentationHeader from "./DocumentationHeader";
import DocumentationTabs from "./DocumentationTabs";

/**
 * Component to load and display documentation content
 */
const DocumentationContent = () => {
  const [activeTab, setActiveTab] = useState<string>("docs");
  const [agentDocumentation, setAgentDocumentation] = useState<string>("");
  const [codeExamples, setCodeExamples] = useState<string>("");

  // Load documentation content on mount
  useEffect(() => {
    // Fetch agent documentation
    fetch("/src/docs/AgentDocumentation.md")
      .then(response => response.text())
      .then(text => setAgentDocumentation(text))
      .catch(error => {
        console.error("Error loading agent documentation:", error);
        // Fallback to empty content
        setAgentDocumentation("# Documentation non disponible\n\nVeuillez réessayer plus tard.");
      });

    // Fetch code examples
    fetch("/src/docs/CodeExamples.md")
      .then(response => response.text())
      .then(text => setCodeExamples(text))
      .catch(error => {
        console.error("Error loading code examples:", error);
        // Fallback to empty content
        setCodeExamples("# Exemples de code non disponibles\n\nVeuillez réessayer plus tard.");
      });
  }, []);

  return (
    <div className="container py-6 min-h-screen">
      <DocumentationHeader />
      <DocumentationTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        agentDocumentation={agentDocumentation}
        codeExamples={codeExamples}
      />
    </div>
  );
};

export default DocumentationContent;
