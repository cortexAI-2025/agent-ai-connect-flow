
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

```typescript
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
```

## Checking Stripe Balance

To check an agent's remaining balance on Stripe:

```typescript
import { stripeService } from "@/services/stripeService";

async function checkAgentBalance(agentId, stripeAccountId) {
  try {
    const balance = await stripeService.checkBalance(agentId, stripeAccountId);
    console.log(`Current balance: $${balance.toFixed(2)}`);
    return balance;
  } catch (error) {
    console.error("Error checking balance:", error);
  }
}
```

## Validating a Mission

To validate a completed mission:

```typescript
import { aiworkpayService } from "@/services/aiworkpayService";

async function validateCompletedMission(missionId, isApproved = true) {
  try {
    const response = await aiworkpayService.validateMission(missionId, isApproved);
    
    if (response.success) {
      console.log(`Mission ${missionId} ${isApproved ? 'validated' : 'rejected'} successfully`);
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
```

## Processing a Payment

To process a payment after mission validation:

```typescript
import { stripeService } from "@/services/stripeService";

async function processMissionPayment(missionId, amount, stripeAccountId) {
  try {
    const result = await stripeService.approvePayment(
      missionId,
      amount,
      stripeAccountId
    );
    
    if (result.success) {
      console.log(`Payment of $${amount} processed successfully for mission ${missionId}`);
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
```

## Automation Examples

Example of implementing a complete automation flow:

```typescript
// Function to automatically process missions
async function autoProcessMissions(agent, missions) {
  // Filter completed but not validated missions
  const completedMissions = missions.filter(m => m.status === "completed");
  
  for (const mission of completedMissions) {
    console.log(`Automatic processing of mission: ${mission.title}`);
    
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
        console.log(`Mission ${mission.id} validated and paid successfully`);
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
```

These examples illustrate how you can programmatically interact with the AIWorkPay and Stripe services to automate mission management and payments.

For more information about the AIWorkPay API, visit [https://aiworkpay.tech](https://aiworkpay.tech).
