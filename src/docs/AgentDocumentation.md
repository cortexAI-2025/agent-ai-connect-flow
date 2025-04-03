
# Documentation: Agent AI Connect Flow

## Vue d'ensemble

Agent AI Connect Flow est une plateforme qui permet de créer et gérer des agents IA autonomes capables d'interagir avec des freelances via AIWorkPay et de gérer des paiements via Stripe. Cette documentation explique comment utiliser la plateforme et ses principales fonctionnalités.

## Table des matières

1. [Création d'un agent](#création-dun-agent)
2. [Tableau de bord de l'agent](#tableau-de-bord-de-lagent)
3. [Création de missions](#création-de-missions)
4. [Centre d'automatisation](#centre-dautomatisation)
5. [Intégrations](#intégrations)
6. [Base de connaissances](#base-de-connaissances)
7. [Exemples pratiques](#exemples-pratiques)

## Création d'un agent

Pour créer un nouvel agent autonome:

1. Accédez à la page d'accueil de l'application
2. Remplissez le formulaire de création d'agent avec:
   - **Nom de l'agent**: Un nom descriptif (ex: "Web Scraping Agent")
   - **Budget mensuel**: Montant maximum que l'agent peut dépenser (ex: 500 USD)
   - **Permissions**: Sélectionnez les autorisations accordées à l'agent:
     - `create_charge`: Autoriser l'agent à créer des charges sur le compte Stripe
     - `approve_payouts`: Autoriser l'agent à approuver des paiements aux freelances
     - `create_mission`: Autoriser l'agent à créer de nouvelles missions

**Bonnes pratiques**: 
- Attribuez un nom descriptif qui indique clairement la fonction de l'agent
- Commencez avec un budget limité pour tester le comportement de l'agent
- N'accordez que les permissions strictement nécessaires à la fonction de l'agent

## Tableau de bord de l'agent

Une fois l'agent créé, vous accéderez à son tableau de bord qui affiche:

- **Informations de l'agent**: Nom, ID, compte Stripe associé
- **Budget**: Budget mensuel et solde restant
- **Permissions**: Liste des permissions accordées
- **Statistiques des missions**: Nombre total et nombre de missions complétées

Ce tableau de bord est votre centre de contrôle pour surveiller l'activité de l'agent et son utilisation du budget.

## Création de missions

Dans l'onglet "Agent Dashboard", vous pouvez créer de nouvelles missions pour les freelances:

1. Remplissez le formulaire "Create New Mission" avec:
   - **Titre de la mission**: Description concise de la tâche
   - **Description**: Explication détaillée de la mission
   - **Instructions détaillées**: Étapes précises pour accomplir la tâche
   - **Récompense**: Montant en USD à payer au freelance
   - **URL cible** (optionnel): URL pertinente pour la mission

Après création, la mission sera publiée sur AIWorkPay où les freelances pourront la consulter et y répondre.

**Exemple de mission**:
- **Titre**: "Scraper les données de produits d'un site e-commerce"
- **Description**: "Extraire les noms, prix et images de 100 produits sur example.com"
- **Instructions**: "Utiliser un outil de scraping pour extraire les données des pages produits. Fournir les données dans un format JSON structuré..."
- **Récompense**: 15.00 USD
- **URL cible**: "https://example.com/products"

## Centre d'automatisation

Dans l'onglet "Automation Center", vous pouvez configurer des comportements automatisés pour votre agent:

- **Auto-validation des missions complétées**: Valide automatiquement les missions marquées comme terminées
- **Traitement automatique des paiements**: Effectue les paiements dès qu'une mission est validée

Le journal d'activité affiche en temps réel les actions automatisées effectuées par l'agent.

## Intégrations

L'application propose plusieurs intégrations:

- **AIWorkPay**: Connecte l'agent au réseau de freelances d'AIWorkPay
- **Supabase**: Permet d'étendre les fonctionnalités avec une base de données
- **GitHub**: Facilite la synchronisation du code avec un dépôt GitHub

## Base de connaissances

La section "Project Knowledge" permet de stocker des informations importantes:

1. Accédez à cette section via le bouton "Project Knowledge" en haut de l'interface
2. Créez de nouvelles entrées avec un titre et un contenu
3. Consultez et modifiez les entrées existantes

Cette fonction est utile pour documenter les processus, stocker des informations techniques ou partager des instructions spécifiques.

## Exemples pratiques

### Exemple 1: Agent de génération de contenu

**Configuration de l'agent**:
- **Nom**: "Content Generator"
- **Budget**: 300 USD/mois
- **Permissions**: create_mission, approve_payouts

**Création d'une mission**:
- **Titre**: "Rédiger un article de blog sur l'IA"
- **Description**: "Créer un article de 1500 mots sur les applications pratiques de l'IA"
- **Récompense**: 25 USD

**Automatisation**:
- Activer la validation automatique pour un traitement rapide

### Exemple 2: Agent d'analyse de données

**Configuration de l'agent**:
- **Nom**: "Data Analyzer"
- **Budget**: 800 USD/mois
- **Permissions**: create_charge, approve_payouts, create_mission

**Création d'une mission**:
- **Titre**: "Analyser les données de feedback client"
- **Description**: "Catégoriser et résumer 500 entrées de feedback client"
- **Récompense**: 30 USD

**Automatisation**:
- Activer la validation et le paiement automatiques

## Conseils pour une utilisation optimale

1. **Démarrez petit**: Commencez avec des missions simples et un budget limité
2. **Surveillez régulièrement**: Vérifiez le tableau de bord pour suivre l'activité de l'agent
3. **Itérez progressivement**: Ajustez les paramètres de l'agent en fonction des résultats
4. **Documentation**: Utilisez la base de connaissances pour documenter les processus
5. **Automatisation prudente**: N'activez l'automatisation complète qu'après avoir testé manuellement le processus

---

Pour toute question ou assistance supplémentaire, contactez l'équipe AIWorkPay à contact@aiworkpay.fr ou visitez https://aiworkpay.tech.
