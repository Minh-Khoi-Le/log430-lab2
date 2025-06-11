import VenteDAO from '../dao/vente.dao.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Create Sale Controller
 * 
 * Creates a new sale transaction with the provided data.
 * This is a complex operation that handles:
 * 1. Client identification or creation
 * 2. Input format normalization
 * 3. Stock availability verification
 * 4. Transaction creation
 * 5. Inventory update
 * 
 * @param {Request} req - Express request object with sale data in body
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export async function create(req, res, next) {
  try {
    let { magasinId, clientId, lignes, clientNom, panier } = req.body;

    // If clientId is not provided, use clientNom to find or create the client
    if (!clientId && clientNom) {
      let client = await prisma.client.findFirst({ where: { nom: clientNom } });
      if (!client) {
        client = await prisma.client.create({ data: { nom: clientNom } });
      }
      clientId = client.id;
    }

    // If lignes is not provided, convert panier to lignes
    if (!lignes && panier) {
      lignes = panier.map(item => ({
        produitId: item.produitId,
        quantite: item.quantite,
        prixUnitaire: item.prix
      }));
    }

    if (!magasinId || !clientId || !lignes) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if magasinId exists
    const magasin = await prisma.magasin.findUnique({ where: { id: parseInt(magasinId) } });
    if (!magasin) {
      return res.status(400).json({ error: "Le magasin sélectionné n'existe pas." });
    }

    // Check stock availability for each product
    for (const ligne of lignes) {
      const stock = await prisma.stock.findFirst({
        where: { 
          produitId: parseInt(ligne.produitId), 
          magasinId: parseInt(magasinId) 
        }
      });
      
      if (!stock || stock.quantite < ligne.quantite) {
        const produit = await prisma.produit.findUnique({ 
          where: { id: parseInt(ligne.produitId) } 
        });
        return res.status(400).json({ 
          error: `Stock insuffisant pour ${produit ? produit.nom : 'un produit'}`
        });
      }
    }

    // Use a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Calculate total
      const total = lignes.reduce((sum, l) => sum + l.quantite * l.prixUnitaire, 0);
      
      // Create the sale
      const vente = await tx.vente.create({
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
      
      // Update stock quantities
      for (const ligne of lignes) {
        await tx.stock.updateMany({
          where: { 
            produitId: parseInt(ligne.produitId), 
            magasinId: parseInt(magasinId) 
          },
          data: { 
            quantite: { 
              decrement: parseInt(ligne.quantite) 
            } 
          }
        });
      }
      
      return vente;
    });

    res.status(201).json({ success: true, vente: result });
  } catch (err) {
    next(err);
  }
}

/**
 * List Sales Controller
 * 
 * Retrieves a list of all sales with client and store information.
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export async function list(req, res, next) {
  try {
    const ventes = await VenteDAO.getAll();
    res.json(ventes);
  } catch (err) { next(err); }
}

/**
 * Get Client Sales Controller
 * 
 * Retrieves all sales for a specific client.
 * 
 * @param {Request} req - Express request object with client ID parameter
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export async function byClient(req, res, next) {
  try {
    const ventes = await VenteDAO.getByClient(req.params.clientId);
    res.json(ventes);
  } catch (err) { next(err); }
} 