const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const produits = [
  { nom: "Baguette", prix: 2.99 },
  { nom: "Fromage", prix: 7.99 },
  { nom: "Jambon", prix: 4.29 },
  { nom: "Lait", prix: 3.49 },
  { nom: "Oeufs", prix: 3.99 },
  { nom: "Tomate", prix: 2.19 },
  { nom: "Beurre", prix: 5.49 },
  { nom: "Pomme", prix: 1.59 },
  { nom: "Poivre", prix: 1.99 },
  { nom: "Chocolat", prix: 3.79 },
];

const magasins = [
  { nom: "Magasin A" },
  { nom: "Magasin B" },
  { nom: "Magasin C" },
  { nom: "Magasin D" },
  { nom: "Magasin E" },
];

// Quelques clients fictifs
const clients = [
  { nom: "Alice", email: "alice@mail.com" },
  { nom: "Bob", email: "bob@mail.com" },
  { nom: "Chloé", email: "chloe@mail.com" }
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  // Vider les tables dans l'ordre pour respecter les contraintes de clés étrangères
  await prisma.ligneVente?.deleteMany?.();
  await prisma.vente?.deleteMany?.();
  await prisma.stock?.deleteMany?.();
  await prisma.magasin.deleteMany({});
  await prisma.produit.deleteMany({});
  await prisma.client?.deleteMany?.();

  // Insérer produits, magasins et clients
  await prisma.produit.createMany({ data: produits });
  await prisma.magasin.createMany({ data: magasins });
  await prisma.client.createMany({ data: clients });

  // On récupère les produits, magasins et clients insérés
  const produitsList = await prisma.produit.findMany();
  const magasinsList = await prisma.magasin.findMany();
  const clientsList = await prisma.client.findMany();

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
      // Client au hasard
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
          clientId: client.id,
          total,
          lignes: {
            create: lignes
          }
        }
      });
    }
  }

  console.log("Données seedées (produits, magasins, stocks, clients, ventes) !");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
