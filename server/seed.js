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

  // Insérer produits & magasins
  const produitsCreated = await prisma.produit.createMany({ data: produits });
  const magasinsCreated = await prisma.magasin.createMany({ data: magasins });

  // On récupère les produits et magasins insérés
  const produitsList = await prisma.produit.findMany();
  const magasinsList = await prisma.magasin.findMany();

  // Création des stocks pour chaque produit X magasin
  for (const magasin of magasinsList) {
    for (const produit of produitsList) {
      await prisma.stock.create({
        data: {
          produitId: produit.id,
          magasinId: magasin.id,
          quantite: getRandomInt(5, 100) // stock random
        }
      });
    }
  }

  // MOCK stats pour démo UI (exemple seulement — à adapter pour tes besoins API)
  const stats = magasinsList.map((magasin, i) => {
    const ventesTotal = getRandomInt(20, 70);
    const produitsVendus = getRandomInt(80, 200);
    const stocksFaibles = produitsList
      .filter(() => Math.random() < 0.2) // ~20% des produits en faible stock
      .map(p => p.nom);
    const chiffreAffaires = getRandomInt(1500, 5000) + Math.random();
    return {
      id: magasin.id,
      nom: magasin.nom,
      ventesTotal,
      produitsVendus,
      stocksFaibles,
      chiffreAffaires,
    };
  });

 // écrire dans un fichier pour mock API stats UI
  require('fs').writeFileSync('./mock.stats.json', JSON.stringify(stats, null, 2));

  console.log("Données seedées avec stats mock !");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
