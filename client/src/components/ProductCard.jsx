import React from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const ProductCard = ({ produit, onEdit, onDelete }) => {
  const [hover, setHover] = React.useState(false);
  const { addToCart } = useCart();
  const { user } = useUser();
  const totalStock = produit.stocks
    ? produit.stocks.reduce((sum, s) => sum + s.quantite, 0)
    : 0;

  const isClient = user?.role === "client";

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="product-card-img-zone"
        style={{ position: "relative", height: 80 }}
      >
        <div
          className="product-card-img-bg"
          style={{
            background: "#fff",
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            transition: "filter 0.15s",
            zIndex: 1,
          }}
        />
        {/* Icônes d'actions pour gestionnaire */}
        {hover && (onEdit || onDelete) && (
          <div
            className="product-card-actions"
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              justifyContent: "center",
              gap: 32,
              height: "100%",
              alignItems: "center",
            }}
          >
            {onEdit && (
              <button
                type="button"
                className="product-card-action-btn"
                title="Modifier"
                aria-label="Modifier"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(produit);
                }}
              >
                <img
                  src="/icon _pencil_.svg"
                  alt="Modifier"
                  width={24}
                  height={24}
                />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                className="product-card-action-btn"
                title="Supprimer"
                aria-label="Supprimer"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(produit);
                }}
              >
                <img
                  src="/icon _x.svg"
                  alt="Supprimer"
                  width={26}
                  height={26}
                />
              </button>
            )}
          </div>
        )}
      </div>
      <div
        className="product-card-info"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span style={{ fontWeight: 600 }}>{produit.nom}</span>
          <span>${produit.prix.toFixed(2)}</span>
        </div>
        <span style={{ fontSize: 13, color: "#3a8bff", marginTop: 2 }}>
          Stock total : <b>{totalStock}</b>
        </span>
      </div>

      {/* Bouton "Ajouter au panier" pour client */}
      {isClient && (
        <div style={{ padding: "0.5rem" }}>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(produit)}
            style={{ width: "100%", backgroundColor: "#007bff", color: "#fff" }}
          >
            Ajouter au panier
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
