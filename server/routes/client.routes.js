const express = require('express');
const ClientDAO = require('../dao/client.dao');
const router = express.Router();

// Inscription client
router.post('/register', async (req, res) => {
  try {
    const { nom } = req.body;
    const client = await ClientDAO.create({ nom });
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la création du client", details: err.message });
  }
});

// Obtenir l’historique d’achats d’un client
router.get('/:clientId/achats', async (req, res) => {
  try {
    const VenteDAO = require('../dao/vente.dao');
    const ventes = await VenteDAO.getByClient(req.params.clientId);
    res.json(ventes);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des achats", details: err.message });
  }
});

module.exports = router;
