/**
 * User Routes
 * 
 * Base path: /api/v1/users
 * 
 * These routes are used by:
 * - User management interfaces
 * - Authentication/login
 * - Sales interfaces for customer lookup (incoming)
 */

import express from 'express';
import * as controller from '../controllers/user.controller.js';

const router = express.Router();

/**
 * POST /api/v1/users/login
 * 
 * Authenticate a user and return user details
 * 
 * Request body:
 * - nom: User name (required)
 * - password: User password (required)
 * 
 * Used by:
 * - Login page
 * - Authentication interfaces
 */
router.post('/login', controller.login);

/**
 * GET /api/v1/users
 * 
 * List all users
 * 
 * Used by:
 * - User management interfaces
 * - Sales interfaces for customer selection
 * - Admin dashboards
 */
router.get('/', controller.list);

/**
 * GET /api/v1/users/:id
 * 
 * Get detailed information about a specific user
 * 
 * Path parameters:
 * - id: User ID
 * 
 * Used by:
 * - User detail pages
 * - Profile interfaces
 */
router.get('/:id', controller.get);

/**
 * POST /api/v1/users
 * 
 * Create a new user
 * 
 * Request body:
 * - nom: User name (required)
 * - role: User role (required) - 'client' or 'gestionnaire'
 * - password: User password (optional, defaults to "password")
 * 
 * Used by:
 * - User management interfaces
 * - Registration forms
 */
router.post('/', controller.create);

/**
 * GET /api/v1/users/:id/ventes
 * 
 * Get sales history for a specific user (client)
 * 
 * Path parameters:
 * - id: User ID
 * 
 * Used by:
 * - User detail pages
 * - Customer history views
 * - Sales analysis interfaces
 */
router.get('/:id/ventes', controller.ventes);

export default router; 