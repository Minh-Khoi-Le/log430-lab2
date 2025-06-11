/**
 * Vente Routes
 * 
 * 
 * Base path: /api/v1/sales
 * 
 * These routes are used by:
 * - Point of sale (POS) interfaces to create new sales
 * - Sales reporting interfaces to view sales history (incoming)
 * - Client management interfaces to view client purchase history (incoming)
 */

import express from 'express';
import * as controller from '../controllers/vente.controller.js';

const router = express.Router();

/**
 * GET /api/v1/sales
 * 
 * List all sales with client and store information
 * 
 * Used by:
 * - Sales reporting interfaces
 * - Admin dashboards
 * - Financial reporting tools
 */
router.get('/', controller.list);

/**
 * POST /api/v1/sales
 * 
 * Create a new sale transaction
 * 
 * Request body:
 * - magasinId: Store ID where the sale occurred
 * - clientId: Client ID (optional if clientNom is provided)
 * - clientNom: Client name (optional if clientId is provided)
 * - lignes: Array of sale line items with product ID, quantity, and unit price
 * - panier: Alternative format for sale items (backwards compatibility)
 * 
 * The endpoint handles:
 * - Client creation if only name is provided
 * - Stock availability verification
 * - Stock quantity updates
 * - Transaction consistency
 * 
 * Used by:
 * - Point of sale (POS) interfaces
 * - Online store checkout process
 */
router.post('/', controller.create);

/**
 * GET /api/v1/sales/client/:clientId
 * 
 * Get all sales for a specific client
 * 
 * Path parameters:
 * - clientId: Client ID
 * 
 * Used by:
 * - Client detail pages
 * - Customer history views
 * - Client loyalty programs
 */
router.get('/client/:clientId', controller.byClient);

export default router;
