/**
 * Login Page
 * 
 * This component handles user authentication and role selection.
 * 
 * After successful login, it updates the user context with the user information.
 */

import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

function Login() {
  // State for form fields
  const [role, setRole] = useState("client");
  const [nom, setNom] = useState("");
  const [magasinId, setMagasinId] = useState("");
  const [magasins, setMagasins] = useState([]);
  const { setUser } = useUser();

  // Fetch the list of stores when component mounts
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/stores")
      .then((res) => res.json())
      .then((data) => setMagasins(data))
      .catch(() => setMagasins([]));
  }, []);

  /**
   * Handle form submission
   * 
   * Validates form inputs and creates a user object with:
   * - role: Selected role (client or gestionnaire)
   * - nom: User's name
   * - magasinId: Selected store ID (for clients only)
   * - magasinNom: Selected store name (for clients only)
   * 
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate name field
    if (!nom.trim()) {
      alert("Veuillez entrer votre nom !");
      return;
    }
    // Validate store selection for clients
    if (role === "client" && !magasinId) {
      alert("Veuillez choisir un magasin !");
      return;
    }
    // Create user object and update context
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
        {/* Role selection dropdown */}
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
        {/* Name input field */}
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
        {/* Store selection dropdown (only shown for clients) */}
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
        {/* Submit button */}
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
