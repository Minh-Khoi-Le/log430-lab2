const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ClientDAO = {
  create: async (data) => prisma.client.create({ data }),
  getById: async (id) => prisma.client.findUnique({ where: { id: parseInt(id) } }),
  getAll: async () => prisma.client.findMany(),
  getByEmail: async (email) => prisma.client.findUnique({ where: { email } }),
};

module.exports = ClientDAO;
