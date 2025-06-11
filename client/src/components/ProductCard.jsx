/**
 * Product Card Component
 * 
 * This component displays a single product in a card format.
 * It adapts its functionality based on the user's role:
 * - For clients: Shows add to cart button
 * - For gestionnaires: Shows edit and delete buttons
 */

import React from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
  Fade,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductCard = ({ produit, onEdit, onDelete }) => {
  // State for hover effects
  const [hover, setHover] = React.useState(false);
  const { addToCart } = useCart();
  const { user } = useUser();
  
  // Calculate total stock across all stores
  const totalStock = produit.stocks
    ? produit.stocks.reduce((sum, s) => sum + s.quantite, 0)
    : 0;

  // Check if user is a client for conditional rendering
  const isClient = user?.role === "client";

  return (
    <Card
      sx={{
        width: 270,
        minHeight: 190,
        margin: 2,
        borderRadius: 3,
        boxShadow: hover ? 8 : 2,
        transition: "box-shadow 0.2s",
        position: "relative",
        overflow: "visible",
        "&:hover": {
          boxShadow: 12,
        },
        background: "#f8fafd"
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="product-card"
    >
      {/* Card content with product details */}
      <CardContent sx={{ pb: 1 }}>
        {/* Product name and price header */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {produit.nom}
          </Typography>
          <Typography variant="h6">${produit.prix.toFixed(2)}</Typography>
        </Box>
        
        {/* Stock availability information */}
        <Typography
          variant="body2"
          sx={{ color: "#3577d6", mt: 0.5, fontWeight: 500 }}
        >
          Stock total&nbsp;: <b>{totalStock}</b>
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", pt: 0 }}>
        {/* Admin actions: Edit and Delete buttons (only shown for gestionnaire role) */}
        <Fade in={hover && (!!onEdit || !!onDelete)}>
          <Box>
            {/* Edit button */}
            {onEdit && (
              <Tooltip title="Modifier" placement="top" arrow>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(produit);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
            
            {/* Delete button */}
            {onDelete && (
              <Tooltip title="Supprimer" placement="top" arrow>
                <IconButton
                  size="small"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(produit);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Fade>
        
        {/* Client action: Add to cart button (only shown for client role) */}
        {isClient && (
          <Box sx={{ width: "100%" }}>
            <Button
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => addToCart(produit)}
              disabled={totalStock === 0}
              sx={{
                backgroundColor: totalStock === 0 ? "#bdbdbd" : "#208aff",
                color: "#fff",
                borderRadius: 2,
                fontWeight: 700,
                ml: "auto",
                boxShadow: "none",
                ":hover": { background: "#1566c4" },
                width: "100%"
              }}
              fullWidth
            >
              {totalStock === 0 ? "Out of stock" : "Ajouter au panier"}
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
