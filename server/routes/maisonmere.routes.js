const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require("express");
const ProduitDAO = require("../dao/produit.dao");
const MagasinDAO = require("../dao/magasin.dao");
const router = express.Router();

// CRUD PRODUITS
// Récupérer tous les produits
router.get("/produits", async (req, res) => {
  try {
    const produits = await ProduitDAO.getAll();
    res.json(produits);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des produits" });
  }
});

// Récupérer un produit par ID
router.get("/produits/:id", async (req, res) => {
  try {
    const produit = await ProduitDAO.getById(req.params.id);
    if (!produit) return res.status(404).json({ error: "Produit non trouvé" });
    res.json(produit);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du produit" });
  }
});

// Créer un nouveau produit
router.post("/produits", async (req, res) => {
  try {
    const { nom, prix, stock } = req.body;
    const nouveau = await ProduitDAO.create({
      nom,
      prix: parseFloat(prix),
      stock: parseInt(stock),
    });
    res.status(201).json(nouveau);
  } catch (err) {
    res
      .status(400)
      .json({
        error: "Erreur lors de la création du produit",
        details: err.message,
      });
  }
});

// Modifier un produit
router.put("/produits/:id", async (req, res) => {
  try {
    const { nom, prix, stock } = req.body;
    const maj = await ProduitDAO.update(req.params.id, {
      nom,
      prix: parseFloat(prix),
      stock: parseInt(stock),
    });
    res.json(maj);
  } catch (err) {
    res
      .status(400)
      .json({
        error: "Erreur lors de la modification du produit",
        details: err.message,
      });
  }
});

// Supprimer un produit
router.delete("/produits/:id", async (req, res) => {
  try {
    await ProduitDAO.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({ error: "Produit non trouvé", details: err.message });
  }
});

// CRUD MAGASINS
router.post("/magasins", async (req, res) => {
  try {
    const { nom, adresse } = req.body;
    const magasin = await MagasinDAO.create({ nom, adresse });
    res.status(201).json(magasin);
  } catch (err) {
    res
      .status(400)
      .json({
        error: "Erreur lors de la création du magasin",
        details: err.message,
      });
  }
});
router.put("/magasins/:id", async (req, res) => {
  try {
    const { nom, adresse } = req.body;
    const magasin = await MagasinDAO.update(req.params.id, { nom, adresse });
    res.json(magasin);
  } catch (err) {
    res
      .status(400)
      .json({
        error: "Erreur lors de la modification du magasin",
        details: err.message,
      });
  }
});
router.delete("/magasins/:id", async (req, res) => {
  try {
    await MagasinDAO.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({ error: "Magasin non trouvé", details: err.message });
  }
});

router.get("/stats", async (req, res) => {
  try {
    // Récupérer tous les magasins
    const magasins = await prisma.magasin.findMany();

    // Pour chaque magasin, calculer les stats
    const stats = await Promise.all(
      magasins.map(async (magasin) => {
        // Toutes les ventes de ce magasin
        const ventes = await prisma.vente.findMany({
          where: { magasinId: magasin.id },
          include: { lignes: true },
        });

        // Calcul du chiffre d’affaires et produits vendus
        let chiffreAffaires = 0;
        let produitsVendus = 0;
        ventes.forEach((vente) => {
          vente.lignes.forEach((ligne) => {
            chiffreAffaires += ligne.prixUnitaire * ligne.quantite;
            produitsVendus += ligne.quantite;
          });
        });

        // Retourner les stats pour ce magasin
        return {
          id: magasin.id,
          nom: magasin.nom,
          ventesTotal: ventes.length,
          produitsVendus,
          chiffreAffaires,
        };
      })
    );

    res.json(stats);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur lors du calcul des stats" });
  }
});
module.exports = router;
