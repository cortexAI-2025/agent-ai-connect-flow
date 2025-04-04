
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Code } from "lucide-react";

// Import markdown content directly as strings
const agentDocumentation = `
# Documentation: Agent AI Connect Flow

## Overview

Agent AI Connect Flow is a platform that allows you to create and manage autonomous AI agents capable of interacting with freelancers via AIWorkPay and managing payments via Stripe. This documentation explains how to use the platform and its main features.

## Table of Contents

1. [Creating an Agent](#creating-an-agent)
2. [Agent Dashboard](#agent-dashboard)
3. [Creating Missions](#creating-missions)
4. [Automation Center](#automation-center)
5. [Integrations](#integrations)
6. [Knowledge Base](#knowledge-base)
7. [Practical Examples](#practical-examples)

## Creating an Agent

To create a new autonomous agent:

1. Go to the application's home page
2. Fill out the agent creation form with:
   - **Agent Name**: A descriptive name (e.g., "Web Scraping Agent")
   - **Monthly Budget**: Maximum amount the agent can spend (e.g., 500 USD)
   - **Permissions**: Select the permissions granted to the agent:
     - \`create_charge\`: Allow the agent to create charges on the Stripe account
     - \`approve_payouts\`: Allow the agent to approve payments to freelancers
     - \`create_mission\`: Allow the agent to create new missions

**Best Practices**: 
- Assign a descriptive name that clearly indicates the agent's function
- Start with a limited budget to test the agent's behavior
- Only grant permissions strictly necessary for the agent's function

## Agent Dashboard

Once the agent is created, you'll access its dashboard which displays:

- **Agent Information**: Name, ID, associated Stripe account
- **Budget**: Monthly budget and remaining balance
- **Permissions**: List of granted permissions
- **Mission Statistics**: Total number and number of completed missions

This dashboard is your control center for monitoring the agent's activity and budget usage.

## Creating Missions

In the "Agent Dashboard" tab, you can create new missions for freelancers:

1. Fill out the "Create New Mission" form with:
   - **Mission Title**: Concise description of the task
   - **Description**: Detailed explanation of the mission
   - **Detailed Instructions**: Precise steps to accomplish the task
   - **Reward**: Amount in USD to pay the freelancer
   - **Target URL** (optional): Relevant URL for the mission

After creation, the mission will be published on AIWorkPay where freelancers can view and respond to it.

**Mission Example**:
- **Title**: "Scrape product data from an e-commerce site"
- **Description**: "Extract names, prices, and images of 100 products on example.com"
- **Instructions**: "Use a scraping tool to extract data from product pages. Provide the data in a structured JSON format..."
- **Reward**: 15.00 USD
- **Target URL**: "https://example.com/products"

## Automation Center

In the "Automation Center" tab, you can configure automated behaviors for your agent:

- **Auto-validation of completed missions**: Automatically validates missions marked as completed
- **Automatic payment processing**: Makes payments as soon as a mission is validated

The activity log displays the automated actions performed by the agent in real-time.

## Integrations

The application offers several integrations:

- **AIWorkPay**: Connects the agent to AIWorkPay's freelancer network
- **Supabase**: Allows extending functionality with a database
- **GitHub**: Facilitates code synchronization with a GitHub repository

## Knowledge Base

The "Project Knowledge" section allows you to store important information:

1. Access this section via the "Project Knowledge" button at the top of the interface
2. Create new entries with a title and content
3. View and edit existing entries

This function is useful for documenting processes, storing technical information, or sharing specific instructions.

## Practical Examples

### Example 1: Content Generation Agent

**Agent Configuration**:
- **Name**: "Content Generator"
- **Budget**: 300 USD/month
- **Permissions**: create_mission, approve_payouts

**Creating a Mission**:
- **Title**: "Write a blog post about AI"
- **Description**: "Create a 1500-word article on practical AI applications"
- **Reward**: 25 USD

**Automation**:
- Enable automatic validation for quick processing

### Example 2: Data Analysis Agent

**Agent Configuration**:
- **Name**: "Data Analyzer"
- **Budget**: 800 USD/month
- **Permissions**: create_charge, approve_payouts, create_mission

**Creating a Mission**:
- **Title**: "Analyze customer feedback data"
- **Description**: "Categorize and summarize 500 customer feedback entries"
- **Reward**: 30 USD

**Automation**:
- Enable automatic validation and payment

## Tips for Optimal Use

1. **Start small**: Begin with simple missions and a limited budget
2. **Monitor regularly**: Check the dashboard to track the agent's activity
3. **Iterate progressively**: Adjust agent parameters based on results
4. **Documentation**: Use the knowledge base to document processes
5. **Careful automation**: Only enable full automation after manually testing the process

---

For any questions or additional assistance, contact the AIWorkPay team at contact@aiworkpay.tech or visit https://aiworkpay.tech.
`;

