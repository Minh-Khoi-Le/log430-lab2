import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const VenteDAO = {
  /**
   * Create Sale
   * 
   * Creates a new sale transaction in the database with associated line items.
   * This function creates both the sale header and all sale line items in a single operation.
   * 
   * @param {Object} saleData - Sale transaction data
   * @param {number|string} saleData.magasinId - Store ID where the sale occurred
   * @param {number|string} saleData.clientId - Client ID who made the purchase
   * @param {Array} saleData.lignes - Array of sale line items
   * @param {number} saleData.total - Total amount of the sale
   * @returns {Promise<Object>} - Promise resolving to created sale with line items
   */
  create: async ({ magasinId, clientId, lignes, total }) => {
    // Create the sale and associated line items in a single transaction
    return prisma.vente.create({
      data: {
        magasinId: parseInt(magasinId),
        clientId: parseInt(clientId),
        total: parseFloat(total),
        lignes: {
          create: lignes.map(ligne => ({
            produitId: parseInt(ligne.produitId),
            quantite: parseInt(ligne.quantite),
            prixUnitaire: parseFloat(ligne.prixUnitaire)
          }))
        }
      },
      include: { lignes: true }
    });
  },
  
  /**
   * Get Sales by Client
   * 
   * Retrieves all sales for a specific client with detailed information.
   * Includes line items with product details and store information.
   * 
   * @param {number|string} clientId - Client ID
   * @returns {Promise<Array>} - Promise resolving to array of client's sales
   */
  getByClient: async (clientId) =>
    prisma.vente.findMany({
      where: { clientId: parseInt(clientId) },
      include: { lignes: { include: { produit: true } }, magasin: true }
    }),
  
  /**
   * Get All Sales
   * 
   * Retrieves all sales with client and store information.
   * Used for sales reporting and analysis.
   * 
   * @returns {Promise<Array>} - Promise resolving to array of all sales
   */
  getAll: async () => prisma.vente.findMany({ include: { client: true, magasin: true } }),
};

export default VenteDAO;
