const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const produits = [
  { nom: "Baguette", prix: 2.99, stock: 100 },
  { nom: "Fromage", prix: 7.99, stock: 42 },
  { nom: "Jambon", prix: 4.29, stock: 30 },
  { nom: "Lait", prix: 3.49, stock: 75 },
  { nom: "Oeufs", prix: 3.99, stock: 60 },
  { nom: "Tomate", prix: 2.19, stock: 90 },
  { nom: "Beurre", prix: 5.49, stock: 50 },
  { nom: "Pomme", prix: 1.59, stock: 120 },
  { nom: "Poivre", prix: 1.99, stock: 70 },
  { nom: "Chocolat", prix: 3.79, stock: 35 },
];

async function main() {
  await prisma.produit.deleteMany({});
  await prisma.produit.createMany({ data: produits });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
