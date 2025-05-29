const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ProduitDAO = {
  getAll: async () => prisma.produit.findMany(),

  getById: async (id) => prisma.produit.findUnique({ where: { id: parseInt(id) } }),

  create: async (data) => prisma.produit.create({ data }),

  update: async (id, data) =>
    prisma.produit.update({ where: { id: parseInt(id) }, data }),

  delete: async (id) =>
    prisma.produit.delete({ where: { id: parseInt(id) } }),
};

module.exports = ProduitDAO;
