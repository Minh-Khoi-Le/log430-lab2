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
ou
npm run seed
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

## Commandes Prisma pour gerer la persistence

npx prisma migrate dev --name init
npx prisma migrate reset

## Montrer l'arborescence du projet

treee -l 4 --ignore "node_modules,.git" -o docs\structure.txt

## Arborescene

D:\ETS\log430\lab\log430-lab2
├── client
|  ├── Dockerfile
|  ├── eslint.config.js
|  ├── index.html
|  ├── package-lock.json
|  ├── package.json
|  ├── public
|  ├── src
|  |  ├── api
|  |  |  └── index.js
|  |  ├── App.jsx
|  |  ├── assets
|  |  |  ├── index.css
|  |  |  └── react.svg
|  |  ├── components
|  |  |  ├── Modal.jsx
|  |  |  ├── Navbar.jsx
|  |  |  ├── ProductCard.jsx
|  |  |  ├── ProductEditForm.jsx
|  |  |  ├── ProductList.jsx
|  |  ├── context
|  |  |  ├── CartContext.jsx
|  |  |  └── UserContext.jsx
|  |  ├── main.jsx
|  |  └── pages
|  |     ├── CartPage.jsx
|  |     ├── Dashboard.jsx
|  |     ├── Login.jsx
|  |     └── Products.jsx
|  └── vite.config.js
├── docker-compose.yml
├── docs
|  ├── instructions.md
|  ├── Rapport d'architecture.md
|  ├── structure.txt
|  ├── svg
|  |  ├── Diagramme CU.svg
|  |  ├── Diagramme de classes.svg
|  |  ├── Diagramme de deploiement.svg
|  |  ├── MDD.svg
|  |  └── RDCU Vente.svg
|  └── UML
|     ├── diagramme-classe.puml
|     ├── diagramme-CU.puml
|     ├── diagramme-deploiement.puml
|     ├── MDD.puml
|     └── RDCU-Vente.puml
├── package-lock.json
├── package.json
├── README.md
└── server
   ├── controllers
   |  ├── client.controller.js
   |  ├── magasin.controller.js
   |  ├── maisonmere.controller.js
   |  ├── product.controller.js
   |  └── vente.controller.js
   ├── dao
   |  ├── client.dao.js
   |  ├── magasin.dao.js
   |  ├── produit.dao.js
   |  ├── restock.dao.js
   |  ├── stock.dao.js
   |  └── vente.dao.js
   ├── Dockerfile
   ├── docs
   |  └── openapi.yaml
   ├── index.js
   ├── jest.config.js
   ├── middleware
   |  ├── auth.js
   |  ├── errorHandler.js
   |  └── validateRequest.js
   ├── mock.stats.json
   ├── package-lock.json
   ├── package.json
   ├── prisma
   |  ├── migrations
   |  └── schema.prisma
   ├── routes
   |  ├── client.routes.js
   |  ├── magasin.routes.js
   |  ├── maisonmere.routes.js
   |  ├── product.routes.js
   |  ├── produit.routes.js
   |  └── vente.routes.js
   ├── seed.js
   ├── server.js
   ├── services
   |  └── product.service.js
   └── tests
      └── api.test.js
