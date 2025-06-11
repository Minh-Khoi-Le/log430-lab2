import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const MagasinDAO = {
  /**
   * Create Store
   * 
   * Creates a new store in the database.
   * 
   * @param {Object} data - Store data
   * @param {string} data.nom - Store name
   * @param {string} [data.adresse] - Store address (optional)
   * @returns {Promise<Object>} - Promise resolving to created store
   */
  create: async (data) => prisma.magasin.create({ data }),
  
  /**
   * Get Store by ID
   * 
   * Retrieves a single store by its ID.
   * 
   * @param {number|string} id - Store ID
   * @returns {Promise<Object|null>} - Promise resolving to store object or null if not found
   */
  getById: async (id) => prisma.magasin.findUnique({ where: { id: parseInt(id) } }),
  
  /**
   * Get All Stores
   * 
   * Retrieves all stores from the database.
   * 
   * @returns {Promise<Array>} - Promise resolving to array of stores
   */
  getAll: async () => prisma.magasin.findMany(),
  
  /**
   * Update Store
   * 
   * Updates an existing store in the database.
   * 
   * @param {number|string} id - Store ID
   * @param {Object} data - Updated store data
   * @param {string} [data.nom] - Store name
   * @param {string} [data.adresse] - Store address
   * @returns {Promise<Object>} - Promise resolving to updated store
   */
  update: async (id, data) => prisma.magasin.update({ where: { id: parseInt(id) }, data }),
  
  /**
   * Delete Store
   * 
   * Deletes a store from the database.
   * 
   * @param {number|string} id - Store ID
   * @returns {Promise<Object>} - Promise resolving to deleted store
   */
  delete: async (id) => prisma.magasin.delete({ where: { id: parseInt(id) } }),
};

export default MagasinDAO;