import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const produits = [
  { nom: "Baguette", prix: 2.99, description: "Pain français classique" },
  { nom: "Fromage", prix: 7.99, description: "Fromage affiné artisanal" },
  { nom: "Jambon", prix: 4.29, description: "Jambon de qualité supérieure" },
  { nom: "Lait", prix: 3.49, description: "Lait frais entier" },
  { nom: "Oeufs", prix: 3.99, description: "Oeufs bio de poules élevées en plein air" },
  { nom: "Tomate", prix: 2.19, description: "Tomates rouges mûres" },
  { nom: "Beurre", prix: 5.49, description: "Beurre doux artisanal" },
  { nom: "Pomme", prix: 1.59, description: "Pommes croquantes" },
  { nom: "Poivre", prix: 1.99, description: "Poivre noir moulu" },
  { nom: "Chocolat", prix: 3.79, description: "Chocolat noir 70% cacao" },
];

const magasins = [
  { nom: "Magasin A", adresse: "1 rue de Paris" },
  { nom: "Magasin B", adresse: "2 avenue de Lyon" },
  { nom: "Magasin C", adresse: "3 boulevard de Lille" },
  { nom: "Magasin D", adresse: "4 place de Bordeaux" },
  { nom: "Magasin E", adresse: "5 chemin de Nice" },
];

// Users with different roles
const users = [
  { nom: "Gestionnaire", role: "gestionnaire", password: "password" },
  { nom: "Client", role: "client", password: "password" },
  { nom: "Alice", role: "client", password: "password" },
  { nom: "Bob", role: "client", password: "password" },
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  // Vider les tables dans l'ordre pour respecter les contraintes de clés étrangères
  await prisma.ligneVente?.deleteMany?.();
  await prisma.vente?.deleteMany?.();
  await prisma.stock?.deleteMany?.();
  await prisma.restock?.deleteMany?.();
  await prisma.magasin.deleteMany({});
  await prisma.produit.deleteMany({});
  await prisma.user?.deleteMany?.();

  // Insérer produits, magasins et users
  await prisma.produit.createMany({ data: produits });
  await prisma.magasin.createMany({ data: magasins });
  await prisma.user.createMany({ data: users });

  // On récupère les produits, magasins et users insérés
  const produitsList = await prisma.produit.findMany();
  const magasinsList = await prisma.magasin.findMany();
  const clientsList = await prisma.user.findMany({ where: { role: 'client' } });

  // Création des stocks pour chaque produit X magasin
  for (const magasin of magasinsList) {
    for (const produit of produitsList) {
      await prisma.stock.create({
        data: {
          produitId: produit.id,
          magasinId: magasin.id,
          quantite: getRandomInt(20, 100) // stock random
        }
      });
    }
  }

  // Génération de ventes aléatoires pour chaque magasin
  for (const magasin of magasinsList) {
    const nbVentes = getRandomInt(5, 10); // 5 à 10 ventes par magasin
    for (let v = 0; v < nbVentes; v++) {
      // Client au hasard parmi les utilisateurs de rôle 'client'
      const client = clientsList[getRandomInt(0, clientsList.length - 1)];
      // 1 à 4 produits différents par vente
      const produitsChoisis = [...produitsList]
        .sort(() => Math.random() - 0.5)
        .slice(0, getRandomInt(1, 4));

      // Générer lignes de vente
      const lignes = produitsChoisis.map(produit => ({
        produitId: produit.id,
        quantite: getRandomInt(1, 5),
        prixUnitaire: produit.prix
      }));

      // Calcule le total de la vente
      const total = lignes.reduce((acc, l) => acc + l.quantite * l.prixUnitaire, 0);

      // Crée la vente avec ses lignes associées
      await prisma.vente.create({
        data: {
          magasinId: magasin.id,
          userId: client.id,
          total,
          lignes: {
            create: lignes
          }
        }
      });
    }
  }

  console.log("Données seedées (produits, magasins, stocks, users, ventes) !");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
