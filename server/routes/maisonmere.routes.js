/**
 * MaisonMere Routes
 * 
 * Base path: /api/v1/maisonmere
 */

import express from 'express';
import { PrismaClient } from '@prisma/client';
import ProduitDAO from '../dao/produit.dao.js';
import MagasinDAO from '../dao/magasin.dao.js';
import * as controller from '../controllers/maisonmere.controller.js';

const prisma = new PrismaClient();
const router = express.Router();


//PRODUCT MANAGEMENT ROUTES
/**
 * GET /api/v1/maisonmere/produits
 * 
 * Get all products in the catalog
 * 
 * Used by:
 * - Parent company product management interfaces
 * - Catalog management dashboards
 */
router.get("/produits", async (req, res) => {
  try {
    const produits = await ProduitDAO.getAll();
    res.json(produits);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des produits" });
  }
});

/**
 * GET /api/v1/maisonmere/produits/:id
 * 
 * Get detailed information about a specific product
 * 
 * Path parameters:
 * - id: Product ID
 * 
 * Used by:
 * - Product detail pages in parent company interfaces
 * - Product editing forms
 */
router.get("/produits/:id", async (req, res) => {
  try {
    const produit = await ProduitDAO.getById(req.params.id);
    if (!produit) return res.status(404).json({ error: "Produit non trouvé" });
    res.json(produit);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du produit" });
  }
});

/**
 * POST /api/v1/maisonmere/produits
 * 
 * Create a new product in the catalog
 * 
 * Request body:
 * - nom: Product name
 * - prix: Product price
 * - stock: Initial stock level
 * 
 * Used by:
 * - Admin product list page
 * - New product creation forms
 */
router.post("/produits", async (req, res) => {
  try {
    const { nom, prix, stock } = req.body;
    
    // Create the product first
    const productData = {
      nom,
      prix: parseFloat(prix)
    };
    
    // Use a transaction to create the product and set initial stock levels
    const nouveau = await prisma.$transaction(async (tx) => {
      // Create the product
      const product = await tx.produit.create({ data: productData });
      
      // Get all stores
      const stores = await tx.magasin.findMany();
      
      // Create stock entries for each store
      // Use the provided stock value or default to 0
      const stockValue = stock !== undefined ? parseInt(stock) : 0;
      for (const store of stores) {
        await tx.stock.create({
          data: {
            produitId: product.id,
            magasinId: store.id,
            quantite: stockValue
          }
        });
      }
      
      // Return the product with stock information
      return tx.produit.findUnique({
        where: { id: product.id },
        include: { stocks: true }
      });
    });
    
    res.status(201).json(nouveau);
  } catch (err) {
    res
      .status(400)
      .json({
        error: "Erreur lors de la création du produit",
        details: err.message,
      });
  }
});

/**
 * PUT /api/v1/maisonmere/produits/:id
 * 
 * Update an existing product in the catalog
 * 
 * Path parameters:
 * - id: Product ID
 * 
 * Request body:
 * - nom: Product name (optional)
 * - prix: Product price (optional)
 * - stock: Stock level (optional)
 * 
 * Used by:
 * - Admin product list page 
 * - Product editing forms
 */
router.put("/produits/:id", async (req, res) => {
  try {
    const { nom, prix, stock } = req.body;
    const maj = await ProduitDAO.update(req.params.id, {
      nom,
      prix: parseFloat(prix),
      stock: parseInt(stock),
    });
    res.json(maj);
  } catch (err) {
    res
      .status(400)
      .json({
        error: "Erreur lors de la modification du produit",
        details: err.message,
      });
  }
});

/**
 * DELETE /api/v1/maisonmere/produits/:id
 * 
 * Remove a product from the catalog
 * 
 * Path parameters:
 * - id: Product ID
 * 
 * Used by:
 * - Admin product list page
 * - Product discontinuation workflows
 */
router.delete("/produits/:id", async (req, res) => {
  try {
    await ProduitDAO.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({ error: "Produit non trouvé", details: err.message });
  }
});

//STORE MANAGEMENT ROUTES (To be implemented)
/**
 * POST /api/v1/maisonmere/magasins
 * 
 * Create a new store
 * 
 * Request body:
 * - nom: Store name
 * - adresse: Store address
 * 
 * Used by:
 * - Admin dashboard for store management
 * - Store network expansion workflows
 */
router.post("/magasins", async (req, res) => {
  try {
    const { nom, adresse } = req.body;
    const magasin = await MagasinDAO.createWithDefaultStock({ nom, adresse });
    res.status(201).json(magasin);
  } catch (err) {
    res
      .status(400)
      .json({
        error: "Erreur lors de la création du magasin",
        details: err.message,
      });
  }
});

/**
 * PUT /api/v1/maisonmere/magasins/:id
 * 
 * Update an existing store
 * 
 * Path parameters:
 * - id: Store ID
 * 
 * Request body:
 * - nom: Store name (optional)
 * - adresse: Store address (optional)
 * 
 * Used by:
 * - Admin dashboard for store management
 * - Store information update workflows
 */
router.put("/magasins/:id", async (req, res) => {
  try {
    const { nom, adresse } = req.body;
    const magasin = await MagasinDAO.update(req.params.id, { nom, adresse });
    res.json(magasin);
  } catch (err) {
    res
      .status(400)
      .json({
        error: "Erreur lors de la modification du magasin",
        details: err.message,
      });
  }
});

/**
 * DELETE /api/v1/maisonmere/magasins/:id
 * 
 * Remove a store from the network
 * 
 * Path parameters:
 * - id: Store ID
 * 
 * Used by:
 * - Admin dashboard for store management
 * - Store closure workflows
 */
router.delete("/magasins/:id", async (req, res) => {
  try {
    await MagasinDAO.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({ error: "Magasin non trouvé", details: err.message });
  }
});



//REPORTING ROUTES
/**
 * GET /api/v1/maisonmere/stats
 * 
 * Get performance statistics for all stores
 * 
 * Returns:
 * - Sales totals
 * - Revenue figures
 * - Products sold
 * 
 * Used by:
 * - Admin dashboard
 */
router.get('/stats', controller.stats);

/**
 * GET /api/v1/maisonmere/ventes-consolidees
 * 
 * Get consolidated sales data across all stores
 * 
 * Query parameters:
 * - debut: Start date for filtering 
 * - fin: End date for filtering 
 * 
 * Used by:
 * - Admin dashboard
 */
router.get('/ventes-consolidees', controller.ventesConsolidees);

export default router;
