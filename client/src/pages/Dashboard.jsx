import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState([]);

 useEffect(() => {
  // Mock : simuler l’API
  const fakeStats = [
    {
      id: 1,
      nom: "Magasin A",
      ventesTotal: 42,
      produitsVendus: 120,
      stocksFaibles: ["Baguette", "Lait"],
      chiffreAffaires: 3549.99,
    },
    {
      id: 2,
      nom: "Magasin B",
      ventesTotal: 30,
      produitsVendus: 97,
      stocksFaibles: [],
      chiffreAffaires: 2110.52,
    },
    {
      id: 3,
      nom: "Magasin C",
      ventesTotal: 57,
      produitsVendus: 134,
      stocksFaibles: ["Poivre"],
      chiffreAffaires: 4687.21,
    }
  ];
  setTimeout(() => setStats(fakeStats), 300); // Simule un délai réseau
}, []);


  return (
    <div style={{ maxWidth: 1000, margin: "48px auto", background: "#fff", padding: 32, borderRadius: 8 }}>
      <h2>Tableau de bord - Maison Mère</h2>
      <table style={{ width: "100%", marginTop: 28 }}>
        <thead>
          <tr>
            <th>Magasin</th>
            <th>Ventes totales</th>
            <th>Produits vendus</th>
            <th>Stocks faibles</th>
            <th>Chiffre d'affaires</th>
          </tr>
        </thead>
        <tbody>
          {stats.length === 0 && (
            <tr>
              <td colSpan={5}>Aucune donnée à afficher.</td>
            </tr>
          )}
          {stats.map(magasin => (
            <tr key={magasin.id}>
              <td>{magasin.nom}</td>
              <td>{magasin.ventesTotal}</td>
              <td>{magasin.produitsVendus}</td>
              <td>
                {magasin.stocksFaibles?.length > 0
                  ? magasin.stocksFaibles.join(", ")
                  : "RAS"}
              </td>
              <td>${magasin.chiffreAffaires.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
