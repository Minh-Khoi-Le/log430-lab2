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
  const [hover, setHover] = React.useState(false);
  const { addToCart } = useCart();
  const { user } = useUser();
  const totalStock = produit.stocks
    ? produit.stocks.reduce((sum, s) => sum + s.quantite, 0)
    : 0;

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
      {/* ... (rest image placeholder, titres, etc) */}
      <CardContent sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {produit.nom}
          </Typography>
          <Typography variant="h6">${produit.prix.toFixed(2)}</Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ color: "#3577d6", mt: 0.5, fontWeight: 500 }}
        >
          Stock total&nbsp;: <b>{totalStock}</b>
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", pt: 0 }}>
        {/* Gestionnaire: icons édition/suppression */}
        <Fade in={hover && (!!onEdit || !!onDelete)}>
          <Box>
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
        {/* Client: bouton ajouter au panier */}
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
