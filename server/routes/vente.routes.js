const express = require('express');
const VenteDAO = require('../dao/vente.dao');
const router = express.Router();

// Enregistrer une vente
router.post('/', async (req, res) => {
  try {
    const { magasinId, clientId, lignes } = req.body;
    if (!Array.isArray(lignes) || !magasinId || !clientId) {
      return res.status(400).json({ error: "Paramètres invalides" });
    }
    const vente = await VenteDAO.create({ magasinId, clientId, lignes });
    res.status(201).json(vente);
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de l'enregistrement de la vente", details: err.message });
  }
});

// Liste toutes les ventes
router.get('/', async (req, res) => {
  const ventes = await VenteDAO.getAll();
  res.json(ventes);
});

module.exports = router;
