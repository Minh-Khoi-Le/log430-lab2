/**
 * Products Page
 * 
 * This component displays the product catalog and provides product management
 * functionality for administrators (gestionnaire role).
 * 
 */

import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import Modal from "../components/Modal";
import ProductEditForm from "../components/ProductEditForm";
import { useUser } from "../context/UserContext";
import { 
  Box, 
  FormControlLabel, 
  Switch, 
  Typography, 
  Paper,
  Divider 
} from "@mui/material";

const Products = () => {
  // State management for products and UI
  const [produits, setProduits] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [produitASupprimer, setProduitASupprimer] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [produitAModifier, setProduitAModifier] = useState(null);
  const [hideUnavailable, setHideUnavailable] = useState(false);

  const { user } = useUser();

  /**
   * Fetch products from the API
   * 
   * Retrieves the product catalog from the backend and updates state
   */
  const fetchProduits = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/products");
      if (!response.ok) throw new Error("Erreur lors du chargement des produits");
      const data = await response.json();
      setProduits(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // Load products when component mounts
  useEffect(() => {
    fetchProduits();
  }, []);

  /**
   * Product Management Functions
   * 
   * These functions handle CRUD operations for products
   * Only available to users with gestionnaire role
   */
  
  // Delete product handling
  const handleDelete = produit => {
    setProduitASupprimer(produit);
    setModalOpen(true);
  };
  
  // Confirm product deletion
  const confirmDelete = async () => {
    await fetch(`http://localhost:3000/api/v1/products/${produitASupprimer.id}`, {
      method: "DELETE",
    });
    setModalOpen(false);
    setProduitASupprimer(null);
    fetchProduits();
  };
  
  // Cancel product deletion
  const cancelDelete = () => {
    setModalOpen(false);
    setProduitASupprimer(null);
  };
  
  // Edit product handling
  const handleEdit = produit => {
    setProduitAModifier(produit);
    setEditModalOpen(true);
  };
  
  // Save product edits
  const saveEdit = async majProduit => {
    await fetch(`http://localhost:3000/api/v1/products/${majProduit.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(majProduit),
    });
    setEditModalOpen(false);
    setProduitAModifier(null);
    fetchProduits();
  };
  
  // Cancel product edit
  const cancelEdit = () => {
    setEditModalOpen(false);
    setProduitAModifier(null);
  };

  // Handle availability filter change
  const handleFilterChange = (event) => {
    setHideUnavailable(event.target.checked);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f6f6f6",
      fontFamily: "sans-serif",
    }}>
      {/* Header with title and filters */}
      {user?.role === "client" && (
        <Paper elevation={1} sx={{ mx: 4, mt: 4, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Catalogue de produits
            </Typography>
            <FormControlLabel
              control={
                <Switch 
                  checked={hideUnavailable}
                  onChange={handleFilterChange}
                  color="primary"
                />
              }
              label="Afficher uniquement les produits disponibles"
              labelPlacement="start"
            />
          </Box>
        </Paper>
      )}

      {/* Main content area with product listing */}
      <div style={{
        margin: user?.role === "client" ? "20px 28px 0 28px" : "40px 28px 0 28px",
        background: "#666",
        borderRadius: 4,
        padding: "40px 12px 60px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        minHeight: 450,
        boxSizing: "border-box",
      }}>
        {/* Product list with conditional edit/delete actions based on user role */}
        <ProductList
          produits={produits}
          onDelete={user.role === "gestionnaire" ? handleDelete : undefined}
          onEdit={user.role === "gestionnaire" ? handleEdit : undefined}
          hideUnavailable={hideUnavailable}
        />

        {/* Modal for product editing */}
        <Modal
          open={editModalOpen}
          title="Modification du produit"
          onClose={cancelEdit}
        >
          <ProductEditForm
            produit={produitAModifier}
            onSave={saveEdit}
            onCancel={cancelEdit}
          />
        </Modal>
        
        {/* Confirmation modal for product deletion */}
        <Modal
          open={modalOpen}
          title="Confirmation de suppression"
          onClose={cancelDelete}
          onConfirm={confirmDelete}
        >
          <div style={{ margin: "16px 0 0 0" }}>
            Êtes-vous sûr de vouloir supprimer <b>{produitASupprimer?.nom}</b> ?
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Products;
