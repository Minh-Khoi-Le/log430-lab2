/**
 * Client Controller
 * 
 * The controller manages:
 * - Basic CRUD operations for clients
 * - Retrieving client sales history
 */

import ClientDAO from '../dao/client.dao.js';
import VenteDAO from '../dao/vente.dao.js';

/**
 * List Clients Controller
 * 
 * Retrieves a list of all clients.
 * 
 * Process:
 * 1. Calls the ClientDAO to fetch all clients
 * 2. Returns the client list as JSON
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export async function list(req, res, next) {
  try {
    const clients = await ClientDAO.getAll();
    res.json(clients);
  } catch (err) { next(err); }
}

/**
 * Get Client Controller
 * 
 * Retrieves detailed information about a specific client by ID.
 * 
 * @param {Request} req - Express request object with client ID parameter
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export async function get(req, res, next) {
  try {
    const client = await ClientDAO.getById(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client non trouvé' });
    res.json(client);
  } catch (err) { next(err); }
}

/**
 * Create Client Controller
 * 
 * Creates a new client with the provided data.
 * 
 * @param {Request} req - Express request object with client data in body
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export async function create(req, res, next) {
  try {
    const client = await ClientDAO.create(req.body);
    res.status(201).json(client);
  } catch (err) { next(err); }
}

/**
 * Get Client Sales Controller
 * 
 * Retrieves sales history for a specific client.
 * 
 * @param {Request} req - Express request object with client ID parameter
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export async function ventes(req, res, next) {
  try {
    const ventes = await VenteDAO.getByClient(req.params.id);
    res.json(ventes);
  } catch (err) { next(err); }
} 