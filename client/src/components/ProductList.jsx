import React from "react";
import ProductCard from "./ProductCard";
import { Grid, Box } from "@mui/material";

const ProductList = ({
  produits,
  onDelete,
  onEdit
}) => (
  <Box sx={{ width: "100%", px: 4, py: 2 }}>
    <Grid container spacing={4} justifyContent="flex-start">
      {produits.map((produit) => (
        <Grid item key={produit.id} xs={12} sm={6} md={4} lg={3} xl={2}>
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
