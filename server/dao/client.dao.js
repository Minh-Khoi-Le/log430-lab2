import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const ClientDAO = {
  /**
   * Create Client
   * 
   * Creates a new client in the database.
   * 
   * @param {Object} data - Client data
   * @param {string} data.nom - Client name
   * @returns {Promise<Object>} - Promise resolving to created client
   */
  create: async (data) => prisma.client.create({ data }),
  
  /**
   * Get Client by ID
   * 
   * Retrieves a single client by its ID.
   * 
   * @param {number|string} id - Client ID
   * @returns {Promise<Object|null>} - Promise resolving to client object or null if not found
   */
  getById: async (id) => prisma.client.findUnique({ where: { id: parseInt(id) } }),
  
  /**
   * Get All Clients
   * 
   * Retrieves all clients from the database.
   * 
   * @returns {Promise<Array>} - Promise resolving to array of clients
   */
  getAll: async () => prisma.client.findMany(),
};

export default ClientDAO;
