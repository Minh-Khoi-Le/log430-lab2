const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MagasinDAO = {
  create: async (data) => prisma.magasin.create({ data }),
  getById: async (id) => prisma.magasin.findUnique({ where: { id: parseInt(id) } }),
  getAll: async () => prisma.magasin.findMany(),
  update: async (id, data) => prisma.magasin.update({ where: { id: parseInt(id) }, data }),
  delete: async (id) => prisma.magasin.delete({ where: { id: parseInt(id) } }),
};

module.exports = MagasinDAO;