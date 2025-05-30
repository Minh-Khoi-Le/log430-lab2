# LOG430 - TP2 - Application de Gestion de Magasin

## Description

Cette application simule la gestion d’un magasin avec une interface web moderne.  
L’architecture suit un modèle **2-Tiers** :  

- Un frontend React (Vite)
- Un backend Node.js (Express, DAO, Prisma/SQLite)  
Les deux services sont orchestrés avec **Docker Compose**.  
Un pipeline **CI/CD** GitHub Actions automatise le build et les tests.

---

## Structure du projet

/client # Frontend React (Vite)
/server # Backend Express + Prisma
/server/dao # DAO produits
/server/routes # Routes Express
/server/prisma # Modèle de données Prisma (SQLite par défaut)
docker-compose.yml # Orchestration frontend/backend

---

## Instructions d’exécution

### 1. **Prérequis**

- **Docker & Docker Compose** installés  
- (Facultatif) Node.js 18+ pour lancer localement hors Docker

---

### 2. **Lancer l’application complète (Docker)**

```bash
docker-compose up --build
```

## Injection de données de test

Pour injecter 10 produits automatiquement :

```bash
docker-compose exec server npm run seed
```

## Utilisation (fonctionnalités)

Liste, recherche, ajout, modification et suppression de produits (CRUD)

Interface réactive (recherche instantanée, popups de confirmation/édition)

Architecture DAO claire côté backend

Modales personnalisées (confirmation, édition)

## Choix techniques

Frontend : React / Vite

Backend : Express (Node.js 20)

Persistance : Prisma ORM / SQLite

Conteneurisation : Docker Compose (client/server)
