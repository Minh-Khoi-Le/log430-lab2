import React, { useEffect, useState } from "react";
import ProductSearch from "../components/ProductSearch";
import ProductList from "../components/ProductList";
import Modal from "../components/Modal";
import ProductEditForm from "../components/ProductEditForm";
import { useUser } from "../context/UserContext";

const Products = () => {
  const [produits, setProduits] = useState([]);
  const [search, ] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [produitASupprimer, setProduitASupprimer] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [produitAModifier, setProduitAModifier] = useState(null);

  const { user } = useUser();

  // Chargement des produits depuis l'API
  const fetchProduits = async () => {
    try {
      const response = await fetch("http://localhost:3800/produits");
      if (!response.ok) throw new Error("Erreur lors du chargement des produits");
      const data = await response.json();
      setProduits(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  // Filtre sur le nom 
  const produitsFiltres = produits.filter((p) =>
    p.nom.toLowerCase().includes(search.toLowerCase())
  );

  // Gestion CRUD (gestionnaire seulement)
  const handleDelete = produit => {
    setProduitASupprimer(produit);
    setModalOpen(true);
  };
  const confirmDelete = async () => {
    await fetch(`http://localhost:3800/maisonmere/produits/${produitASupprimer.id}`, {
      method: "DELETE",
    });
    setModalOpen(false);
    setProduitASupprimer(null);
    fetchProduits();
  };
  const cancelDelete = () => {
    setModalOpen(false);
    setProduitASupprimer(null);
  };
  const handleEdit = produit => {
    setProduitAModifier(produit);
    setEditModalOpen(true);
  };
  const saveEdit = async majProduit => {
    await fetch(`http://localhost:3800/maisonmere/produits/${majProduit.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(majProduit),
    });
    setEditModalOpen(false);
    setProduitAModifier(null);
    fetchProduits();
  };
  const cancelEdit = () => {
    setEditModalOpen(false);
    setProduitAModifier(null);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f6f6f6",
      fontFamily: "sans-serif",
    }}>
      {/* TOP HEADER, SEARCH, etc... */}
      <div style={{
        margin: "40px 28px 0 28px",
        background: "#666",
        borderRadius: 4,
        padding: "40px 12px 60px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        minHeight: 450,
        boxSizing: "border-box",
      }}>
        <ProductList
          produits={produitsFiltres}
          onDelete={user.role === "gestionnaire" ? handleDelete : undefined}
          onEdit={user.role === "gestionnaire" ? handleEdit : undefined}
          // Plus besoin de gérer le panier ici, CartContext le fait dans ProductCard
        />

        {/* Modals */}
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
