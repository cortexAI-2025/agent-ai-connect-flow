
import { Agent, Mission } from "@/types";

export const mockAgents: Agent[] = [
  {
    id: "agent_1",
    name: "Web Scraping Agent",
    stripeAccountId: "acct_agent_123",
    monthlyBudget: 500,
    balanceRemaining: 450,
    permissions: ["create_charge", "approve_payouts", "create_mission"]
  },
  {
    id: "agent_2",
    name: "Content Generator",
    stripeAccountId: "acct_agent_456",
    monthlyBudget: 300,
    balanceRemaining: 275,
    permissions: ["create_mission", "approve_payouts"]
  },
  {
    id: "agent_3",
    name: "Data Analyzer",
    stripeAccountId: "acct_agent_789",
    monthlyBudget: 800,
    balanceRemaining: 720,
    permissions: ["create_charge", "approve_payouts", "create_mission"]
  }
];

export const mockMissions: Mission[] = [
  {
    id: "mission_1",
    title: "Scrape product details from Shopify store",
    description: "Extract name, price, and images from 100 products on example.com",
    reward: 15.00,
    status: "completed",
    createdAt: "2025-03-15T10:30:00Z",
    completedAt: "2025-03-15T14:45:00Z",
    metadata: {
      url: "https://shop.example.com",
      format: "json"
    },
    agentId: "agent_1"
  },
  {
    id: "mission_2",
    title: "Translate technical document",
    description: "Translate a 5-page medical document from English to French",
    reward: 25.00,
    status: "assigned",
    createdAt: "2025-03-14T08:15:00Z",
    metadata: {
      docUrl: "https://docs.example.com/medical-report",
      languages: ["en", "fr"]
    },
    agentId: "agent_2"
  },
  {
    id: "mission_3",
    title: "Analyze customer feedback data",
    description: "Categorize and summarize 500 customer feedback entries",
    reward: 30.00,
    status: "pending",
    createdAt: "2025-03-16T09:00:00Z",
    metadata: {
      dataSource: "feedback_march.csv",
      categories: ["bugs", "features", "ux", "other"]
    },
    agentId: "agent_3"
  }
];
