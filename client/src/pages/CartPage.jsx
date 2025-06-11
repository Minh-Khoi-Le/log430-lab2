/**
 * Cart Page
 * 
 * This component displays the shopping cart and handles the checkout process.
 * It's only accessible to users with the client role.
 * 
 */

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Calculate total price of all items in cart
  const total = cart.reduce((sum, item) => sum + item.produit.prix * item.quantite, 0);

  /**
   * Handle checkout process
   * 
   * Submits the cart contents to the backend to create a new sale.
   * Updates UI state during the process and handles success/failure.
   */
  const handleCheckout = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      // Send cart data to backend API
      const res = await fetch("http://localhost:3000/api/v1/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientNom: user.nom,
          magasinId: user.magasinId, 
          panier: cart.map(item => ({
            produitId: item.produit.id,
            quantite: item.quantite,
            prix: item.produit.prix
          }))
        })
      });
      const data = await res.json();
      setLoading(false);

      // Handle API response
      if (data.success) {
        clearCart();
        alert("Achat confirmé !");
        setErrorMsg("");
        window.location.reload(); 
      } else if (data.error) {
        setErrorMsg(data.error);
      }
    } catch (err) {
      console.error("Erreur lors de la confirmation de l'achat :", err);
      setErrorMsg("Erreur réseau ou serveur.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 520,
        margin: "60px auto",
        background: "#fff",
        padding: 36,
        borderRadius: 18,
        boxShadow: "0 6px 32px #23314622, 0 1.5px 10px #ccc2",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* Cart title */}
      <h2
        style={{
          fontWeight: 700,
          fontSize: "2.2rem",
          textAlign: "center",
          marginBottom: 28,
          color: "#223"
        }}
      >Votre panier</h2>
      
      {/* Empty cart message */}
      {cart.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888", fontSize: 20, marginTop: 30 }}>Le panier est vide.</div>
      ) : (
        <>
          {/* Cart item list */}
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {cart.map((item) => (
              <li
                key={item.produit.id}
                style={{
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #e4e4e4",
                  paddingBottom: 7,
                  fontSize: 18,
                  color: "#222",
                  fontWeight: 500,
                }}
              >
                {/* Item details */}
                <span>
                  <span style={{ fontWeight: 700 }}>{item.produit.nom}</span>
                  &nbsp;x {item.quantite}
                  <span style={{ color: "#6070FF", fontWeight: 400 }}>
                    &nbsp;-&nbsp;${item.produit.prix.toFixed(2)}
                  </span>
                </span>
                
                {/* Remove item button */}
                <button
                  style={{
                    padding: "7px 17px",
                    background: "#f7f8fc",
                    color: "#2a3557",
                    border: "1.5px solid #c8c8e8",
                    borderRadius: 25,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: 15,
                    transition: "background 0.16s, color 0.12s, border 0.16s",
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = "#f44336";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.border = "1.5px solid #f44336";
                  }}
                  onFocus={e => {
                    e.currentTarget.style.background = "#f44336";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.border = "1.5px solid #f44336";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = "#f7f8fc";
                    e.currentTarget.style.color = "#2a3557";
                    e.currentTarget.style.border = "1.5px solid #c8c8e8";
                  }}
                  onBlur={e => {
                    e.currentTarget.style.background = "#f7f8fc";
                    e.currentTarget.style.color = "#2a3557";
                    e.currentTarget.style.border = "1.5px solid #c8c8e8";
                  }}
                  onClick={() => removeFromCart(item.produit.id)}
                  disabled={loading}
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>
          
          {/* Cart total */}
          <div
            style={{
              fontWeight: 700,
              fontSize: 20,
              marginTop: 30,
              marginBottom: 22,
              textAlign: "right",
              color: "#29306b"
            }}
          >
            Total : <span style={{ color: "#376dff" }}>${total.toFixed(2)}</span>
          </div>
          
          {/* Error message display */}
          {errorMsg && (
            <div style={{ color: "#f44336", fontWeight: 600, marginBottom: 14 }}>{errorMsg}</div>
          )}
          
          {/* Checkout button */}
          <button
            style={{
              margin: "24px auto 0 auto",
              display: "block",
              padding: "14px 0",
              width: "80%",
              background: "linear-gradient(90deg,#376dff,#63b3ed)",
              color: "#fff",
              border: "none",
              borderRadius: 30,
              fontWeight: 700,
              fontSize: 22,
              boxShadow: "0 4px 16px #63b3ed33",
              transition: "background 0.2s, transform 0.1s",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: 0.2,
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
            onClick={handleCheckout}
          >
            {loading ? "Traitement..." : "Confirmer l'achat"}
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
