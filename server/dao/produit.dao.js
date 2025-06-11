import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const ProduitDAO = {
  /**
   * Find All Products
   * 
   * Retrieves a paginated and optionally sorted list of products.
   * Includes related stock information for each product.
   * 
   * @param {Object} options - Query options
   * @param {number} [options.offset=0] - Number of records to skip
   * @param {number} [options.limit=10] - Maximum number of records to return
   * @param {string} [options.sort] - Field to sort by
   * @returns {Promise<Array>} - Promise resolving to array of products with their stock information
   */
  findAll: async ({ offset = 0, limit = 10, sort } = {}) => {
    return prisma.produit.findMany({
      skip: offset,
      take: limit,
      orderBy: sort ? { [sort]: 'asc' } : undefined,
      include: { stocks: true }
    });
  },
  
  /**
   * Find Product by ID
   * 
   * Retrieves a single product by its ID.
   * Includes related stock information.
   * 
   * @param {number|string} id - Product ID
   * @returns {Promise<Object|null>} - Promise resolving to product object or null if not found
   */
  findById: async (id) => prisma.produit.findUnique({ 
    where: { id: Number(id) }, 
    include: { stocks: true } 
  }),
  
  /**
   * Insert Product
   * 
   * Creates a new product in the database.
   * 
   * @param {Object} data - Product data
   * @returns {Promise<Object>} - Promise resolving to created product
   */
  insert: async (data) => prisma.produit.create({ data }),
  
  /**
   * Update Product
   * 
   * Updates an existing product in the database.
   * 
   * @param {number|string} id - Product ID
   * @param {Object} data - Updated product data
   * @returns {Promise<Object>} - Promise resolving to updated product
   */
  update: async (id, data) => prisma.produit.update({ 
    where: { id: Number(id) }, 
    data 
  }),
  
  /**
   * Delete Product
   * 
   * Deletes a product from the database.
   * 
   * @param {number|string} id - Product ID
   * @returns {Promise<Object>} - Promise resolving to deleted product
   */
  del: async (id) => prisma.produit.delete({ 
    where: { id: Number(id) } 
  })
};

export default ProduitDAO;
