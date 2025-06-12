/**
 * Product Routes
 * 
 * Base path: /api/v1/products
 * 
 * These routes are used by:
 * - Store management interfaces to view and manage product inventory
 * - Parent company (maisonmere) to manage the product catalog
 * - Sales interfaces to retrieve product information for sales transactions
 */

import express from 'express';
import { body, param, query } from 'express-validator';
import * as controller from '../controllers/product.controller.js';
import { auth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

/**
 * GET /api/v1/products
 * 
 * List all products with optional pagination and sorting
 *
 * 
 * Used by:
 * - Store interfaces to display product catalog
 * - Admin interfaces to manage products
 */
router.get('/',
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('size').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('sort').optional().isString(),
  validateRequest,
  controller.list
);

/**
 * GET /api/v1/products/:id
 * 
 * Get detailed information about a specific product
 * 
 * Used by:
 * - Product detail pages
 * - Sales interfaces when adding products to sales
 * - Inventory management interfaces
 */
router.get('/:id',
  param('id').isInt({ min: 1 }),
  validateRequest,
  controller.get
);

/**
 * POST /api/v1/products
 * 
 * Create a new product
 * 
 * Used by:
 * - Admin interfaces for product catalog management
 * - Parent company (maisonmere) to add new products to the catalog
 */
router.post('/',
  auth,
  body('name').isString().trim().notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('description').optional().isString().trim(),
  validateRequest,
  controller.create
);

/**
 * PUT /api/v1/products/:id
 * 
 * Update an existing product
 * 
 * Used by:
 * - Admin interfaces for product catalog management
 * - Parent company (maisonmere) to update product information
 */
router.put('/:id',
  auth,
  param('id').isInt({ min: 1 }),
  body('name').optional().isString().trim().notEmpty(),
  body('price').optional().isFloat({ min: 0 }),
  body('description').optional().isString().trim(),
  validateRequest,
  controller.update
);

/**
 * DELETE /api/v1/products/:id
 * 
 * Delete a product
 * Used by:
 * - Admin interfaces for product catalog management
 * - Parent company (maisonmere) to remove discontinued products
 */
router.delete('/:id',
  auth,
  param('id').isInt({ min: 1 }),
  validateRequest,
  controller.remove
);

export default router; 