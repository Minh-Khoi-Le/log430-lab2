import React, { useState, useEffect } from "react";

const ProductEditForm = ({ produit, onSave, onCancel }) => {
  // Copie locale de l'objet pour édition contrôlée
  const [form, setForm] = useState({ nom: "", prix: "", stock: "" });

  useEffect(() => {
    if (produit) {
      setForm({
        nom: produit.nom,
        prix: produit.prix,
        stock: produit.stock
      });
    }
  }, [produit]);

  // Gestion des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation 
    if (!form.nom || form.prix === "" || form.stock === "") {
      alert("Tous les champs sont obligatoires !");
      return;
    }
    onSave({ ...produit, ...form, prix: parseFloat(form.prix), stock: parseInt(form.stock) });
  };

  return (
    <form onSubmit={handleSubmit} style={{ minWidth: 280, maxWidth: 350 }}>
      <div style={{ marginBottom: 18 }}>
        <label>Nom<br/>
          <input
            name="nom"
            value={form.nom}
            onChange={handleChange}
            style={{ width: "100%", padding: 6 }}
            required
          />
        </label>
      </div>
      <div style={{ marginBottom: 18 }}>
        <label>Prix<br/>
          <input
            name="prix"
            type="number"
            step="0.01"
            value={form.prix}
            onChange={handleChange}
            style={{ width: "100%", padding: 6 }}
            required
          />
        </label>
      </div>
      <div style={{ marginBottom: 18 }}>
        <label>Stock<br/>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            style={{ width: "100%", padding: 6 }}
            required
          />
        </label>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 18 }}>
        <button type="button" className="btn" onClick={onCancel}>Annuler</button>
        <button type="submit" className="btn btn-danger">Sauvegarder</button>
      </div>
    </form>
  );
};

export default ProductEditForm;
