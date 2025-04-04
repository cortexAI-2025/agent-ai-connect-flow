
# Exemples de code: Agent AI Connect Flow

Ce document fournit des exemples de code pour illustrer comment utiliser les services AIWorkPay et Stripe dans votre application.

## Table des matières

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
  title: "Extraire des données produits",
  description: "Extraire des informations sur 100 produits sur example.com",
  reward: 15.00,
  metadata: {
    url: "https://example.com/produits",
    instructions: "Utilisez un outil de scraping pour extraire nom, prix et images...",
  },
};

// Création de la mission
async function creerNouvelleMission() {
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

async function verifierSoldeAgent(agentId, stripeAccountId) {
  try {
    const solde = await stripeService.checkBalance(agentId, stripeAccountId);
    console.log(`Solde actuel: ${solde.toFixed(2)} €`);
    return solde;
  } catch (error) {
    console.error("Erreur lors de la vérification du solde:", error);
  }
}
```

## Validation d'une mission

Pour valider une mission terminée:

```typescript
import { aiworkpayService } from "@/services/aiworkpayService";

async function validerMissionTerminee(missionId, isApproved = true) {
  try {
    const response = await aiworkpayService.validateMission(missionId, isApproved);
    
    if (response.success) {
      console.log(`Mission ${missionId} ${isApproved ? 'validée' : 'rejetée'} avec succès`);
      return true;
    } else {
      console.error("Échec de validation:", response.error);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la validation de la mission:", error);
    return false;
  }
}
```

## Traitement d'un paiement

Pour traiter un paiement après validation de la mission:

```typescript
import { stripeService } from "@/services/stripeService";

async function traiterPaiementMission(missionId, montant, stripeAccountId) {
  try {
    const resultat = await stripeService.approvePayment(
      missionId,
      montant,
      stripeAccountId
    );
    
    if (resultat.success) {
      console.log(`Paiement de ${montant} € traité avec succès pour la mission ${missionId}`);
      return true;
    } else {
      console.error("Échec du paiement:", resultat.error);
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
// Fonction pour traiter automatiquement les missions
async function traiterAutomatiquementMissions(agent, missions) {
  // Filtrer les missions terminées mais non validées
  const missionsTerminees = missions.filter(m => m.status === "completed");
  
  for (const mission of missionsTerminees) {
    console.log(`Traitement automatique de la mission: ${mission.title}`);
    
    // 1. Valider la mission
    const estValidee = await validerMissionTerminee(mission.id, true);
    
    if (estValidee) {
      // 2. Traiter le paiement
      const estPayee = await traiterPaiementMission(
        mission.id,
        mission.reward,
        agent.stripeAccountId
      );
      
      if (estPayee) {
        console.log(`Mission ${mission.id} validée et payée avec succès`);
      }
    }
  }
}

// Exemple d'utilisation avec un intervalle
function demarrerAutomatisation(agent, getMissions) {
  setInterval(async () => {
    const missionsActuelles = await getMissions(agent.id);
    await traiterAutomatiquementMissions(agent, missionsActuelles);
  }, 60000); // Vérifier toutes les minutes
}
```

Ces exemples illustrent comment vous pouvez interagir par programmation avec les services AIWorkPay et Stripe pour automatiser la gestion des missions et les paiements.

Pour plus d'informations sur l'API AIWorkPay, visitez [https://aiworkpay.tech](https://aiworkpay.tech).
