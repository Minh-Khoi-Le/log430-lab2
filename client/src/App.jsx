import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import { UserProvider, useUser } from "./context/UserContext";

// Composant intermédiaire pour gérer la logique de connexion
function MainApp() {
  const { user, setUser } = useUser();
  const [panier, setPanier] = React.useState([]);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Router>
      <Navbar
        user={user}
        onRoleChange={role => setUser(u => ({ ...u, role }))}
        panierCount={panier.length}
      />
      <Routes>
        <Route
          path="/"
          element={<Products user={user} panier={panier} setPanier={setPanier} />}
        />
        {user.role === "gestionnaire" && (
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        )}
        {user.role === "client" && (
          <Route
            path="/panier"
            element={<CartPage user={user} panier={panier} setPanier={setPanier} />}
          />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

// Root App : englobe tout dans le provider
export default function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}
