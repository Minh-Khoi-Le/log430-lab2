const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const RestockDAO = {
  createRequest: async ({ produitId, magasinId, quantite }) =>
    prisma.restock.create({
      data: {
        produitId: parseInt(produitId),
        magasinId: parseInt(magasinId),
        quantite: parseInt(quantite),
        statut: "EN_ATTENTE"
      }
    }),
  getRequestsByMagasin: async (magasinId) =>
    prisma.restock.findMany({ where: { magasinId: parseInt(magasinId) } })
};

module.exports = RestockDAO;
