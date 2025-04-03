
import { FC } from "react";

const PromptTips: FC = () => {
  return (
    <div className="bg-accent/50 p-3 rounded-md mb-4 text-sm animate-fade-in">
      <h3 className="font-medium mb-1">Tips for Effective Agent Creation:</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Use descriptive names that reflect the agent's purpose</li>
        <li>Set realistic budgets based on expected task volume</li>
        <li>Only enable permissions the agent truly needs</li>
        <li>Start with smaller budgets and increase as needed</li>
      </ul>
    </div>
  );
};

export default PromptTips;
