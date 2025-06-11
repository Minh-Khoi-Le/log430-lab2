import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import { UserProvider, useUser } from "./context/UserContext";

/**
 * MainApp Component
 * 
 * Handles the main application logic including:
 * - Authentication state management
 * - Conditional routing based on user role
 * - Shopping cart state management
 * 
 * If no user is authenticated, it displays the login page.
 * Otherwise, it shows the appropriate routes based on user role.
 */
function MainApp() {
  const { user, setUser } = useUser();
  const [panier, setPanier] = React.useState([]);

  // If no user is authenticated, show login page
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
        {/* Product catalog - accessible to all users */}
        <Route
          path="/"
          element={<Products user={user} panier={panier} setPanier={setPanier} />}
        />
        {/* Dashboard - only accessible to users with gestionnaire role */}
        {user.role === "gestionnaire" && (
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        )}
        {/* Shopping cart - only accessible to users with client role */}
        {user.role === "client" && (
          <Route
            path="/panier"
            element={<CartPage user={user} panier={panier} setPanier={setPanier} />}
          />
        )}
        {/* Redirect all other routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}
