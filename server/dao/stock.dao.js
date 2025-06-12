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
    
  /**
   * Update Stock Quantity
   * 
   * Updates the stock quantity for a specific product in a specific store.
   * Creates a new stock record if one doesn't exist.
   * 
   * @param {number|string} produitId - Product ID
   * @param {number|string} magasinId - Store ID
   * @param {number} quantite - New stock quantity
   * @returns {Promise<Object>} - Promise resolving to the updated stock record
   */
  updateStock: async (produitId, magasinId, quantite) => {
    const numericProduitId = parseInt(produitId);
    const numericMagasinId = parseInt(magasinId);
    const numericQuantite = parseInt(quantite);
    
    return prisma.stock.upsert({
      where: {
        magasinId_produitId: {
          magasinId: numericMagasinId,
          produitId: numericProduitId
        }
      },
      update: { quantite: numericQuantite },
      create: {
        magasinId: numericMagasinId,
        produitId: numericProduitId,
        quantite: numericQuantite
      }
    });
  },
  
  /**
   * Get Stock by Product
   * 
   * Retrieves all stock records for a specific product across all stores.
   * 
   * @param {number|string} produitId - Product ID
   * @returns {Promise<Array>} - Promise resolving to array of stock records
   */
  getStockByProduct: async (produitId) =>
    prisma.stock.findMany({
      where: { produitId: parseInt(produitId) },
      include: { magasin: true }
    })
};

export default StockDAO;
