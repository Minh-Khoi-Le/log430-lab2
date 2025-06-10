const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.post('/', async (req, res) => {
  const { clientNom, magasinId, panier } = req.body; // [{ produitId, quantite, prix }]

  console.log("POST vente body :", req.body);
  try {
    // Vérifie stock pour chaque produit AVANT d’aller plus loin (et récupère le nom si erreur)
    for (const item of panier) {
      const stock = await prisma.stock.findFirst({
        where: { produitId: item.produitId, magasinId },
        include: { produit: true },
      });
      if (!stock || stock.quantite < item.quantite) {
        return res.status(400).json({
          error: `Produit "${stock?.produit?.nom || item.produitId}" out of stock ou stock insuffisant!`,
        });
      }
    }

    // Transaction : création client, vente, lignes, MAJ stock
    const result = await prisma.$transaction(async (prisma) => {
      // Crée/cherche le client
      let client = await prisma.client.findFirst({ where: { nom: clientNom } });
      if (!client) {
        client = await prisma.client.create({ data: { nom: clientNom} });
      }

      // Crée la vente
      const vente = await prisma.vente.create({
        data: {
          magasinId,
          clientId: client.id,
          total: panier.reduce((s, i) => s + i.quantite * i.prix, 0),
          lignes: {
            create: panier.map(item => ({
              produitId: item.produitId,
              quantite: item.quantite,
              prixUnitaire: item.prix,
            })),
          },
        },
        include: { lignes: true }
      });

      // MAJ des stocks
      for (const item of panier) {
        await prisma.stock.updateMany({
          where: { produitId: item.produitId, magasinId },
          data: { quantite: { decrement: item.quantite } }
        });
      }

      return vente;
    });

    res.json({ success: true, venteId: result.id });
  } catch (err) { 
    console.error("Erreur /ventes :", err); 
    res.status(500).json({ error: "Erreur serveur lors de l'enregistrement de la vente." });
  }
});

module.exports = router;
