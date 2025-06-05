import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (produit) => {
    setCart((cart) => {
      const exist = cart.find((item) => item.produit.id === produit.id);
      if (exist) {
        return cart.map((item) =>
          item.produit.id === produit.id
            ? { ...item, quantite: item.quantite + 1 }
            : item
        );
      } else {
        return [...cart, { produit, quantite: 1 }];
      }
    });
  };

  const removeFromCart = (produitId) => {
    setCart((cart) =>
      cart
        .map((item) =>
          item.produit.id === produitId
            ? { ...item, quantite: item.quantite - 1 }
            : item
        )
        .filter((item) => item.quantite > 0)
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
