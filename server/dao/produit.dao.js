const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ProduitDAO = {
   getAll: () => prisma.produit.findMany({
    include: { stocks: true } 
  }),
  getById: (id) => prisma.produit.findUnique({
    where: { id: parseInt(id) },
    include: { stocks: true }
  }),

  create: (data) => prisma.produit.create({ data }),
  update: (id, data) => prisma.produit.update({ where: { id: parseInt(id) }, data }),
  delete: (id) => prisma.produit.delete({ where: { id: parseInt(id) } }),
};

module.exports = ProduitDAO;
