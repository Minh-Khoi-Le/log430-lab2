/**
 * Product List Component
 * 
 * This component renders a grid of product cards.
 * It serves as a container for displaying multiple products in a responsive layout.

 */

import React from "react";
import ProductCard from "./ProductCard";
import { Grid, Box } from "@mui/material";

/**
 * ProductList Component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.produits - Array of product objects to display
 * @param {Function} props.onDelete - Optional handler for product deletion (for admin role)
 * @param {Function} props.onEdit - Optional handler for product editing (for admin role)
 * @returns {JSX.Element} Grid of product cards
 */
const ProductList = ({
  produits,
  onDelete,
  onEdit
}) => (
  <Box sx={{ width: "100%", px: 4, py: 2 }}>
    {/* Responsive grid container for product cards */}
    <Grid container spacing={4} justifyContent="flex-start">
      {produits.map((produit) => (
        <Grid key={produit.id}>
          {/* Individual product card with edit/delete handlers */}
          <ProductCard
            produit={produit}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default ProductList;
