import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

function Login() {
  const [role, setRole] = useState("client");
  const [nom, setNom] = useState("");
  const [magasinId, setMagasinId] = useState("");
  const [magasins, setMagasins] = useState([]);
  const { setUser } = useUser();

  // Charger la liste des magasins au montage
  useEffect(() => {
    fetch("http://localhost:3800/magasins")
      .then((res) => res.json())
      .then((data) => setMagasins(data))
      .catch(() => setMagasins([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nom.trim()) {
      alert("Veuillez entrer votre nom !");
      return;
    }
    if (role === "client" && !magasinId) {
      alert("Veuillez choisir un magasin !");
      return;
    }
    // Pour gestionnaire, magasinId est facultatif 
    setUser({
      role,
      nom: nom.trim(),
      magasinId: role === "client" ? parseInt(magasinId) : null,
      magasinNom:
        role === "client"
          ? magasins.find((m) => m.id === parseInt(magasinId))?.nom || ""
          : "",
    });
  };

  return (
    <div style={{ marginTop: 100, textAlign: "center" }}>
      <h2>Bienvenue!</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
        <label>
          Je suis&nbsp;:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ marginLeft: 8 }}
          >
            <option value="client">Client</option>
            <option value="gestionnaire">Gestionnaire</option>
          </select>
        </label>
        <br />
        <br />
        <label>
          Mon nom&nbsp;:
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Entrez votre nom"
            style={{ marginLeft: 8 }}
          />
        </label>
        <br />
        <br />
        {/* Sélection magasin obligatoire pour client */}
        {role === "client" && (
          <label>
            Mon magasin&nbsp;:
            <select
              value={magasinId}
              onChange={(e) => setMagasinId(e.target.value)}
              style={{ marginLeft: 8 }}
              required
            >
              <option value="">-- Choisir un magasin --</option>
              {magasins.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nom}
                </option>
              ))}
            </select>
          </label>
        )}
        <br />
        <br />
        <button
          type="submit"
          style={{
            padding: "8px 24px",
            background: "#3a8bff",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          Continuer
        </button>
      </form>
    </div>
  );
}

export default Login;