const codeExamples = `
# Code Examples: Agent AI Connect Flow

This document provides code examples to illustrate how to use the AIWorkPay and Stripe services in your application.

## Table of Contents

1. [Creating a Mission via AIWorkPay](#creating-a-mission-via-aiworkpay)
2. [Checking Stripe Balance](#checking-stripe-balance)
3. [Validating a Mission](#validating-a-mission)
4. [Processing a Payment](#processing-a-payment)
5. [Automation Examples](#automation-examples)

## Creating a Mission via AIWorkPay

Here's how to create a new mission using the AIWorkPay service:

\`\`\`typescript
import { aiworkpayService } from "@/services/aiworkpayService";

// Agent information
const agentId = "agent_123";
const stripeAccountId = "acct_agent_456";

// Mission data
const missionData = {
  title: "Scrape product data",
  description: "Extract information from 100 products on example.com",
  reward: 15.00,
  metadata: {
    url: "https://example.com/products",
    instructions: "Use a scraping tool to extract name, price and images...",
  },
};

// Creating the mission
async function createNewMission() {
  try {
    const response = await aiworkpayService.createMission(
      agentId,
      stripeAccountId,
      missionData
    );
    
    if (response.success && response.data) {
      console.log("Mission created successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to create mission:", response.error);
    }
  } catch (error) {
    console.error("Error creating mission:", error);
  }
}
\`\`\`

## Checking Stripe Balance

To check an agent's remaining balance on Stripe:

\`\`\`typescript
import { stripeService } from "@/services/stripeService";

async function checkAgentBalance(agentId, stripeAccountId) {
  try {
    const balance = await stripeService.checkBalance(agentId, stripeAccountId);
    console.log(\`Current balance: $\${balance.toFixed(2)}\`);
    return balance;
  } catch (error) {
    console.error("Error checking balance:", error);
  }
}
\`\`\`

## Validating a Mission

To validate a completed mission:

\`\`\`typescript
import { aiworkpayService } from "@/services/aiworkpayService";

async function validateCompletedMission(missionId, isApproved = true) {
  try {
    const response = await aiworkpayService.validateMission(missionId, isApproved);
    
    if (response.success) {
      console.log(\`Mission \${missionId} \${isApproved ? 'validated' : 'rejected'} successfully\`);
      return true;
    } else {
      console.error("Validation failed:", response.error);
      return false;
    }
  } catch (error) {
    console.error("Error validating mission:", error);
    return false;
  }
}
\`\`\`

## Processing a Payment

To process a payment after mission validation:

\`\`\`typescript
import { stripeService } from "@/services/stripeService";

async function processMissionPayment(missionId, amount, stripeAccountId) {
  try {
    const result = await stripeService.approvePayment(
      missionId,
      amount,
      stripeAccountId
    );
    
    if (result.success) {
      console.log(\`Payment of $\${amount} processed successfully for mission \${missionId}\`);
      return true;
    } else {
      console.error("Payment failed:", result.error);
      return false;
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    return false;
  }
}
\`\`\`

## Automation Examples

Example of implementing a complete automation flow:

\`\`\`typescript
// Function to automatically process missions
async function autoProcessMissions(agent, missions) {
  // Filter completed but not validated missions
  const completedMissions = missions.filter(m => m.status === "completed");
  
  for (const mission of completedMissions) {
    console.log(\`Automatic processing of mission: \${mission.title}\`);
    
    // 1. Validate the mission
    const isValidated = await validateCompletedMission(mission.id, true);
    
    if (isValidated) {
      // 2. Process the payment
      const isPaid = await processMissionPayment(
        mission.id,
        mission.reward,
        agent.stripeAccountId
      );
      
      if (isPaid) {
        console.log(\`Mission \${mission.id} validated and paid successfully\`);
      }
    }
  }
}

// Example of usage with an interval
function startAutomation(agent, getMissions) {
  setInterval(async () => {
    const currentMissions = await getMissions(agent.id);
    await autoProcessMissions(agent, currentMissions);
  }, 60000); // Check every minute
}
\`\`\`

These examples illustrate how you can programmatically interact with the AIWorkPay and Stripe services to automate mission management and payments.

For more information about the AIWorkPay API, visit [https://aiworkpay.tech](https://aiworkpay.tech).
`;

const Documentation = () => {
  const [activeTab, setActiveTab] = useState<string>("docs");

  // Simple markdown rendering function
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
            .replace(/\`\`\`([\s\S]*?)\`\`\`/gm, '<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code>$1</code></pre>')
            .replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/gm, '<em>$1</em>')
            .replace(/^---$/gm, '<hr class="my-6" />')
            .replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2" class="text-primary hover:underline">$1</a>')
            .replace(/\n\n/gm, '</p><p class="my-3">')
            .replace(/\`(.*?)\`/gm, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
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
              {renderMarkdown(agentDocumentation)}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="examples" className="p-6">
            <ScrollArea className="h-[calc(100vh-250px)]">
              {renderMarkdown(codeExamples)}
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Documentation;
