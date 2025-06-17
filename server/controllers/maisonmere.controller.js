import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Store Performance Statistics Controller
 * 
 * Generates performance statistics for all stores in the network.

 * - Total number of sales
 * - Total products sold
 * - Total revenue
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export async function stats(req, res, next) {
  try {
    const magasins = await prisma.magasin.findMany();
    const stats = await Promise.all(
      magasins.map(async (magasin) => {
        const ventes = await prisma.vente.findMany({
          where: { magasinId: magasin.id },
          include: { lignes: true },
        });
        let chiffreAffaires = 0;
        let productsVendus = 0;
        ventes.forEach((vente) => {
          vente.lignes.forEach((ligne) => {
            chiffreAffaires += ligne.prixUnitaire * ligne.quantite;
            productsVendus += ligne.quantite;
          });
        });
        return {
          id: magasin.id,
          nom: magasin.nom,
          ventesTotal: ventes.length,
          productsVendus,
          chiffreAffaires,
        };
      })
    );
    res.json(stats);
  } catch (e) { next(e); }
}

/**
 * Consolidated Sales Report Controller
 * 
 * Retrieves detailed sales data across all stores with optional date filtering.
 * Provides comprehensive sales information including store details, client information,
 * and line item details for each sale.
 * 
 * @param {Request} req - Express request object with optional date range query parameters
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export async function ventesConsolidees(req, res, next) {
  try {
    const { debut, fin } = req.query;
    const where = {};
    if (debut && fin) {
      where.date = { gte: new Date(debut), lte: new Date(fin) };
    }
    const ventes = await prisma.vente.findMany({
      where,
      include: { magasin: true, user: true, lignes: true },
    });
    res.json(ventes);
  } catch (e) { next(e); }
} 