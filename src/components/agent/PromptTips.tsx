
import { FC } from "react";

const PromptTips: FC = () => {
  return (
    <div className="bg-accent/50 p-4 rounded-md mb-4 text-sm animate-fade-in">
      <h3 className="font-medium mb-2">Tips for Effective Agent Creation:</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <span className="font-medium">Descriptive Names:</span> Choose names that clearly identify the agent's purpose (e.g., "Data Processing Agent", "Customer Support Bot")
        </li>
        <li>
          <span className="font-medium">Appropriate Budgets:</span> Start with smaller budgets (under $100) and increase as you confirm the agent's effectiveness
        </li>
        <li>
          <span className="font-medium">Minimal Permissions:</span> Follow the principle of least privilege—only enable permissions absolutely necessary for tasks
        </li>
        <li>
          <span className="font-medium">Regular Monitoring:</span> Check agent activity logs and performance metrics weekly to ensure proper functioning
        </li>
        <li>
          <span className="font-medium">Staged Deployment:</span> Test agents in controlled environments before full production deployment
        </li>
      </ul>
    </div>
  );
};

export default PromptTips;
