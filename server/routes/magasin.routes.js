const express = require('express');
const MagasinDAO = require('../dao/magasin.dao');
const StockDAO = require('../dao/stock.dao');
const RestockDAO = require('../dao/restock.dao');
const router = express.Router();

// Lecture publique magasins
router.get('/', async (req, res) => {
  const magasins = await MagasinDAO.getAll();
  res.json(magasins);
});
router.get('/:id', async (req, res) => {
  const magasin = await MagasinDAO.getById(req.params.id);
  if (!magasin) return res.status(404).json({ error: "Magasin non trouvé" });
  res.json(magasin);
});

// Stock magasin (pour un magasin donné)
router.get('/:magasinId/stock', async (req, res) => {
  try {
    const stocks = await StockDAO.getStockByMagasin(req.params.magasinId);
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération du stock" });
  }
});

// Demande de restock
router.post('/:magasinId/restock', async (req, res) => {
  try {
    const { produitId, quantite } = req.body;
    const request = await RestockDAO.createRequest({
      produitId,
      magasinId: req.params.magasinId,
      quantite
    });
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la demande de réapprovisionnement", details: err.message });
  }
});

// Lister les demandes de restock du magasin
router.get('/:magasinId/restock', async (req, res) => {
  try {
    const demandes = await RestockDAO.getRequestsByMagasin(req.params.magasinId);
    res.json(demandes);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des demandes" });
  }
});

module.exports = router;
