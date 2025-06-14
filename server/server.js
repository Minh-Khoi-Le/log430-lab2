/**
 * Server Entry Point
 * 
 * This file is the main entry point for the application.
 * It imports the configured Express application from index.js,
 * sets up the server port, and starts the HTTP server.
 * 
 * The server listens on the port specified in the PORT environment variable,
 * or defaults to port 3000 if no environment variable is set.
 */

import app from './index.js';

// Configure server port from environment variables or use default
const PORT = process.env.PORT || 3000;

// Start the HTTP server
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}/api/v1`);
  console.log(`Documentation available at http://localhost:${PORT}/api/docs`);
}); 