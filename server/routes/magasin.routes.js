/**
 * Magasin Routes
 * 
 * 
 * Base path: /api/v1/stores
 * 
 * These routes are used by:
 * - Store management interfaces to manage store information
 * - Inventory management interfaces to view and manage store stock
 * - Store managers to request product restocks from the parent company (incoming)
 */

import express from 'express';
import * as controller from '../controllers/magasin.controller.js';

const router = express.Router();

/**
 * GET /api/v1/stores
 * 
 * List all stores
 * 
 * Used by:
 * - Admin interfaces to view all stores
 * - Parent company (maisonmere) to monitor all stores
 */
router.get('/', controller.list);

/**
 * GET /api/v1/stores/:id
 * 
 * Get detailed information about a specific store
 * 
 * Path parameters:
 * - id: Store ID
 * 
 * Used by:
 * - Store detail pages
 * - Store management interfaces
 */
router.get('/:id', controller.get);

/**
 * POST /api/v1/stores
 * 
 * Create a new store
 * 
 * Request body:
 * - nom: Store name
 * - adresse: Store address (optional)
 * 
 * Used by:
 * - Admin interfaces for store management
 * - Parent company (maisonmere) to add new store locations
 */
router.post('/', controller.create);

/**
 * PUT /api/v1/stores/:id
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
 * - Admin interfaces for store management
 * - Parent company (maisonmere) to update store information
 */
router.put('/:id', controller.update);

/**
 * DELETE /api/v1/stores/:id
 * 
 * Delete a store
 * 
 * Path parameters:
 * - id: Store ID
 * 
 * Used by:
 * - Admin interfaces for store management
 * - Parent company (maisonmere) to remove closed stores
 */
router.delete('/:id', controller.remove);

/**
 * GET /api/v1/stores/:magasinId/stock
 * 
 * Get current stock levels for a specific store
 * 
 * Path parameters:
 * - magasinId: Store ID
 * 
 * Used by:
 * - Store managers to view current inventory
 * - Inventory management interfaces
 * - Sales interfaces to check product availability
 */
router.get('/:magasinId/stock', controller.stock);

/**
 * GET /api/v1/stores/:magasinId/restock
 * 
 * Get restock requests for a specific store
 * 
 * Path parameters:
 * - magasinId: Store ID
 * 
 * Used by:
 * - Store managers to track pending restock requests
 * - Parent company to view restock requests from stores
 */
router.get('/:magasinId/restock', controller.restockRequests);

/**
 * POST /api/v1/stores/:magasinId/restock
 * 
 * Create a new restock request for a specific store
 * 
 * Path parameters:
 * - magasinId: Store ID
 * 
 * Request body:
 * - produitId: Product ID to restock
 * - quantite: Quantity requested
 * 
 * Used by:
 * - Store managers to request additional inventory
 * - Inventory management interfaces to automate restock requests
 */
router.post('/:magasinId/restock', controller.createRestock);

export default router;
