import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const StockDAO = {
  /**
   * Get Stock by Store
   * 
   * Retrieves all inventory stock records for a specific store.
   * Includes detailed product information for each stock record.
   * 
   * This function is used to:
   * - Display current inventory levels in store management interfaces
   * - Check product availability for sales
   * - Identify products that need restocking
   * 
   * @param {number|string} magasinId - Store ID
   * @returns {Promise<Array>} - Promise resolving to array of stock records with product details
   */
  getStockByMagasin: async (magasinId) =>
    prisma.stock.findMany({
      where: { magasinId: parseInt(magasinId) },
      include: { produit: true },
    }),
};

export default StockDAO;
