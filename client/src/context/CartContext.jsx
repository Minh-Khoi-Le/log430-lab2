/**
 * Cart Context
 * 
 * This file provides a React Context for managing shopping cart state.
 * It handles adding/removing products and managing quantities.
 */

import React, { createContext, useContext, useState } from "react";

// Create a context for cart data
const CartContext = createContext();

/**
 * CartProvider Component
 * 
 * Provides shopping cart functionality to the application.
 * Manages:
 * - Products in cart
 * - Product quantities
 * - Cart operations (add, remove, clear)
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 */
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  /**
   * Add a product to the cart
   * @param {Object} produit - Product to add to cart
   */
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

  /**
   * Remove a product from the cart
   * @param {number} produitId - ID of the product to remove
   */
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

  /**
   * Clear the entire cart
   * Removes all products from the cart
   */
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook for accessing the cart context
 * 
 * Provides easy access to cart state and functions in any component
 * 
 * @returns {Object} Cart context containing:
 * - cart: Current cart items
 * - setCart: Function to directly update cart state
 * - addToCart: Function to add a product to cart
 * - removeFromCart: Function to remove a product from cart
 * - clearCart: Function to empty the cart
 */
export function useCart() {
  return useContext(CartContext);
}
