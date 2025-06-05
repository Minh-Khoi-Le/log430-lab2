const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const StockDAO = {
  getStockByMagasin: async (magasinId) =>
    prisma.stock.findMany({
      where: { magasinId: parseInt(magasinId) },
      include: { produit: true },
    }),
};

module.exports = StockDAO;
