import React, { useEffect, useState } from "react";
import ProductSearch from "./components/ProductSearch";
import ProductList from "./components/ProductList";
import "./index.css";
import Modal from "./components/Modal";
import ProductEditForm from "./components/ProductEditForm";

const App = () => {
  const [produits, setProduits] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [produitASupprimer, setProduitASupprimer] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [produitAModifier, setProduitAModifier] = useState(null);

  // Chargement des produits depuis l'API
  const fetchProduits = async () => {
    try {
      const response = await fetch("http://localhost:3800/produits");
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des produits");
      }
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

  //Fonction pour supprimer un produit
  const handleDelete = (produit) => {
    setProduitASupprimer(produit);
    setModalOpen(true);
  };

  // Fonction pour confirmer la suppression
  const confirmDelete = async () => {
    await fetch(`http://localhost:3800/produits/${produitASupprimer.id}`, {
      method: "DELETE",
    });
    setModalOpen(false);
    setProduitASupprimer(null);
    fetchProduits();
  };

  // Fonction pour annuler la suppression
  const cancelDelete = () => {
    setModalOpen(false);
    setProduitASupprimer(null);
  };

  // Fonction pour modifier un produit
  const handleEdit = (produit) => {
    setProduitAModifier(produit);
    setEditModalOpen(true);
  };

  // Fonction pour enregistrer les modifications
  const saveEdit = async (majProduit) => {
    await fetch(`http://localhost:3800/produits/${majProduit.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(majProduit),
    });
    setEditModalOpen(false);
    setProduitAModifier(null);
    fetchProduits();
  };

  //fonction pour annuler la modification
  const cancelEdit = () => {
    setEditModalOpen(false);
    setProduitAModifier(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f6f6",
        fontFamily: "sans-serif",
      }}
    >
      {/* TOP HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "32px 36px 0 36px",
        }}
      >
        <div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: 32,
              textShadow: "1px 1px 2px #bbb",
            }}
          >
            GESTION MAGASIN
          </div>
        </div>
        <div
          style={{
            fontSize: 38,
            cursor: "pointer",
            marginLeft: 28,
            marginTop: -30,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: 48,
                lineHeight: "44px",
              }}
            >
              &#9776;
            </span>
          </div>
        </div>
      </div>

      {/* Titre de section et recherche */}
      <div
        style={{
          marginLeft: 36,
          marginTop: 36,
          marginBottom: 0,
          maxWidth: 600,
        }}
      >
        <h2 style={{ marginBottom: 8 }}>Liste des produits</h2>
        <div style={{ maxWidth: 340 }}>
          <ProductSearch value={search} onChange={setSearch} />
        </div>
      </div>

      {/* GRILLE DES PRODUITS */}
      <div
        style={{
          margin: "40px 28px 0 28px",
          background: "#666",
          borderRadius: 4,
          padding: "40px 12px 60px 12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          minHeight: 450,
          boxSizing: "border-box",
        }}
      >
        <ProductList
          produits={produitsFiltres}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

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

export default App;
