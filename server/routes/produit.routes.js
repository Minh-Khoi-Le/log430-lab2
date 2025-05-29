const express = require('express');
const ProduitDAO = require('../dao/produit.dao');

const router = express.Router();

// Liste tous les produits
router.get('/', async (req, res) => {
  const produits = await ProduitDAO.getAll();
    console.log("Produits retournés:", produits);
  res.json(produits);
});

// Récupère un produit
router.get('/:id', async (req, res) => {
  const produit = await ProduitDAO.getById(req.params.id);
  if (!produit) return res.status(404).json({ error: "Produit non trouvé" });
  res.json(produit);
});

// Ajoute un produit
router.post('/', async (req, res) => {
  try {
    const { nom, prix, stock } = req.body;
    const nouveau = await ProduitDAO.create({
      nom,
      prix: parseFloat(prix),
      stock: parseInt(stock),
    });
    res.status(201).json(nouveau);
  } catch (err) {
    res.status(400).json({ error: "Erreur création produit", details: err.message });
  }
});

// Modifie un produit
router.put('/:id', async (req, res) => {
  try {
    const { nom, prix, stock } = req.body;
    const maj = await ProduitDAO.update(req.params.id, {
      nom,
      prix: parseFloat(prix),
      stock: parseInt(stock),
    });
    res.json(maj);
  } catch (err) {
    res.status(400).json({ error: "Erreur modification produit", details: err.message });
  }
});

// Supprime un produit
router.delete('/:id', async (req, res) => {
  try {
    await ProduitDAO.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({ error: "Produit non trouvé", details: err.message });
  }
});

module.exports = router;
