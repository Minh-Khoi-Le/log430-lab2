const express = require('express');
const ProduitDAO = require('../dao/produit.dao');
const router = express.Router();

// GET /produits : liste tous les produits avec leur stock total
router.get('/', async (req, res) => {
  try {
    const produits = await ProduitDAO.getAll();
    res.json(produits);
  } catch (err) {
    console.error("Erreur lors de la récupération des produits:", err);
    res.status(500).json({ error: "Erreur lors de la récupération des produits" });
  }
});

// GET /produits/:id : détail d'un produit avec stock total
router.get('/:id', async (req, res) => {
  try {
    const produit = await ProduitDAO.getById(req.params.id);
    if (!produit) return res.status(404).json({ error: "Produit non trouvé" });
    res.json(produit);
  } catch (err) {
    console.error("Erreur lors de la récupération du produit:", err);
    res.status(500).json({ error: "Erreur lors de la récupération du produit" });
  }
});

module.exports = router;
