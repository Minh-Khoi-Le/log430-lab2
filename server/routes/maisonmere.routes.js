const express = require('express');
const ProduitDAO = require('../dao/produit.dao');
const router = express.Router();

// Récupérer tous les produits
router.get('/produits', async (req, res) => {
  try {
    const produits = await ProduitDAO.getAll();
    res.json(produits);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des produits" });
  }
});

// Récupérer un produit par ID
router.get('/produits/:id', async (req, res) => {
  try {
    const produit = await ProduitDAO.getById(req.params.id);
    if (!produit) return res.status(404).json({ error: "Produit non trouvé" });
    res.json(produit);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération du produit" });
  }
});

// Créer un nouveau produit
router.post('/produits', async (req, res) => {
  try {
    const { nom, prix, stock } = req.body;
    const nouveau = await ProduitDAO.create({ nom, prix: parseFloat(prix), stock: parseInt(stock) });
    res.status(201).json(nouveau);
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la création du produit", details: err.message });
  }
});

// Modifier un produit
router.put('/produits/:id', async (req, res) => {
  try {
    const { nom, prix, stock } = req.body;
    const maj = await ProduitDAO.update(req.params.id, { nom, prix: parseFloat(prix), stock: parseInt(stock) });
    res.json(maj);
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la modification du produit", details: err.message });
  }
});

// Supprimer un produit
router.delete('/produits/:id', async (req, res) => {
  try {
    await ProduitDAO.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({ error: "Produit non trouvé", details: err.message });
  }
});

module.exports = router;
