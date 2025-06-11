import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const RestockDAO = {
  /**
   * Create Restock Request
   * 
   * Creates a new restock request from a store to the parent company.
   * Sets the initial status to "EN_ATTENTE" (pending).
   * 
   * This function is used when:
   * - Store inventory for a product falls below threshold
   * - Store managers manually request additional inventory
   * - Automated inventory systems detect low stock levels
   * 
   * @param {Object} requestData - Restock request data
   * @param {number|string} requestData.produitId - Product ID to restock
   * @param {number|string} requestData.magasinId - Store ID requesting restock
   * @param {number|string} requestData.quantite - Quantity requested
   * @returns {Promise<Object>} - Promise resolving to created restock request
   */
  createRequest: async ({ produitId, magasinId, quantite }) =>
    prisma.restock.create({
      data: {
        produitId: parseInt(produitId),
        magasinId: parseInt(magasinId),
        quantite: parseInt(quantite),
        statut: "EN_ATTENTE"
      }
    }),
  
  /**
   * Get Restock Requests by Store
   * 
   * Retrieves all restock requests for a specific store.
   * 
   * This function is used to:
   * - Display pending and fulfilled restock requests in store interfaces
   * - Track restock request history
   * - Monitor parent company response times
   * 
   * @param {number|string} magasinId - Store ID
   * @returns {Promise<Array>} - Promise resolving to array of restock requests
   */
  getRequestsByMagasin: async (magasinId) =>
    prisma.restock.findMany({ where: { magasinId: parseInt(magasinId) } })
};

export default RestockDAO;
