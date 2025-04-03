
# Exemples de Code: Agent AI Connect Flow

Ce document fournit des exemples de code pour illustrer comment utiliser les services AIWorkPay et Stripe dans votre application.

## Sommaire

1. [Création d'une mission via AIWorkPay](#création-dune-mission-via-aiworkpay)
2. [Vérification du solde Stripe](#vérification-du-solde-stripe)
3. [Validation d'une mission](#validation-dune-mission)
4. [Traitement d'un paiement](#traitement-dun-paiement)
5. [Exemples d'automatisation](#exemples-dautomatisation)

## Création d'une mission via AIWorkPay

Voici comment créer une nouvelle mission en utilisant le service AIWorkPay:

```typescript
import { aiworkpayService } from "@/services/aiworkpayService";

// Informations de l'agent
const agentId = "agent_123";
const stripeAccountId = "acct_agent_456";

// Données de la mission
const missionData = {
  title: "Scraper des données produit",
  description: "Extraire les informations de 100 produits sur example.com",
  reward: 15.00,
  metadata: {
    url: "https://example.com/products",
    instructions: "Utilisez un outil de scraping pour extraire nom, prix et images...",
  },
};

// Création de la mission
async function createNewMission() {
  try {
    const response = await aiworkpayService.createMission(
      agentId,
      stripeAccountId,
      missionData
    );
    
    if (response.success && response.data) {
      console.log("Mission créée avec succès:", response.data);
      return response.data;
    } else {
      console.error("Échec de création de la mission:", response.error);
    }
  } catch (error) {
    console.error("Erreur lors de la création de la mission:", error);
  }
}
```

## Vérification du solde Stripe

Pour vérifier le solde restant d'un agent sur Stripe:

```typescript
import { stripeService } from "@/services/stripeService";

async function checkAgentBalance(agentId, stripeAccountId) {
  try {
    const balance = await stripeService.checkBalance(agentId, stripeAccountId);
    console.log(`Solde actuel: $${balance.toFixed(2)}`);
    return balance;
  } catch (error) {
    console.error("Erreur lors de la vérification du solde:", error);
  }
}
```

## Validation d'une mission

Pour valider une mission terminée:

```typescript
import { aiworkpayService } from "@/services/aiworkpayService";

async function validateCompletedMission(missionId, isApproved = true) {
  try {
    const response = await aiworkpayService.validateMission(missionId, isApproved);
    
    if (response.success) {
      console.log(`Mission ${missionId} ${isApproved ? 'validée' : 'rejetée'} avec succès`);
      return true;
    } else {
      console.error("Échec de la validation:", response.error);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la validation de la mission:", error);
    return false;
  }
}
```

## Traitement d'un paiement

Pour traiter un paiement après validation d'une mission:

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
      console.log(`Paiement de $${amount} traité avec succès pour la mission ${missionId}`);
      return true;
    } else {
      console.error("Échec du paiement:", result.error);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors du traitement du paiement:", error);
    return false;
  }
}
```

## Exemples d'automatisation

Exemple d'implémentation d'un flux d'automatisation complet:

```typescript
// Fonction pour gérer automatiquement les missions
async function autoProcessMissions(agent, missions) {
  // Filtrer les missions terminées mais non validées
  const completedMissions = missions.filter(m => m.status === "completed");
  
  for (const mission of completedMissions) {
    console.log(`Traitement automatique de la mission: ${mission.title}`);
    
    // 1. Valider la mission
    const isValidated = await validateCompletedMission(mission.id, true);
    
    if (isValidated) {
      // 2. Traiter le paiement
      const isPaid = await processMissionPayment(
        mission.id,
        mission.reward,
        agent.stripeAccountId
      );
      
      if (isPaid) {
        console.log(`Mission ${mission.id} validée et payée avec succès`);
      }
    }
  }
}

// Exemple d'utilisation avec un intervalle
function startAutomation(agent, getMissions) {
  setInterval(async () => {
    const currentMissions = await getMissions(agent.id);
    await autoProcessMissions(agent, currentMissions);
  }, 60000); // Vérifier toutes les minutes
}
```

Ces exemples illustrent la manière dont vous pouvez interagir programmatiquement avec les services AIWorkPay et Stripe pour automatiser la gestion des missions et des paiements.

Pour plus d'informations sur l'API AIWorkPay, visitez [https://aiworkpay.tech](https://aiworkpay.tech).
