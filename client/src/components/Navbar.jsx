import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

function Navbar() {
  const { cart } = useCart();
  const { user, setUser } = useUser();
  const totalItems = cart.reduce((acc, item) => acc + item.quantite, 0);
  const location = useLocation();

  const handleRoleChange = (role) => setUser(u => ({ ...u, role }));

  return (
    <nav style={{
      background: "#2d3240", color: "#fff", padding: 16, display: "flex",
      alignItems: "center", justifyContent: "space-between"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <span style={{ fontWeight: 700, fontSize: 24 }}>LOG430 Magasin</span>
        <Link
          to="/"
          style={{
            color: location.pathname === "/" ? "#3a8bff" : "#fff",
            textDecoration: "none", fontWeight: 600, marginRight: 16
          }}>
          Produits
        </Link>
        {user?.role === "gestionnaire" && (
          <Link to="/dashboard" style={{ color: "#fff", marginRight: 16 }}>Dashboard</Link>
        )}
        {user?.role === "client" && (
          <Link to="/panier" style={{ color: "#fff", marginRight: 16, position: "relative" }}>
            <span style={{ marginRight: 8 }}>🛒 Mon panier</span>
            <span style={{
              background: "#3a8bff", borderRadius: "50%", padding: "2px 8px", fontSize: 14,
              color: "#fff", position: "absolute", top: -8, right: -26
            }}>
              {totalItems}
            </span>
          </Link>
        )}
      </div>
      <div>
        {user?.nom && <>Utilisateur: <b>{user.nom}</b> | </>}
        Rôle&nbsp;
        <select value={user?.role} onChange={e => handleRoleChange(e.target.value)}>
          <option value="client">Client</option>
          <option value="gestionnaire">Gestionnaire</option>
        </select>
      </div>
    </nav>
  );
}
export default Navbar;
