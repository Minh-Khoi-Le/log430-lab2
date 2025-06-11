/**
 * Product Edit Form Component
 * 
 * This component provides a form for editing product details.
 * It's used by administrators (gestionnaire role) to modify product information.
 * 
 */

import React, { useState, useEffect } from "react";

/**
 * ProductEditForm Component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.produit - Product object to edit
 * @param {Function} props.onSave - Handler function called when save button is clicked
 * @param {Function} props.onCancel - Handler function called when cancel button is clicked
 * @returns {JSX.Element} Product edit form
 */
const ProductEditForm = ({ produit, onSave, onCancel }) => {
  // Local state for form fields to enable controlled inputs
  const [form, setForm] = useState({ nom: "", prix: "", stock: "" });

  // Initialize form with product data when component mounts or product changes
  useEffect(() => {
    if (produit) {
      setForm({
        nom: produit.nom,
        prix: produit.prix,
        stock: produit.stock
      });
    }
  }, [produit]);

  /**
   * Handle input field changes
   * Updates the form state when any input value changes
   * 
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle form submission
   * Validates inputs and calls the onSave handler with updated product data
   * 
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    if (!form.nom || form.prix === "" || form.stock === "") {
      alert("Tous les champs sont obligatoires !");
      return;
    }
    // Call save handler with updated product data
    onSave({ ...produit, ...form, prix: parseFloat(form.prix), stock: parseInt(form.stock) });
  };

  return (
    <form onSubmit={handleSubmit} style={{ minWidth: 280, maxWidth: 350 }}>
      {/* Product name field */}
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
      
      {/* Product price field */}
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
      
      {/* Product stock field */}
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
      
      {/* Form action buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 18 }}>
        <button type="button" className="btn" onClick={onCancel}>Annuler</button>
        <button type="submit" className="btn btn-danger">Sauvegarder</button>
      </div>
    </form>
  );
};

export default ProductEditForm;
