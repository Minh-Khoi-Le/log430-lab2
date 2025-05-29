import React from "react";

const ProductCard = ({ produit, onEdit, onDelete }) => {
  const [hover, setHover] = React.useState(false);

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
        {/* Icônes d'actions */}
        {hover && (
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
            <button
              type="button"
              className="product-card-action-btn"
              title="Modifier"
              aria-label="Modifier"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(produit);
              }}
            >
              <img
                src="/icon _pencil_.svg"
                alt="Modifier"
                width={24}
                height={24}
              />
            </button>
            <button
              type="button"
              className="product-card-action-btn"
              title="Supprimer"
              aria-label="Supprimer"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(produit);
              }}
            >
              <img
                src="/icon _x.svg"
                alt="Supprimer"
                width={26}
                height={26}
              />
            </button>
          </div>
        )}
      </div>
      <div className="product-card-info">
        <span>{produit.nom}</span>
        <span>${produit.prix.toFixed(2)}</span>
      </div>
    </div>
  );
};
export default ProductCard;
