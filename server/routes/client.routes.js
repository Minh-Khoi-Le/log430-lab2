/**
 * Client Routes
 * 
 * Base path: /api/v1/clients
 * 
 * These routes are used by:
 * - Client management interfaces
 * - Sales interfaces for customer lookup (incoming)
 */

import express from 'express';
import * as controller from '../controllers/client.controller.js';

const router = express.Router();

/**
 * GET /api/v1/clients
 * 
 * List all clients
 * 
 * Used by:
 * - Client management interfaces
 * - Sales interfaces for customer selection
 * - Admin dashboards
 */
router.get('/', controller.list);

/**
 * GET /api/v1/clients/:id
 * 
 * Get detailed information about a specific client
 * 
 * Path parameters:
 * - id: Client ID
 * 
 * Used by:
 * - Client detail pages
 * - Customer profile interfaces
 */
router.get('/:id', controller.get);

/**
 * POST /api/v1/clients
 * 
 * Create a new client
 * 
 * Request body:
 * - nom: Client name (required)
 * 
 * Used by:
 * - Client management interfaces
 * - Sales interfaces for adding new customers
 * - Customer registration forms
 */
router.post('/', controller.create);

/**
 * GET /api/v1/clients/:id/ventes
 * 
 * Get sales history for a specific client
 * 
 * Path parameters:
 * - id: Client ID
 * 
 * Used by:
 * - Client detail pages
 * - Customer history views
 * - Sales analysis interfaces
 */
router.get('/:id/ventes', controller.ventes);

export default router;
