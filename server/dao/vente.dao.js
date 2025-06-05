const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const VenteDAO = {
  create: async ({ magasinId, clientId, lignes }) => {
    // On crée la vente et les lignes associées en une seule transaction
    return prisma.vente.create({
      data: {
        magasinId: parseInt(magasinId),
        clientId: parseInt(clientId),
        lignes: {
          create: lignes.map(ligne => ({
            produitId: parseInt(ligne.produitId),
            quantite: parseInt(ligne.quantite),
            prixUnitaire: parseFloat(ligne.prixUnitaire)
          }))
        }
      },
      include: { lignes: true }
    });
  },
  getByClient: async (clientId) =>
    prisma.vente.findMany({
      where: { clientId: parseInt(clientId) },
      include: { lignes: { include: { produit: true } }, magasin: true }
    }),
  getAll: async () => prisma.vente.findMany({ include: { client: true, magasin: true } }),
};

module.exports = VenteDAO;
