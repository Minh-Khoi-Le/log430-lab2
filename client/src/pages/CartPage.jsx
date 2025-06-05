import React from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.produit.prix * item.quantite, 0);

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
      <h2
        style={{
          fontWeight: 700,
          fontSize: "2.2rem",
          textAlign: "center",
          marginBottom: 28,
          color: "#223"
        }}
      >Votre panier</h2>
      {cart.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888", fontSize: 20, marginTop: 30 }}>Le panier est vide.</div>
      ) : (
        <>
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
                <span>
                  <span style={{ fontWeight: 700 }}>{item.produit.nom}</span>
                  &nbsp;x {item.quantite}
                  <span style={{ color: "#6070FF", fontWeight: 400 }}>
                    &nbsp;-&nbsp;${item.produit.prix.toFixed(2)}
                  </span>
                </span>
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
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>
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
              cursor: "pointer",
              letterSpacing: 0.2,
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "linear-gradient(90deg,#375bff,#3385d6)";
            }}
            onFocus={e => {
              e.currentTarget.style.background = "linear-gradient(90deg,#375bff,#3385d6)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "linear-gradient(90deg,#376dff,#63b3ed)";
            }}
            onBlur={e => {
              e.currentTarget.style.background = "linear-gradient(90deg,#376dff,#63b3ed)";
            }}
            onClick={() => {
              alert("Achat confirmé !");
              clearCart();
            }}
          >
            Confirmer l'achat
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
